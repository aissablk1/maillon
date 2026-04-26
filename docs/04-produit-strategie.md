# 04 — Stratégie produit

> Catalogue complet, roadmap fonctionnelle, philosophie design.

---

## 1. Philosophie produit

> **Trois minutes max entre l'unboxing et le premier message envoyé.**

Toute friction au-delà = échec produit. C'est le KPI qualitatif suprême. Si un retraité randonneur de 65 ans qui n'a jamais flashé un microcontrôleur peut envoyer un message à son fils sur 5 km en moins de 3 minutes, on a gagné.

Ce qui en découle :
- Préconfiguration usine systématique (PSK partagée par défaut, hop limit, region EU868)
- Notice illustrée 1 page, format poche, avec QR codes
- App mobile ouverte avec onboarding 4 écrans max
- Pas de jargon dans l'UI : « zone » au lieu de « channel », « équipe » au lieu de « group »

---

## 2. Catalogue produit (an 1)

### 2.1 Kits matériels

#### Kit Découverte — 99 € TTC
**Pour qui** : familles, randonneurs occasionnels, curieux

**Contenu** :
- 2× LILYGO T-Echo (préconfiguré, antenne intégrée, étui silicone)
- 2× câbles USB-C
- 1× notice plastifiée 4 volets « Démarrage rapide »
- 1× sticker MAILLON
- App mobile gratuite (iOS/Android)
- 5 nœuds gratuits sur SaaS Free

**Promesse** : 5–10 km à vue, 2 utilisateurs, messagerie texte chiffrée, position GPS, autonomie 5 jours.

**Personnalisation possible** : couleur étui (4 options), nom de zone pré-imprimé.

#### Kit Pro — 299 € TTC
**Pour qui** : conducteurs de travaux BTP, organisateurs événements moyens (jusqu'à 500 pers), exploitants forestiers

**Contenu** :
- 4× LILYGO T-Beam Supreme (préconfiguré, étui caoutchouc, antenne 5 dBi externe)
- 1× Station G2 fixe (pour relais haut, antenne fibre 7 dBi extérieure incluse)
- 4× chargeurs + batteries 18650 supplémentaires
- 1× mallette transport semi-rigide
- 1× notice illustrée 12 pages (FR)
- App MAILLON + 30 jours d'essai SaaS Team gratuit

**Promesse** : 10–20 km zone d'opérations, 4 utilisateurs mobiles + 1 base, jusqu'à 10 km² couverture continue avec relais bien positionné.

#### Kit Secours — 499 € TTC
**Pour qui** : associations FFSS, ADRASEC, SDIS bénévoles, Croix-Rouge, comités spéléo

**Contenu** :
- 6× RAK4631 dans boîtier IP67 antichoc (préconfiguré, pavé tactile, lampe LED secours)
- 2× Station G2 (relais haut redondants)
- 1× LILYGO T-Deck Plus (poste opérateur PC, écran + clavier intégrés)
- Antennes Yagi 12 dBi directionnelle (1×) + omni 7 dBi (2×)
- Câbles, fixations, accessoires
- Mallette renforcée Pelican-like
- Notice 24 pages avec scénarios d'intervention
- **6 mois SaaS Team inclus (jusqu'à 50 nœuds)**
- **1 demi-journée formation à distance offerte**

**Promesse** : couverture opérationnelle 30 km² avec relais bien posés, 6 secouristes mobiles + console centrale, redondance, durcissement IP67.

#### Kit Sur-mesure — devis (à partir de 1 500 €)
**Pour qui** : grandes flottes (festivals 50+ talkies, exploitations agricoles 20+ sites, sécurité civile institutionnelle)

**Process** : audit besoin → audit couverture (forfait 1 500 € ou inclus selon volume) → devis BOM → installation → formation → SLA.

---

### 2.2 Accessoires & pièces détachées

| Article | Prix TTC | Marge |
|---|---|---|
| Antenne Yagi 12 dBi 868 MHz | 75 € | 50 % |
| Antenne fibre 7 dBi 868 MHz | 35 € | 50 % |
| Batterie 18650 3000 mAh (paire) | 19 € | 60 % |
| Étui silicone protection | 14 € | 70 % |
| Boîtier IP67 vide (T-Beam) | 39 € | 55 % |
| Mallette transport rigide | 89 € | 45 % |
| Câble USB-C (1 m, 2 m) | 8 € | 65 % |
| Notice imprimée FR (rechange) | 4 € | 80 % |

---

## 3. SaaS Fleet Manager — fonctionnalités

### 3.1 MVP (lancement Q2 an 1)

- **Carte temps réel** des nœuds (positions + statut + batterie)
- **Messagerie** entre nœuds via le navigateur (relay MQTT cloud)
- **Historique 7 jours** des positions et messages
- **Alertes basiques** : nœud déconnecté > 10 min, batterie < 20 %
- **Multi-utilisateurs** : 2 admins par compte Team
- **Export CSV** des positions / messages
- **Authentification** : email/password + 2FA
- **Branding** : logo MAILLON, palette neutre

### 3.2 V1 (Q3 an 1)

- **Géofences** (zones avec alertes entrée/sortie)
- **Annotations carte** : POI, dangers, points d'eau, abris
- **Replay temporel** des trajets
- **Rapports PDF** automatiques (jour/semaine/mois)
- **Webhooks** sortants (Slack, Discord, email)
- **API publique** (REST) documentée
- **MQTT privé** par compte (broker dédié)

### 3.3 V2 (Q4 an 1 / Q1 an 2)

- **SSO SAML/OIDC** (B2B)
- **Audit log** complet
- **Niveaux d'accès** granulaires (admin, opérateur, lecteur)
- **Heatmaps** densité couverture
- **Mode hors ligne** (PWA cache local)
- **Intégration calendrier** (Google, Outlook)
- **Mobile app dédiée** (iOS + Android natifs en complément app Meshtastic standard)

### 3.4 V3 (an 2+)

- **Mode on-premise** (déploiement chez le client, Docker Compose)
- **Conformité ISO 27001** (préparation audit)
- **Anonymisation et data marketplace** (vente données agrégées avec consentement)
- **Reticulum integration** pour clients sécurité stricte
- **Module hors ligne LoRaWAN bridge** (si pertinent)

---

## 4. App mobile MAILLON

### 4.1 Stratégie

**Décision** : NE PAS construire un fork complet de l'app Meshtastic. À la place :
- Soit utiliser **l'app Meshtastic officielle** + une couche overlay personnalisée pour le SaaS
- Soit publier **MAILLON Companion** : app légère qui complète Meshtastic (carto, alerts, branding)

**Validation à faire** : test utilisateur avec 5 personnes au lancement. Si Meshtastic UI suffit + overlay = on évite 60 k€ de dev mobile.

### 4.2 Si app dédiée (V2 an 2)

- **Stack** : React Native + native modules (Bluetooth, BLE, USB)
- **Onboarding 4 écrans** : sélection nœud → pairage Bluetooth → choix zone/équipe → premier message
- **UX clé** : map en mode dark par défaut, bouton SOS rouge persistant, status connection clair
- **Accessibilité** : taille texte ajustable, contrastes WCAG AAA, mode VoiceOver complet

---

## 5. Roadmap fonctionnelle 12 mois

```
Mois 1-2 : MVP foundations
─────────────────────────
✓ Site MAILLON + landing
✓ Boutique e-commerce (kits)
✓ Process préconfiguration usine
✓ Notices FR illustrées (3 kits)
✓ Communauté Discord/Telegram FR

Mois 3-4 : Premiers kits livrés
──────────────────────────────
✓ Lancement Kit Découverte
✓ Lancement Kit Pro (avec 5 pilotes BTP)
✓ Démos terrain FFSS (2-3 associations)
✓ Premiers tutos vidéo YouTube FR

Mois 5-6 : SaaS MVP
───────────────────
✓ Lancement SaaS Fleet Manager (Free + Team)
✓ Lancement Kit Secours
✓ Premier salon (Forum Sécurité Civile)
✓ Programme ambassadeurs (5 influenceurs outdoor)

Mois 7-9 : SaaS V1
──────────────────
✓ Géofences, annotations, replay
✓ API publique
✓ Premiers clients Business
✓ Marque blanche première asso

Mois 10-12 : Consolidation & V2
───────────────────────────────
✓ SSO B2B, audit log
✓ Salon Préventica
✓ Pré-commercialisation export Belgique/Suisse
✓ Bilan an 1, levée Seed optionnelle
```

---

## 6. Décisions design produit

| Élément | Choix | Pourquoi |
|---|---|---|
| Couleur principale boîte | Vert profond + blanc | Évoque outdoor/secours/résilience |
| Typo notice | Sans-serif Inter / IBM Plex | Lisibilité, neutralité, accessibilité |
| Format notice | A5 plié 4 volets, plastifié IPx4 | Tient en poche, résiste pluie |
| Langue UI app par défaut | Français | Différenciation immédiate |
| Langues supportées roadmap | FR, EN, ES, NL (an 2), DE (an 3) | Marchés européens prioritaires |
| Étui kit Découverte | Silicone, couleur signature MAILLON | Identifiable, doux au toucher |
| Mallette kit Pro/Secours | Semi-rigide / rigide selon kit | Robustesse vs prix |
| Documentation produit | Markdown sourcé Git public | Transparence, contributions communauté |

---

## 7. Indicateurs de succès produit

| KPI | Cible an 1 | Méthode mesure |
|---|---|---|
| Time-to-first-message (kit Découverte) | < 3 min médiane | Test utilisateur trimestriel |
| Taux d'activation app < 24h après réception | > 75 % | Analytics app + livraison |
| NPS produit | > 50 | Email post-achat 7j + 30j |
| Taux conversion Free → Team SaaS | > 5 % | Analytics SaaS |
| Churn mensuel SaaS Team | < 3 % | Stripe + analytics |
| Note moyenne support | > 4.5/5 | Tickets Helpscout |
| Returns hardware | < 3 % | RMA |

---

**Conclusion** : produit modulaire, parcours d'acquisition naturel (Découverte → Pro → Secours → Sur-mesure + SaaS upsell). Pas de fragmentation : trois SKUs hardware suffisent en an 1. SaaS construit en couches (MVP → V1 → V2). Pas d'app mobile maison avant validation utilisateur.
