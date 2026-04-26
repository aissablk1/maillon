# Contrats partagés multi-apps

> Source de vérité unique pour les types de données qui traversent **iOS/macOS Swift**, **Android Kotlin**, **Desktop Tauri Rust+TS**, et le **SaaS web Next.js**.
>
> Ce dossier répond aux 2 findings critiques du `docs/16-apps-architecture-review.md` : (1) l'absence de contrat partagé, (2) la divergence du `ConnectionState` entre les 3 codebases.

---

## Contrats actuels

| Contrat | Fichier | Rôle | Consommateurs |
|---|---|---|---|
| `Node` | [`Node.schema.json`](Node.schema.json) | Représentation canonique d'un nœud Meshtastic | iOS, Android, Tauri, SaaS web |
| `ConnectionState` | [`ConnectionState.md`](ConnectionState.md) | État de connexion BLE → 8 cas canoniques | iOS, Android, Tauri |

---

## Workflow de modification

1. Tout changement structurel à un contrat **commence ici**, pas dans une codebase.
2. Modifier le schéma → ouvrir une PR avec le tag `[contract]` qui documente la migration.
3. Mettre à jour les 3 codebases dans la même PR (ou tagger des sous-tâches explicites).
4. Bumper la version dans le `$id` du JSON Schema (`v1`, `v2`, etc.) et tracer le changelog ci-dessous.

---

## Changelog

| Version | Date | Auteur | Changement |
|---|---|---|---|
| v1 | 2026-04-26 | Aïssa | Création initiale : `Node.schema.json`, `ConnectionState.md` (8 cas) |

---

## Roadmap contrats à venir

- `Message.schema.json` — message texte mesh (origin, destination, channel, encrypted, timestamp)
- `Telemetry.schema.json` — télémétrie agrégée (battery, voltage, temp, humidity, RSSI)
- `Position.schema.json` — position GPS avec precisionBits Meshtastic
- `Channel.schema.json` — paramètres canal (PSK, modem preset, hop limit)
- `Alert.schema.json` — événements opérationnels (battery low, geofence, SOS)
- `MeshtasticEnvelope.proto` — envelope Protobuf pour MQTT bridge cohérent firmware↔SaaS

À figer **avant** la phase 3 sync MQTT (M9 dans la roadmap initiale, ou jamais si on reste sur le pivot solo `meshtastic.cloud`).

---

## Génération de code

Optionnel à terme — peut générer automatiquement les types depuis le JSON Schema :

- **Swift** : [`quicktype`](https://quicktype.io) ou `sourcery`
- **Kotlin** : `quicktype` ou `kotlinx-serialization` + plugin
- **Rust** : `schemars` + `typify`
- **TypeScript** : `quicktype` ou `json-schema-to-typescript`

Pas urgent en MVP — la duplication contrôlée est acceptable tant qu'on n'a que 5-10 contrats.
