# 10 — Architecture technique

> Stack complète : firmware, cloud, app, SaaS. Décisions, justifications, risques.

---

## 1. Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                        UTILISATEUR FINAL                        │
└──────────────┬──────────────────────────┬───────────────────────┘
               │                          │
       ┌───────▼────────┐         ┌───────▼────────┐
       │  Smartphone    │         │   Navigateur   │
       │  App Meshtastic│         │   Web SaaS     │
       │  (officielle)  │         │   MAILLON      │
       │  + overlay     │         │                │
       └───────┬────────┘         └───────┬────────┘
               │ BLE/Wi-Fi                │ HTTPS
       ┌───────▼────────┐                 │
       │   Nœud LoRa    │                 │
       │ (T-Echo,T-Beam │                 │
       │  RAK, Heltec)  │                 │
       │ Firmware       │                 │
       │ Meshtastic     │                 │
       └───────┬────────┘                 │
               │ LoRa 868 MHz             │
               │ Mesh multi-hop           │
       ┌───────▼────────┐                 │
       │   Autres nœuds │                 │
       │   du maillage  │                 │
       └───────┬────────┘                 │
               │                          │
       ┌───────▼─────────────────────────▼─────────┐
       │   Station relais MAILLON (option)         │
       │   (passerelle MQTT vers cloud)            │
       └───────┬───────────────────────────────────┘
               │ MQTT TLS
       ┌───────▼───────────────────────────────────┐
       │   MAILLON Cloud (UE — Scaleway/OVH)       │
       │  ┌──────────────┐  ┌─────────────────┐    │
       │  │ MQTT Broker  │  │  Backend API    │    │
       │  │ (EMQX/HiveMQ)│  │  (Next.js APIs) │    │
       │  └──────┬───────┘  └─────────┬───────┘    │
       │         │                    │            │
       │  ┌──────▼────────────────────▼──────┐     │
       │  │  PostgreSQL + TimescaleDB        │     │
       │  │  (positions, télémétrie, logs)   │     │
       │  └──────────────────────────────────┘     │
       │                                           │
       │  ┌────────────────────────────────────┐   │
       │  │  Frontend Next.js (App Router)     │   │
       │  │  — Dashboard SaaS                  │   │
       │  └────────────────────────────────────┘   │
       └───────────────────────────────────────────┘
```

---

## 2. Couche 1 — Firmware nœuds

### 2.1 Choix : Meshtastic (officiel)

- Version cible : **2.7.x stable**
- Présets MAILLON par défaut :
  - **Region** : EU_868
  - **Modem** : *Long Fast* par défaut (compromis range/débit), *Long Slow* en option
  - **Hop limit** : 3
  - **PSK par défaut** : "MAILLON-PUBLIC" (channel public d'urgence/découverte) + canal privé MAILLON-{KIT_ID}
  - **Position broadcast** : toutes les 5 min en mouvement, 30 min à l'arrêt
  - **Telemetry** : batterie + voltage toutes les 15 min
  - **MQTT** : désactivé par défaut (consentement explicite côté SaaS pour activation)

### 2.2 Process de préconfiguration usine

Script automatisé (Python + esptool/uf2):
1. Flash dernière version firmware Meshtastic stable
2. Application des presets MAILLON via fichier YAML de config
3. Génération PSK unique par kit (stockée + remise au client en notice)
4. Test fonctionnel (boot, GPS lock, transmission test)
5. Étiquetage série + traçabilité (DB MAILLON)

### 2.3 Mises à jour OTA / OTW

- Meshtastic supporte les MAJ over-the-wire (USB-C) et OTA via app smartphone
- MAILLON publie un guide FR pour MAJ par client
- Bulletins de sécurité mensuels (newsletter)

---

## 3. Couche 2 — App mobile

### 3.1 Décision an 1 : pas d'app maison

**Phase 1** (an 1) :
- Utilisation de l'**app Meshtastic officielle** (iOS + Android), excellente
- Plus une **page « Premier pas » MAILLON** avec QR code dans la notice → ouvre l'app et déclenche la connexion BLE

**Phase 2** (an 2 si justifié) :
- App **MAILLON Companion** (PWA d'abord, native si traction) qui ajoute :
  - Branding MAILLON
  - Carto cloud temps réel (lien SaaS)
  - Onboarding 4 écrans simplifié
  - Mode "secours" (gros boutons SOS, écran haute lisibilité)
  - Stack : Next.js (PWA) → React Native si besoin natif

### 3.2 Justification

- Meshtastic app est mature, multilingue (FR), avec BLE/Bluetooth fiable
- Construire une app dupliquée = 60 k€ dev pour duplication risquée
- Économie 60 k€ an 1, redéployable en stock/marketing

---

## 4. Couche 3 — Cloud SaaS Fleet Manager

### 4.1 Stack technologique

| Composant | Technologie | Justification |
|---|---|---|
| **Frontend** | Next.js 15 (App Router) + React 19 + TypeScript | SEO, server components, performance |
| **Styles** | Tailwind CSS v4 + shadcn/ui | Vitesse de développement, cohérence design |
| **Carte** | MapLibre GL (open-source, sans Mapbox token) ou Leaflet | RGPD-friendly, pas de tracking US |
| **Backend API** | Next.js Route Handlers (App Router) + tRPC | Type-safety end-to-end, monolithe simple |
| **Base de données** | PostgreSQL 16 + TimescaleDB ext | Time-series GPS/telemetry natif |
| **ORM** | Prisma | Migrations propres, schéma versionné |
| **Auth** | Better-Auth ou Lucia + 2FA TOTP | RGPD-friendly, sans fournisseur US |
| **MQTT broker** | EMQX (self-host UE, open-source) | Performant, multi-tenant |
| **File de tâches** | BullMQ (Redis) | Alertes, exports, jobs |
| **Stockage objets** | Scaleway Object Storage | UE, S3-compatible |
| **Monitoring** | Plausible (analytics) + Sentry self-host + Uptime Kuma | RGPD friendly |
| **CI/CD** | GitHub Actions → Scaleway | Open standard |

### 4.2 Schéma base de données (haut niveau)

```sql
-- Identifiants
users (id, email, name, hashed_password, totp_secret, role)
organizations (id, name, plan, max_nodes, settings_json)
memberships (user_id, org_id, role)

-- Inventaire
nodes (id, org_id, hardware_id, name, type, last_seen, current_position, battery)
node_groups (id, org_id, name)
node_group_members (node_id, group_id)
geofences (id, org_id, name, polygon_geojson, alerts_config)

-- Données
positions (node_id, ts, lat, lon, accuracy, source) -- Hypertable Timescale
telemetry (node_id, ts, key, value_num, value_text) -- Hypertable Timescale
messages (id, org_id, node_from, node_to, channel, ts, content_encrypted)
alerts (id, org_id, type, severity, ts, payload_json, ack_by, ack_ts)
audit_log (id, org_id, user_id, action, target, ts, ip) -- Hypertable Timescale

-- Facturation
subscriptions (id, org_id, plan, stripe_id, started, period_end)
invoices (id, org_id, stripe_id, amount, status)
```

### 4.3 Flow MQTT (positions/messages temps réel)

1. Nœud LoRa publie via station relais MAILLON sur topic `maillon/{org_id}/{node_id}/position`
2. EMQX broker routé sur instance dédiée par organisation (multi-tenant via ACL)
3. Worker Node.js consomme MQTT → écrit en TimescaleDB
4. Frontend SaaS s'abonne via WebSocket (server-sent events) au stream filtré
5. UI met à jour la carte en quasi temps réel

### 4.4 Architecture multi-tenant

- **Logical isolation** : org_id dans chaque table, RLS PostgreSQL activé
- **Physical isolation Enterprise** : option base de données dédiée par client (an 2)
- **Backups** : par tenant, restaurable individuellement

### 4.5 Performance cible

- API median latency p50 < 100 ms, p99 < 500 ms
- Carte temps réel update < 2 secondes après publication MQTT
- Tableau de bord initial load < 1.5 s
- Uptime cible : 99.5 % an 1, 99.9 % an 2 (Enterprise SLA)

---

## 5. Couche 4 — Site marketing & e-commerce

### 5.1 Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** strict
- **Tailwind CSS v4**
- **Radix UI / shadcn/ui** pour les composants accessibles
- **MDX** pour le blog (content as code)
- **Stripe Checkout** intégré pour paiements (kits + abonnements SaaS)
- **Plausible Analytics** (hébergé UE) pour analytics RGPD-friendly
- **i18n** : `next-intl` pour FR / EN / NL

### 5.2 Pages principales

| Route | Type | Contenu |
|---|---|---|
| `/` | Landing | Hero, USP, kits, témoignages, FAQ |
| `/kits` | Catalogue | Liste 3 kits + accessoires |
| `/kits/decouverte` | Détail | Kit Découverte |
| `/kits/pro` | Détail | Kit Pro |
| `/kits/secours` | Détail | Kit Secours |
| `/saas` | Landing | Présentation Fleet Manager |
| `/cas-usage/secours` | Vertical | Étude de cas FFSS |
| `/cas-usage/btp` | Vertical | Étude de cas BTP |
| `/cas-usage/outdoor` | Vertical | Étude de cas alpinisme |
| `/blog` | Liste | Index articles |
| `/blog/[slug]` | Détail | Article MDX |
| `/communaute` | Page | Discord, Telegram, meetups |
| `/docs` | Hub | Liens vers docs Meshtastic + guides FR |
| `/contact` | Form | Form B2B + B2C |
| `/cgv`, `/cgu`, `/mentions`, `/confidentialite` | Légal | Documents |
| `/app` | App SaaS | Dashboard (sous-domaine app.maillon.fr) |

### 5.3 Optimisations

- **Server Components partout** sauf interactivité explicite
- **Static generation** (SSG) pour landing, blog, kits → instant load
- **Edge caching** Vercel/Cloudflare
- **Image optimization** Next.js + AVIF/WebP
- **OpenGraph** + Schema.org structuré
- **Sitemap.xml** + **robots.txt** auto-générés
- **WCAG AA** minimum, contraste vérifié

---

## 6. Sécurité opérationnelle

### 6.1 Principes

- **Defense in depth** : multiple couches (TLS, rate limit, WAF, IDS, RLS DB, audit log)
- **Principe du moindre privilège** : chaque service avec credentials minimaux
- **Zero trust intra-VPC** : pas de confiance basée sur la position réseau
- **Audit log immutable** : tout changement critique tracé

### 6.2 Plans de réaction

- **Incident sécurité** : runbook dédié, équipe d'astreinte (1 fondateur an 1, 1 + 1 backup an 2)
- **Violation de données** : notification CNIL <72h, communication clients touchés
- **Outage SaaS** : status page (status.maillon.fr), uptime kuma, incident post-mortem public

### 6.3 Audits

- **Audit pen-test externe** : an 2 (~5 000–8 000 €)
- **Revue OWASP top 10** : trimestrielle
- **Veille CVE** : auto via Dependabot + Renovate

---

## 7. Architecture évolutive

### 7.1 An 1 — Monolithe Next.js (simple, rapide)

- 1 instance Next.js (frontend + API)
- 1 EMQX broker
- 1 PostgreSQL TimescaleDB
- 1 Redis
- Hébergement Scaleway VPS DEV1-M (~30 €/mois) puis PROD1-M (~80 €/mois)
- **Capacité** : 10 000 nœuds actifs sans souci

### 7.2 An 2 — Découplage léger

- Workers Node.js séparés pour ingestion MQTT (scale horizontal)
- DB répliquée (1 primaire + 1 replica lecture)
- CDN Cloudflare/BunnyCDN pour static assets
- **Capacité** : 100 000 nœuds

### 7.3 An 3 — Microservices ciblés

- Service ingestion (haute charge MQTT)
- Service carto (cache géographique)
- Service alertes (worker dédié)
- Conteneurisation Docker / Nomad / Kubernetes léger
- **Capacité** : 1 M+ nœuds

---

## 8. Risques techniques et parades

| Risque | Probabilité | Parade |
|---|---|---|
| Saturation MQTT broker (pic festival) | Moyenne | Auto-scaling EMQX, load balancer en front |
| Fuite PSK kit (compromission) | Faible | Rotation possible côté client, doc sécurité |
| Faille critique Meshtastic firmware | Faible | Veille upstream, MAJ rapide, communication clients |
| Panne hébergeur UE | Faible | Multi-AZ Scaleway dès an 2, backup OVH |
| Saturation DB time-series | Moyenne | Compression TimescaleDB, archivage > 1 an |
| Coût scaling > prévu | Moyenne | Quotas par plan, optimisation continue |

---

## 9. Open standards et interopérabilité

MAILLON s'engage à :
- **APIs documentées OpenAPI 3** dès la V1 SaaS
- **MQTT format Meshtastic standard** : un client peut migrer vers un autre fournisseur
- **Export GPX/KML** des positions historiques
- **Export JSON** complet des données utilisateur
- **Pas de vendor lock-in**

---

## 10. Recap décisions techniques fondamentales

| Décision | Choix |
|---|---|
| Firmware nœuds | Meshtastic 2.7+ stable, presets MAILLON |
| App mobile | Meshtastic officielle an 1, MAILLON Companion an 2 |
| Frontend SaaS | Next.js 15 + Tailwind + shadcn |
| Backend SaaS | Next.js APIs + tRPC + Prisma |
| Database | PostgreSQL + TimescaleDB |
| MQTT broker | EMQX self-host UE |
| Hébergement | Scaleway (Paris) primaire, OVH (Roubaix) backup an 2 |
| Auth | Better-Auth + TOTP, SSO Enterprise |
| Cartographie | MapLibre GL (libre, RGPD) |
| Analytics | Plausible (UE) |
| CI/CD | GitHub Actions → Scaleway |
| Monitoring | Sentry self-host + Uptime Kuma + Plausible |

---

**Conclusion technique** : stack moderne, légère, RGPD-friendly, défendable. Pas de buzzwords inutiles. Évolutivité prévue mais pas anticipée. Le firmware reste Meshtastic upstream — on ne se met jamais en travers de l'écosystème.
