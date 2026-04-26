// État de connexion BLE — miroir TS du contrat partagé v1.
// Doit rester synchronisé avec :
//   apps/common/contracts/ConnectionState.md
//   apps/desktop/src-tauri/src/main.rs (enum ConnectionState)
//   apps/ios-macos/Sources/MaillonApp/Bluetooth/MaillonBluetoothManager.swift
//   apps/android/app/src/main/java/fr/maillon/app/bluetooth/ConnectionState.kt

export type ConnectionState =
  | { kind: "idle" }
  | { kind: "unauthorized" }
  | { kind: "unsupported" }
  | { kind: "scanning" }
  | { kind: "connecting"; nodeNum: number }
  | { kind: "connected"; nodeNum: number }
  | { kind: "disconnecting" }
  | { kind: "error"; reason: string; recoverable: boolean };

export function isConnected(state: ConnectionState): boolean {
  return state.kind === "connected";
}

export function stateLabel(state: ConnectionState): string {
  switch (state.kind) {
    case "idle":
      return "Prêt";
    case "unauthorized":
      return "Bluetooth non autorisé";
    case "unsupported":
      return "Bluetooth indisponible";
    case "scanning":
      return "Recherche en cours…";
    case "connecting":
      return `Connexion au nœud ${state.nodeNum}…`;
    case "connected":
      return `Connecté au nœud ${state.nodeNum}`;
    case "disconnecting":
      return "Déconnexion…";
    case "error":
      return `Erreur : ${state.reason}`;
  }
}
