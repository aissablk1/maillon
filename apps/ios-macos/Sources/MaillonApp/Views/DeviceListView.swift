// MAILLON — liste des nœuds Meshtastic détectés via BLE

import SwiftUI

struct DeviceListView: View {
    @Environment(MaillonBluetoothManager.self) private var bluetooth
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ZStack {
            MaillonTheme.Colors.background.ignoresSafeArea()
            content
        }
        .navigationTitle("Nœuds détectés")
        #if os(iOS)
        .navigationBarTitleDisplayMode(.large)
        #endif
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                scanButton
            }
        }
        .onAppear {
            if !bluetooth.connectionState.isConnected {
                bluetooth.startScanning()
            }
        }
        .onDisappear {
            bluetooth.stopScanning()
        }
    }

    @ViewBuilder
    private var content: some View {
        if bluetooth.discoveredNodes.isEmpty {
            emptyState
        } else {
            ScrollView {
                LazyVStack(spacing: MaillonTheme.Spacing.md) {
                    ForEach(bluetooth.discoveredNodes) { node in
                        nodeRow(node)
                    }
                }
                .padding(MaillonTheme.Spacing.lg)
                .frame(maxWidth: 720)
                .frame(maxWidth: .infinity)
            }
        }
    }

    private var emptyState: some View {
        VStack(spacing: MaillonTheme.Spacing.lg) {
            Image(systemName: "antenna.radiowaves.left.and.right.slash")
                .font(.system(size: 56, weight: .light))
                .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)

            VStack(spacing: MaillonTheme.Spacing.sm) {
                Text("Aucun nœud détecté")
                    .font(MaillonTheme.Typography.h2)
                    .foregroundStyle(MaillonTheme.Colors.sand)

                Text(scanningHelper)
                    .font(MaillonTheme.Typography.body)
                    .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 420)
                    .fixedSize(horizontal: false, vertical: true)
            }

            if case .scanning = bluetooth.connectionState {
                ProgressView()
                    .tint(MaillonTheme.Colors.signal)
            }
        }
        .padding(MaillonTheme.Spacing.xl)
    }

    private var scanningHelper: String {
        switch bluetooth.connectionState {
        case .scanning:
            return "Allumez votre nœud Meshtastic et assurez-vous qu'il est à portée Bluetooth (≈ 10\u{00A0}m)."
        case .error(let reason, _):
            return reason
        case .unsupported:
            return "Bluetooth indisponible sur cet appareil."
        case .unauthorized:
            return "Autorisez MAILLON à utiliser le Bluetooth dans Réglages\u{00A0}\u{203A}\u{00A0}Confidentialité."
        default:
            return "Lancez une recherche pour détecter les nœuds Meshtastic à proximité."
        }
    }

    private func nodeRow(_ node: MaillonNode) -> some View {
        Button {
            bluetooth.connect(to: node)
        } label: {
            HStack(spacing: MaillonTheme.Spacing.md) {
                shortNameBadge(node.shortName)

                VStack(alignment: .leading, spacing: 2) {
                    Text(node.displayName)
                        .font(MaillonTheme.Typography.bodyLg.weight(.semibold))
                        .foregroundStyle(MaillonTheme.Colors.sand)

                    Text(node.nodeId)
                        .font(MaillonTheme.Typography.monoCaption)
                        .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
                }

                Spacer()

                if let rssi = node.rssi {
                    rssiPill(rssi)
                }

                Text("\u{00A0}\u{203A}")
                    .font(MaillonTheme.Typography.bodyLg)
                    .foregroundStyle(MaillonTheme.Colors.onSurfaceMuted)
            }
            .maillonCard()
        }
        .buttonStyle(.plain)
    }

    private func shortNameBadge(_ short: String) -> some View {
        Text(short)
            .font(MaillonTheme.Typography.monoBody.weight(.bold))
            .foregroundStyle(MaillonTheme.Colors.charcoal)
            .frame(width: 48, height: 48)
            .background(MaillonTheme.Colors.moss)
            .clipShape(RoundedRectangle(cornerRadius: MaillonTheme.Radius.md, style: .continuous))
    }

    private func rssiPill(_ rssi: Int) -> some View {
        Text("\(rssi) dBm")
            .font(MaillonTheme.Typography.micro)
            .foregroundStyle(MaillonTheme.Colors.sand)
            .padding(.horizontal, MaillonTheme.Spacing.sm)
            .padding(.vertical, MaillonTheme.Spacing.xs)
            .background(rssiColor(rssi).opacity(0.25))
            .overlay(
                RoundedRectangle(cornerRadius: MaillonTheme.Radius.pill)
                    .stroke(rssiColor(rssi), lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: MaillonTheme.Radius.pill))
    }

    private func rssiColor(_ rssi: Int) -> Color {
        switch rssi {
        case ..<(-90):  return MaillonTheme.Colors.danger
        case (-90)..<(-70): return MaillonTheme.Colors.warning
        default:        return MaillonTheme.Colors.moss
        }
    }

    private var scanButton: some View {
        Button {
            if case .scanning = bluetooth.connectionState {
                bluetooth.stopScanning()
            } else {
                bluetooth.startScanning()
            }
        } label: {
            if case .scanning = bluetooth.connectionState {
                Label("Arrêter", systemImage: "stop.circle")
            } else {
                Label("Rechercher", systemImage: "arrow.clockwise")
            }
        }
        .tint(MaillonTheme.Colors.signal)
    }
}

#Preview {
    NavigationStack {
        DeviceListView()
            .environment(MaillonBluetoothManager())
    }
}
