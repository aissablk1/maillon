# MAILLON Console — Desktop (Tauri 2)

Console PC de l'opérateur MAILLON. Application native multi-plateformes (Windows, Linux, macOS) construite avec Tauri 2, React 19, TypeScript et Tailwind CSS v4.

Particulièrement destinée au **Kit Secours** (PC commande d'un chef d'équipe sécurité civile, conducteur de travaux, équipe événementielle) : carte temps réel des nœuds Meshtastic, messagerie chiffrée et gestion de flotte.

---

## Architecture

```
apps/desktop/
├── src/                    # Frontend React 19 + TS strict
│   ├── App.tsx             # Layout principal (sidebar + zone contenu)
│   ├── main.tsx            # Bootstrap React
│   └── styles.css          # Tailwind v4 + tokens MAILLON via @theme
├── src-tauri/              # Backend Rust
│   ├── Cargo.toml          # Dépendances : tauri, tokio, meshtastic, btleplug
│   ├── tauri.conf.json     # Config app (titre, fenêtre, identifier)
│   └── src/main.rs         # Entry Rust + commandes Tauri
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Communication Frontend ↔ Backend

Le frontend appelle le backend Rust via `invoke()` de `@tauri-apps/api/core`. Le backend Rust s'appuie sur le SDK officiel **meshtastic-rust** (crate `meshtastic`) pour parler aux nœuds physiques en Bluetooth Low Energy (via `btleplug`) ou USB Serial.

Commandes Tauri exposées dans le MVP :

| Commande | Rôle |
|---|---|
| `scan_devices` | Scan BLE des nœuds Meshtastic à proximité |
| `connect_device` | Connecte un nœud par son identifiant |
| `send_message` | Envoie un message texte sur le canal mesh |

---

## Prérequis

- **Rust** stable ≥ 1.77 (`rustup default stable`)
- **Node.js** ≥ 20 (`nvm install 20 && nvm use 20`)
- **Tauri CLI 2** (installé automatiquement comme dépendance dev)

### Dépendances système

**Linux** (Debian/Ubuntu) :
```bash
sudo apt install libwebkit2gtk-4.1-dev libssl-dev libgtk-3-dev \
                 libayatana-appindicator3-dev librsvg2-dev libdbus-1-dev pkg-config
```

**macOS** : Xcode Command Line Tools (`xcode-select --install`).

**Windows** : Visual Studio Build Tools 2022 + WebView2 Runtime (préinstallé sur Windows 11).

---

## Démarrage

```bash
cd apps/desktop
npm install
npm run tauri dev
```

L'app s'ouvre en mode développement avec hot reload du frontend et recompilation automatique du backend Rust.

---

## Build de production

```bash
# Build pour la plateforme courante
npm run tauri build

# Cibles spécifiques
npm run tauri build -- --target x86_64-pc-windows-msvc
npm run tauri build -- --target aarch64-apple-darwin
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

Les artefacts sortent dans `src-tauri/target/release/bundle/` :
- Windows  ›  `.msi`, `.exe` NSIS
- macOS    ›  `.app`, `.dmg`
- Linux    ›  `.deb`, `.AppImage`, `.rpm`

---

## Configuration Bluetooth

Sur Linux, l'utilisateur doit appartenir au groupe `bluetooth` :
```bash
sudo usermod -aG bluetooth $USER
```

Sur macOS, l'app demandera l'autorisation Bluetooth au premier lancement (entrée `NSBluetoothAlwaysUsageDescription` dans `Info.plist`).

Sur Windows 10/11, aucune configuration manuelle requise.

---

## Conventions

- Identifiants techniques en anglais (convention Rust/TS).
- Commentaires et UI en français.
- Caractères typographiques corrects : `›` (U+203A), `…`, espaces insécables avant `: ?`.
- Mode dark par défaut (cohérent avec un PC commande en environnement opérationnel sombre).

---

## Liens utiles

- SDK Meshtastic Rust  ›  https://github.com/meshtastic/rust
- Documentation Tauri 2  ›  https://tauri.app/
- Tokens MAILLON  ›  `apps/common/design-tokens.md`
