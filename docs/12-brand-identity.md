# 12 — Identité de marque

> Nom, logo, palette, typographie, voix, applications.

---

## 1. Nom

**MAILLON**

### Origine et signification
- *Maillon* (n.m.) : chaque anneau d'une chaîne. En réseau mesh, chaque nœud est un maillon — perdre un maillon ne casse pas la chaîne, le maillage trouve un autre chemin.
- Polysémie : *un maillon faible* (rien ne doit l'être) → chez nous, on construit des maillons **solides**.
- **Disponibilité** : marque non déposée à l'INPI (vérification à faire à M1), domaines `.fr`, `.eu`, `.app`, `.community` libres au 25/04/2026.

### Variantes typographiques
- Principal : **MAILLON** (capitales, sans empattement, espacé)
- Logotype court : **M—** (un *M* + un tiret cadratin évoquant le réseau)
- Tagline : *« Le réseau qui porte loin »*

### Sonorité
- Phonétiquement : /ma.jɔ̃/, deux syllabes, ferme, masculin
- Mémorisable, prononçable en français/anglais/néerlandais/allemand
- Pas de connotation négative dans les principales langues européennes

---

## 2. Logo

### Concept
Une chaîne stylisée formant un maillage minimaliste — trois anneaux entrelacés à 120°, ou un seul anneau ouvert avec une trace de signal radio.

### Variantes nécessaires
1. **Logo principal** (symbole + wordmark horizontal)
2. **Logo vertical** (symbole au-dessus du wordmark, pour réseaux sociaux)
3. **Symbole seul** (favicon, app icon)
4. **Wordmark seul** (en-tête de doc)
5. **Versions monochromes** (noir, blanc) pour marquages produit
6. **Version one-color** sur fond coloré (kit, packaging)

### Spec techniques
- **Formats** : SVG (source), PNG @1x/@2x/@3x, ICO (favicon), AI/EPS (vectoriel print)
- **Espace de respiration** : 1× la hauteur du M autour du logo en toute application
- **Taille minimale** : 24 px hauteur sur écran, 8 mm en print
- **Pas de** : ombres portées, dégradés, étirement, contour

### Briefing designer freelance (pour M1)
> « Logo pour MAILLON, marque de communications mesh longue portée. Univers : outdoor + tech sobre + résilience. Le symbole doit évoquer un maillage / réseau / chaîne, sans cliché radio (pas de tour cellulaire, pas d'ondes Wi-Fi). Référence d'inspiration : Patagonia (sobriété), Stripe (typo), Linear (rigueur). Pas de gradient, pas de bling. Trois propositions, livrables sources Figma + SVG. »

Budget : 1 200–2 000 € freelance senior.

---

## 3. Palette de couleurs

### Couleurs primaires

| Nom | HEX | RGB | Usage |
|---|---|---|---|
| **Vert profond** *Forêt* | `#1F3D2E` | 31, 61, 46 | Fond primaire dark, sérieux, outdoor |
| **Vert vif** *Mousse* | `#4A8B6A` | 74, 139, 106 | Accents actifs, CTAs secondaires |
| **Sable** *Calcaire* | `#F5F0E6` | 245, 240, 230 | Fond clair, surfaces |
| **Charbon** *Anthracite* | `#1A1F1C` | 26, 31, 28 | Texte principal, éléments structurels |

### Couleurs secondaires

| Nom | HEX | Usage |
|---|---|---|
| **Orange signal** | `#E87D2C` | Alertes, SOS, CTAs primaires |
| **Bleu cobalt** | `#2854A8` | Liens, infos B2B sérieuses |
| **Blanc pur** | `#FFFFFF` | Texte sur fond dark |

### Sémantique fonctionnelle (UI/UX)

| Type | Couleur |
|---|---|
| Succès | `#4A8B6A` (vert mousse) |
| Avertissement | `#E8A22C` (jaune ambre) |
| Danger / SOS | `#D14444` (rouge profond) |
| Info | `#2854A8` (bleu cobalt) |

### Modes (light/dark)

- **Mode light (défaut B2C)** : fond sable, texte charbon, accents vert profond
- **Mode dark (défaut SaaS B2B)** : fond charbon, texte blanc, accents vert mousse + orange signal pour alerts

### Application packaging

- Boîte Découverte : sable + accent vert mousse
- Boîte Pro : charbon + accent orange signal
- Boîte Secours : vert profond + accent orange signal (priorité opérationnelle)

---

## 4. Typographie

### Choix : duo

- **Inter** (sans-serif moderne, lisible, libre, https://rsms.me/inter/)
  - Body, UI, navigation, paragraphes
  - Variable font (poids 100–900 disponibles)
- **JetBrains Mono** (monospace, libre)
  - Code, données techniques, références produits

### Hiérarchie typographique (web)

| Niveau | Font | Taille desktop | Taille mobile | Poids |
|---|---|---|---|---|
| H1 (hero) | Inter | 64 px | 40 px | 700 |
| H2 | Inter | 44 px | 32 px | 700 |
| H3 | Inter | 28 px | 24 px | 600 |
| H4 | Inter | 20 px | 18 px | 600 |
| Body | Inter | 17 px | 16 px | 400 |
| Small | Inter | 14 px | 13 px | 400 |
| Mono | JetBrains Mono | 15 px | 14 px | 400 |

### Règles typographiques (rappel global CLAUDE.md)

- **Chevron** : `›` (U+203A) précédé d'un `&nbsp;` dans tous les liens « En savoir plus », « Découvrir », etc.
- **Ellipses** : `…` (U+2026), jamais `...`
- **Tirets cadratins** : `—` (U+2014) pour les incises
- **Guillemets français** : `« … »` avec espaces insécables
- **Apostrophes typographiques** : `'` (U+2019), jamais `'`
- **Espaces insécables** : avant `: ; ! ? % »`, après `«`

---

## 5. Voix de marque (tone of voice)

### Principes (rappel `02-positionnement.md`)

- Direct, posé, technique sans jargon
- Pas de superlatifs creux (« révolutionnaire », « ultime », « disruptif »)
- Chiffres concrets et preuves
- Humour discret en B2C, sérieux en B2B
- Pas d'emoji dans le copy formel ; quelques emojis discrets en social B2C uniquement

### Adresse

- **B2C** : tutoiement (« tu pars en bivouac, MAILLON garde le contact »)
- **B2B** : vouvoiement (« vos équipes restent coordonnées sur 30 km »)
- **Configurable** : option dans le SaaS pour adapter le ton de l'app utilisée par le client

### Vocabulaire à privilégier / à éviter

| À privilégier | À éviter |
|---|---|
| Mesh, maillage, nœud, relais | Cellule, antenne (sauf contexte tech précis) |
| Comms, message, position | Tracking, surveillance |
| Zone d'intervention | Théâtre d'opération (trop militaire) |
| Équipe | Crew, team (anglicismes inutiles) |
| Ouvert source | Open source (sauf en EN) |
| Hors connexion / off-grid | Disconnected |
| Sécurité / confidentialité | Privacy (en FR) |
| Champ | Outdoors, plein air |
| Chantier | Site (anglicisme) |

### Exemples de copy (do)

- *« 30 km à vue. 300 km en relais. Zéro abonnement. »*
- *« Quand tout tombe, MAILLON tient. »*
- *« Ouvrez la boîte. Allumez les nœuds. C'est connecté. »*
- *« Vos secouristes en montagne. Votre coordinateur au PC. La même carte. »*
- *« Pas de SIM, pas de licence, pas de relais à payer. »*

### Exemples (don't)

- ~~« Réinventons la communication ! »~~ (creux)
- ~~« Soyez ultra-connectés en toute circonstance ! »~~ (point d'exclamation gratuit, ton infomerciale)
- ~~« La technologie LoRa de pointe pour une expérience révolutionnaire »~~ (jargon, vide)
- ~~« Notre solution disruptive change le paradigme »~~ (à brûler)

---

## 6. Iconographie & illustration

### Style icônes
- **Lucide React** (icônes libres, cohérentes) : pour UI app et SaaS
- Trait fin uniforme, pas de remplissage
- Évite les pictogrammes 3D ou les emojis natifs

### Style photo / image hero
- **Photographie réaliste** d'usage extérieur : montagne, chantier, secours, festival
- Pas de stock photos clichées (jeunes en costume tenant un téléphone)
- Privilégier des photos commandées à un photographe outdoor (~800 €/jour) ou photos communauté avec accord

### Illustration data viz (SaaS)
- Carto MapLibre style sombre (carto rétro respectueux RGPD)
- Graphes en lignes simples (pas de 3D)
- Pas de pictos animés

---

## 7. Applications

### Site web
- Voir mockup `web/` du projet (Next.js)
- Layout : grille 12 colonnes, max-width 1200 px, padding latéral généreux
- Hero plein écran avec photo / video light (max 5 sec, < 2 Mo)
- Cards des kits côte à côte sur desktop, stack sur mobile

### Documents (notice, fiche produit)
- A5 4 ou 12 volets, plié à la française
- Couverture : logo + symbole + tagline
- Intérieur : 1 idée par page, illustrée
- Pied de page systématique : URL, version, date

### Réseaux sociaux

| Plateforme | Rôle | Cadence |
|---|---|---|
| **LinkedIn** | B2B, études de cas, recrutement | 2-3 posts/sem |
| **YouTube** | Démos, tutos, comparatifs | 1 vidéo/sem |
| **Mastodon** | Communauté tech, dev | 3-5 posts/sem |
| **Bluesky** | Croissance grand public progressive | 3-5 posts/sem |
| **Instagram** | Photos terrain outdoor (an 2) | 1 post/sem |
| Pas de X/Twitter | (pour l'instant) | – |

### Branding emails

- Adresses : prenom@maillon.fr (humaines), bonjour@maillon.fr (général)
- Signature : nom, fonction, MAILLON, URL, courte phrase de marque
- HTML simple, pas de design lourd

---

## 8. Naming des produits

### Hiérarchie

- **Kits** : Découverte, Pro, Secours, Sur-mesure → simples et descriptifs
- **SaaS plans** : Free, Team, Business, Enterprise → standards SaaS
- **App mobile (an 2)** : MAILLON Companion
- **Modules SaaS** : Carte, Alertes, Géofences, Replay, API → simples et fonctionnels

### Pas de noms inventés
On évite les *Aurora*, *Phoenix*, *Atlas* qui obligent un investissement de notoriété supplémentaire pour chaque produit. **MAILLON Pro**, c'est clair.

---

## 9. Assets à produire en M1-M2

| Asset | Priorité | Échéance | Coût |
|---|---|---|---|
| Logo (5 variantes + brand kit) | ★★★ | M1 | 1 500 € |
| Police Inter installée + JetBrains Mono | ★★★ | M1 | 0 € |
| Palette CSS / Tailwind config | ★★★ | M1 | 0 € (interne) |
| Photos hero 5 thématiques (montagne, BTP, secours, festival, agri) | ★★ | M2-3 | 1 000–2 000 € |
| Illustrations isométriques diagramme mesh | ★★ | M2 | 600 € |
| Mockups produits (kits sur fond sable, fond charbon) | ★★ | M3 | 400 € |
| Templates social media (Canva ou Figma) | ★ | M2 | 200 € |
| Maquettes notice imprimée 3 kits | ★★ | M3 | 800 € |
| **Total branding M1-M3** | | | **~5 000 €** |

---

## 10. Charte graphique : checklist pour designer

Briefing complet à fournir au designer :
- ✅ Nom de marque : MAILLON
- ✅ Tagline : « Le réseau qui porte loin »
- ✅ Mission : démocratiser le mesh longue portée en France/UE
- ✅ Cibles : pros (secours, BTP) + outdoor B2C
- ✅ Univers : outdoor + tech sobre + résilience + ouvert (open-source)
- ✅ Palette : vert profond + sable + charbon + orange signal
- ✅ Typo : Inter + JetBrains Mono
- ✅ Voix : direct, posé, technique sans jargon
- ✅ Anti-modèles : Hytera (institutionnel froid), Garmin (sport agressif), Helium (crypto-flashy)
- ✅ Modèles : Patagonia (sobriété), Stripe (typo), Linear (rigueur), Decathlon (accessibilité fonctionnelle)
- ✅ Livrables : brand kit Figma + SVG/PNG/AI/EPS exports

---

**Conclusion identité** : MAILLON construit une marque sobre, sérieuse, française, qui inspire confiance aux pros sans être inaccessible aux particuliers. La cohérence visuelle est le multiplicateur silencieux de toutes les actions GTM.
