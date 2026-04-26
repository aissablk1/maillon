# Contrat partagé — `ConnectionState`

> Source de vérité pour l'enum/sealed class qui représente l'état de connexion BLE entre l'app et un nœud Meshtastic. Utilisé identiquement dans les 3 codebases.

---

## 8 états canoniques

L'enum doit avoir exactement ces 8 cas, dans cet ordre, avec ces noms.

| # | Nom canonique | Quand utiliser | Côté UI |
|---|---|---|---|
| 1 | `Idle` | État initial avant toute action utilisateur | Bouton « Connecter un nœud » visible |
| 2 | `Unauthorized` | Permission BLE refusée par l'utilisateur | Message + lien vers Réglages |
| 3 | `Unsupported` | Bluetooth indisponible (iOS Simulator, vieil Android, headless Linux) | Mode dégradé sans BLE |
| 4 | `Scanning` | Recherche de nœuds à proximité en cours | Loader, liste se remplit en live |
| 5 | `Connecting` | Tentative de connexion à un nœud sélectionné | Loader + nom du nœud |
| 6 | `Connected(nodeNum: UInt32)` | Connexion établie, payload = ID du nœud | UI active, messages affichés |
| 7 | `Disconnecting` | Déconnexion volontaire en cours | Loader transitoire |
| 8 | `Error(reason: String, recoverable: Bool)` | Erreur (timeout, lien rompu, refus pairing) | Message + bouton Réessayer si recoverable |

---

## Règles de transition

```
Idle ──→ Scanning ──→ Connecting ──→ Connected ──→ Disconnecting ──→ Idle
  │                                       │
  │                                       └──→ Error(recoverable=true) ──→ Connecting (retry)
  ↓
Unauthorized | Unsupported  (états terminaux jusqu'à action utilisateur)
```

- Toute transition non listée doit logger un avertissement.
- Un `Error(recoverable=false)` retombe sur `Idle` après acquittement utilisateur.
- `Disconnecting` ne peut jamais venir d'un `Error` — on passe directement à `Idle`.

---

## Implémentation par plateforme

### Swift (iOS, iPadOS, macOS) — `apps/ios-macos/Sources/MaillonApp/Bluetooth/MaillonBluetoothManager.swift`

```swift
public enum MaillonConnectionState: Sendable, Equatable {
    case idle
    case unauthorized
    case unsupported
    case scanning
    case connecting(nodeNum: UInt32)
    case connected(nodeNum: UInt32)
    case disconnecting
    case error(reason: String, recoverable: Bool)
}
```

### Kotlin (Android) — `apps/android/app/src/main/java/fr/maillon/app/bluetooth/ConnectionState.kt`

```kotlin
sealed class ConnectionState {
    object Idle : ConnectionState()
    object Unauthorized : ConnectionState()
    object Unsupported : ConnectionState()
    object Scanning : ConnectionState()
    data class Connecting(val nodeNum: UInt) : ConnectionState()
    data class Connected(val nodeNum: UInt) : ConnectionState()
    object Disconnecting : ConnectionState()
    data class Error(val reason: String, val recoverable: Boolean) : ConnectionState()
}
```

### Rust (Tauri Desktop) — `apps/desktop/src-tauri/src/connection_state.rs`

```rust
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(tag = "kind", rename_all = "camelCase")]
pub enum ConnectionState {
    Idle,
    Unauthorized,
    Unsupported,
    Scanning,
    Connecting { node_num: u32 },
    Connected { node_num: u32 },
    Disconnecting,
    Error { reason: String, recoverable: bool },
}
```

### TypeScript (frontend Tauri & SaaS web) — `apps/desktop/src/types/connection.ts`

```typescript
export type ConnectionState =
  | { kind: "idle" }
  | { kind: "unauthorized" }
  | { kind: "unsupported" }
  | { kind: "scanning" }
  | { kind: "connecting"; nodeNum: number }
  | { kind: "connected"; nodeNum: number }
  | { kind: "disconnecting" }
  | { kind: "error"; reason: string; recoverable: boolean };
```

---

## Sérialisation JSON canonique

Pour traverser les couches (Tauri IPC, MQTT, SaaS API), la forme JSON est :

```json
{ "kind": "connected", "nodeNum": 1234567890 }
{ "kind": "error", "reason": "BLE timeout", "recoverable": true }
{ "kind": "idle" }
```

Le champ `kind` est **toujours présent**, en camelCase sans accents. Les payloads sont au même niveau (pas d'objet imbriqué `data`).

---

## Tests d'acceptation

Chaque codebase doit avoir un test qui vérifie :

1. La présence des 8 cas
2. Les transitions valides ci-dessus
3. La sérialisation JSON identique à la spec

Ces tests sont la garantie minimale de cohérence cross-platform avant tout sprint d'intégration MQTT (phase 3, M9).
