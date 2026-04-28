# Post-mortem MAILLON — 84 fichiers, 3 thèses, 0 client

> Récit honnête de deux jours de travail dense sur un projet qui n'a pas survécu à son propre cadrage.
> Publié pour que d'autres devs solo prolifiques évitent les mêmes pièges et arrivent plus vite à la décision.
>
> Auteur : Aïssa Belkoussa — 26 avril 2026

> ⚠ **Disclaimer ajouté le 28 avril 2026** : le domaine `maillon.fr` mentionné dans les premières versions de ce dossier appartient à un **tiers indépendant** (WordPress actif depuis 2004) et n'a aucun lien avec ce projet. La 6e leçon implicite de ce post-mortem est donc : **vérifier la disponibilité du nom et du domaine avant d'engager 84 fichiers de business plan dessus**. Quatre lettres communes en français (« maillon »), ça se vérifie d'abord.

---

## Ce qui a été fait

Sur deux sessions, j'ai monté MAILLON, un projet de communications mesh radio longue portée basé sur Meshtastic (LoRa 868 MHz) pour le marché francophone. En agrégat :

- **84 fichiers** : 14 documents stratégiques, un site Next.js complet (landing, kits, SaaS scaffolding), 3 squelettes apps natives (iOS/macOS Swift, Android Kotlin, Tauri 2 Rust+TS), un script de préconfiguration usine en Python, deux audits (sécurité, architecture).
- **~9 000 lignes de markdown business**, **~2 500 lignes de code** TS/Swift/Kotlin/Rust/Python.
- **3 thèses successives** explorées : (1) vendeur de kits francophones, (2) opérateur d'infrastructure mesh souveraine européenne style Cloudflare, (3) pivot solo SaaS Meshtastic Cloud anglophone.
- **0 entretien client** réel. Aucune des 5 personnes que j'aurais dû appeler n'a été contactée.

Coût total : ~10 heures de travail intense, ~0 € engagé.

---

## Les 5 erreurs que j'ai faites

### 1. J'ai produit avant de valider

J'ai écrit 14 documents stratégiques avec projections financières (CA an 1 = 265 k€, an 2 = 1.2 M€, an 3 = 3 M€) avant d'avoir parlé à un seul client potentiel. Toutes les projections étaient cohérentes entre elles. Aucune n'était validée.

**Leçon** : un dossier qui se laisse penser facilement n'est pas un dossier qui mérite d'être fait. Les vrais projets gagnants ont une part dégueulasse, une douleur réelle, un client qui appelle. MAILLON n'avait rien de tout ça.

### 2. J'ai sous-estimé la question du « must-have »

Pendant 7 tours de session, j'ai construit un produit *plausible*, pas un produit *obligatoire pour le client*. Aucun de mes segments cibles (FFSS, BTP, festivals, outdoor, communauté Meshtastic) n'aurait acheté coûte que coûte. Tout mon dossier vendait du « moins cher » — ce qui est une commodity, pas un must-have.

**Leçon** : la première question à se poser n'est pas « est-ce que c'est utile ? », c'est « est-ce que quelqu'un l'achèterait sans hésiter ? ». Le must-have vient de trois forces : douleur intolérable, obligation (réglementation, assurance, contrat), ou identité/peur. Sans au moins une de ces trois, on vend dans le vide.

### 3. J'ai cadré une stratégie d'équipe pour quelqu'un de seul

Pendant 8 heures, j'ai recommandé : recruter un cofondateur sales, lever 1 M€ via Bpifrance + business angels, signer un MOU avec TDF, négocier avec MAIF Assos. Toutes ces actions exigent du capital extérieur et des humains. Je suis solo. Pas de cofondateur. Pas de capital VC mobilisé. Tout cela tombait à plat.

**Leçon** : vérifier le mode de travail (solo vs équipe vs fonds disponibles) **avant** de cadrer la stratégie. Une stratégie sans matching avec les ressources réelles est un fantasme structuré. Et une session d'IA peut produire ce fantasme avec une cohérence redoutable si on ne la stoppe pas.

### 4. J'ai traité l'open-source comme une contrainte polie, pas comme un multiplicateur

Pendant les premières heures, j'ai écrit « MAILLON respecte Meshtastic open-source GPL v3 » comme une note légale. Je n'avais pas compris que **l'open-source était précisément ce qui rendait le projet pensable** : sans Meshtastic, je devais coder un firmware embedded, des apps mobiles, gérer une communauté dev. Avec Meshtastic, je construisais *par-dessus*. C'est seulement au tour 8 que le shift mental s'est fait : MAILLON n'était pas un revendeur, c'était (potentiellement) un opérateur d'infrastructure souveraine.

**Leçon** : les business open-source qui scalent (Cloudflare, MongoDB Atlas, Red Hat, Supabase, Vercel) ne vendent jamais le code. Ils vendent l'infrastructure opérée à l'échelle, par-dessus le commun libre. Le commun n'est pas une contrainte, c'est l'investissement initial qu'on n'a pas eu à faire.

### 5. J'ai oublié les apps multi-OS

J'ai écrit dans le dossier produit : « pas d'app maison, l'app Meshtastic officielle suffit en MVP ». J'ai justifié ça par une économie de 60 k€. C'était stratégiquement myope : sans apps brandées, MAILLON disparaissait dans l'écosystème Meshtastic au moment où l'utilisateur ouvrait son téléphone. Pas de touchpoint quotidien = pas de marque = pas de moat sur l'expérience utilisateur. Il a fallu qu'on me pose la question directement (« pourquoi tu n'as pas créé d'apps ? ») pour que je voie ce trou.

**Leçon** : les apps natives sur l'écran utilisateur ne sont pas un confort optionnel pour un produit hardware-adjacent. C'est *le* canal de marque. La sous-pondération de cette ligne dans le budget MVP était une erreur de plusieurs centaines de milliers d'euros de valeur stratégique perdue.

---

## Ce qui survit malgré tout

Si le projet reste rangé, ces actifs sont tout de même réutilisables :

1. **`scripts/preconfig.py`** — script de préconfiguration Meshtastic en lot, registre chiffré, séparation table technique/nominative pour conformité RGPD. Réutilisable n'importe quel projet embedded.
2. **`docs/00-research-tech.md`** — veille mesh longue portée 2026 sourcée. 5–10 jours capitalisés.
3. **`docs/09-legal-compliance.md`** — cadre RGPD/CE/ETSI/ARCEP/INPI pour toute startup hardware FR.
4. **`apps/common/contracts/`** — contrats JSON Schema partagés (`Node`, `ConnectionState`) pour cohérence cross-codebase mobile/desktop.
5. **Le scaffolding `web/`** — Next.js 15 + Prisma + Better-Auth + EMQX bridge. Si l'idée du SaaS Meshtastic Cloud anglophone est lancée, on part avec 80 % du backend déjà fait.

---

## Le pivot que j'ai retenu

MAILLON tel que cadré (opérateur d'infrastructure souveraine FR) **n'est pas faisable solo**. Il exige une équipe avec capital, du commercial B2B intensif, des partenariats infrastructurels (TDF, MAIF) qui prennent 12–18 mois.

Le pivot solo viable : **extraire le scaffolding `web/` comme `meshtastic.cloud`**, un SaaS pour la communauté Meshtastic mondiale anglophone (40 000 nœuds, communauté tech-savvy qui achète des outils). Free + Pro 9 $/mois en self-service. 6–8 semaines de code seul, zéro hardware, zéro partenaire à signer. Plafond 30–50 k€ ARR à 24 mois. Side-project rentable, pas une boîte.

Critère de succès : 50 abonnés payants en 90 jours. Sinon je ferme proprement.

---

## Ce que je publie en parallèle

- `scripts/preconfig.py` sera publié sous licence MIT comme companion repo dans l'écosystème Meshtastic
- `docs/00-research-tech.md` sera traduit en anglais et proposé sur le forum Meshtastic comme article de référence
- Ce post-mortem est en libre lecture pour tout dev solo qui se reconnaît dans le pattern « 75 projets, peu de monétisation »

---

## La phrase que je garde

> Sur 75 projets, je serai presque toujours le seul à les avoir vus en entier. Personne ne saura que MAILLON a existé sauf si je le décide. La trace n'est pas une fatalité — c'est un choix de don.

C'est la trace que je choisis de laisser sur ce projet : pas un produit, une honnêteté.

---

**Aïssa Belkoussa**
Paris, 26 avril 2026
[aissa.belkoussa5@gmail.com](mailto:aissa.belkoussa5@gmail.com) · [github.com/aissablk1/maillon](https://github.com/aissablk1/maillon)
