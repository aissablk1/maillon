// MAILLON — wrapper léger autour du SDK Meshtastic-Apple
// Le SDK officiel gère le protocole LoRa, le BLE, le parsing protobuf et le chiffrement.
// Ce manager n'est qu'une façade orientée UI pour les vues SwiftUI.

import Foundation
import CoreBluetooth
import Observation

// État de connexion exposé à l'UI — aligné sur apps/common/contracts/ConnectionState.md (v1)
// 8 cas canoniques partagés iOS / Android / Tauri — ne pas modifier sans bumper le contrat.
enum MaillonConnectionState: Equatable {
    case idle
    case unauthorized
    case unsupported
    case scanning
    case connecting(nodeNum: UInt32)
    case connected(nodeNum: UInt32)
    case disconnecting
    case error(reason: String, recoverable: Bool)

    var label: String {
        switch self {
        case .idle:                       return "Prêt"
        case .unauthorized:               return "Bluetooth non autorisé"
        case .unsupported:                return "Bluetooth indisponible"
        case .scanning:                   return "Recherche en cours…"
        case .connecting(let num):        return "Connexion au nœud \(num)…"
        case .connected(let num):         return "Connecté au nœud \(num)"
        case .disconnecting:              return "Déconnexion…"
        case .error(let reason, _):       return "Erreur\u{00A0}: \(reason)"
        }
    }

    var isConnected: Bool {
        if case .connected = self { return true }
        return false
    }

    var isRecoverable: Bool {
        if case .error(_, let recoverable) = self { return recoverable }
        return true
    }
}

// Représentation d'un nœud Meshtastic — aligné sur apps/common/contracts/Node.schema.json (v1)
struct MaillonNode: Identifiable, Hashable {
    let id: UUID
    let nodeNum: UInt32         // Identifiant 32 bits canonique Meshtastic (uint32)
    let nodeId: String          // ID format "!a1b2c3d4" dérivé de nodeNum, pour l'affichage
    let displayName: String     // Long name (max 39 octets UTF-8)
    let shortName: String       // Short name (max 4 caractères)
    let rssi: Int?              // dBm si disponible
    let batteryLevel: Int?      // 0-100 % (101 = secteur)
    let isOnline: Bool
    let lastHeard: Date?
}

// Message texte sur un canal Meshtastic
// `channel` est l'INDEX 0-7 conforme protocole Meshtastic (apps/common/contracts/Node.schema.json),
// jamais un nom de canal. Le canal 0 est le primaire (MAILLON-PUBLIC en pratique).
struct MaillonMessage: Identifiable, Hashable {
    let id: UUID
    let channel: UInt32
    let senderId: String
    let senderName: String
    let body: String
    let timestamp: Date
    let isOutgoing: Bool
}

@Observable
final class MaillonBluetoothManager: NSObject {

    // MARK: - État exposé

    private(set) var connectionState: MaillonConnectionState = .idle
    private(set) var discoveredNodes: [MaillonNode] = []
    private(set) var meshNodes: [MaillonNode] = []
    private(set) var messages: [MaillonMessage] = []

    // Canal MAILLON public par défaut — index 0 (canal primaire Meshtastic).
    // Le NOM "MAILLON-PUBLIC" est défini par le firmware côté nœud, pas par l'app.
    let defaultChannel: UInt32 = 0

    // MARK: - Dépendances

    // Le SDK Meshtastic-Apple expose un BLEManager interne — on l'utilisera ici
    // une fois la dépendance résolue dans Xcode. Pour le squelette, on conserve
    // un CBCentralManager direct afin de gérer l'autorisation BLE et la découverte.
    private var central: CBCentralManager?

    // Filtre Meshtastic — service GATT officiel exposé par les nœuds
    // Source : https://meshtastic.org/docs/development/device/client-api/
    private let meshtasticServiceUUID = CBUUID(string: "6BA1B218-15A8-461F-9FA8-5DCAE273EAFD")

    override init() {
        super.init()
    }

    // MARK: - API publique

    func startScanning() {
        if central == nil {
            central = CBCentralManager(delegate: self, queue: .main)
        }
        guard let central, central.state == .poweredOn else {
            // Le délégué `centralManagerDidUpdateState` mettra à jour l'état dès que possible
            return
        }
        connectionState = .scanning
        discoveredNodes.removeAll()
        central.scanForPeripherals(withServices: [meshtasticServiceUUID], options: nil)
    }

    func stopScanning() {
        central?.stopScan()
        if case .scanning = connectionState {
            connectionState = .idle
        }
    }

    func connect(to node: MaillonNode) {
        // À implémenter avec le SDK Meshtastic-Apple : récupérer le CBPeripheral
        // associé puis déléguer au BLEManager du SDK pour l'établissement de session.
        connectionState = .connecting(nodeNum: node.nodeNum)
    }

    func disconnect() {
        connectionState = .disconnecting
        // À implémenter via le SDK Meshtastic-Apple, puis basculer vers .idle au callback.
        connectionState = .idle
    }

    func sendTextMessage(_ body: String, on channel: UInt32? = nil) {
        let trimmed = body.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        guard connectionState.isConnected else { return }

        // À implémenter via le SDK Meshtastic-Apple : sendMessage(text:channel:)
        // En attendant, on consigne localement le message sortant pour feedback UI.
        let outgoing = MaillonMessage(
            id: UUID(),
            channel: channel ?? defaultChannel,
            senderId: "self",
            senderName: "Moi",
            body: trimmed,
            timestamp: Date(),
            isOutgoing: true
        )
        messages.append(outgoing)
    }
}

// MARK: - CBCentralManagerDelegate

extension MaillonBluetoothManager: CBCentralManagerDelegate {

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        switch central.state {
        case .poweredOn:
            connectionState = .idle
        case .poweredOff:
            connectionState = .error(reason: "Bluetooth désactivé", recoverable: true)
        case .unauthorized:
            connectionState = .unauthorized
        case .unsupported:
            connectionState = .unsupported
        case .resetting, .unknown:
            connectionState = .idle
        @unknown default:
            connectionState = .idle
        }
    }

    func centralManager(
        _ central: CBCentralManager,
        didDiscover peripheral: CBPeripheral,
        advertisementData: [String: Any],
        rssi RSSI: NSNumber
    ) {
        let name = peripheral.name ?? "Nœud Meshtastic"
        let shortName = String(name.prefix(4)).uppercased()
        let node = MaillonNode(
            id: peripheral.identifier,
            nodeId: "!\(peripheral.identifier.uuidString.prefix(8).lowercased())",
            displayName: name,
            shortName: shortName,
            rssi: RSSI.intValue,
            batteryLevel: nil,
            isOnline: true,
            lastHeard: Date()
        )

        if let index = discoveredNodes.firstIndex(where: { $0.id == node.id }) {
            discoveredNodes[index] = node
        } else {
            discoveredNodes.append(node)
        }
    }
}
