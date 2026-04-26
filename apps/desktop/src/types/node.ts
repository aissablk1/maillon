// Représentation d'un nœud Meshtastic — miroir TS du contrat partagé v1.
// Doit rester synchronisé avec :
//   apps/common/contracts/Node.schema.json
//   apps/desktop/src-tauri/src/main.rs (struct MeshNode)

export type MeshNode = {
  /** Identifiant 32 bits canonique Meshtastic (uint32). */
  nodeNum: number;
  /** Nom long affichable (max 39 octets UTF-8). */
  longName: string;
  /** Nom court (max 4 caractères). */
  shortName: string;
  hwModel?: string | null;
  firmwareVersion?: string | null;
  batteryLevel?: number | null;
  rssi?: number | null;
  snr?: number | null;
  /** Dernier heartbeat reçu, ISO 8601 UTC. */
  lastHeard?: string | null;
  isOnline: boolean;
  /** Index de canal Meshtastic (0 = primaire, 1-7 = secondaires). */
  channel: number;
};
