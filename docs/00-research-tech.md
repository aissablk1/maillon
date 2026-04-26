# 00 — Recherche technique : mesh longue portée en 2026

> Synthèse de l'état de l'art technologique au 25 avril 2026, sourcée et opérationnelle. Ce document est le socle de toutes les décisions produit et commerciales.

---

## 1. Pourquoi 300 km est crédible

Le chiffre **« jusqu'à 300 km »** n'est pas marketing : c'est une réalité physique vérifiable du LoRa modulé sur 868 MHz, dans deux conditions :

1. **Point-à-point ligne de vue** avec antennes haut gain et élévation suffisante (montagne, ballon, drone). Record vérifié : **331 km Autriche–Italie en mai 2024**, hardware RAK4631 + preset *Very Long Slow* + collinéaire fibre 868 MHz.
2. **Multi-hop** dans un maillage de nœuds. Avec un *hop limit* de 7 (défaut Meshtastic) et une portée moyenne de 5–10 km par saut en terrain ouvert, la portée cumulée maximale se situe entre 35 et 70 km. Les 300 km exigent soit relais haut placés (sommets, pylônes, drones tethered), soit conditions atmosphériques exceptionnelles.

**Range typiques observés** :
- Conditions optimales (LoS, antenne directionnelle, élévation) : 10–20 km, jusqu'à 30 km
- Terrain ouvert : 2–5 km typique, 10+ km avec bonnes antennes
- Urbain dense : 1–3 km (atténuation par bâti)
- Indoor : 100–500 m
- Multi-hop sain recommandé : 3 sauts (au-delà, saturation)

**Source** : [Meshtastic Range Tests](https://meshtastic.org/docs/overview/range-tests/), [Mesh Underground deep-dive](https://meshunderground.com/posts/maximize-meshtastic-range-tips-and-deep-dive/)

---

## 2. Meshtastic : le standard de fait

### 2.1 Identité
- **Firmware open-source** (GPL v3) pour radios LoRa
- Version production au 25/04/2026 : **2.7.22** (publiée le 14/04/2026)
- **40 000+ nœuds** actifs cartographiés mondialement (MeshMap.net)
- Support officiel : ~100 appareils certifiés *Meshtastic Approved*
- Communauté très active, gouvernance ouverte (Meshtastic Solutions Inc., USA)

### 2.2 Stack protocolaire
- **Couche physique** : LoRa (Semtech SX1262/SX1276), modulation chirp spread spectrum
- **Bandes** : EU_868 (Europe), US_915, AS_923, IN_865, etc. — sélectionnable par firmware
- **Couche réseau** : flooding mesh avec déduplication, hop limit configurable
- **Couche application** : messagerie texte, position GPS, télémétrie (batterie, T°, humidité), waypoints, traceroute
- **Sécurité** :
  - **AES256-CTR par canal** avec PSK partagée (chiffrement symétrique)
  - **PKC (Public Key Cryptography)** pour messages directs depuis v2.5+ (Curve25519)
  - Métadonnées (de qui à qui, taille) restent en clair sur le RF
- **Bridges** : MQTT (cloud ou privé), Bluetooth/Wi-Fi pour app smartphone, Serial/USB

### 2.3 Améliorations 2026
- **TDMA en v2.6+** : slot-time pour réduire collisions, +30 % de messages livrés à charge équivalente
- **Routing optimization v2.7** : meilleure tolérance aux densités > 500 nœuds dans une zone
- **PKC stable** depuis v2.5
- **Region-specific MQTT** sur le broker public officiel (`mqtt.meshtastic.org`) avec *position imprecision filtering* (≥ 10 bits) par défaut

### 2.4 Limites connues
- **Hop limit max** = 7, pratique = 3 (au-delà : amplification de bruit)
- **Duty cycle 1 %** sur 868 MHz (ETSI EN 300 220) : 36 secondes par heure d'émission max
- **Saturation à ~500–1000 nœuds** dans une zone dense malgré TDMA
- **Pas de QoS** : un message texte rivalise avec une trame de télémétrie
- **Latence** : 1–10 secondes typiques selon le nombre de sauts et la charge réseau

**Sources** :
- [Meshtastic GitHub](https://github.com/meshtastic/firmware)
- [Releases](https://github.com/meshtastic/firmware/releases)
- [Mesh Algorithm](https://meshtastic.org/docs/overview/mesh-algo/)
- [v2.6 Preview Blog](https://meshtastic.org/blog/meshtastic-2-6-preview/)
- [Encryption](https://meshtastic.org/docs/overview/encryption/)

---

## 3. Hardware compatible — paysage 2026

Les huit modèles ci-dessous couvrent 95 % des cas d'usage MAILLON. Tous sont *Meshtastic Approved* sauf mention contraire.

| Modèle | MCU | Radio | GPS | Batterie | Cas d'usage MAILLON | Prix € TTC FR |
|---|---|---|---|---|---|---|
| **LILYGO T-Beam Supreme** | ESP32-S3 8 MB | SX1262 | Oui (L76K) | 18650 amovible | Handheld portable, kits Pro | 60–75 € |
| **LILYGO T-Echo** | nRF52840 | SX1262 | Oui | LiPo intégrée 1100 mAh | Ultra-compact, kits Découverte | 55–70 € |
| **LILYGO T-Deck Plus** | ESP32-S3 | SX1262 | Oui + clavier + écran | 2000 mAh | Gestion sans smartphone, kits Secours | 90–110 € |
| **Heltec WiFi LoRa 32 V3/V4** | ESP32-S3 | SX1262 | Optionnel | USB rechargeable | Budget, R&D, base fixe | 30–40 € |
| **Heltec MeshPocket** | ESP32 | SX1262 | Oui | Intégrée | Festival/grand public | 65–85 € |
| **RAK4631 + Wisblock** | nRF52840 | SX1262 | Modulaire | Modulaire | Pro modulaire, IP67 possible | 70–90 € (boîtier en plus) |
| **Station G2** (B&Q Consulting) | ESP32-S3 | SX1262 + LNA 4 dB | Oui | PoE/USB, jusqu'à 36 dBm TX | **Relais fixe haut-gain** | 180–220 € |
| **Seeed Wio Tracker L1 Pro** | nRF52840 | SX1262 | Oui | LiPo + option solaire | Tracking outdoor longue durée | 50–60 € |

**Antennes 868 MHz** :
- Omni intégrée 3–5 dBi : 0 € (incluse)
- Omni externe fibre 7 dBi (SMA/N) : 10–20 €
- Yagi directionnelle 12 dBi : 30–60 €
- Collinéaire fibre 8.5 dBi (record 331 km) : 80–150 €

**Boîtiers durcis** :
- IP67 standard : 15–40 €
- Antichoc militaire (Pelican-like) : 60–120 €

**Sources prix** : [Rokland Store](https://store.rokland.com/), [OpenELAB](https://openelab.io/collections/meshtastic), [Muzi Works](https://muzi.works/), [Heltec](https://heltec.org/), [Seeed](https://www.seeedstudio.com/), [LILYGO](https://lilygo.cc/)

---

## 4. Alternatives et complémentaires

### 4.1 Reticulum (RNS) — différenciateur sécurité
- **Stack réseau complet** (RF + Wi-Fi + Ethernet + sneakernet) vs Meshtastic spécifique LoRa-chat
- **Forward-secrecy par paquet** en core (Curve25519 + AES256-GCM)
- Overhead crypto : +10–15 % CPU/latence
- Communauté petite (~1 000 dévs), très technique
- **Use case MAILLON** : à proposer en option B2B sécurité stricte (ONG zones de conflit, secret pro avocats)
- Source : [Reticulum deep-dive](https://gaggl.com/blogs/2026-02-25-lpwan-meshes-reticulum-deep-dive/)

### 4.2 MeshCore — concurrent émergent (routage optimisé)
- Firmware alternatif sur même hardware (ESP32, nRF52)
- **Routage structuré** vs flooding Meshtastic → moins de bruit RF, +30–40 % d'autonomie
- Adoption faible mais croissante (ultra-runners, scouts)
- **Use case MAILLON** : option avancée pour clients soucieux de l'autonomie batterie en multi-jours
- Source : [Trail Mate / CNX Software](https://www.cnx-software.com/2026/04/13/trail-mate-open-source-firmware-leverages-meshtastic-and-meshcore-for-esp32-off-grid-handheels/)

### 4.3 LoRaWAN — pas un concurrent
- LoRaWAN = **centralisé** (gateways → backend), conçu pour télémétrie uplink IoT
- Meshtastic = **décentralisé** P2P, conçu pour messaging bidirectionnel ad-hoc
- Pas de chevauchement commercial pour MAILLON
- À mentionner pour **clarifier** auprès des prospects qui confondent

### 4.4 goTenna — sorti du marché civil
- Acquis par **Forterra en octobre 2025** (autonomous mission systems)
- Pivot militaire complet (firmware Aspen Grove, contrats US Air Force, Border Patrol)
- Hardware civil legacy (Pro v2.1) : 500 USD, épuisé
- **Implication MAILLON** : fenêtre ouverte sur le segment civil/B2B européen

### 4.5 Garmin inReach / iPhone Satellite — concurrents adjacents
- **Garmin inReach** : 400–500 € hardware + 15 €/mois abonnement Iridium → cher, mais satellite mondial
- **iPhone 14+ SOS satellite** : gratuit jusqu'à novembre 2026 puis modèle inconnu, 1-vers-Apple seulement (pas de comms groupe)
- **Différentiation MAILLON** : aucun abonnement récurrent, comms multi-utilisateurs, chiffrement perso, pas de dépendance à une constellation

---

## 5. Réglementation France/UE

### 5.1 Bande 868 MHz (l'usage MAILLON par défaut)
- **Cadre** : ETSI EN 300 220-1/2 V3.3.1 (mars 2025)
- **Sans licence**, sans déclaration préalable ARCEP pour usage civil
- **Puissance EIRP max** : 14 dBm (25 mW) en EU_868_MIN, jusqu'à 27 dBm sur certaines sous-bandes spécifiques
- **Duty cycle max** : 1 % sur 868.0–868.6 MHz (36 s/heure)
- **Marquage CE obligatoire** sur tout équipement vendu

### 5.2 ARCEP
- Pas d'enregistrement requis pour usage Meshtastic civil sur ISM 868
- Déploiements pros massifs (>1 000 nœuds régionaux) : prudence recommandée, vérification au cas par cas
- Radioamateurs (licence ANFR) : option, pas obligatoire

### 5.3 RGPD
- Si SaaS Fleet Manager collecte des positions GPS d'utilisateurs identifiables : **traitement de données personnelles**
- Obligations : consentement explicite, base légale documentée, registre traitements, DPA si sous-traitant cloud, hébergement UE recommandé
- Coût estimé conformité initiale : 2 000–4 000 € (audit légal + UI consentement)

### 5.4 Marquage CE
- Tous les hardware Meshtastic Approved listés en section 3 sont **pré-CE**
- Vendre kit DIY non-CE = contravention douane potentielle
- MAILLON ne vendra que des produits pré-certifiés

**Sources** :
- [ETSI EN 300 220-2 V3.3.1](https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.03.01_60/en_30022002v030301p.pdf)
- [Framboise314 — ISM/LoRa/LoRaWAN](https://www.framboise314.fr/meshtastic-ism-lora-et-lorawan/)
- [Meshtastic Privacy](https://meshtastic.org/docs/legal/privacy/)

---

## 6. Décisions techniques MAILLON (jour 1)

| Décision | Choix | Justification |
|---|---|---|
| Firmware par défaut | **Meshtastic 2.7+** | Mature, communauté, GPL v3, 40k nœuds |
| Bande RF | **EU_868** | Conformité ETSI sans licence |
| Modulation preset | **Long Fast** par défaut, **Long Slow** optionnel | Compromis range/débit éprouvé |
| Hop limit | **3** par défaut, **5** sur kits Secours | Évite saturation |
| Hardware kit Découverte | 2× **LILYGO T-Echo** | Compact, autonome, pré-flashable |
| Hardware kit Pro | 4× **T-Beam Supreme** + 1× **Station G2** | Portatif + relais haut-gain |
| Hardware kit Secours | 6× **RAK4631 IP67** + 2× **Station G2** + **T-Deck Plus** PC opérateur | Durcissement, redondance, console |
| Cloud SaaS | **MQTT privé chiffré sur infra UE** (Scaleway/OVH) | RGPD-friendly, latence FR |
| App mobile | **iOS + Android natif** via SDK Meshtastic officiel | Évite WebView médiocre |
| Chiffrement par défaut | **AES256-CTR PSK** + **PKC** opt-in | Simplicité + option pro |
| Reticulum | Module **option B2B sécurité** (phase 2) | Ne pas distraire MVP |

---

## 7. Ressources et liens utiles

- [Meshtastic — site officiel](https://meshtastic.org/)
- [Meshtastic — docs](https://meshtastic.org/docs/)
- [GitHub firmware](https://github.com/meshtastic/firmware)
- [MeshMap (carte mondiale)](https://meshmap.net/)
- [Meshtastic Solutions Inc.](https://meshtastic.org/about/) (équipe et gouvernance)
- [Reticulum](https://reticulum.network/)
- [Trail Mate / MeshCore](https://www.cnx-software.com/2026/04/13/trail-mate-open-source-firmware-leverages-meshtastic-and-meshcore-for-esp32-off-grid-handheels/)
- [Range tests](https://meshtastic.org/docs/overview/range-tests/)
- [ETSI EN 300 220-2](https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.03.01_60/en_30022002v030301p.pdf)

---

**Conclusion technique** : la stack est mûre, légale, économiquement viable. Aucune brique n'est à inventer. Le travail MAILLON est intégrateur, traducteur et orchestrateur — pas inventeur.
