# 07 — Projections financières 36 mois

> P&L mois par mois année 1, agrégé années 2 et 3. Hypothèses transparentes, scénarios bas/médian/haut.

---

## 1. Hypothèses de base

### Démarrage
- **Apport personnel** : 30 000 €
- **Subventions BPI/Région attendues** : 15 000 € (encaissées M4)
- **Pas de levée de fonds an 1**
- **TVA 20 %** (CA HT vs TTC)

### Variables clés (scénario médian)
- Marge brute consolidée an 1 : **48 %**
- CAC moyen pondéré : 90 €
- Churn SaaS Team mensuel : 3 %
- Croissance organique mensuelle : 12 %

---

## 2. P&L détaillé année 1 (en €)

### CA mensuel par stream

| Mois | Kits | SaaS | Services | Total CA HT | Cumul |
|---|---|---|---|---|---|
| M1 | 0 | 0 | 0 | 0 | 0 |
| M2 | 0 | 0 | 0 | 0 | 0 |
| M3 | 5 800 | 0 | 1 000 | 6 800 | 6 800 |
| M4 | 7 500 | 0 | 1 500 | 9 000 | 15 800 |
| M5 | 9 200 | 200 | 2 500 | 11 900 | 27 700 |
| M6 | 10 800 | 450 | 3 500 | 14 750 | 42 450 |
| M7 | 13 500 | 920 | 5 500 | 19 920 | 62 370 |
| M8 | 17 200 | 1 480 | 7 200 | 25 880 | 88 250 |
| M9 | 20 000 | 2 200 | 8 800 | 31 000 | 119 250 |
| M10 | 25 500 | 3 100 | 11 500 | 40 100 | 159 350 |
| M11 | 30 200 | 4 000 | 13 800 | 48 000 | 207 350 |
| M12 | 36 500 | 5 100 | 16 200 | 57 800 | 265 150 |
| **An 1** | **176 200** | **17 450** | **71 500** | **265 150** | |

> Note : MRR de fin d'année = ~7 800 €/mois, soit ARR ~93 600 €. Le CA SaaS de l'année (17 450 €) est faible parce que le SaaS ne démarre vraiment qu'au M5. Année 2 le SaaS pèse beaucoup plus.

### Charges mensuelles

| Poste | M1 | M3 | M6 | M9 | M12 | Total an 1 |
|---|---|---|---|---|---|---|
| COGS hardware | 0 | 3 500 | 6 500 | 12 000 | 22 000 | 105 000 |
| Infra cloud SaaS | 0 | 0 | 200 | 320 | 400 | 4 000 |
| Salaire fondateur | 1 500 | 1 500 | 2 000 | 2 500 | 3 000 | 28 000 |
| Freelance dev (~0.5 ETP) | 2 000 | 3 000 | 3 500 | 4 000 | 4 000 | 40 000 |
| Marketing & ads | 1 000 | 2 000 | 3 500 | 4 000 | 4 500 | 35 000 |
| Plateformes (Stripe, hébergeur, outils) | 200 | 300 | 500 | 700 | 800 | 8 000 |
| Légal / compta / RGPD | 1 500 | 800 | 1 200 | 1 000 | 800 | 12 000 |
| Logistique / frais expédition | 0 | 800 | 1 500 | 2 000 | 2 500 | 18 000 |
| Bureau / matériel | 800 | 400 | 500 | 500 | 500 | 6 000 |
| Salons / déplacements | 0 | 500 | 3 500 | 1 000 | 500 | 10 000 |
| Conformité CE / R&D | 1 000 | 800 | 700 | 700 | 800 | 8 000 |
| Réserve / divers | 800 | 800 | 800 | 1 200 | 1 500 | 12 000 |
| **Total charges** | 8 800 | 14 400 | 24 400 | 29 920 | 40 800 | **286 000** |

### Résultat mensuel et cumul de trésorerie

| Mois | CA HT | Charges | EBITDA | Trésorerie cumulée |
|---|---|---|---|---|
| M0 (apport) | 0 | 0 | – | +30 000 |
| M1 | 0 | 8 800 | -8 800 | +21 200 |
| M2 | 0 | 10 200 | -10 200 | +11 000 |
| M3 | 6 800 | 14 400 | -7 600 | +3 400 |
| M4 (subvention 15 000) | 9 000 | 16 500 | -7 500 + 15 000 = +7 500 | +10 900 |
| M5 | 11 900 | 19 800 | -7 900 | +3 000 |
| M6 | 14 750 | 24 400 | -9 650 | -6 650 |
| M7 | 19 920 | 26 200 | -6 280 | -12 930 |
| M8 | 25 880 | 27 400 | -1 520 | -14 450 |
| M9 | 31 000 | 29 920 | +1 080 | -13 370 |
| M10 | 40 100 | 33 200 | +6 900 | -6 470 |
| M11 | 48 000 | 36 700 | +11 300 | +4 830 |
| M12 | 57 800 | 40 800 | +17 000 | +21 830 |
| **An 1** | **265 150** | **286 000** | **-20 850** | (sortie cycle) |

> **Trésorerie minimale atteinte : -14 450 € au M8.** Deux options de sécurisation :
> 1. Ligne BPI court-terme 20 000 € souscrite en M5, remboursée fin année 2
> 2. Apport complémentaire 15 000 € en M5 (si fondateur a la capacité)
> 3. Affacturage clients B2B (factor) sur les bons de commande FFSS qui paient à 60 jours

> **EBITDA 12 mois** : -20 850 € (~7 % du CA). Pertinent pour une année de lancement avec investissements R&D et marketing en avance de phase.

---

## 3. Année 2 (projection médiane)

### Hypothèses
- Croissance kits : +200 % (volume + amélioration mix Pro/Secours)
- ARR SaaS de fin année 2 : 360 000 € (multiplication x4 vs fin an 1)
- Embauche 1 commercial B2B + 1 dev fullstack en M14
- Ouverture Belgique/Suisse en M16

### Synthèse an 2

| Indicateur | An 2 |
|---|---|
| CA HT | 1 200 000 € |
| – Kits | 540 000 € (45 %) |
| – SaaS | 360 000 € (30 %) |
| – Services | 280 000 € (24 %) |
| – Marque blanche | 20 000 € (1 %) |
| Charges totales | 980 000 € |
| EBITDA | +220 000 € (18 %) |
| Effectif | 3 ETP + 1 freelance |
| ARR fin an 2 | 360 000 € |

---

## 4. Année 3 (projection médiane)

| Indicateur | An 3 |
|---|---|
| CA HT | 3 000 000 € |
| – Kits | 1 200 000 € (40 %) |
| – SaaS | 1 100 000 € (37 %) |
| – Services | 600 000 € (20 %) |
| – Autre | 100 000 € (3 %) |
| Charges totales | 2 200 000 € |
| EBITDA | +800 000 € (27 %) |
| Effectif | 8 ETP |
| ARR fin an 3 | 1 200 000 € |

---

## 5. Trois scénarios

### Scénario bas (-30 % volumes)
- An 1 CA : 185 000 €
- An 2 CA : 800 000 €
- An 3 CA : 2 000 000 €
- EBITDA an 2 : +60 000 €
- **Décision** : ralentir embauches, garder bootstrap, focus marges

### Scénario médian (référence)
- An 1 CA : 265 000 €
- An 2 CA : 1 200 000 €
- An 3 CA : 3 000 000 €
- EBITDA an 2 : +220 000 €
- **Décision** : exécution conforme

### Scénario haut (+50 % volumes)
- An 1 CA : 400 000 €
- An 2 CA : 1 800 000 €
- An 3 CA : 4 800 000 €
- EBITDA an 2 : +400 000 €
- **Décision** : levée Seed 800 k€ pour saturer le marché EU avant copycats

---

## 6. Levée de fonds (si décidée)

### Seed (an 2, optionnelle)
- Montant : **400–500 k€**
- Usage : 60 % marketing/sales, 25 % produit/SaaS, 15 % stock
- Valorisation post-money cible : **2.5–3 M€**
- Cibles investisseurs :
  - Bpifrance (French Tech Seed)
  - Fonds deeptech français : Daphni, Elaia, Newfund, Kima
  - Fonds climat-résilience : 360 Capital, Emertec, Climatech VC
  - Business angels : opérateurs Meshtastic, ex-télécoms, secteur secours

### Series A (an 3+ si traction confirme)
- Montant : 2–4 M€
- Usage : expansion EU, embauches scale, ouverture verticales nouvelles
- Valorisation cible : 8–15 M€

---

## 7. Indicateurs de pilotage mensuels

À suivre tous les mois sur un dashboard dédié :

**Acquisition**
- CA HT mensuel par stream
- Nouveaux clients par segment (B2C / B2B Pro / B2B Secours / B2B Business)
- CAC moyen par canal
- Trafic site, taux conversion par étape funnel

**Rétention**
- MRR / ARR
- Net revenue retention SaaS
- Churn mensuel SaaS
- Repeat rate kits (clients qui rachètent)

**Opérations**
- Stock hardware (semaines de couverture)
- Délai moyen livraison
- NPS livraison + 7 jours
- Taux retour / RMA

**Finance**
- Trésorerie disponible
- Burn rate
- Runway (mois)
- Marge brute consolidée

---

## 8. Break-even & rentabilité

- **Break-even mensuel EBITDA** : atteint en **M9** (scénario médian)
- **Break-even cumulé** : atteint en **M14–M15**
- **Marge nette an 2** : ~15 % (après IS et provisions)
- **ROI fondateur** sur apport 30 k€ : récupéré en distribution en an 3 ou via valorisation entreprise

---

## 9. Risques financiers spécifiques

| Risque | Mitigation |
|---|---|
| Retard CA Q1 (lancement long) | Subvention M4 + ligne BPI 20 k€ en backup |
| Hausse coûts hardware (Chine, douane) | Contractualisation prix annuels, stock buffer |
| Impayés B2B | Acompte 30 % sur kits Secours/sur-mesure, factor sur clients institutionnels |
| Surcoût SaaS (scaling infra) | Surveillance hebdo coût/nœud, optimisation MQTT/DB précoce |
| TVA intra-communautaire complexe (export an 2) | Comptable spécialisé EU, autoliquidation maîtrisée |

---

**Conclusion financière** : projet bootstrap-faisable avec 30 k€ apport + 15 k€ subventions + ligne BPI 20 k€ en filet. EBITDA positif au M9, cumul positif M11. An 2 et 3 confortables. Levée Seed an 2 optionnelle pour accélérer si exécution validée.
