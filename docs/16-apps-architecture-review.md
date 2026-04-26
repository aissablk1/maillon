# 16 — Revue d'architecture cross-platform des 3 apps

> Audit de cohérence entre `apps/ios-macos/`, `apps/android/`, `apps/desktop/` au 25 avril 2026.
> Périmètre : alignement des squelettes livrés par 3 agents séparés. Référence intentionnelle : `apps/common/design-tokens.md` et `apps/README.md`.

---

## 1. Synthèse

**Verdict : cohérent à 70 %, fragmenté à 30 %.** Les trois squelettes partagent la même intention (3 écrans MVP, mêmes tokens couleurs, mêmes SDK officiels Meshtastic, même branding `MAILLON`) et compileront chacun de leur côté. Mais ils divergent sur des points qui rétrofitteront mal s'ils ne sont pas figés maintenant : modèle `Node` incompatible entre les 3 plateformes, états de connexion BLE non isomorphes, type du canal Meshtastic qui change (String vs u32 vs absent), zéro système i18n alors que tout le texte est figé en dur en français, et aucun hook préparé pour le futur backend SaaS.

**Top 3 problèmes** :

1. Modèle de données `Node` divergent entre les 3 codebases (champs, types, naming) — bloquant pour la sync MQTT cross-platform en phase 3.
2. États de connexion BLE incohérents (8 cas iOS, 3 cas Android, 0 modélisé Tauri) — l'UX de gestion des erreurs sera incohérente.
3. Type du `channel` Meshtastic divergent : `String "MAILLON-PUBLIC"` (iOS) vs `u32` (Tauri) vs absent (Android). Le SDK Meshtastic utilise un index numérique (0-7), iOS s'en éloigne.

---

## 2. Tableau comparatif

| Critère | iOS / macOS (Swift) | Android (Kotlin) | Desktop (Tauri) |
|---|---|---|---|
| **Tokens couleurs** | 8/8 conformes (`MaillonTheme.swift:12-21`) | 8/8 conformes (`MaillonTheme.kt:31-38`) | 8/8 conformes (`styles.css:11-18`) |
| **Tokens typo (Inter)** | Fallback `system rounded` (`MaillonTheme.swift:34-46`) | Fallback `FontFamily.Default` (`MaillonTheme.kt:83`) | CSS `Inter` chargé via Google Fonts (`index.html:14-17`) |
| **Échelle texte** | 8 tailles (`MaillonTheme.swift:35-42`) | 9 styles Material (`MaillonTheme.kt:85-95`) | 8 tokens CSS (`styles.css:29-36`) |
| **Spacing** | `xs/sm/md/lg/xl/xxl/xxxl` (`MaillonTheme.swift:51-58`) | inline `dp` hardcodés (24, 32, 16…) | inline Tailwind classes (`px-8`, `py-6`…) |
| **Radius** | 4 valeurs (`MaillonTheme.swift:64-67`) | inline `RoundedCornerShape(12.dp)` | 4 tokens CSS (`styles.css:39-42`) |
| **Modèle Node** | `MaillonNode` 8 champs (`MaillonBluetoothManager.swift:40-49`) | `MeshNode` 3 champs (`DeviceListScreen.kt:75-79`) | `MeshNode` 7 champs (`main.rs:28-36`) |
| **Modèle Message** | `MaillonMessage` 7 champs (`MaillonBluetoothManager.swift:52-60`) | `MeshMessage` 3 champs (`DeviceListScreen.kt:81-85`) | non modélisé |
| **États connexion BLE** | 8 cas enum (`MaillonBluetoothManager.swift:11-19`) | 3 cas enum (`HomeScreen.kt:47-49`) | 0 enum, juste `NotConnected` error (`main.rs:41`) |
| **SDK Meshtastic déclaré** | `Meshtastic-Apple` branch `main` (`Package.swift:23`) | dépendance commentée (`app/build.gradle.kts:97`) | `meshtastic = "0.1"` (`Cargo.toml:32`) |
| **SDK réellement utilisé** | non, fallback `CBCentralManager` direct | non, fallback `BluetoothLeScanner` direct | non, `TODO` partout (`main.rs:82,90,131`) |
| **i18n préparée** | non — strings inline | non — pas de `res/values/strings.xml` | non — strings inline JSX |
| **Permissions BLE déclarées** | `Info.plist:39-54` complet | `AndroidManifest.xml:11-25` complet | implicite (btleplug + macOS dit géré par OS) |
| **Demande runtime** | déléguée à CoreBluetooth | `rememberLauncherForActivityResult` (`DeviceListScreen.kt:188-199`) | aucune (Tauri sans plugin BLE déclaré) |
| **Hooks SaaS (auth/REST/MQTT)** | aucun, juste mention `bluetooth-central` dans Info.plist | `INTERNET` + commentaire (`AndroidManifest.xml:27-29`) | aucun |
| **CSP** | `NSAllowsArbitraryLoads=false` (`Info.plist:58-61`) | non applicable | strict (`tauri.conf.json:31`, `index.html:9-11`) |
| **Persistance locale** | mentionnée (SwiftData en roadmap) | mentionnée (Room en roadmap) | aucune mention |
| **Navigation** | `TabView` / `NavigationSplitView` adaptative (`MaillonApp.swift:42-75`) | `sealed interface Route` 2 états (`MainActivity.kt:36-52`) | sidebar `useState<NavKey>` 4 sections (`App.tsx:36`) |
| **Nombre d'écrans MVP livrés** | 3 (Home, Devices, Messages) | 2 (Home + DeviceList qui héberge Messages) | 1 (Dashboard) + 3 placeholders |

---

## 3. Findings par sévérité

### Critique (casse la livraison cross-platform)

**C1 — Modèle `Node` incompatible entre les 3 codebases.**
- iOS : `MaillonNode { id: UUID, nodeId: String, displayName, shortName, rssi: Int?, batteryLevel: Int?, isOnline, lastHeard }` (`apps/ios-macos/Sources/MaillonApp/Bluetooth/MaillonBluetoothManager.swift:40-49`)
- Android : `MeshNode { address: String, name: String, rssi: Int }` (`apps/android/app/src/main/java/fr/maillon/app/ui/screens/DeviceListScreen.kt:75-79`)
- Tauri : `MeshNode { id, longName, shortName, batteryLevel, snr, lastSeen, isOnline }` (`apps/desktop/src-tauri/src/main.rs:28-36`)
  Conséquence : la couche de sync MQTT (phase 3, M9) devra mapper 3 schémas différents vers un schéma backend canonique. Aucun champ commun n'est obligatoire dans les 3.

**C2 — Type du `channel` Meshtastic divergent.**
- iOS : `String` avec valeur `"MAILLON-PUBLIC"` (`MaillonBluetoothManager.swift:54,73`).
- Tauri : `u32` (`main.rs:121`), conforme au protocole Meshtastic (index 0-7).
- Android : non modélisé.
  Conséquence : iOS utilise un nom de canal arbitraire qui n'existe pas dans le protocole Meshtastic (les canaux sont des slots indexés 0-7 avec un PSK et un nom configurable côté firmware). À corriger côté iOS : utiliser un index `UInt8` ou `UInt32` avec un alias `displayName` séparé.

### Important (sera douloureux à rétrofit)

**I1 — États de connexion BLE non isomorphes.**
- iOS : 8 cas (`idle, scanning, connecting, connected, disconnected, unauthorized, poweredOff, error`) — `MaillonBluetoothManager.swift:11-19`.
- Android : 3 cas (`Disconnected, Scanning, Connected`) — `HomeScreen.kt:47-49`.
- Tauri : aucun enum d'état, seulement une erreur `NotConnected` — `main.rs:41`.
  L'utilisateur Android ne saura jamais que son Bluetooth est désactivé ou l'autorisation refusée. À aligner sur les 8 cas iOS comme contrat partagé.

**I2 — Aucun système i18n initialisé alors que toute la copy est en dur en français.**
- Pas de `Localizable.strings` côté iOS (mention seulement dans `Package.swift:8` `defaultLocalization: "fr"`).
- Pas de `app/src/main/res/values/strings.xml` côté Android (le dossier `res/` n'existe pas).
- Pas de système type `i18next` côté Tauri, strings inline JSX.
  Le `README.md` iOS mentionne « Localisation EN/ES en plus du FR » en roadmap, mais sans squelette préparatoire la migration sera coûteuse (50-80 strings à extraire dans chaque codebase).

**I3 — Hooks SaaS Fleet Manager absents partout.**
- Pas de couche `AuthService`, `ApiClient`, `MqttClient` dans aucune des 3 codebases.
- Seul `INTERNET` est déclaré côté Android (`AndroidManifest.xml:28`) avec un commentaire « future sync ».
- Le CSP Tauri (`tauri.conf.json:31`) bloque `connect-src` au-delà de `'self'` + IPC : il faudra l'élargir au moment de brancher MQTT/HTTPS vers le backend.
  La phase 3 (M9, sync MQTT TLS) demandera de réinventer ces couches dans 3 langages — autant figer maintenant un contrat OpenAPI + topics MQTT et générer les types côté Rust/Swift/Kotlin.

**I4 — Couverture MVP livrée inégale.**
- iOS livre les 3 écrans (Home, DeviceList, Messages).
- Android livre 2 écrans, fusionne Messages dans DeviceList (`DeviceListScreen.kt:230-449`) — l'utilisateur navigue par état, pas par route.
- Tauri ne livre qu'un Dashboard ; Nœuds, Messages, Réglages sont des `Placeholder` (`App.tsx:312-327`).
  L'UX promise par `apps/README.md` (« 5 étapes MVP minimal ») n'est tenue qu'à 100 % par iOS, ~70 % Android, ~30 % Tauri.

**I5 — Nommage des écrans non strictement conforme à `design-tokens.md:60-63`.**
- Convention : `{Domain}Screen` Android, `{Domain}View` Swift, `{Domain}Page` Tauri.
- Réalité Tauri : pas de `Page`, juste des composants inline `Dashboard`, `Sidebar`, `Topbar`, `Placeholder` dans `App.tsx`. À renommer ou à acter dans la convention.

### Mineur (nettoyage tranquille)

**m1 — Spacing non tokenisé en Android et Tauri.**
Android utilise `24.dp`, `32.dp`, `16.dp` en dur partout (`HomeScreen.kt:109`, `DeviceListScreen.kt:258`). Tauri utilise les classes Tailwind par défaut (`px-8`, `py-6`) sans mapping explicite vers `space-1`/`space-2`. Seul iOS définit `MaillonTheme.Spacing` (`MaillonTheme.swift:51-58`).

**m2 — Radius non tokenisés en Android.** `RoundedCornerShape(12.dp)` répété 7 fois dans `DeviceListScreen.kt`. À extraire dans `MaillonTheme.kt`.

**m3 — Inter non chargée sur iOS et Android.** Les deux utilisent un fallback système. Tauri charge Inter via Google Fonts (`index.html:14-17`). Pour cohérence visuelle, il faut bundler Inter `.ttf` côté iOS (Resources) et utiliser `androidx.compose.ui:ui-text-google-fonts` côté Android.

**m4 — Typo : `grayseale` au lieu de `grayscale`** dans `apps/desktop/src/styles.css:68`. Coquille bénigne.

**m5 — Chevron typographique correct partout.** `›` (U+203A) trouvé dans iOS (`HomeView.swift:109`, `DeviceListView.swift:114`), Android (`HomeScreen.kt:142`, `DeviceListScreen.kt:351`), Tauri (`App.tsx:24,174`). Bon point.

**m6 — Versions SDK Meshtastic non figées.** iOS pointe `branch: "main"` (non reproductible), Android est commenté, Tauri figé sur `0.1` (très ancien — la lib publique est en évolution rapide). À aligner sur des tags semver précis.

**m7 — `meshtasticServiceUUID` codé en dur dans iOS uniquement** (`MaillonBluetoothManager.swift:84`). Android et Tauri filtrent sans UUID Meshtastic — à uniformiser pour éviter de scanner tous les périphériques BLE alentours.

**m8 — Permissions BLE Tauri non explicites.** `tauri.conf.json` ne déclare pas de plugin BLE, et `btleplug` reposera sur les permissions OS. Sur macOS l'app aura besoin d'`NSBluetoothAlwaysUsageDescription` dans le `Info.plist` Tauri (non présent à ce jour).

**m9 — Identifiants de bundle cohérents** : `fr.maillon.app` (iOS, Android) et `fr.maillon.console` (Tauri). Cohérence acceptable, séparation desktop justifiée.

---

## 4. Recommandations prioritaires

| # | Action | Impact | Effort |
|---|---|---|---|
| R1 | Créer `apps/common/contracts/` avec un schéma JSON Schema ou Protobuf canonique pour `Node`, `Message`, `Channel`, `ConnectionState`. Générer les types Swift, Kotlin, Rust/TS depuis ce schéma. | Critique | 2-3 j |
| R2 | Aligner les 3 codebases sur un enum `ConnectionState` à 8 cas calqué sur l'iOS. Ajouter `Disconnected/Scanning/Connecting/Connected/Unauthorized/PoweredOff/Error/Idle` côté Android et Tauri. | Important | 1 j |
| R3 | Corriger le type du `channel` côté iOS : passer en `UInt32` avec un `displayName` séparé. Conformer au protocole Meshtastic. | Critique | 0.5 j |
| R4 | Initialiser un système i18n vide mais en place dans chaque codebase : `Localizable.strings` (iOS), `res/values/strings.xml` + `values-en/` (Android), `src/i18n/{fr,en}.json` (Tauri) — extraire les strings utilisées. | Important | 2 j |
| R5 | Créer 3 stubs de service `FleetManagerClient` dans chaque codebase (auth bearer + 1 endpoint REST `GET /me` + 1 abonnement MQTT à un topic placeholder), même non câblés. Évite la dette d'infrastructure phase 3. | Important | 1.5 j |
| R6 | Tokeniser spacing et radius côté Android (`MaillonTheme.Spacing` + `MaillonTheme.Radius`) et créer un mapping Tailwind → tokens MAILLON côté Tauri (`@theme { --spacing-1: 4px; ... }`). | Mineur | 0.5 j |
| R7 | Bundler la police Inter dans iOS (`Sources/MaillonApp/Resources/Inter-*.ttf`) et l'utiliser via `Font.custom("Inter", size:)`. Idem Android via `ui-text-google-fonts`. | Mineur | 0.5 j |
| R8 | Compléter Tauri : implémenter les 3 placeholders Nœuds/Messages/Réglages au niveau MVP minimal (pas de logique métier mais l'écran existe). | Important | 1 j |
| R9 | Figer les versions SDK Meshtastic : iOS sur un tag `2.x.x`, Tauri en migrant vers une version plus récente que `0.1` ou en attendant la stabilisation et en documentant le choix. Clarifier Android (sous-module Git ou JitPack). | Mineur | 0.5 j |
| R10 | Ajouter `NSBluetoothAlwaysUsageDescription` au bundle Tauri macOS, vérifier les permissions Linux/Windows. | Mineur | 0.5 j |

**Total effort recommandé** : 9-10 j de senior pour aligner les 3 squelettes avant la phase de finalisation.

---

## 5. Plan de convergence — contrat partagé à figer

À créer dans `apps/common/` avant que les 3 freelances ne reprennent le code :

```
apps/common/
├── design-tokens.md         (existant, à compléter avec spacing canonique)
├── contracts/
│   ├── node.schema.json     Source de vérité du modèle Node
│   ├── message.schema.json  idem Message
│   ├── connection-state.md  Énumération canonique des 8 états BLE
│   └── channel.md           Conventions canal Meshtastic (index u32 + displayName)
├── api/
│   ├── openapi.yaml         API Fleet Manager v1 (auth, devices, telemetry)
│   └── mqtt-topics.md       Topics MQTT canoniques (maillon/{tenant}/{node}/...)
└── i18n/
    └── keys.md              Liste plate des clés de traduction utilisées par tous
```

**Règles de gouvernance** :

1. Toute modification d'un contrat (`contracts/*` ou `api/*`) déclenche une revue cross-platform obligatoire.
2. Les types générés depuis ces contrats ne sont jamais modifiés à la main dans les codebases.
3. Le `design-tokens.md` reste la source de vérité visuelle ; toute valeur ajoutée doit être répercutée dans les 3 thèmes le même jour.
4. La version du SDK Meshtastic est figée par codebase et tracée dans `apps/README.md` — toute upgrade est synchronisée entre les 3.

---

## 6. Conclusion

Les trois squelettes sont **compatibles dans l'esprit, divergents dans la lettre**. Le risque n'est pas immédiat (chaque codebase compile et démontre son cas d'usage), mais il croît exponentiellement à chaque mois où les 3 équipes itèrent indépendamment sans contrat partagé. Le coût de R1+R2+R3+R4+R5 (≈ 7 jours homme) avant que les freelances seniors ne s'y mettent évitera plusieurs semaines de rétrofit en phase 3 (sync MQTT, M9).

Le périmètre actuel est cohérent avec la promesse de `apps/README.md:42-44` : « squelettes minimaux démontrables, pas finalisés ». La revue n'est pas alarmiste, elle prépare l'industrialisation.
