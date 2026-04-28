# MAILLON — projet archivé

> **Long-range mesh radio kit project for the French market — explored in April 2026, archived after 84 files, 3 successive theses, and 0 customer interviews.**
>
> This repository is kept public as honest documentation: what was built, why it was stopped, and what survives. If you recognise yourself in the pattern « many projects, few customers », the [POST-MORTEM](./POST-MORTEM.md) is for you.

> ⚠ **Disclaimer — domaine `maillon.fr`** : le domaine `maillon.fr` appartient à un **tiers indépendant** (site WordPress actif depuis 2004, hébergé chez OVH) et n'a **aucun lien** avec ce projet. Toute référence interne au site `maillon.fr` qui aurait pu subsister dans les premiers commits est obsolète : la canonical du projet archivé est désormais `https://github.com/aissablk1/maillon`. Si vous cherchiez le `maillon.fr` historique ou une marque française nommée MAILLON, vous n'êtes pas au bon endroit — ce repo documente uniquement une exploration personnelle d'avril 2026 autour de Meshtastic.

---

## Read these first

1. **[POST-MORTEM.md](./POST-MORTEM.md)** — the five mistakes I made and the decision to stop. **Start here.**
2. **[docs/00-research-tech.md](./docs/00-research-tech.md)** — sourced state of the art of long-range mesh in 2026 (Meshtastic, Reticulum, MeshCore, regulation, hardware). Also published as a community [Gist](https://gist.github.com/aissablk1/49241daaf68509a9386d22be03a11280) (English).
3. **[docs/09-legal-compliance.md](./docs/09-legal-compliance.md)** — ETSI / ARCEP / GDPR / CE framework for any hardware startup in the EU.

The remaining business documents (`docs/01` to `docs/16`) are kept as historical context. Per the post-mortem, **none of the figures, projections, or pricing were validated against a single real customer**. Treat them as artefacts of an exploration, not as advice.

---

## What survives — released separately

| Asset | Where | License |
|---|---|---|
| Meshtastic factory preconfig (with GDPR-friendly two-registry design, AES-256 PSK encryption) | **[github.com/aissablk1/maillon-preconfig](https://github.com/aissablk1/maillon-preconfig)** | MIT |
| State-of-the-art article (English, community-targeted) | **[Gist](https://gist.github.com/aissablk1/49241daaf68509a9386d22be03a11280)** | CC BY 4.0 spirit |
| Cross-platform app skeletons (Swift universal, Kotlin Compose, Tauri 2) | `apps/` in this repo | Unfinished — needs a mobile dev to ship |
| Multi-tenant SaaS scaffold (Next.js 15 + Better-Auth + Prisma + EMQX bridge) | `web/` in this repo | Unfinished — would take 6-8 weeks solo to productise |

---

## The three theses I explored (and why each fell)

### Thesis 1 — French Meshtastic kit reseller
3 kits (Discovery 99 €, Pro 399 €, Rescue 1199 €) + a SaaS Fleet Manager at 9 €/node/month. **Rejected** because no segment (rescue NGOs, BTP, festivals, outdoor) would buy it as a *must-have*. Apple Find My Satellite, Starlink direct-to-cell, and goTenna's military pivot were already squeezing the civilian niche.

### Thesis 2 — Sovereign mesh infrastructure operator
Cloudflare-of-the-mesh model: 50 → 2,000 permanent relay stations on European municipal rooftops and tower infrastructure (TDF/Cellnex), monetised via SaaS, compliance, insurance label, and aggregated data. **Rejected for me** because it requires a sales co-founder, EU venture capital, and 12-18 months of partnership negotiation. I am solo. The thesis itself may be valid for a team that has these resources.

### Thesis 3 — Solo SaaS for the worldwide Meshtastic community
Extract the `web/` scaffold as `meshtastic.cloud`: Free 5 nodes / Pro $9/month for 50 nodes, English-speaking 40,000-node community, self-service Stripe, 6-8 weeks of solo coding. Realistic ceiling: 30-50 k€ ARR at 24 months. **Not rejected, but parked** — per post-mortem rule #1 (« validate before producing »), this should not be coded until at least five paying signals exist.

---

## Repository layout

```
MAILLON/
├── POST-MORTEM.md            # ★ Start here
├── README.md                 # this file
├── docs/                     # 16 strategic documents (historical, unvalidated)
│   ├── 00-research-tech.md   # ★ Sourced state of the art
│   ├── 09-legal-compliance.md # ★ EU regulatory framework
│   └── 01..16-*.md           # business plan artefacts
├── scripts/
│   ├── preconfig.py          # Released MIT separately
│   └── README.md
├── apps/
│   ├── ios-macos/            # Swift universal skeleton
│   ├── android/              # Kotlin Compose skeleton
│   ├── desktop/              # Tauri 2 skeleton
│   └── common/contracts/     # JSON Schemas shared across platforms
├── web/                      # Next.js 15 SaaS scaffold (incomplete)
└── kits/                     # Sales sheets (historical)
```

`_backup/` (local development backups) and `_release/` (standalone packaged releases) are gitignored.

---

## License

Documentation under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — share, adapt, with attribution.
Code in this repository under [MIT](./LICENSE) (where a LICENSE file exists at the relevant path).

---

**Aïssa Belkoussa** — Paris, April 2026
[aissa.belkoussa5@gmail.com](mailto:aissa.belkoussa5@gmail.com)
