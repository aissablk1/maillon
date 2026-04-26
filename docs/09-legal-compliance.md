# 09 — Conformité légale

> Cadre réglementaire opérationnel pour MAILLON en France et UE. Tout ce qu'il faut faire pour être en règle, sans sur-investir.

---

## 1. Bandes radio et puissance d'émission

### 1.1 Bande 868 MHz (par défaut MAILLON)

- **Standard normatif** : ETSI EN 300 220-1/2 V3.3.1 (mars 2025)
- **Allocation** : ISM (Industrial, Scientific, Medical) libre, sans licence
- **Sous-bandes pertinentes pour Meshtastic EU** :
  - 868.0 – 868.6 MHz : duty cycle 1 % max, 14 dBm EIRP (25 mW)
  - 869.4 – 869.65 MHz : duty cycle 10 %, 27 dBm EIRP (500 mW) — non utilisé Meshtastic par défaut
- **Présume conformité avec le firmware Meshtastic** réglé sur preset EU_868 + region EU

### 1.2 Bande 433 MHz (bande secondaire, niche)

- Puissance EIRP max : 10 mW
- Duty cycle 10 %
- Moins de portée que 868 (atténuation atmosphérique différente, mais bande encombrée)
- **Position MAILLON** : non utilisée par défaut, option seulement pour clients très spécifiques (ex : zone urbaine très dense où 868 saturée)

### 1.3 Conformité firmware

- Meshtastic 2.7+ contient les profils régionaux EU_868, EU_433 conformes ETSI
- MAILLON s'engage à **ne livrer que des kits configurés sur EU_868** par défaut
- Tout changement de région par l'utilisateur reste sa responsabilité

---

## 2. Marquage CE & responsabilité

### 2.1 Marquage CE des hardware

Tous les hardware listés au catalogue MAILLON doivent porter le marquage CE et être accompagnés de la **Déclaration de conformité UE (DoC)** du fabricant.

| Hardware | Marquage CE | DoC accessible |
|---|---|---|
| LILYGO T-Echo | ✓ | Oui (sur LILYGO.cc) |
| LILYGO T-Beam Supreme | ✓ | Oui |
| LILYGO T-Deck Plus | ✓ | À vérifier |
| Heltec WiFi LoRa 32 V3/V4 | ✓ | Oui |
| RAK4631 (RAKwireless) | ✓ | Oui |
| Station G2 (B&Q Consulting) | ✓ | Oui (Meshtastic Approved) |
| Seeed Wio Tracker L1 Pro | ✓ | Oui |

**Action MAILLON** : conserver une copie de chaque DoC fabricant dans le dossier qualité (cabinet comptable + Drive sécurisé).

### 2.2 Si MAILLON modifie le hardware (boîtier custom)

- Ajout d'un boîtier sans modification électronique : **pas de re-certification nécessaire**
- Modification antenne (autre que celle livrée par le fabricant) : si on dépasse les puissances ou caractéristiques d'origine, **re-test de conformité requis**
- **Position MAILLON** : ne livrer que des antennes pré-validées avec hardware d'origine, ne pas modifier l'électronique

### 2.3 Responsabilité produit (CGU + assurance)

- Souscrire une **RC Pro** spécifique distributeur produits (~600–1 200 €/an)
- Mentions légales claires : **MAILLON n'est pas un service de secours, ne se substitue pas au 112**
- CGV : limite de responsabilité, exclusion garantie au-delà des défauts hardware (couverts par fabricant 12-24 mois)

---

## 3. ARCEP (Autorité de Régulation des Communications Électroniques et de la Poste)

### 3.1 Position de MAILLON

- Vendeur de matériel ISM 868 conforme : **aucune déclaration ni autorisation requise**
- Pas d'opérateur de réseau (ne fournit pas un service mais un produit)
- Pas de fréquence privée allouée

### 3.2 Cas particuliers à surveiller

- **Si déploiement institutionnel massif** (>1 000 nœuds régionaux) : prudence, demander un avis informel ARCEP
- **Si offre ressemblant à un opérateur télécom** (réseau public, offre voix avec terminaison sur RTC) : non — MAILLON ne fait pas ça

### 3.3 Bandes allouées ANFR

- En cas d'évolution Meshtastic vers utilisation d'autres bandes (ex : 169 MHz, 2.4 GHz) : revérifier conformité avant offre commerciale

---

## 4. RGPD & protection des données personnelles

### 4.1 Données traitées par MAILLON

| Donnée | Traitement | Base légale | Durée conservation |
|---|---|---|---|
| Nom, email, adresse client | Compte client, livraison | Exécution contrat | 5 ans après dernière commande |
| Numéro de téléphone | Support, livraison | Exécution contrat | 5 ans |
| Données de paiement | Stripe (sous-traitant PCI DSS) | Obligation légale fiscale | 10 ans (compta) |
| Position GPS nœuds (SaaS) | Cartographie, alertes | Exécution contrat + intérêt légitime | 90 jours par défaut, 1 an sur Business, configurable |
| Messages texte (SaaS) | Routage MQTT | Exécution contrat | Non stockés au-delà du transit (sauf opt-in archive) |
| IP utilisateurs site | Sécurité, analytics anonymisés | Intérêt légitime | 13 mois max |
| Logs SaaS (audit) | Sécurité | Intérêt légitime / obligation | 1 an |

### 4.2 Mesures techniques

- **Hébergement UE obligatoire** : Scaleway (Paris) ou OVHcloud (Roubaix/Strasbourg)
- **Chiffrement at rest** : disques chiffrés AES-256, base de données chiffrée
- **Chiffrement in transit** : TLS 1.3 obligatoire toutes interactions
- **Authentification** : 2FA dès Team plan, SSO obligatoire Enterprise
- **Backups** : chiffrés, conservés UE, durée 30 jours

### 4.3 Documents obligatoires à produire

| Document | Statut | Échéance |
|---|---|---|
| Politique de confidentialité (site) | Required | M1 |
| Mentions légales | Required | M1 |
| CGV | Required | M1 |
| CGU SaaS | Required | M5 (lancement SaaS) |
| Registre des traitements (RGPD art. 30) | Required | M3 |
| DPA (Data Processing Agreement) avec sous-traitants | Required (Stripe, Scaleway, etc.) | M3 |
| Procédure violation données | Required | M5 |
| Bannière cookies | Required | M1 |
| Charte utilisation MQTT publique | Optional mais recommandée | M5 |

### 4.4 DPO (Data Protection Officer)

- **Pas obligatoire** pour MAILLON tant que pas de traitement à grande échelle de données sensibles ou de surveillance régulière à grande échelle
- **Recommandé** dès lors qu'on dépasse 1 000 comptes SaaS B2B ou qu'on serve des organisations sensibles (secours)
- Modèle low-cost : DPO externe mutualisé (~150 €/mois pour PME)

### 4.5 Droits des personnes

L'app et le SaaS doivent permettre **simplement** :
- Accès à ses données
- Rectification
- Suppression (compte + données associées)
- Portabilité (export JSON)
- Opposition au traitement

Implémentation : un panneau « Mes données » dans le SaaS dès la V1.

---

## 5. Code de la consommation (B2C)

### 5.1 Obligations e-commerce

- **Droit de rétractation 14 jours** sur achat à distance
- **Garantie légale conformité 2 ans** (Code conso, art. L217-3 et suivants)
- **Garantie vices cachés** (Code civil)
- **Information précontractuelle** : prix TTC, frais livraison, délais, modalités paiement, conditions rétractation
- **Médiateur de la consommation** : adhésion obligatoire e-commerce ((environ 80 €/an, AME ou autre médiateur)

### 5.2 Garantie commerciale MAILLON

- 24 mois sur hardware (correspond à la garantie fabricant principalement)
- 14 jours satisfait ou remboursé (rétractation conforme au Code conso)
- Mention claire dans CGV

---

## 6. Fiscalité

### 6.1 Forme juridique

| Option | Avantages | Inconvénients | Adapté MAILLON |
|---|---|---|---|
| **EI/EURL** | Simple, peu de frais | Responsabilité personnelle (EI) | Démarrage si solo |
| **SASU** | Responsabilité limitée, levée future possible | Comptabilité plus lourde, charges sur dividendes | ★ Recommandé |
| SARL | Limitée mais moins flexible | Régime TNS gérant majoritaire | Non |
| **Coopérative SCOP** | Mission, gouvernance | Complexité | Pas en MVP |

**Choix recommandé** : **SASU** au démarrage, transformable en SAS lors de la levée Seed.

### 6.2 TVA

- Régime de TVA réelle simplifiée jusqu'à seuils, puis réel normal au-delà
- Vente UE : autoliquidation (B2B) ou TVA française (B2C en dessous des seuils, sinon TVA pays acheteur via OSS)
- **Mise en place compta dès M1** avec un comptable spécialisé tech (Pennylane + cabinet)

### 6.3 Taxes spécifiques

- **Eco-contribution DEEE** (déchets électriques) : adhésion obligatoire à un éco-organisme (Ecologic ou Ecosystem). ~10–30 €/an forfait + contribution variable selon poids.
- **Taxe sur les ventes en ligne** : ne s'applique pas en France (différent de l'Allemagne, etc.)

---

## 7. Propriété intellectuelle

### 7.1 Marque MAILLON

- **Dépôt INPI** classes 9 (matériel élec.), 38 (télécoms), 42 (services SaaS) — coût ~250 € + 50 €/classe additionnelle
- Recherche d'antériorité préalable (gratuit via base INPI)
- **Action prioritaire M1**

### 7.2 Nom de domaine

- maillon.fr, maillon.eu, maillon.community, maillon.app — réservés
- Enregistrement registrar français (Gandi, OVH)

### 7.3 Code source

- **Firmware Meshtastic** : GPL v3 — toute modification doit être publiée
- **Position MAILLON** : on ne modifie pas le firmware (on utilise les profils standards), donc pas d'obligation de redistribution
- **Code SaaS MAILLON** : propriétaire, hébergé sur GitLab/GitHub privé
- **API publique** : documentée, contrats clairs

### 7.4 Marque Meshtastic

- Meshtastic® est une marque enregistrée
- Usage autorisé : « compatible Meshtastic », « basé sur Meshtastic » avec mention claire et lien vers le projet
- **Interdit** : laisser entendre que MAILLON est Meshtastic ou affilié officiellement
- Source : [Meshtastic licensing & trademark](https://meshtastic.org/docs/legal/licensing-and-trademark/)

### 7.5 Open-source policy MAILLON

- **Contribution upstream** : MAILLON s'engage à contribuer au moins 1 % de son CA hardware au Meshtastic Solutions Inc. (donation ou sponsoring développeurs core)
- Justification : éthique + protection long terme du firmware sur lequel MAILLON dépend

---

## 8. Sécurité et secrets

### 8.1 Secrets en production
- Variables d'environnement, jamais en clair dans le code
- Vault auto-hébergé (HashiCorp Vault) ou Doppler/Infisical SaaS pour les secrets
- Rotation tous les 90 jours
- Accès restreints (principe du moindre privilège)

### 8.2 Sécurité API
- Rate limiting strict
- JWT signés, durée de vie courte
- HTTPS partout, HSTS
- CSP strict
- Audit pen-test annuel à partir de l'an 2

### 8.3 Sauvegardes
- Sauvegardes chiffrées quotidiennes
- Test de restauration trimestriel
- Plan de reprise d'activité documenté

---

## 9. Assurances

| Assurance | Pourquoi | Coût annuel estimé |
|---|---|---|
| RC Pro (responsabilité civile professionnelle) | Erreurs/omissions service | 800–1 500 € |
| RC Produit | Défaut produit causant dommage | 600–1 200 € |
| Cyber-risque (an 2) | Fuite données SaaS, ransomware | 1 500–3 000 € |
| Multirisque local + stock | Bureau, stock kits | 600–1 000 € |
| **Total an 1** | | **~3 000 €** |

---

## 10. Procédures internes à formaliser

| Procédure | Échéance |
|---|---|
| Onboarding nouveau client (e-commerce → livraison → support) | M2 |
| Gestion RMA / retours hardware | M3 |
| Process préconfiguration usine (qualité, traçabilité) | M2 |
| Gestion incidents SaaS (post-mortem, communication) | M5 |
| Gestion violation de données | M5 |
| Procédure mise à jour firmware massive (parc client) | M6 |
| Procédure réception commande institutionnelle (CCAG) | M9 |

---

## 11. Synthèse des actions légales prioritaires (M1)

1. ✅ Dépôt INPI marque MAILLON
2. ✅ Création SASU + Kbis
3. ✅ Compte bancaire pro + Stripe configuré
4. ✅ Mentions légales + politique confidentialité + CGV en ligne
5. ✅ Adhésion éco-organisme DEEE (Ecologic ou Ecosystem)
6. ✅ Adhésion médiateur de la consommation
7. ✅ Souscription RC Pro + RC Produit
8. ✅ Comptable spécialisé désigné

Coût total démarrage légal : **~2 500 €**

---

**Conclusion conformité** : MAILLON opère dans un cadre clair (ISM 868 libre, marquage CE existant, pas d'opérateur télécom). Les efforts essentiels sont la rédaction des documents légaux, la mise en place RGPD propre, et la structuration fiscale propre. Aucun obstacle réglementaire bloquant.
