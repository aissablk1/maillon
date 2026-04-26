# 08 — Cas d'usage verticaux

> Détail concret pour chaque segment cible : besoin, solution MAILLON, ROI, références.

---

## 1. Secours bénévoles & associatifs

### Profil utilisateur type
**FFSS (Fédération Française de Sauvetage et de Secourisme), ADRASEC (Associations Départementales des Radioamateurs au Service de la Sécurité Civile), comités spéléo, croix-rouge bénévoles, SDIS bénévoles.**

### Besoin opérationnel
- Coordination équipes en zone blanche (forêt, montagne, gorges, grotte)
- Géolocalisation continue des secouristes pour PC commande
- Messagerie texte chiffrée (info opérationnelle, médicale)
- Alertes basiques (homme à terre, demande d'extraction)
- Compatibilité avec radios DMR existantes (au moins en parallèle, pas en remplacement complet)

### Limites des solutions actuelles
- DMR Hytera/Motorola : 1 500–3 000 €/poste, formation lourde, licence
- TETRA institutionnel : non accessible aux bénévoles
- Smartphones : zone blanche fréquente
- Garmin inReach : 400 € + abonnement, comms 1-vers-base seulement

### Solution MAILLON
- **Kit Secours 499 €** : 6 nœuds IP67 + 2 stations relais + console PC opérateur
- **SaaS Fleet Manager Business** inclus 6 mois : carto temps réel, géofences zones d'intervention, alertes batterie / hors zone, replay post-intervention
- **Formation 1 jour** sur site ou à distance : prise en main, scénarios, dépannage
- **Marquage CE conforme**, fourniture étiquetée association

### ROI association type (15 secouristes équipés)
| Poste | Solution actuelle | Solution MAILLON | Économie |
|---|---|---|---|
| Achat radios | 15 × 1 500 € = 22 500 € | 3 kits Secours = 1 497 € + 9 nœuds extra ≈ 2 200 € | **20 300 €** |
| Licence annuelle DMR | 800 € | 0 € (ISM 868 libre) | 800 €/an |
| SaaS Fleet | – | 360 €/an (15 nœuds × 24 € équivalent) | + 360 € |
| Formation | 1 500 € | inclus | 1 500 € |
| **Total an 1** | **~24 800 €** | **~2 920 €** | **~21 880 € économisés** |

### Références potentielles (à conquérir an 1)
- FFSS Auvergne-Rhône-Alpes (PGHM partenaire)
- ADRASEC Hautes-Alpes
- Croix-Rouge Vendée (zones inondables)
- Comité Spéléo Aveyron

### Étude de cas cible
*« FFSS Vercors équipe 12 secouristes pour 2 200 € au lieu de 19 500 €. Lors de la prochaine intervention en zone blanche, le PC commande visualise les positions en temps réel et envoie des messages texte chiffrés. Réduction du temps moyen de jonction radio de 4 minutes à 30 secondes. »*

---

## 2. Chantiers BTP & exploitations isolées

### Profil utilisateur type
**Conducteurs de travaux, gérants TPE/PME BTP, exploitants forestiers, gestionnaires carrières, équipes de pose réseau (eau, fibre, électricité) en zone rurale.**

### Besoin opérationnel
- Coordination équipes 2–10 personnes sur chantier
- Sécurité homme isolé (article R4624-19 Code du travail)
- Comms ouvriers ↔ conducteur travaux ↔ engins
- Position des équipes sur grand chantier (ex : autoroute en construction, parc photovoltaïque)

### Limites des solutions actuelles
- PMR446 (Motorola Talkabout) : 1–3 km, pas de chiffrement, pas de groupe avancé
- DMR : trop cher pour PME
- Smartphone : zone blanche, fragile au chantier
- Solutions IoT industrielles type Sigfox : trop chères, pas adaptées comms instantanées

### Solution MAILLON
- **Kit Pro 299 €** : 4 nœuds + 1 station relais
- **Application smartphone** + nœud autonome avec écran (T-Beam Supreme)
- **SaaS Team 9 €/nœud/mois** optionnel pour le suivi flotte multi-chantiers
- **Boîtier renforcé option** (39 €/unité)

### ROI chantier type (5 personnes, 6 mois)
| Poste | Solution actuelle | Solution MAILLON | Économie |
|---|---|---|---|
| 5 talkies PMR pro | 5 × 200 € = 1 000 € | 1 kit Pro = 299 € | 700 € |
| Pas de coordination centralisée | – | SaaS Team 5 nœuds × 6 mois × 9 € = 270 € | -270 € |
| Sécurité homme isolé (DATI dédié) | 5 × 300 €/an = 1 500 €/an | inclus dans MAILLON (alerte batterie + position) | 1 500 € |
| **Total** | **2 500 €** | **569 €** | **~1 930 €** |

### Étude de cas cible
*« Une PME BTP de 12 personnes équipe 3 chantiers parallèles en Lozère, Cantal et Ardèche. Conducteur de travaux suit les 3 sites depuis son bureau central via le SaaS MAILLON. Détection homme à terre 4× plus rapide. ROI complet en 5 mois. »*

---

## 3. Festivals & événementiel

### Profil utilisateur type
**Producteurs de festivals (5 000–50 000 personnes), organisateurs de raids/courses outdoor, marathons, salons en plein air, congrès en site isolé.**

### Besoin opérationnel
- 30–200 talkies pour staff (sécu, logistique, médical, accueil)
- Coordination zonée (entrées, scènes, backstage, parkings)
- Pas d'infrastructure réseau dédiée à louer
- Chiffrement (le contenu peut être sensible : sécu, médical)

### Limites des solutions actuelles
- Location PMR : 5–15 €/jour/talkie, pas de chiffrement, qualité variable
- DMR sur site : nécessite licence ARCEP temporaire
- Smartphone : saturation cellulaire en festival
- Discord vocal : dépend du Wi-Fi staff peu fiable

### Solution MAILLON
- **Kit Pro × N** ou **Kit Sur-mesure**
- Modèle achat (amorti sur 3 éditions) ou modèle location (forfait MAILLON)
- SaaS Team avec géofences (alerte staff hors zone)
- Setup 1/2 journée + retour matériel post-event

### ROI festival type (80 talkies, 3 jours)
| Poste | Location PMR pro | Achat MAILLON | Diff |
|---|---|---|---|
| 80 PMR × 3 jours × 8 € | 1 920 € | – | – |
| 80 nœuds MAILLON kits Pro équivalents | – | ~2 700 € | – |
| Achat amortissement 3 éditions | – | 900 €/édition | -180 € (1ère édition) |
| ÉDITIONS 2-N | 1 920 €/édition | 0 €/édition | **+1 920 €/édition** |

À partir de la 2ème édition : économie de 1 920 €/an + bénéfice fonctionnel SaaS.

### Étude de cas cible
*« Festival folk en Cévennes (12 000 personnes) : 60 talkies MAILLON pour le staff. Géofences activées sur les zones backstage. Suivi en temps réel des équipes médicales. Achat amorti dès la 2ème édition. »*

---

## 4. Agriculture (élevage extensif, maraîchage en réseau)

### Profil utilisateur type
**Éleveurs extensifs (Limousin, Charolais, Cévennes, Pyrénées), coopératives agricoles, exploitations multi-sites, agriculteurs en agroforesterie.**

### Besoin opérationnel
- Coordination équipes en parcelle (3–5 personnes)
- Suivi positions cheptel en alpage / estive
- Communication avec saisonniers
- Backup quand ZBlanche cellulaire (50 % du foncier agricole français)

### Limites des solutions actuelles
- Smartphone : zone blanche fréquente sur grands élevages
- GPS collar bétail : ~80 €/collier × 200 bêtes = 16 000 €, pas de comms équipe
- Talkie PMR : portée insuffisante sur estive 200 ha
- Sigfox/LoRaWAN privé : trop cher pour PME agri

### Solution MAILLON
- **Kit Pro 299 €** + 2-3 nœuds extra pour bêtes pilotes (option ear-tags Meshtastic émergent)
- **SaaS Team** pour suivi flotte
- **Tracking complémentaire** non-bétail (chien de berger, équipe saisonnière)

### ROI exploitation type (2 sites × 500 ha)
| Poste | Solution actuelle | MAILLON | Économie |
|---|---|---|---|
| Comms équipes (5 personnes × 2 sites) | rien ou PMR insuffisants | Kit Pro × 2 = 598 € | – |
| Saisonniers (3 mois) | smartphone perso + frais | inclus MAILLON | ~600 € |
| Coordination | informel + appels | SaaS Team 10 nœuds × 9 € × 12 = 1 080 € | – |
| Sécurité saisonnier isolé | – | inclus MAILLON | conformité + 1 vie |

ROI moins direct en cash, fort en sécurité humaine et productivité.

### Référence cible
*« GAEC pyrénéen équipe 5 berger·e·s sur 800 ha d'estive. Visualisation en continu sur dashboard, repérage rapide en cas de météo brutale. »*

---

## 5. Maritime côtier & plaisance

### Profil utilisateur type
**Plaisanciers (semi-hauturiers), clubs de voile, écoles de croisière, organisateurs de régates côtières, ostréiculteurs, pêche artisanale.**

### Besoin opérationnel
- Comms inter-bateaux quand VHF marine saturée ou hors-portée
- Position groupe (régate, école de croisière)
- Backup smartphone côtier
- Messagerie texte (le bruit moteur empêche souvent la voix VHF)

### Limites des solutions actuelles
- VHF marine : portée correcte (15-30 km LoS marin) mais voice-only, canaux saturés
- Smartphone : 5-15 km offshore selon antennes terrestres
- AIS : pas de messagerie

### Solution MAILLON
- **Kit Pro adapté maritime** : antennes courtes mais haut-gain compatibles fixation mât
- Boîtier IP67
- Compatible avec navigation principale (kit Découverte 99 € pour bateaux pilotes)

### ROI école de croisière (5 voiliers, saison)
- Coordination flotte 5 bateaux pendant un stage 5 jours
- Aujourd'hui : VHF + smartphones côtiers
- MAILLON : 5 kits Découverte = 495 € pour 10 utilisateurs, comms texte/position permanentes même en fond de baie

---

## 6. Outdoor / aventure (B2C premium)

### Profil utilisateur type
**Alpinistes (autonomes, en cordée), traileurs ultra-distance, navigateurs côtiers, voyageurs longue durée (overlanders, expéditions en 4×4), randonneurs en autonomie multi-jours.**

### Besoin
- Comms groupe de 2–6 personnes en montagne / désert / off-grid
- Backup SOS si abonnement Garmin pas justifié
- Suivi proches restés à la maison (light tracking partagé)

### Solution MAILLON
- **Kit Découverte 99 €** pour 2 personnes
- **Kit Pro 299 €** pour cordées de 4 + base camp
- App mobile FR claire

### Différenciation Apple SOS / Garmin inReach
- **Apple SOS satellite** : iOS only, 1-vers-Apple, pas multi-utilisateurs, expire fin 2026
- **Garmin inReach** : 400 € + 15 €/mois minimum = 580 € an 1 par utilisateur
- **MAILLON** : 99 € pour 2 utilisateurs, zéro récurrent obligatoire = 49 €/utilisateur, durée de vie 5+ ans

### ROI individuel (5 ans alpiniste)
| | Garmin inReach Mini 2 | MAILLON Kit Découverte |
|---|---|---|
| Hardware | 450 € | 99 € (pour 2) = 49 €/pers |
| Abonnement 5 ans | 900 € (15 €/mois) | 0 € |
| **Total 5 ans** | **1 350 €** | **49 €** |

(Garmin reste pertinent pour expé polaire isolée. MAILLON gagne sur tous les autres usages.)

---

## 7. Communautés & survivalisme / préparateurs

### Profil utilisateur
**Communautés rurales, préparateurs (préparation aux crises), groupes de quartier en zone rurale, copropriétés isolées, écolieux.**

### Besoin
- Réseau résilient indépendant des opérateurs
- Coordination locale en cas de crise (panne réseau, catastrophe)
- Discrétion (chiffrement) sans dépendance cloud étranger

### Solution MAILLON
- **Kit Pro 299 €** ou **Kit Découverte multipack**
- SaaS Team optionnel ou usage 100% off-grid (sans cloud du tout)
- Documentation FR sur déploiement réseau communautaire

### Cas d'usage
- Vallée de 30 maisons en Ardèche : 1 station haut-relais (Station G2) + 1 nœud par foyer = couverture vallée garantie
- Coût total réseau communautaire 30 nœuds : ~1 500–2 000 € one-shot

---

## 8. Tourisme aventure organisé (an 2)

**Cible** : organisateurs de raids, treks commerciaux, écoles d'alpinisme, raids de team-building.

**Besoin** : 10–30 talkies pour saison, suivi clients en groupe, sécurité.

**Modèle MAILLON** : location flotte + assistance + setup à la saison.

---

## 9. Sécurité civile institutionnelle (an 2-3)

**Cible** : SDIS départementaux, EPCI ruraux, communes en zones blanches, parcs nationaux.

**Cycle de vente** : 6–18 mois, appels d'offres publics, dossiers DSP.

**Modèle MAILLON** : Sur-mesure + SaaS Enterprise + formation + SLA.

---

## 10. Tableau récapitulatif segments

| Segment | Priorité | Cycle vente | Ticket moyen | Marge brute | Volume an 1 |
|---|---|---|---|---|---|
| Secours bénévoles | ★★★ | 4-8 sem | 1 500 € | 40 % | 30 clients |
| BTP | ★★★ | 2-4 sem | 600 € | 42 % | 80 clients |
| Outdoor B2C | ★★★ | 1 sem | 130 € | 39 % | 500 clients |
| Festivals | ★★ | 6-12 sem | 2 500 € | 45 % | 5 clients |
| Agri | ★★ | 4-6 sem | 800 € | 41 % | 25 clients |
| Maritime | ★★ | 2-4 sem | 400 € | 40 % | 40 clients |
| Survivalisme | ★ | 1-2 sem | 300 € | 42 % | 60 clients |
| Tourisme | ★ | 6-8 sem | 4 000 € | 45 % | 5 clients an 2 |
| Sécu civile | ★ | 12-24 sem | 25 000 € | 45 % | 1 client an 2 |

---

**Conclusion verticales** : forte hétérogénéité de cycles et tickets, mais le mix permet stabilité et croissance. Les trois priorités an 1 (secours, BTP, outdoor B2C) couvrent 70 % du CA estimé.
