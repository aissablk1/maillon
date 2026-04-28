# 14 — Cinq entretiens stratégiques (semaine 1)

> **Ce document remplace la prospection tactique précédente.** Le dossier MAILLON pivote d'un modèle « vendeur de kits francophones » vers un modèle **opérateur d'infrastructure mesh souveraine**. Cinq entretiens cette semaine décident si MAILLON devient un Cloudflare-européen-du-mesh ou se range.
>
> La nouvelle thèse : MAILLON ne vit pas en vendant du hardware. MAILLON vit en **opérant un maillage permanent de 50 → 2 000 stations relais** sur le territoire français, sur lequel se construisent SaaS, conformité, label, et data anonymisée. L'open-source reste libre en couche 0 ; on construit la couche infrastructure 1+.
>
> **Les cinq personnes ci-dessous décident si cette thèse tient.** Si 2 sur 5 disent « revenez avec un dossier sérieux », MAILLON peut lever 5–15 M€ Series A en an 2-3. Si 0 sur 5, on ferme.

---

## Hypothèse à valider

Une seule, simple, brutale :

> **Existe-t-il, en France, des acteurs prêts à payer pour accéder à un maillage mesh radio permanent qu'ils ne peuvent pas constituer eux-mêmes ?**

Pas « des asso prêtes à acheter un kit ». Pas « des PME prêtes à payer 9 €/nœud/mois ». La question est **infrastructurelle**.

---

## Les cinq interlocuteurs

### Entretien 1 — Un maire de commune en zone blanche

**Pourquoi lui** : c'est l'hôte qui rend possible le maillage. Pas de hardware MAILLON sur son toit = pas de couche 1.

**Où le trouver** :
- AMRF (Association des Maires Ruraux de France) — [amrf.fr](https://www.amrf.fr) — 11 000 communes membres, président par département
- Liste des « 100 communes les plus mal couvertes en téléphonie mobile » publiée par l'Arcep dans son rapport annuel sur la couverture mobile
- Programme « New Deal Mobile » de l'Arcep : liste des sites identifiés en zone blanche

**Cible précise** : un maire d'une commune < 1 000 habitants, en montagne ou très rurale, qui se plaint déjà publiquement de la couverture mobile.

**Email à envoyer** :

> Objet : Une station de communication d'urgence sur le toit de votre mairie — gratuite, à votre image
>
> Madame la Maire / Monsieur le Maire,
>
> Je m'appelle Aïssa Belkoussa et je monte un projet français d'infrastructure de communication radio longue portée pour les zones blanches.
>
> L'idée est simple : poser une petite station de relais (taille d'un boîtier électrique, alimentation 5 W, sans Wi-Fi public ni 5G) sur le toit de votre mairie. Aucun coût pour vous. Aucun engagement. La station relaie les communications de secours bénévoles, randonneurs équipés et équipes professionnelles dans un rayon de 10–30 km autour de votre commune. Conforme ETSI, sans licence ARCEP, marquage CE.
>
> En retour, votre commune obtiendrait un label « Commune connectée mesh — partenaire MAILLON » et la priorité sur les services associés (formation aux secours bénévoles locaux, équipements offerts ou subventionnés).
>
> Je voudrais 20 minutes en visio ou au téléphone pour vous expliquer en détail et entendre vos contraintes. Je n'ai rien à vendre aujourd'hui : je teste la pertinence du projet auprès de cinq communes.
>
> Quelle disponibilité cette semaine ou la prochaine ?
>
> Aïssa Belkoussa — aissa.belkoussa5@gmail.com

**Questions clés** :
1. Avez-vous déjà signé un accord d'hébergement antenne (Orange, Free, TDF) ? À quelles conditions ?
2. Si nous offrons une station gratuite + label communal en échange du toit, quels obstacles administratifs ou politiques voyez-vous ?
3. Qui d'autre dans le département serait probablement intéressé ?

**Signal go** : « Venez avec un cahier des charges, on en discute en conseil municipal. »

---

### Entretien 2 — Un responsable infra chez TDF ou Cellnex

**Pourquoi lui** : c'est l'alternative au maillage municipal. TDF et Cellnex possèdent ~30 000 sites pylônes en France. Si MAILLON peut louer 200–500 emplacements à coût marginal, le maillage prend 18 mois au lieu de 5 ans.

**Où le trouver** :
- LinkedIn : recherche « infrastructure », « siting », « tower management » chez TDF (ex-Télédiffusion de France) ou Cellnex France
- TDF / [tdf.fr](https://www.tdf.fr) — division B2B Connectivité Territoires
- Cellnex France — [cellnex.com/fr-fr](https://www.cellnex.com/fr-fr/) — équipe Wholesale

**Cible précise** : un responsable « Mutualisation pylônes » ou « Programmes IoT/LoRa » — pas un commercial grand compte ; un opérationnel qui connaît la mutualisation petites stations basse puissance.

**Email à envoyer** :

> Objet : Hébergement de petites stations LoRa 868 MHz sur vos pylônes — opportunité IoT souverain
>
> Bonjour [Prénom],
>
> Je travaille sur un projet d'infrastructure mesh radio LoRa (Meshtastic) pour la souveraineté communicationnelle française : couches sécurité civile, BTP, événementiel et outdoor.
>
> Le projet repose sur un maillage de 200 à 500 stations LoRa basse puissance (5 W, 868 MHz, conformes ETSI) à déployer en France sur 24 mois. Plutôt que de monter des sites neufs, je cherche à mutualiser les pylônes existants.
>
> Y a-t-il chez TDF / Cellnex un programme de location d'emplacement pour micro-stations IoT (taille d'un boîtier 30×20 cm, antenne 1 m, consommation < 10 W) ? Quel ordre de grandeur de redevance par site/an seriez-vous en mesure de proposer pour 100 / 500 / 2 000 sites ?
>
> Vingt minutes en visio cette semaine pour cadrer la faisabilité. Aucune commande aujourd'hui — je sécurise la viabilité économique avant de lever des fonds.
>
> Aïssa Belkoussa — aissa.belkoussa5@gmail.com — github.com/aissablk1/maillon

**Questions clés** :
1. Quel est le tarif catalogue pour mutualiser un emplacement micro-station (5 W) sur un pylône existant ?
2. Existe-t-il un programme « connectivité territoires » avec tarification dégressive ?
3. Quels sont vos obligations contractuelles avec les opérateurs principaux (Orange, SFR, Bouygues, Free) qui pourraient interdire l'hébergement d'un acteur tiers ?
4. À votre connaissance, des projets similaires (Helium, The Things Network) ont-ils signé chez vous ? Avec quel modèle ?

**Signal go** : un tarif compatible avec un maillage à 50–200 €/site/mois, et l'absence de blocage contractuel.

---

### Entretien 3 — Un directeur produit chez MAIF Assos ou AXA Pro BTP

**Pourquoi lui** : c'est le levier qui transforme MAILLON de « nice to have » en **must-have via une réduction de prime**. Si l'assureur dit oui, 50 000 assos doivent acheter pour ne pas perdre leur ristourne.

**Où le trouver** :
- MAIF — [maif.fr/professionnels-asso](https://entreprise.maif.fr/) — équipe MAIF Numérique Tech ou MAIF Assos
- LinkedIn : « directeur produit assurance association » ou « innovation MAIF »
- Salon des Maires (novembre) ou Salon des Associations (janvier) — speakers MAIF
- MGEN, Macif, MMA Pro Asso : alternatives crédibles

**Cible précise** : un *Product Owner* ou *Innovation Lead* à la MAIF Assos. La MAIF a une culture « mission » qui matche notre positionnement souverain et résilient. Premier choix.

**Email à envoyer** :

> Objet : Donnée de risque randonnée et assurance asso — co-construction possible ?
>
> Bonjour [Prénom],
>
> Je monte MAILLON, un projet d'infrastructure de communication radio mesh pour la résilience des territoires (zones blanches secours, asso, BTP, événementiel).
>
> Deux pistes me semblent pertinentes pour la MAIF :
>
> 1. **Une donnée de risque inédite** — positions et trajets agrégés et anonymisés des randonneurs / secouristes / équipes en zone blanche, par massif, par saison. Personne d'autre n'a ce signal. Utilisable pour l'assurance asso secours, l'assurance habitation montagne, l'assurance accidents de la vie.
>
> 2. **Un label « équipement comms zone blanche »** que la MAIF reconnaîtrait par une réduction de prime sur les contrats Asso. Modèle similaire à la réduction « alarme » sur l'habitation. Cela crée un must-have pour les 200 000+ asso secours/loisirs nature en France.
>
> Vingt minutes pour explorer si l'une de ces pistes vous intéresse à un horizon 12-24 mois ? Aucune sollicitation commerciale aujourd'hui — je teste la viabilité avant levée de fonds.
>
> Aïssa Belkoussa — aissa.belkoussa5@gmail.com

**Questions clés** :
1. Existe-t-il déjà des réductions de prime conditionnées à un équipement de comms / DATI / sécurité homme isolé ?
2. La donnée de trajets anonymisés agrégés par massif aurait-elle une valeur tarifaire pour vous ? Quel ordre de grandeur ?
3. Quel est votre process pour intégrer un label tiers dans votre tarification ?
4. Y a-t-il des verrous CNIL / RGPD spécifiques sur cette donnée ?

**Signal go** : « Voici notre process d'évaluation, voici les conditions, faisons un POC sur 100 assos pilotes. »

---

### Entretien 4 — Un directeur HSE / RSE chez Vinci, Bouygues ou Eiffage

**Pourquoi lui** : c'est le levier qui transforme 30 PME sous-traitantes BTP en clients obligés via le cahier des charges du donneur d'ordre.

**Où le trouver** :
- LinkedIn : recherche « HSE Director », « Safety Manager », « QSE » chez Vinci Construction, Bouygues Travaux Publics, Eiffage Génie Civil, Colas
- Site corporate : page « Engagements RSE » → noms des dirigeants
- Salons Préventica (Paris septembre, Lyon mai) : tous les directeurs HSE des grands groupes y sont
- Salon BIM World, Pollutec : alternatives

**Cible précise** : un directeur HSE qui gère les chantiers ruraux récurrents (autoroutes, photovoltaïque, éolien, lignes haute tension). Vinci Énergies ou Eiffage Énergie Systèmes sont les plus probables.

**Email à envoyer** :

> Objet : Communication homme-isolé permanente sur vos chantiers ruraux — projet d'infra
>
> Bonjour [Prénom],
>
> Je travaille sur une infrastructure de communication radio mesh pour les zones blanches en France, en train de structurer la roadmap commerciale.
>
> Un cas d'usage me semble particulièrement aligné avec votre activité : la couverture homme-isolé permanente sur vos chantiers ruraux récurrents (photovoltaïque, éolien, lignes HT, autoroutes). Plutôt que chaque sous-traitant déploie un système isolé, MAILLON propose une infrastructure permanente couvrant 80 % des zones rurales françaises, accessible par abonnement annuel.
>
> Trois questions :
>
> 1. Le système homme-isolé fait-il aujourd'hui partie de votre cahier des charges sous-traitants ?
> 2. Si oui, quel niveau de couverture exigez-vous, à quel coût pour les sous-traitants ?
> 3. Si non, est-ce un sujet émergent ou pas du tout ?
>
> Vingt minutes en visio cette semaine. Je n'ai rien à vendre aujourd'hui — je valide la viabilité du modèle avant levée.
>
> Aïssa Belkoussa — aissa.belkoussa5@gmail.com

**Questions clés** :
1. Combien dépensez-vous par an, agrégé groupe, en équipement comms / DATI / homme isolé ?
2. Y a-t-il une obligation contractuelle avec vos donneurs d'ordre publics (DREAL, ASF, RTE) sur ces sujets ?
3. Si MAILLON proposait un abonnement groupe à 50–500 k€/an pour couvrir tous vos chantiers ruraux, quel serait votre process d'achat ?
4. Quels sont vos concurrents que vous regardez sur ce sujet (Sigfox, LoRaWAN privé, Iridium) ?

**Signal go** : « Mettons-nous d'accord sur un POC sur un chantier-pilote. »

---

### Entretien 5 — Un directeur de course ultra-trail majeur

**Pourquoi lui** : course ultra-trail = combinaison parfaite zone blanche garantie + responsabilité organisateur lourde + budget existant en comms staff/sécurité. Le must-have est immédiat.

**Où le trouver** :
- UTMB International (Chamonix) — [utmbmontblanc.com](https://utmbmontblanc.com) → équipe organisation
- Diagonale des Fous (La Réunion) — site officiel, équipe technique
- GR®P (Grand Raid des Pyrénées), Ultra Trail Côte d'Azur, Templiers
- Asics Beat the Sun, MaXi-Race Annecy
- LinkedIn : « directeur de course », « race director »
- ITRA (International Trail Running Association) — [itra.run](https://itra.run) — annuaire courses

**Cible précise** : un *race director* ou *operations manager* d'une course de + 1 000 coureurs avec parcours en zone blanche montagne.

**Email à envoyer** :

> Objet : Couverture comms permanente sur vos parcours zone blanche — discussion possible ?
>
> Bonjour [Prénom],
>
> Je monte MAILLON, une infrastructure de communication radio mesh longue portée pour les zones blanches françaises.
>
> Je m'intéresse aux courses ultra-trail parce que c'est probablement le cas d'usage le plus exigeant : centaine de bénévoles répartis sur 100+ km de zone blanche, responsabilité organisateur lourde, et coût des solutions actuelles (location radios pros, satellitaires Iridium GO!) qui pèse sur le budget de chaque édition.
>
> MAILLON propose une infrastructure mesh permanente couvrant le parcours, accessible par abonnement annuel — un seul équipement déployé une fois, réutilisé chaque édition, complété si besoin par des relais mobiles éphémères.
>
> Trois questions :
>
> 1. Quel budget annuel comms staff/sécurité pour votre course ?
> 2. Quelle solution actuelle, quels manques ?
> 3. Si MAILLON proposait un abonnement annuel garantissant la couverture mesh sur le parcours + accès SaaS de suivi temps réel, à quel niveau de prix ce serait pertinent ?
>
> Vingt minutes en visio quand vous avez le temps.
>
> Aïssa Belkoussa — aissa.belkoussa5@gmail.com

**Questions clés** :
1. Y a-t-il déjà eu des incidents (coureur perdu, retard secours) liés à la zone blanche dans votre course ?
2. Votre assureur événementiel exige-t-il un système comms pour couvrir le parcours ?
3. Combien d'éditions par an, combien de courses en réseau organisateur (l'UTMB World Series organise 50+ courses) ?
4. Quel est votre processus achat équipement (achat propre vs location vs partenariat sponsor) ?

**Signal go** : « Faisons un test sur l'édition de [date]. »

---

## Tableau de suivi

| # | Cible | Source nom | Email envoyé | RDV pris | Réalisé | Verbatim must-have ? | Signal go ? |
|---|---|---|---|---|---|---|---|
| 1 | Maire zone blanche | AMRF / Arcep zones blanches | — | — | — | — | — |
| 2 | TDF/Cellnex infra | LinkedIn / site corp | — | — | — | — | — |
| 3 | MAIF Assos produit | LinkedIn / maif.fr | — | — | — | — | — |
| 4 | Vinci/Eiffage HSE | LinkedIn / Préventica | — | — | — | — | — |
| 5 | UTMB / Diagonale | itra.run / sites | — | — | — | — | — |

---

## Critères go / no-go à 21 jours

Plus serré que le doc précédent — la stratégie infrastructure exige une décision rapide.

| Métrique | Cible | Action si manquée |
|---|---|---|
| Emails envoyés sous 7 jours | 5/5 | Auto-recadrer la discipline |
| RDV bookés sous 14 jours | ≥ 3/5 | Élargir les listes par segment |
| RDV réalisés sous 21 jours | ≥ 3/5 | Idem + relance par message LinkedIn |
| Verbatim must-have explicite | ≥ 2/5 | **Pivoter ou ranger MAILLON** |
| Engagement à un POC / co-construction | ≥ 1/5 | Décision mois 2 |

**Critère éliminatoire** : si zéro entretien sur cinq ne donne le verbatim « venez nous voir avec un dossier sérieux dans 3 mois », **MAILLON ferme avant le moindre euro de stock**. Le script `preconfig.py` reste dans la malle pour un autre projet.

---

## La vérité simple

Le coût de cette validation : **17 heures de prospection sur 21 jours, 0 € en cash.**
Le retour potentiel : **un projet à 100 M€ ARR à 7 ans, ou la décision propre de fermer.**

Le coût d'un mauvais départ sans cette validation : **30 k€ d'apport en stock, 6 mois de temps de fondateur, et un produit mal positionné qu'aucun client n'achète coûte que coûte.**

Le rapport est imbattable. Reste à ouvrir LinkedIn et envoyer cinq emails.

---

**Action concrète aujourd'hui (25/04/2026)** :

1. Identifier nominativement les 5 personnes (1h sur LinkedIn et sites publics)
2. Personnaliser les 5 emails avec le bon prénom et la bonne référence (1h)
3. Envoyer (5 minutes)

Total : **deux heures**. Premier RDV booké d'ici 7 jours.
