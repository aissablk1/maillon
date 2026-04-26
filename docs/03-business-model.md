# 03 — Business model

> Comment MAILLON gagne de l'argent, à quel coût, avec quels mix de revenus, et quelles unit economics.

---

## 1. Vue d'ensemble — trois revenue streams

```
                  ┌──────────────────────────────┐
                  │          MAILLON             │
                  └──────────┬───────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │   KITS   │         │   SaaS   │         │ SERVICES │
   │ matériel │         │  Fleet   │         │ install/ │
   │préconfig.│         │ Manager  │         │formation │
   └──────────┘         └──────────┘         └──────────┘
   marge brute          marge brute          marge brute
   ~40%                 ~80%                 ~70%
   one-shot             récurrente           one-shot
   acquisition          rétention            upsell B2B
```

---

## 2. Stream 1 — Kits matériels préconfigurés

### 2.1 Catalogue (an 1)

| Kit | Cible | Contenu | Prix TTC | COGS | Marge brute |
|---|---|---|---|---|---|
| **Découverte** | Famille, randonneur | 2× T-Echo + app + notice FR + chargeur | 99 € | 60 € | 39 € (39 %) |
| **Pro** | BTP, événementiel | 4× T-Beam Supreme + 1× Station G2 + antennes + boîtiers + app | 299 € | 175 € | 124 € (41 %) |
| **Secours** | FFSS, ADRASEC, Croix-Rouge | 6× RAK4631 IP67 + 2× Station G2 + T-Deck Plus + 6 mois SaaS Team | 499 € | 290 € | 209 € (42 %) |
| **Sur-mesure** | Grandes flottes | Devis | min 1 500 € | variable | 35–45 % |

(BOM détaillé dans `docs/11-bom-kits.md`.)

### 2.2 Hypothèses volume an 1

| Trimestre | Kits Découverte | Kits Pro | Kits Secours | Sur-mesure | CA HT estimé |
|---|---|---|---|---|---|
| Q1 (lancement) | 30 | 10 | 5 | 0 | 6 800 € |
| Q2 | 80 | 40 | 15 | 1 | 27 200 € |
| Q3 | 150 | 80 | 30 | 2 | 53 700 € |
| Q4 | 250 | 150 | 60 | 4 | 95 600 € |
| **Total an 1** | **510** | **280** | **110** | **7** | **183 300 €** |

(CA exprimé HT, France TVA 20 %.)

### 2.3 Levers d'optimisation marge

- **Volume → remise fournisseur** : à partir de 200 unités/mois, négociation directe LILYGO/RAK (-15 %)
- **Réduction emballage** : kit éco-conçu, gain ~5 €/kit
- **Préconfiguration en lot** : process de flashing automatisé, gain ~10 min/unité de main-d'œuvre

---

## 3. Stream 2 — SaaS Fleet Manager

### 3.1 Plans tarifaires

| Plan | Cible | Limite nœuds | Prix/mois | Inclus |
|---|---|---|---|---|
| **Free** | Communauté, particuliers | 5 | 0 € | Carto, messages, 7j historique |
| **Team** | Pros, asso, PME | 50 | 9 €/nœud | Carto, alertes, 90j historique, MQTT privé, 2 admins |
| **Business** | Grandes flottes, multi-sites | 200 | 6 €/nœud | + SSO, API, 1 an historique, 5 admins, support prioritaire |
| **Enterprise** | Sécurité civile, grands comptes | illimité | sur devis | + on-premise, audit RGPD, SLA 99.9 %, formation incluse |

### 3.2 Hypothèses volume an 1

| Trimestre | Comptes Free | Comptes Team payants | Comptes Business | MRR estimé |
|---|---|---|---|---|
| Q1 | 50 | 0 | 0 | 0 € |
| Q2 | 200 | 5 (~50 nœuds) | 0 | 450 € |
| Q3 | 500 | 20 (~250 nœuds) | 1 (~80 nœuds) | 2 730 € |
| Q4 | 1 000 | 50 (~700 nœuds) | 3 (~250 nœuds) | 7 800 € |

**ARR fin année 1** : ~93 600 € (CA récurrent annualisé).

### 3.3 Coûts d'infrastructure

- Hébergement Scaleway/OVH : ~150 €/mois pour 1 000 nœuds actifs
- MQTT broker dédié (HiveMQ ou EMQX self-hosted) : ~80 €/mois
- Base de données PostgreSQL + TimescaleDB pour télémétrie : ~50 €/mois
- CDN, monitoring : ~50 €/mois
- **Total infra fin an 1** : ~330 €/mois pour 1 000 nœuds → **marge brute ~95 %** sur le SaaS

### 3.4 Métriques cibles

- **Conversion Free → Team** : 5 % en année 1, viser 10 % en année 2
- **Churn Team mensuel** : < 3 %
- **Net revenue retention** : > 105 % (upsell vers Business + ajout nœuds)
- **CAC payant via SEO + content** : 80–150 €/compte payant
- **LTV Team estimé** : 24 mois × 30 € moyen = 720 €
- **LTV/CAC** : ~5 ✓

---

## 4. Stream 3 — Services à valeur ajoutée

### 4.1 Catalogue services

| Service | Prix | Coût delivery | Marge | Cible |
|---|---|---|---|---|
| **Installation chantier/site** | 800 €/jour TTC | 250 € | 550 € (69 %) | BTP, exploitations |
| **Audit couverture radio** (forfait) | 1 500 € | 500 € | 1 000 € (67 %) | BTP, secours, événementiel |
| **Formation 1 jour (1–8 pers)** | 600 €/jour TTC | 150 € | 450 € (75 %) | Asso, PME |
| **Formation certifiante 3 jours** | 1 800 € | 500 € | 1 300 € (72 %) | Coordinateurs secours, formateurs |
| **Configuration sur-mesure (forfait)** | 400 € | 80 € | 320 € (80 %) | Tous |
| **Support premium SLA 4h ouvré** | +50 €/nœud/an | 10 €/nœud | 80 % | B2B critique |

### 4.2 Hypothèses volume an 1

- 30 jours installation × 800 € = 24 000 €
- 15 audits × 1 500 € = 22 500 €
- 25 jours formation × 600 € = 15 000 €
- 5 formations 3j × 1 800 € = 9 000 €
- 50 forfaits config × 400 € = 20 000 €

**CA services an 1** : ~90 500 €

---

## 5. Mix de revenus annuel

| Stream | An 1 | An 2 (proj.) | An 3 (proj.) |
|---|---|---|---|
| Kits matériel | 183 300 € (52 %) | 540 000 € (45 %) | 1 200 000 € (40 %) |
| SaaS Fleet Manager | 93 600 € (27 %) | 360 000 € (30 %) | 1 100 000 € (37 %) |
| Services | 90 500 € (26 %)* | 280 000 € (24 %) | 600 000 € (20 %) |
| Marque blanche & autres | 0 | 20 000 € (1 %) | 100 000 € (3 %) |
| **Total CA HT** | **~367 000 €** | **~1.2 M€** | **~3 M€** |

*La somme des % > 100 car ARR SaaS et CA kits ne se cumulent pas exactement la première année (timing).
(Détails 36 mois dans `docs/07-financials.md`.)

---

## 6. Unit economics

### 6.1 Client B2C (kit Découverte 99 €)
- CAC moyen : 25 € (paid social + influenceur outdoor)
- Marge brute kit : 39 €
- LTV (revente kits + add-ons accessoires) sur 24 mois : ~80 €
- **LTV/CAC** : 3.2 ✓
- **Payback** : immédiat sur le premier kit

### 6.2 Client B2B (kit Pro + SaaS Team 5 nœuds)
- CAC moyen : 200 € (outbound + content + démo)
- Marge brute kit Pro : 124 €
- Marge brute SaaS Team 5 nœuds × 9 € × 24 mois : 1 080 €
- Total LTV : 1 200 €
- **LTV/CAC** : 6 ✓
- **Payback** : 4–5 mois

### 6.3 Client B2B Secours (kit Secours + SaaS Business + formation)
- CAC moyen : 600 € (cycle vente long, démo terrain)
- Marge brute kit Secours : 209 €
- Marge brute formation : 450 €
- Marge brute SaaS Business 12 mois × 80 nœuds × 6 € : 5 760 €
- Total LTV (24 mois) : ~12 000 €
- **LTV/CAC** : 20 ✓
- **Payback** : 2–3 mois

---

## 7. Structure de coûts (an 1)

| Poste | Montant annuel | % du CA |
|---|---|---|
| Achats hardware (COGS kits) | 105 000 € | 29 % |
| Infra cloud SaaS | 4 000 € | 1 % |
| Salaires (1 fondateur + 0.5 dev freelance) | 80 000 € | 22 % |
| Marketing & acquisition | 35 000 € | 9.5 % |
| Plateforme e-commerce + paiement | 8 000 € | 2 % |
| Frais légaux / compta / RGPD | 12 000 € | 3 % |
| Logistique / expédition | 18 000 € | 5 % |
| Bureau / matériel | 6 000 € | 1.6 % |
| Salons / déplacements | 10 000 € | 3 % |
| Conformité CE, certifs, R&D | 8 000 € | 2 % |
| Autres / réserve | 12 000 € | 3 % |
| **Total charges** | **298 000 €** | **81 %** |
| **EBITDA estimé** | **~69 000 €** | **19 %** |

(Hypothèse fondateur en TNS au SMIC majoré + provisions URSSAF.)

---

## 8. Capital initial nécessaire

### 8.1 Bootstrap minimal (option par défaut)
- Apport personnel : **30 000 €**
- Stock initial : 15 000 €
- Site web + SaaS dev (3 mois freelance) : 8 000 €
- Marketing lancement : 4 000 €
- Trésorerie 2 mois : 3 000 €

### 8.2 Subventions à activer
- **BPI Bourse French Tech / Aide à la création** : jusqu'à 30 000 € selon profil
- **Région (selon résidence)** : 5 000–20 000 €
- **ADEME — résilience climatique** : à étudier sur les cas d'usage incendie/inondation
- **CIR** (crédit impôt recherche) si développement SaaS innovant : ~30 % des dépenses R&D éligibles

### 8.3 Levée de fonds (optionnelle, an 2)
- Si traction confirmée : seed 300–500 k€ pour accélérer
- Investisseurs ciblés : Bpifrance, business angels secteur deeptech, fonds climat-résilience
- Valorisation post-money cible : 2–3 M€

---

## 9. Risques business et parades

| Risque | Probabilité | Impact | Parade |
|---|---|---|---|
| Pénurie composants Semtech | Moyen | Fort | Multi-sourcing dès jour 1 (RAK + Heltec + LILYGO) |
| Apple/Google natifient mesh SOS multi-users | Faible 24m | Très fort | Pivot B2B services, focus segments non-iOS |
| Meshtastic Solutions Inc. lance SaaS officiel | Moyen | Moyen | Différenciation par UX FR, services, marché EU |
| Concurrent FR copycat | Élevé an 2 | Moyen | Vitesse d'exécution, communauté loyale |
| Réglementation EU plus stricte (duty cycle) | Faible | Moyen | Lobby B2B, alternatives bandes (433 MHz) |
| Crise économique réduit budgets | Moyen | Moyen | Diversification segments, kits Découverte résilients |

---

**Conclusion** : modèle multi-revenus avec récurrence SaaS qui croît plus vite que le hardware. Marge brute consolidée ~55 % an 1, montée à ~62 % an 3 avec mix favorable au SaaS. Cash positif dès Q4 an 1 sur scénario médian. Capital initial bootstrap viable, levée de fonds optionnelle si on veut accélérer.
