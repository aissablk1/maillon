# MAILLON

> **Opérateur d'infrastructure mesh radio souveraine européenne.**
> Thèse en une phrase : on n'est pas un vendeur de kits Meshtastic francophones — on est l'opérateur d'un maillage permanent de stations relais hébergées sur le territoire français, vendant SLA, conformité, label assurantiel et data agrégée. Couche 0 (firmware) reste open-source ; couches 1+ sont opérées et monétisées.

---

## Statut au 25 avril 2026

**Phase exploration.** Aucun euro engagé. Aucun client. Le projet n'existe que comme thèse à valider en 30 jours. Cinq entretiens stratégiques décident s'il vit ou s'il meurt.

---

## Ce qu'il faut lire (et rien d'autre, pour l'instant)

| # | Document | Pourquoi |
|---|---|---|
| 1 | [docs/14-prospection-jour-1.md](docs/14-prospection-jour-1.md) | **Le seul plan d'action.** Cinq entretiens nominatifs, cinq emails outbound prêts, critères go/no-go à 21 jours. |
| 2 | [docs/00-research-tech.md](docs/00-research-tech.md) | Pour briefer un cofondateur ou un investisseur sur la techno. |
| 3 | [docs/01-marche-concurrence.md](docs/01-marche-concurrence.md) | Pour étayer la thèse marché auprès d'un fonds. |

Ces trois documents suffisent à décider. Le reste (`docs/02→13`, `web/`, `scripts/`, `kits/`) est **contexte historique d'exploration**, pas stratégie.

---

## Trois conditions cumulatives pour passer la phase exploration

1. **MOU signé avec TDF ou Cellnex** — hébergement préférentiel pylônes pour 200-500 sites (cible M6)
2. **LOI signée avec MAIF Assos ou équivalent** — partenariat distribution + rev-share (cible M9)
3. **Cofondateur sales recruté** — profil 35-45 ans ex-Sigfox/Hytera/Orange Pro, 10-15 % equity (cible M3)

Avec ces trois signatures, MAILLON est pitchable à Bpifrance + Daphni + Eurazeo simultanément. Sans elles, le dossier reste un dossier. Les 5 entretiens du `docs/14` sont conçus pour produire ces signatures.

---

## Critère de décision à 30 jours

| Signal | Action |
|---|---|
| 2/5 entretiens donnent un verbatim « venez avec un dossier sérieux » | Continuer, recruter cofondateur sales, lever Seed |
| 0/5 entretiens donnent ce verbatim | **Fermer MAILLON.** Conserver `scripts/preconfig.py` pour un autre projet embedded. |
| Envie obsessionnelle absente après 30 jours d'enquête terrain | Fermer MAILLON, peu importe les signaux business |

---

## Ressources techniques préservées (utiles même si MAILLON ferme)

- **`scripts/preconfig.py`** — préconfiguration usine Meshtastic en lot, registre append-only, carte d'identité kit imprimable. Réutilisable pour tout projet embedded.
- **`apps/`** — squelettes compilables des apps natives multi-OS (iOS/iPadOS/macOS Swift Universal, Android Kotlin Compose, Desktop Tauri 2 Windows/Linux/macOS). Chaque codebase utilise le SDK Meshtastic officiel correspondant. À finaliser ~6 mois / 80 k€ avec un dev mobile + un dev desktop. Voir [apps/README.md](apps/README.md).
- **`docs/00-research-tech.md`** — veille mesh longue portée 2026 sourcée. 5-10 jours de travail capitalisés.
- **`docs/09-legal-compliance.md`** — cadre RGPD/CE/ETSI/ARCEP applicable à toute startup hardware FR.

---

## Structure du dépôt

```
MAILLON/
├── README.md                   # Ce fichier — la seule porte d'entrée
├── docs/
│   ├── 14-prospection-jour-1.md  # ★ Plan d'action stratégique
│   ├── 00-research-tech.md       # ★ Veille techno
│   ├── 01-marche-concurrence.md  # ★ Analyse marché
│   ├── 02-12 / 13                # Contexte historique d'exploration
├── scripts/
│   └── preconfig.py            # Asset technique préservé
├── kits/                       # Fiches commerciales (contexte)
├── web/                        # Landing Next.js (contexte)
└── _backup/
```

---

## Avertissement honnête

Le dossier `docs/` contient des projections financières, des pricing, un pitch de marque, une roadmap 12 mois, un BOM. **Tout cela a été produit avant la pivot stratégique du 25/04/2026.** Si MAILLON poursuit sous la nouvelle thèse infrastructure, l'ensemble doit être réécrit. Si MAILLON ferme, ne perdez pas de temps à ouvrir ces fichiers.

La seule route qui crée de la valeur d'ici 30 jours est dans `docs/14-prospection-jour-1.md`.

— Aïssa Belkoussa, 25 avril 2026
