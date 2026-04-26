# MAILLON — Apps natives multi-plateformes

> Trois codebases qui couvrent six plateformes via le SDK Meshtastic officiel correspondant.
> **Squelettes minimaux** au 25 avril 2026 — démontrables, pas finalisés. À compléter dès qu'un cofondateur ou freelance dev mobile rejoint le projet.

---

## Stratégie multi-OS condensée

| Plateforme | Codebase | SDK Meshtastic | BLE | État |
|---|---|---|---|---|
| iOS | `ios-macos/` (Swift) | [Meshtastic-Apple](https://github.com/meshtastic/Meshtastic-Apple) | CoreBluetooth | Squelette |
| iPadOS | `ios-macos/` (Swift, même cible) | idem | CoreBluetooth | Squelette |
| macOS | `ios-macos/` (Mac Catalyst) | idem | CoreBluetooth | Squelette |
| Android | `android/` (Kotlin) | [Meshtastic Android lib](https://github.com/meshtastic/Meshtastic-Android) | Android BLE | Squelette |
| Windows | `desktop/` (Tauri 2) | [meshtastic-rust](https://github.com/meshtastic/rust) | btleplug | Squelette |
| Linux | `desktop/` (Tauri 2) | idem | btleplug | Squelette |

**Pourquoi 3 codebases et pas 5** : Mac Catalyst absorbe iOS+iPadOS+macOS. Tauri couvre Windows+Linux+macOS (le macOS est plan B si Catalyst pose problème).

---

## Tokens de design partagés

Voir `common/design-tokens.md`. Les trois codebases référencent les mêmes valeurs :

- **Vert profond** `#1F3D2E` (couleur primaire / fond dark)
- **Vert mousse** `#4A8B6A` (accent / succès)
- **Sable** `#F5F0E6` (fond clair / texte sur dark)
- **Charbon** `#1A1F1C` (texte / fond)
- **Orange signal** `#E87D2C` (alertes / SOS)
- Police principale **Inter**, monospace **JetBrains Mono**

---

## Ce que chaque squelette doit faire (MVP minimal)

1. Démarrer sur un écran **MAILLON** brandé
2. Détecter et afficher la liste des nœuds Meshtastic via Bluetooth/Serial
3. Connecter à un nœud
4. Afficher la liste des messages reçus
5. Envoyer un message texte sur le canal par défaut

Pas plus en MVP — Meshtastic SDK fait tout le reste, on l'expose juste avec une UX MAILLON.

---

## Roadmap apps (post-MVP, an 1)

| Phase | Quoi | Délai cumul |
|---|---|---|
| 0 | Squelette compilable, écran de connexion, listing nœuds | M3 |
| 1 | Messages texte, position GPS, télémétrie batterie | M5 |
| 2 | Mode SOS bouton rouge persistant, géofences locales | M7 |
| 3 | Sync avec SaaS Fleet Manager (MQTT TLS) | M9 |
| 4 | Mode hors-ligne avancé, replay local, alertes push | M12 |
| 5 | Console PC opérateur (desktop) avec carte + multi-comptes | M12 |

---

## Coût total estimé pour finaliser

| Codebase | Effort restant | Coût (freelance senior) |
|---|---|---|
| Swift Universal | 3 mois 1 dev | 30 k€ |
| Kotlin Android | 2 mois 1 dev | 22 k€ |
| Tauri Desktop | 2 mois 1 dev | 20 k€ |
| Coordination + design + intégration SaaS | 1 mois | 10 k€ |
| **Total** | **~6 mois** | **~82 k€** |

Justifie largement la levée Seed 800 k€-1.2 M€ que la nouvelle thèse infrastructure requiert.

---

## Pourquoi des apps natives, pas Flutter ou React Native

- **BLE est plus stable en natif**, surtout sur iOS où les contraintes Apple sont strictes
- **Bundle size plus petit** (Swift natif ~5 Mo vs RN ~25 Mo)
- **Performance UI** native, fluide même sur vieux Android
- **Le SDK Meshtastic existe en Swift, Kotlin et Rust officiellement** — pas d'effort de wrapping
- **Les concurrents sérieux (Garmin, Apple) sont natifs** — la différence de qualité se voit

Tauri est la seule exception, parce que c'est la stack desktop multi-OS la plus moderne en 2026 (vs Electron qui pèse 200 Mo et consomme 800 Mo de RAM au repos).
