# 13 — Checklist de lancement

> Liste opérationnelle ordonnée pour passer du dossier (jour 1) au lancement public (mois 5). Cochez au fur et à mesure.

---

## ⚖️ Légal & administratif (semaine 1-4)

- [ ] **Recherche d'antériorité INPI** sur la marque MAILLON (bases marques + sociétés + noms de domaine)
- [ ] **Dépôt INPI marque** classes 9, 38, 42 (~250 € + 50 € classe additionnelle)
- [ ] **Réservation domaines** : `maillon.fr`, `maillon.eu`, `maillon.app`, `maillon.community`, `maillon.io` (~50 €/an)
- [ ] **Création SASU** (statut, K-bis, déclaration RCS Paris) — comptable Pennylane + cabinet
- [ ] **Compte bancaire pro** Qonto ou Shine (3-5 jours)
- [ ] **Stripe France** activé, vérification KYC complétée
- [ ] **Adhésion éco-organisme DEEE** (Ecologic ou Ecosystem)
- [ ] **Adhésion médiateur de la consommation** (~80 €/an, AME ou autre)
- [ ] **RC Pro + RC Produit souscrites** (~2 000 €/an, courtier spécialisé tech)
- [ ] **Mentions légales, CGV, CGU SaaS, politique confidentialité, cookies** publiés (templates `web/app/*-page.tsx` à compléter avec immatriculation)
- [ ] **Registre des traitements RGPD** rédigé (article 30)
- [ ] **DPA** signés avec Stripe, Scaleway, Resend, Plausible
- [ ] **Procédure violation de données** documentée

## 🎨 Identité & branding (semaine 1-3)

- [ ] **Brief designer** envoyé (voir `docs/12-brand-identity.md` § 10)
- [ ] **Logo livré** : 5 variantes + favicon + sources Figma + SVG/PNG/AI
- [ ] **Photos hero commandées** ou achetées (5 thématiques)
- [ ] **Stickers MAILLON** imprimés (premier lot 500 ex)
- [ ] **Cartes de visite** (recto verso, FSC, format 85×55)
- [ ] **Notice illustrée Kit Découverte** (4 volets A5 plastifié)
- [ ] **Notice illustrée Kit Pro** (12 pages A5 piqure)
- [ ] **Notice Kit Secours** (24 pages A5 reliure spirale)

## 🔧 Produit hardware (semaine 2-12)

- [ ] **Achat lot test** : 5 T-Echo + 5 T-Beam + 5 RAK + 2 Station G2 (~1 500 €)
- [ ] **Validation script `preconfig.py`** sur les 5 hardware différents
- [ ] **Process préconfiguration documenté** (vidéo interne 5 min)
- [ ] **BOM final figé** par kit avec fournisseurs primaire et secondaire
- [ ] **Premier batch commande** : 50 Découverte + 20 Pro + 10 Secours (~9 500 €)
- [ ] **Cartons + mousse découpée** custom (Packhelp ou Smurfit)
- [ ] **Test packaging** : test de chute, test de vibration
- [ ] **Marquage CE vérifié** sur chaque référence (DoC fabricants archivées)

## 💻 Web & SaaS (semaine 1-20)

- [ ] **Site `web/`** déployé sur Vercel ou Scaleway Edge
- [ ] **DNS configuré** (Cloudflare avec proxying UE Data Boundary)
- [ ] **Analytics Plausible** self-host actif
- [ ] **Email transactionnel** Resend ou Mailjet configuré (templates FR)
- [ ] **Stripe Checkout** intégré sur les pages kits
- [ ] **API `/api/preorder` et `/api/contact`** brancées sur DB Postgres (au lieu de JSONL)
- [ ] **OG image dynamique** vérifiée sur LinkedIn/Twitter/Discord previews
- [ ] **SaaS Fleet Manager MVP** déployé (auth, carte, messagerie)
- [ ] **MQTT broker EMQX** UE déployé (TLS, auth par compte)
- [ ] **PostgreSQL + TimescaleDB** provisionné (Scaleway managed)
- [ ] **Backups SaaS** automatisés et testés (restoration)
- [ ] **Status page** (status.maillon.fr) avec uptime kuma

## 📣 Communauté & contenu (semaine 1-16)

- [ ] **Discord MAILLON FR** créé avec channels (général, kits, FFSS, BTP, outdoor, agri, dev)
- [ ] **Telegram réactivé** ou ouvert (avec accord communauté Meshtastic FR)
- [ ] **LinkedIn page entreprise** + page perso fondateur
- [ ] **Mastodon + Bluesky comptes** créés
- [ ] **YouTube chaîne** créée + 3 vidéos publiées (présentation, déballage, démo)
- [ ] **Newsletter Substack** active, 1 article/semaine
- [ ] **5 articles blog SEO** publiés (Meshtastic, comparatif Garmin, législation, etc.)
- [ ] **First meetup Paris** organisé (10-20 personnes)

## 💼 Commercial & GTM (semaine 4-24)

- [ ] **20 entretiens découverte B2B** réalisés et synthétisés
- [ ] **30 entretiens B2C** via formulaire long
- [ ] **100 pré-commandes qualifiées** (waitlist)
- [ ] **3 pilotes FFSS** identifiés et prêt-démo planifié
- [ ] **3 pilotes BTP** identifiés et prêt-démo planifié
- [ ] **5 ambassadeurs outdoor** contractés
- [ ] **Stand Forum Sécurité Civile** réservé (mai/juin)
- [ ] **Stand Préventica** réservé (septembre)
- [ ] **2 études de cas** rédigées (pilote FFSS + pilote BTP)
- [ ] **Lookbook B2B** PDF (16 pages, à envoyer en outbound)

## 📊 Finance & pilotage (continu)

- [ ] **Compta Pennylane** active, factures auto-générées
- [ ] **Dashboard pilotage** (Notion ou Metabase) avec KPIs hebdo
- [ ] **Subvention BPI Bourse French Tech** demandée
- [ ] **Subvention Région** identifiée et demandée
- [ ] **CIR / CII** dossier monté (si dev SaaS éligible)
- [ ] **Ligne BPI court terme 20 k€** négociée en filet (M5 si tendu)

## 🚀 Lancement public (mois 5)

- [ ] **Bilan pré-lancement** : 100+ pré-commandes, 20+ entretiens B2B, 3 pilotes en cours
- [ ] **Stock de lancement** : 80 kits prêts à expédier
- [ ] **Email "Premier kit MAILLON disponible"** envoyé à toute la waitlist
- [ ] **Communiqué de presse** envoyé à 30 journalistes/blogueurs (tech, outdoor, BTP, secours)
- [ ] **Post LinkedIn fondateur** + relais ambassadeurs
- [ ] **Webinaire de lancement** planifié, inscriptions ouvertes
- [ ] **Stripe Checkout en production**, test fini
- [ ] **Premier RDV B2B post-lancement** dans le calendrier

---

## Critères go/no-go pour le lancement public

À valider 2 semaines avant date prévue :

| Critère | Cible | Décision si manquée |
|---|---|---|
| Pré-commandes qualifiées | ≥ 80 | Repousser de 4 semaines |
| Stock prêt à expédier | ≥ 50 kits | Repousser jusqu'à stock OK |
| SaaS uptime sur 7j de beta | > 99 % | Reporter SaaS, lancer hardware seul |
| Tests RMA process | ≥ 3 cas simulés ok | Repousser 2 semaines |
| Documents légaux validés | 100 % publiés | Repousser jusqu'à OK |
| Premier pilote validé en démo | ≥ 1 retour positif | Reporter mais lancer quand même |

---

## Anti-checklist (ce qu'on ne fait PAS au lancement)

- [ ] ❌ Pas d'app mobile MAILLON dédiée (l'app Meshtastic officielle suffit en MVP)
- [ ] ❌ Pas de marque blanche (an 2)
- [ ] ❌ Pas de Reticulum option (an 2)
- [ ] ❌ Pas de levée de fonds avant traction visible (an 2 si pertinent)
- [ ] ❌ Pas d'embauche avant break-even mensuel (M11+)
- [ ] ❌ Pas de bureaux loués (remote / coworking en M1-12)
- [ ] ❌ Pas de campagnes paid massives (CAC à valider sur petits tickets d'abord)

---

**Conclusion** : 6 grands blocs (légal, branding, hardware, web/SaaS, communauté, commercial) à orchestrer en parallèle sur 5 mois. Discipline d'exécution > vitesse brute. Chaque semaine : 1 stand-up perso de 30 min sur cette checklist, ajuster les priorités.
