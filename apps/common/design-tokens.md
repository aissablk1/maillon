# MAILLON — Design tokens partagés (toutes apps)

> Source de vérité unique pour les couleurs, typographies, espacements et radius des trois codebases (Swift, Kotlin, Tauri TS).
> Toute modification ici doit être répercutée dans : `apps/ios-macos/MaillonTheme.swift`, `apps/android/ui/Theme.kt`, `apps/desktop/src/styles.css`.

---

## Couleurs

| Token | HEX | RGB | Usage |
|---|---|---|---|
| `forest` | `#1F3D2E` | 31, 61, 46 | Fond primaire dark, brand |
| `moss` | `#4A8B6A` | 74, 139, 106 | Accent, succès |
| `sand` | `#F5F0E6` | 245, 240, 230 | Fond clair, texte sur dark |
| `charcoal` | `#1A1F1C` | 26, 31, 28 | Texte principal, fond dark profond |
| `signal` | `#E87D2C` | 232, 125, 44 | Alertes, SOS, CTA primaire |
| `cobalt` | `#2854A8` | 40, 84, 168 | Liens, infos B2B |
| `warning` | `#E8A22C` | 232, 162, 44 | Avertissement |
| `danger` | `#D14444` | 209, 68, 68 | Erreur, critique |

## Typographie

| Token | Famille | Usage |
|---|---|---|
| `font-sans` | Inter | UI, body, titres |
| `font-mono` | JetBrains Mono | Données, code, IDs nœuds |

## Échelle typographique

| Token | iOS pt | Android sp | Desktop px |
|---|---|---|---|
| `text-xs` | 11 | 11 | 12 |
| `text-sm` | 13 | 13 | 14 |
| `text-base` | 15 | 15 | 16 |
| `text-lg` | 17 | 17 | 18 |
| `text-xl` | 20 | 20 | 22 |
| `text-2xl` | 24 | 24 | 28 |
| `text-3xl` | 28 | 28 | 36 |
| `text-display` | 44 | 44 | 56 |

## Espacement (système 4 pt / 4 dp / 4 px)

`space-1` = 4, `space-2` = 8, `space-3` = 12, `space-4` = 16, `space-6` = 24, `space-8` = 32, `space-12` = 48

## Radius

`radius-sm` = 6, `radius-md` = 8, `radius-lg` = 12, `radius-pill` = 999

## États sémantiques (UI)

| État | Couleur fond | Couleur texte |
|---|---|---|
| Online | `moss` | `sand` |
| Hors ligne | `charcoal` 60 % | `sand` 80 % |
| Alerte batterie | `warning` | `charcoal` |
| SOS / Danger | `danger` | `sand` |
| Info | `cobalt` | `sand` |

## Conventions de naming

- **Écrans** : `{Domain}Screen` (Android) / `{Domain}View` (Swift) / `{Domain}Page` (Tauri)
- **Composants** : `Maillon{Component}` (préfixé)
- **Couleurs en code** : `MaillonColors.forest`, `MaillonTheme.colors.forest`, `var(--maillon-forest)`

## Caractères typographiques (rappel global)

- Chevrons français : `›` (U+203A) précédé d'un espace insécable, jamais `>`
- Ellipses : `…` (U+2026), jamais `...`
- Tirets : `—` (em dash) pour les incises
- Apostrophes : `'` (U+2019), pas `'`
- Espaces insécables avant `: ; ! ? %` en français
