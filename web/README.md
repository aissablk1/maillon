# MAILLON — Web

Site marketing et catalogue MAILLON. Next.js 15 (App Router) + React 19 + Tailwind CSS v4.

## Stack
- **Next.js 15** (App Router, Server Components par défaut)
- **React 19**
- **TypeScript** strict
- **Tailwind CSS v4** (config CSS-only via `@theme`)
- **next/font** (Inter + JetBrains Mono, auto-optimisés)
- Pas de dépendances UI externes en MVP : composants custom, accessibles natifs.

## Démarrage

```bash
cd web
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts
- `npm run dev` — serveur de développement (Turbopack)
- `npm run build` — build de production
- `npm run start` — démarre le serveur de prod
- `npm run lint` — linting Next.js
- `npm run typecheck` — vérification TypeScript stricte

## Structure
```
web/
├── app/
│   ├── api/
│   │   └── preorder/route.ts    # API pré-commande
│   ├── globals.css              # Tailwind v4 + tokens MAILLON
│   ├── layout.tsx               # Root layout (fonts, metadata)
│   └── page.tsx                 # Landing page principale
├── components/
│   ├── KitCard.tsx              # Carte kit (Découverte, Pro, Secours)
│   ├── MeshDiagram.tsx          # Visuel hero (SVG animé)
│   ├── PreorderForm.tsx         # Formulaire pré-commande
│   ├── SiteFooter.tsx
│   ├── SiteHeader.tsx
│   └── VerticalRow.tsx          # Ligne secteur vertical
├── lib/                         # Utilitaires (vide pour l'instant)
├── public/                      # Assets statiques
├── next.config.ts
├── postcss.config.mjs
├── package.json
└── tsconfig.json
```

## Conventions

- **Server Components par défaut**, ajouter `"use client"` uniquement si interactivité (form, hooks).
- **Aliases TypeScript** : `@components/*`, `@lib/*` (voir `tsconfig.json`).
- **Typographie** : utiliser les vrais caractères Unicode (`›`, `…`, `—`, `«&nbsp;»`, `'`). Voir `~/.claude/CLAUDE.md` règles globales.
- **Chevrons `›`** dans tous les liens « En savoir plus » avec `&nbsp;` insécable devant.
- **Tailwind v4** : tokens dans `globals.css` `@theme`, accès via `var(--color-forest)` ou classes utilitaires.
- **Accessibilité** : WCAG AA minimum, semantic HTML, `aria-label` quand approprié.

## TODO post-MVP
- [ ] Routes individuelles `/kits/decouverte`, `/kits/pro`, `/kits/secours`
- [ ] Page `/saas` (présentation Fleet Manager)
- [ ] Page `/communaute` (Discord, Telegram, meetups)
- [ ] Page `/cas-usage/[slug]` (études de cas)
- [ ] Blog MDX `/blog`
- [ ] Pages légales `/cgv`, `/cgu`, `/confidentialite`, `/mentions-legales`
- [ ] OG images dynamiques `next/og`
- [ ] Sitemap.xml + robots.txt auto
- [ ] Analytics Plausible self-host
- [ ] Stripe Checkout pour paiement kits
- [ ] Persistance pré-commandes en Postgres (pour l'instant : JSONL local)
- [ ] Tests Playwright des parcours critiques
- [ ] i18n EN, NL (an 2)

## Déploiement
- **Cible** : Vercel (Next.js natif) ou Scaleway Edge Functions (souveraineté UE)
- Hébergement images / assets : Scaleway Object Storage
- DNS : Cloudflare avec proxying (RGPD friendly avec EU Data Boundary)
