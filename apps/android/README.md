# MAILLON — App Android (Kotlin / Jetpack Compose)

> Squelette d'application Android pour MAILLON, opérateur d'infrastructure mesh radio souveraine.
> Permet à un utilisateur de connecter son nœud Meshtastic via Bluetooth Low Energy, voir les autres nœuds du mesh et envoyer des messages texte.

---

## Stack

- **Kotlin** 1.9.22+
- **Jetpack Compose** (Compose BOM 2024.02.00+) — pas de XML layouts
- **Material 3** (override par `MaillonTheme`)
- **MVVM + StateFlow** — architecture simple, testable, pas de Hilt pour rester lisible (à introduire quand le module `data` grossira)
- **Coroutines** pour l'asynchrone BLE
- **SDK officiel Meshtastic Android** — `com.geeksville.mesh:meshtastic-android` (lib officielle, voir `app/build.gradle.kts`)

### Pourquoi MVVM et pas MVI ?

MVVM avec `StateFlow` couvre 100 % des besoins du MVP (deux écrans, peu d'événements concurrents) avec moins de cérémonie qu'un MVI complet. On migrera vers MVI dès qu'on introduira un état partagé complexe (multi-nœuds, géofences, replay).

---

## Prérequis

- **Android Studio Hedgehog (2023.1.1)** ou plus récent — Iguana/Jellyfish recommandés
- **JDK 17+** (Android Gradle Plugin 8.2 le requiert)
- **Android SDK 34** (compileSdk / targetSdk)
- **Android 8.0 (API 26)** minimum côté device — contrainte du SDK Meshtastic Android
- Un téléphone physique avec **Bluetooth 5.0+** pour tester (l'émulateur Android ne supporte pas BLE de manière fiable)
- Un nœud Meshtastic flashé avec firmware ≥ 2.3 (Heltec V3, T-Beam, RAK4631…)

---

## Ouvrir le projet

```bash
cd apps/android
# Depuis Android Studio : File › Open › sélectionner le dossier apps/android
# Le wrapper Gradle s'occupe du reste
./gradlew assembleDebug
```

Pour installer sur un device branché&nbsp;:

```bash
./gradlew installDebug
```

---

## Permissions runtime requises

L'app demande à l'utilisateur les permissions suivantes au premier lancement (manifest&nbsp;: `AndroidManifest.xml`)&nbsp;:

| Permission | API min | Pourquoi |
|---|---|---|
| `BLUETOOTH_SCAN` | 31 (Android 12) | Scanner les périphériques BLE Meshtastic à proximité |
| `BLUETOOTH_CONNECT` | 31 | Se connecter au nœud Meshtastic sélectionné |
| `ACCESS_FINE_LOCATION` | 26+ | Requis par Android pour scanner BLE avant Android 12 ; aussi pour la position du nœud |
| `BLUETOOTH` / `BLUETOOTH_ADMIN` | ≤ 30 | Compatibilité descendante Android 8 → 11 |
| `INTERNET` | toutes | Sync future avec le SaaS Fleet Manager (MQTT TLS) |

La gestion des permissions runtime utilise `androidx.activity.compose.rememberLauncherForActivityResult` directement dans `HomeScreen.kt` — pas de lib externe pour ce squelette.

---

## Architecture des fichiers

```
apps/android/
├── settings.gradle.kts          # Config racine Gradle (rootProject.name)
├── build.gradle.kts             # Versions plugins
├── README.md                    # ce fichier
└── app/
    ├── build.gradle.kts         # Module app (deps Compose + Meshtastic SDK)
    └── src/main/
        ├── AndroidManifest.xml  # Permissions BLE + activity
        └── java/fr/maillon/app/
            ├── MaillonApplication.kt
            ├── MainActivity.kt
            └── ui/
                ├── theme/MaillonTheme.kt
                └── screens/
                    ├── HomeScreen.kt
                    └── DeviceListScreen.kt
```

---

## Brancher le SDK Meshtastic Android

Deux options&nbsp;:

1. **Dépendance Maven** (recommandé une fois publiée sur Maven Central)
   ```kotlin
   implementation("com.geeksville.mesh:meshtastic-android:2.3.+")
   ```
2. **Sous-module Git** (à utiliser tant que la version est en cours d'évolution rapide)
   ```bash
   git submodule add https://github.com/meshtastic/Meshtastic-Android libs/meshtastic-android
   ```
   puis dans `settings.gradle.kts`&nbsp;:
   ```kotlin
   includeBuild("libs/meshtastic-android")
   ```

Pour ce squelette, on déclare la dépendance Maven en commentaire dans `app/build.gradle.kts`. Le freelance qui finalise active l'option qui correspond à l'état du SDK officiel.

Référence officielle&nbsp;: <https://github.com/meshtastic/Meshtastic-Android>

---

## Étapes pour finaliser le MVP

1. Activer la dépendance Meshtastic SDK (option 1 ou 2 ci-dessus)
2. Implémenter `MeshtasticRepository` (binding au service Meshtastic, scan BLE, connexion)
3. Câbler `DeviceListScreen` au vrai scanner BLE — actuellement state in-memory vide
4. Implémenter l'écran "Messages" (lecture du canal par défaut + envoi)
5. Ajouter Compose Navigation pour gérer plus de 2 écrans
6. Ajouter Room pour la persistance locale des messages
7. Configurer ProGuard / R8 pour la release

---

## Roadmap (cf. `apps/README.md`)

- **Phase 0 (M3)** — Ce squelette + connexion BLE réelle
- **Phase 1 (M5)** — Messages texte, position GPS, télémétrie batterie
- **Phase 2 (M7)** — Mode SOS, géofences locales
- **Phase 3 (M9)** — Sync MQTT TLS avec le SaaS Fleet Manager

---

## Branding

Couleurs et typographie référencent `apps/common/design-tokens.md` (source de vérité). Toute modification doit être répercutée dans les trois codebases (Swift, Kotlin, Tauri).
