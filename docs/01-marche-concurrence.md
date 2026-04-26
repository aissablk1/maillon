# 01 — Marché et concurrence

> Cartographie du marché mesh longue portée en France et Europe au 25 avril 2026, identification des gaps exploitables par MAILLON.

---

## 1. Acteurs commerciaux Meshtastic (vue mondiale)

### 1.1 Vendeurs de hardware préconfiguré

| Acteur | Pays | Modèle | Prix unité | Présence FR | Lacunes exploitables |
|---|---|---|---|---|---|
| **Rokland** | USA (entrepôt EU) | Hardware revendeur + accessoires | 30–500 USD | Forte (livraison 5–15j EU) | Aucun service, pas de SaaS, pas de FR |
| **Muzi Works** | UK | Devices propres (R1 Neo) | 89 USD (~100 €) | Bonne (UK→EU stock) | Pas de FR, pas de support B2B, pas de SaaS |
| **OpenELAB** | UK | Revendeur | 30–200 € | Moyenne | Stock limité, anglais uniquement |
| **B&Q Consulting** | UK/Global | Station G2/Nano G2 | 120–220 € | Faible (Tindie) | Engineering pur, pas de marketing FR |
| **SpecFive** | USA | Trekker Delta + Raven (drone) | 150–250 USD | Faible | Niche SAR, pas de support EU |
| **Mesh2Go** | UE (lancement 2026) | Kits EU pré-built | TBD | Émergent | Rookie, pas encore de traction |
| **Heltec, RAK, LILYGO, Seeed** | Chine (entrepôts EU/DE) | Hardware brut | 25–150 € | Bonne (10–15j) | DIY, pas de service |

**Verdict** : aucun acteur n'offre un parcours d'achat complet en français avec services et SaaS. **Le gap est total**.

### 1.2 SaaS et fleet management

**Recherche exhaustive : aucun SaaS commercial dédié au fleet management Meshtastic n'existe en avril 2026.**

Les outils existants sont tous open-source, gratuits, sans support commercial :
- **MeshMap.net** — carte interactive mondiale, lecture seule
- **MeshMonitor** (open-source, GitHub) — monitoring basique
- **liamcottle/meshtastic-map** (GitHub) — fork personnalisable
- **`mqtt.meshtastic.org`** — broker MQTT public officiel avec restrictions de confidentialité

**Conséquence** : MAILLON est en **océan bleu** sur le segment SaaS B2B.

### 1.3 Communautés en France
- **Telegram `@meshtastic_fr`** : signalé inactif en avril 2026
- **Discord Meshtastic officiel** : channel France peu animé
- **Estimation utilisateurs FR actifs** : 200–500 (vs 40 000 mondial)
- **Workshop physique** : 1 événement Mobilizon recensé à Paris (7 février 2026)
- **Radioamateurs (DRAF)** : focus TETRA/DMR, peu sur Meshtastic

**Verdict** : pas de communauté FR structurée. MAILLON peut **devenir le hub** par défaut s'il bouge en Q2 2026.

---

## 2. Concurrence indirecte (secteurs adjacents)

### 2.1 Radios professionnelles DMR/TETRA (segment secours/BTP)

| Marque | Produit phare | Prix unité | Forces | Faiblesses face à MAILLON |
|---|---|---|---|---|
| **Hytera** | PD785G DMR | 1 200–2 500 € | Robustesse, son qualité, intégration secours | Cher, licence annuelle, complexité |
| **Motorola** | MotoTRBO XPR7550 | 1 500–3 000 € | Standard pompiers, écosystème | Très cher, infra fixe nécessaire |
| **Kenwood** | NX-3300 | 800–1 500 € | Fiabilité éprouvée | Pas de mesh, point-à-point |

**Levier MAILLON** : 1/15ème du prix, off-grid (pas de relais payant), libre de licence.

### 2.2 Communicateurs satellite (segment expéditions/maritime)

| Marque | Produit | Prix matériel | Abonnement | Forces | Faiblesses face à MAILLON |
|---|---|---|---|---|---|
| **Garmin inReach Mini 2** | Communicateur SOS | 400–500 € | 15–50 €/mois (Iridium) | Couverture mondiale | Cher en récurrent, comms 1-vers-Garmin |
| **Apple iPhone 14+** | SOS satellite intégré | inclus iPhone | gratuit jusqu'à 11/2026 | Simplicité, intégration native | iOS only, 1-vers-Apple, pas de groupes |
| **Iridium GO!** | Hotspot satellite | 800–1 200 € | 50–150 €/mois | Voix + SMS | Cher, lent, complexe |
| **Zoleo** | Communicateur 2-way | 250 € | 25–60 €/mois | Pairing smartphone | Couverture variable, abonnement |

**Levier MAILLON** : pas d'abonnement, comms multi-utilisateurs, chiffrement personnel, pas de dépendance constellation.

### 2.3 Talkies-walkies grand public (segment loisir/famille)

| Marque | Produit | Prix paire | Portée réelle | Faiblesse face à MAILLON |
|---|---|---|---|---|
| **Motorola Talkabout T82** | PMR446 | 60–80 € | 1–3 km | Pas de comms texte, pas de groupe, pas de chiffrement |
| **Midland G9 Pro** | PMR446 | 100–140 € | 2–4 km | Idem |
| **Baofeng UV-5R** | UHF/VHF amateur | 25–40 € | 5–15 km | Licence radioamateur requise pour usage légal |

**Levier MAILLON** : 10× la portée, messagerie texte chiffrée, télémétrie, mesh multi-relais, app smartphone.

---

## 3. Taille du marché France (estimations 2026)

### 3.1 Volume potentiel par segment (TAM)

| Segment | Population cible | WTP/poste | TAM théorique FR/an |
|---|---|---|---|
| Randonneurs intensifs | 200 000 | 100 € | 20 M€ |
| Survivalistes/préparateurs | 50 000 | 200 € | 10 M€ |
| Pompiers volontaires + secours bénévoles | 200 000 | 300 € (pour assoc) | 60 M€ (assoc) |
| Chantiers BTP isolés (entreprises) | 50 000 entreprises | 1 000 €/site | 50 M€ |
| Festivals/événements (location) | 500 events × 100 postes | 30 €/event/poste | 1.5 M€ |
| Agriculteurs élevage extensif | 225 000 exploit. | 200 € | 45 M€ |
| Plaisanciers côtiers | 100 000 | 200 € | 20 M€ |
| Expéditions / voyages longs | 5 000/an | 500 € | 2.5 M€ |

**TAM agrégé France** : ~210 M€/an (théorique max). **SAM réaliste 5 ans** : 5–15 M€/an avec exécution sérieuse.

### 3.2 Pénétration cible MAILLON sur 5 ans

- Année 1 : 0.05 % du SAM ciblé → **300 k€ chiffre d'affaires**
- Année 2 : 0.25 % → 1.5 M€
- Année 3 : 0.8 % → 4 M€
- Année 5 : 2 % → 8–10 M€

(Détails projections financières dans `docs/07-financials.md`.)

---

## 4. Matrice de positionnement

```
                  PRIX BAS                             PRIX HAUT
                     │                                    │
  ────────────────────────────────────────────────────────────  COMMS GROUPE
                     │                                    │
   PMR446 grand pub. │       MAILLON                     │  Hytera/Motorola DMR
   (60-100 €/paire)  │   (kit 99-499 €)                  │  (1500-3000 €/poste)
                     │                                    │
                     │                                    │
   ──────────────────┼────────────────────────────────────┤  COMMS POINT-A-POINT
                     │                                    │
                     │  Apple SOS satellite               │  Garmin inReach
                     │  (gratuit/abonné)                  │  (400 €+ 15 €/mois)
                     │                                    │
```

**Positionnement MAILLON** : milieu de gamme, comms groupe, sans abonnement, écosystème ouvert. Le seul à occuper ce quadrant en France.

---

## 5. Forces / Faiblesses / Opportunités / Menaces

### 5.1 Forces
- Marché francophone vierge (zéro acteur structuré)
- Technologie mature, légale, éprouvée
- Coûts hardware bas (marges 30–50 %)
- Communauté open-source bienveillante (vs hostile)
- goTenna sortie du civil = boulevard

### 5.2 Faiblesses
- Marque inconnue, à construire
- Pas de stock initial, dépendance fournisseurs
- Petite équipe (1 fondateur initial)
- SaaS à développer
- Notoriété à acquérir contre Hytera/Motorola en B2B secours

### 5.3 Opportunités
- Apple satellite limité à iOS et 1-vers-1 (pas concurrent sur multi-users)
- Subventions ADEME / régions sur outils résilience climat (incendies, inondations)
- Croissance survivalisme post-COVID, post-2022 ukrainien
- Récents incendies/inondations FR : besoin coordination secours bénévoles
- France 2030 : plans territoires résilients
- Croissance ultra-trail, alpinisme, voiliers : segment loisir solvable

### 5.4 Menaces
- Apple/Google qui natifient le SOS satellite multi-users (rumeur Android Starlink)
- Meshtastic Solutions Inc. qui décide de lancer un SaaS officiel
- Acteur US (Rokland) qui ouvre filiale FR
- Réglementation EU plus stricte sur duty cycle
- Pénurie composants Semtech SX1262

---

## 6. Cinq raisons pour lesquelles MAILLON gagne

1. **Premier mover francophone structuré.** En 2027 ce sera trop tard — quelqu'un occupera la place.
2. **Stack défendable** : kits + SaaS + services = multi-revenue, pas mono-produit.
3. **Communauté avant produit** : on construit l'audience FR pendant 3 mois (content, meetups) avant de vendre.
4. **Unit economics solides** : marge brute 40 % hardware + 80 % SaaS + 70 % services = LTV/CAC > 3 dès l'année 1.
5. **Trésor caché** : la donnée anonymisée des trajets/positions des flottes (avec consentement) intéresse assureurs, sécurité civile, météo — revenue stream phase 3.

---

**Sources** : recherche web croisée Rokland, Muzi, OpenELAB, Mesh2Go, B&Q Consulting, MeshMap, Meshtastic forums, ETSI, Hytera, Motorola, Garmin, Apple, étude Smart Agriculture France 2026, FFSS rapport activité 2025.
