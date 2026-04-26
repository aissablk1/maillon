# 11 — BOM et fournisseurs

> Bill of Materials détaillé pour chaque kit, fournisseurs préférés, marges réelles.

---

## 1. Vue d'ensemble fournisseurs

| Fournisseur | Pays | Délai | Avantages | Inconvénients |
|---|---|---|---|---|
| **Rokland Store** | USA, entrepôt EU (NL) | 5–15j EU | Stock varié, Meshtastic Approved, support solide | Marge revendeur (-15 % vs direct) |
| **OpenELAB** | UK | 5–10j EU | Garantie 24 mois, EU-friendly | Catalogue plus restreint |
| **RAKwireless Store** | Chine, entrepôt EU (DE) | 7–14j | Modules Wisblock excellents, prix corrects | Délais variables |
| **Heltec Automation** | Chine, entrepôt EU (DE) | 5–10j | Prix bas, qualité OK | Documentation perfectible |
| **LILYGO direct (LILYGO.cc)** | Chine | 15–30j | Prix le plus bas, exclusivités | Délais longs, douane |
| **Seeed Studio EU** | Stock EU | 3–7j | Wio Tracker excellent | Catalogue Meshtastic limité |
| **Mouser, Farnell** | EU | 1–3j | Délai court, composants techniques | Cher, pas d'assemblage |
| **Tindie (B&Q Consulting)** | UK | 7–14j | Station G2/Nano G2 | Marge faible nous |
| **Muzi Works** | UK | 5–10j | R1 Neo Meshtastic Approved | Volume limité |

---

## 2. Stratégie d'approvisionnement

### Phase 1 (volumes faibles M1-M6)
- Achat unitaire chez Rokland EU + RAKwireless Store + Heltec
- Stock buffer 1 mois minimum
- Paiement à la commande, pas de crédit fournisseur

### Phase 2 (volumes >100 unités/mois M6+)
- Négociation direct LILYGO et RAK pour volumes
- Cible : -15 % à -25 % vs prix retail
- Paiement à 30j net

### Phase 3 (an 2)
- Possibilité fabrication semi-custom (boîtier MAILLON, antenne intégrée optimisée) avec fabricant chinois ou européen (PCBA)
- ROI seulement si volumes > 1 000 unités/mois sur un SKU

---

## 3. BOM Kit Découverte (99 € TTC)

| Référence | Qté | Fournisseur | Prix unitaire HT | Sous-total |
|---|---|---|---|---|
| LILYGO T-Echo Meshtastic | 2 | Rokland EU / LILYGO | 22 € | 44 € |
| Câble USB-C 1 m noir | 2 | Mouser bulk | 1.20 € | 2.40 € |
| Étui silicone (custom MAILLON) | 2 | Fournisseur EU print-on-demand | 2.50 € | 5 € |
| Sticker MAILLON | 2 | Stickermule / Sticker Galerie | 0.20 € | 0.40 € |
| Notice plastifiée 4 volets A5 | 1 | Imprimerie en ligne | 0.80 € | 0.80 € |
| Boîte carton kraft + insert mousse | 1 | Packhelp / Smurfit | 1.80 € | 1.80 € |
| Frais expédition entrant (estimé) | – | – | – | 1 € |
| **Sous-total COGS hardware** | | | | **55.40 €** |
| Préconfiguration (10 min × 50 €/h) | – | – | – | 8.30 € |
| **COGS total** | | | | **~63.70 €** |
| **Prix TTC** | | | | **99 €** |
| **HT (TVA 20 %)** | | | | **82.50 €** |
| **Marge brute** | | | | **18.80 € (23 %)** |
| **Marge en volume (-15 % BOM)** | | | | **27 € (33 %)** |

> **Note** : le Kit Découverte est un loss-leader/break-even en début. La marge se fait par les autres kits et le SaaS upsell. À partir de M9, la négociation volume LILYGO ramène la marge à ~33 %.

---

## 4. BOM Kit Pro (299 € TTC)

| Référence | Qté | Fournisseur | Prix HT | Sous-total |
|---|---|---|---|---|
| LILYGO T-Beam Supreme | 4 | Rokland EU / LILYGO | 36 € | 144 € |
| Station G2 (B&Q Consulting) | 1 | Tindie / Muzi | 145 € | 145 € |
| Antenne fibre 7 dBi 868 MHz omni (extérieure pour Station) | 1 | Rokland | 18 € | 18 € |
| Antenne 5 dBi SMA (pour T-Beam) | 4 | Rokland | 4 € | 16 € |
| Batterie 18650 3000 mAh certifiée | 4 | Mouser/Farnell | 5 € | 20 € |
| Chargeur USB-C 20W | 4 | Anker bulk EU | 7 € | 28 € |
| Étui caoutchouc T-Beam | 4 | Fournisseur EU | 3.50 € | 14 € |
| Mallette transport semi-rigide 30 × 20 × 10 cm | 1 | Pélican-clone EU | 22 € | 22 € |
| Câbles SMA 1 m (Station G2 → antenne) | 1 | RF.com | 8 € | 8 € |
| Notice illustrée 12 pages A5 | 1 | Imprimerie | 2.50 € | 2.50 € |
| Stickers + carte garantie | – | – | 1.50 € | 1.50 € |
| Carton boîte + mousse découpée | 1 | Packhelp | 5 € | 5 € |
| Frais expédition entrant | – | – | – | 4 € |
| **Sous-total hardware** | | | | **428 €** |
| ⚠️ Vérification | | | | les volumes initial sont chers : impose recalibrage |

> **Recalibration** : pour vendre à 299 € TTC = 249 € HT, il faut un COGS sous 175 € (marge 30 %+). Le BOM ci-dessus à 428 € HT est trop élevé pour la cible — **incohérence à résoudre**.

### Décision : ajuster le Kit Pro

**Option A — Ajuster le contenu** :
- 4 T-Beam Supreme → 4 **Heltec MeshPocket** (~26 € HT au lieu de 36 €) = 104 € au lieu de 144 €
- Station G2 → **Heltec V3 + boîtier extérieur** (~50 € au lieu de 145 €) — relais moins puissant mais 3× moins cher
- Mallette → étui souple zippé (~10 € au lieu de 22 €)
- BOM total ajusté : **~232 € HT** → marge 7 % à 299 € TTC. Toujours trop tendu.

**Option B — Ajuster le prix** :
- Vendre Kit Pro à **399 € TTC** (332 € HT)
- BOM 232 € → marge 100 € soit 30 % ✓
- Communication : « Kit Pro 399 € — équivaut à 4 talkies pro DMR de 1 200 € chacun »

**Option C — Décliner en deux kits** :
- **Kit Pro Light 299 €** : 4 Heltec MeshPocket + relais Heltec V3 (BOM 180 €, marge 33 %)
- **Kit Pro 499 €** : 4 T-Beam Supreme + Station G2 (BOM 320 €, marge 28 %)

**Décision retenue : Option C — créer deux paliers Pro distincts**, plus cohérent avec la segmentation marché.

(Le `docs/04-produit-strategie.md` sera mis à jour si Option C confirmée par les premières ventes.)

---

## 5. BOM Kit Pro Light (299 € TTC) — révisé

| Référence | Qté | Prix HT | Sous-total |
|---|---|---|---|
| Heltec MeshPocket | 4 | 26 € | 104 € |
| Heltec V3 + antenne 5 dBi (relais simple) | 1 | 30 € | 30 € |
| Boîtier IP54 pour Heltec V3 | 1 | 12 € | 12 € |
| Antenne fibre 5 dBi extérieure | 1 | 12 € | 12 € |
| Câbles SMA + connecteurs | – | – | 6 € |
| Batteries 18650 + chargeurs | 4 | 11 € | 44 € |
| Étuis caoutchouc | 4 | 3 € | 12 € |
| Sac transport renforcé | 1 | 14 € | 14 € |
| Notice 12 pages | 1 | 2.50 € | 2.50 € |
| Carton + mousse | 1 | 4 € | 4 € |
| Préconfiguration | – | – | 12 € |
| Frais expédition entrant | – | – | 3 € |
| **COGS total** | | | **~256 €** |
| **Prix HT (299 € TTC ÷ 1.2)** | | | 249 € |
| **MARGE NÉGATIVE — INCOHÉRENT** | | | -7 € |

> **Conclusion BOM** : à 299 € TTC, la marge n'est pas tenable même avec Option Light. Décision : **Kit Pro à 399 € TTC** comme prix de lancement, communiqué comme « comparable à 4 talkies DMR à 1 500 € ».

### BOM Kit Pro révisé (399 € TTC, 332 € HT)

Marge brute = 332 - 256 = **76 € (23 %)** → faible, à améliorer en volume.

À volumes 100+/mois (négoc Heltec) : COGS 220 € → marge 112 € (34 %). Acceptable.

---

## 6. BOM Kit Secours (499 € TTC, 416 € HT)

| Référence | Qté | Prix HT | Sous-total |
|---|---|---|---|
| RAK4631 (RAKwireless) | 6 | 28 € | 168 € |
| Boîtier IP67 pour RAK4631 | 6 | 14 € | 84 € |
| Station G2 ou clone Heltec V3 IP54 boosted | 2 | 50 € | 100 € |
| LILYGO T-Deck Plus (PC opérateur) | 1 | 75 € | 75 € |
| Antenne Yagi 12 dBi 868 MHz | 1 | 38 € | 38 € |
| Antenne fibre 7 dBi omni × 2 | 2 | 18 € | 36 € |
| Câbles SMA + adaptateurs | – | – | 12 € |
| Batteries Lipo 5000 mAh × 6 (interne RAK) | 6 | 4 € | 24 € |
| Chargeurs USB-C × 6 | 6 | 6 € | 36 € |
| Mallette renforcée Pelican-like 50 × 35 × 18 | 1 | 65 € | 65 € |
| Mousse découpée custom MAILLON | 1 | 18 € | 18 € |
| Notice 24 pages illustrée scénarios | 1 | 4 € | 4 € |
| Étiquettes nœuds, carte garantie | – | – | 3 € |
| Préconfiguration (90 min × 50 €/h) | – | – | 75 € |
| Frais expédition entrant | – | – | 5 € |
| **COGS total** | | | **~743 €** |

> **Marge négative à 499 € TTC** : -327 €. Ce kit Secours **ne peut pas être vendu à ce prix**.

### Décision : repricing kit Secours

- **Nouveau prix Kit Secours : 1 199 € TTC (999 € HT)**
- Marge : 999 - 743 = **256 € (26 %)**
- Ajout de 6 mois SaaS Team inclus (valeur 270 €) : marge effective au prix vendu sans cette inclusion serait ~33 %
- Justification commerciale : « Équivaut à 1 radio DMR Hytera à 1 500 €, mais c'est 6 radios + 2 relais + 1 console »

> **Remarque** : ces ajustements doivent être répercutés dans `docs/03-business-model.md` et `docs/07-financials.md` à la prochaine itération du dossier (note jour 1, dossier vivant).

---

## 7. Récapitulatif prix kits révisés

| Kit | Prix TTC initial dossier | Prix TTC ajusté BOM | COGS | Marge |
|---|---|---|---|---|
| Découverte | 99 € | **99 €** (loss leader) | 64 € | 19 € (23 %) |
| Pro Light | – | **299 €** (option budget) | 256 € | -7 € → tendu, à éviter |
| Pro | 299 € | **399 €** (révision) | 256 € | 76 € (23 %) en initial, 34 % en volume |
| Secours | 499 € | **1 199 €** (révision) | 743 € | 256 € (26 %) |

> Cette correction est la principale leçon du jour 1 : **le pricing initial était trop optimiste sur Pro et Secours**. Les coûts hardware Meshtastic+accessoires+packaging sont plus lourds qu'anticipé. Le repricing est nécessaire — mais le marché B2B accepte les prix révisés (toujours bien moins chers que DMR).

---

## 8. Sources et liens

- [Rokland — Meshtastic store EU](https://store.rokland.com/pages/meshtastic-hardware-rak-lilygo)
- [RAKwireless store](https://store.rakwireless.com/collections/meshtastic)
- [Heltec store](https://heltec.org/)
- [LILYGO direct](https://lilygo.cc/)
- [Tindie — Station G2](https://www.tindie.com/products/bnqconsulting/station-g2-meshtastic-base-station/)
- [OpenELAB UK](https://openelab.io/collections/meshtastic)
- [Muzi Works](https://muzi.works/collections/meshtastic-devices)
- [Mouser Electronics France](https://www.mouser.fr/)
- [Farnell France](https://fr.farnell.com/)
- [Packhelp — packaging custom](https://packhelp.com/)
- [Stickermule](https://www.stickermule.com/eu/)

---

**Conclusion BOM** : le hardware Meshtastic préconfiguré n'est pas aussi marge-favorable qu'il en a l'air vu le pricing communauté. **Le repricing est nécessaire** : Découverte 99 € (loss leader), Pro 399 €, Secours 1 199 €. Les marges deviennent acceptables (23–34 %), avec montée en marge garantie en volumes. **C'est le SaaS et les services qui font la marge consolidée du business**, pas les kits seuls.
