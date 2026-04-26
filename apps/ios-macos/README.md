# MAILLON — App iOS / iPadOS / macOS

App universelle Swift/SwiftUI pour MAILLON, opérateur d'infrastructure mesh radio souveraine. Permet à l'utilisateur de connecter son nœud Meshtastic via Bluetooth Low Energy, de visualiser les autres nœuds du réseau et d'échanger des messages texte sur les canaux MAILLON.

---

## Cibles supportées

| Plateforme | Version minimale | Distribution |
|---|---|---|
| iOS | 17.0 | TestFlight, App Store |
| iPadOS | 17.0 | TestFlight, App Store |
| macOS | 14.0 (Sonoma) | Mac Catalyst, distribution App Store ou notarisation directe |

Une seule cible Xcode `MaillonApp` est partagée entre les trois plateformes via Mac Catalyst.

---

## Prérequis

- macOS 14+ avec Xcode 15.4 ou supérieur
- Compte Apple Developer (free tier suffit pour le sideload, paid requis pour TestFlight/App Store)
- Bluetooth activé sur la machine de développement et le nœud Meshtastic à appairer
- Un nœud Meshtastic flashé avec firmware ≥ 2.3 (T-Beam, Heltec V3, RAK4631, Station G2, etc.)

---

## Installation et build

### Ouvrir le projet

```bash
cd apps/ios-macos
open Package.swift
```

Xcode résoudra automatiquement les dépendances Swift Package, notamment `Meshtastic-Apple` (SDK officiel).

### Lancer en simulateur iOS

1. Sélectionner le scheme `MaillonApp`
2. Choisir un simulateur iOS 17+ ou un appareil physique
3. `Cmd + R`

### Lancer sur Mac (Catalyst)

1. Sélectionner le scheme `MaillonApp`
2. Choisir la destination « My Mac (Mac Catalyst) »
3. `Cmd + R`

> Note : le BLE en simulateur iOS n'est **pas** disponible. Tester sur appareil physique pour la découverte de nœuds.

---

## Architecture

**MVVM** (Model — View — ViewModel) léger, sans framework tiers. Justification :
- TCA serait surdimensionné pour un squelette à 3 écrans, et augmenterait la barrière d'entrée pour un dev iOS senior reprenant le projet.
- SwiftUI + `@Observable` (Swift 5.9) couvre 100 % des besoins actuels (état réactif, injection de dépendances par constructeur).

```
Sources/MaillonApp/
├── MaillonApp.swift            entrée @main, scène universelle
├── Theme/
│   └── MaillonTheme.swift      tokens design (couleurs, typo)
├── Views/
│   ├── HomeView.swift          accueil, statut BLE, CTA connexion
│   ├── DeviceListView.swift    liste des nœuds Meshtastic détectés
│   └── MessagesView.swift      chat canal MAILLON-PUBLIC
└── Bluetooth/
    └── MaillonBluetoothManager.swift   wrapper SDK Meshtastic-Apple
```

---

## Dépendances

| Package | Version | Rôle |
|---|---|---|
| [`Meshtastic-Apple`](https://github.com/meshtastic/Meshtastic-Apple) | branch `main` | SDK officiel Meshtastic — protocole LoRa, BLE, parsing protobuf |

Aucune dépendance ne sera ajoutée sans validation explicite. Le SDK Meshtastic-Apple couvre déjà le protocole, le BLE, le parsing protobuf, la gestion des canaux et le chiffrement.

---

## Distribution utilisateur final

### Phase bêta (recommandée pour les premiers nœuds MAILLON)

1. Inviter l'utilisateur via TestFlight (lien public ou invitation par email)
2. L'utilisateur installe TestFlight depuis l'App Store
3. Il accepte l'invitation et installe MAILLON

### Phase publique

Publication sur l'App Store avec une seule fiche universelle (iPhone, iPad, Mac). Les utilisateurs téléchargent l'app comme n'importe quelle autre.

---

## Permissions requises

L'app demande, à la première utilisation :

- **Bluetooth** — obligatoire pour découvrir et communiquer avec le nœud Meshtastic
- **Localisation (en cours d'utilisation)** — optionnelle, utilisée pour afficher la position de l'utilisateur sur la carte des nœuds

Les textes de justification sont rédigés en français dans `Info.plist`.

---

## Roadmap squelette › production

Ce dépôt est un **squelette compilable conceptuellement**, à compléter :

- Persistance locale (SwiftData) des messages et nœuds
- Carte interactive (MapKit) avec positions GPS des nœuds
- Gestion fine des canaux Meshtastic (création, partage QR code)
- Notifications push pour messages directs
- Mode « ranger » : alertes batterie, signal faible, déconnexion
- Onboarding guidé première connexion BLE
- Tests unitaires (XCTest) sur le wrapper BLE
- Localisation EN/ES en plus du FR

---

## Ressources

- Doc Meshtastic-Apple : <https://github.com/meshtastic/Meshtastic-Apple>
- Doc protocole Meshtastic : <https://meshtastic.org/docs/>
- Apple HIG : <https://developer.apple.com/design/human-interface-guidelines>
- Tokens design partagés : `../common/design-tokens.md`

[En savoir plus sur MAILLON&nbsp;›](../../README.md)
