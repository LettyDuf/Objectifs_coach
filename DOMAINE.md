# DOMAINE — source de vérité métier

> ✅ Validé par Lætitia le 2026-06-20. Voir section 7 (journal de validation) pour le détail des choix.
> Toute modification future de ce fichier doit faire l'objet d'une entrée datée dans la section 7 et d'une mise à jour de `STATUS.md`.

---

## 1. Principe fondateur (tronc commun aux trois types)

Un objectif décrit **un résultat à atteindre, pas le travail à faire**. Il répond à la question « à quoi saura-t-on qu'on a réussi ? », jamais à « qu'est-ce qu'on va faire ? ».

### 1.1 Critères du tronc commun — un bon objectif est :

| Critère | Définition courte | Question test |
|---|---|---|
| **Outcome, pas output** | Décrit un changement constaté (chez un utilisateur, un système, le business), pas une livraison. | « Si on livre tout sans atteindre ce résultat, l'objectif est-il atteint ? » — Non = bon. |
| **Falsifiable** | On peut dire de façon non ambiguë s'il est atteint ou pas. | « Comment saura-t-on objectivement qu'il est atteint ? » — Réponse précise = bon. |
| **Borné dans le temps** | Une échéance claire et tenue. | « D'ici quand ? » — Date ou itération nommée = bon. |
| **Sous influence de l'équipe** | L'équipe a le pouvoir d'agir sur le résultat. | « L'équipe peut-elle réellement bouger l'aiguille ? » — Oui = bon. |
| **Ambitieux ET crédible** | Tire vers le haut sans être hors d'atteinte. Calibrage **dépendant du type** (voir détail par module). | « Le niveau d'ambition est-il cohérent avec le type d'objectif choisi ? » |

### 1.2 Pièges classiques détectés par heuristiques sur le texte

- Verbe d'**output** en tête (« développer », « livrer », « implémenter », « mettre en place », « refactorer ») → alerte « formulation output ».
- Absence de **seuil chiffré ou critère vérifiable** → alerte « non falsifiable ».
- Mots **flous** sans qualification (« mieux », « optimiser », « améliorer », « robuste », « performant », « simple ») → alerte « mot ambigu ».
- Absence de **borne temporelle explicite** dans le formulaire → alerte « pas d'échéance ».
- Plus d'**un objectif** dans la même phrase (présence de « et » de coordination entre deux résultats distincts) → alerte « objectif composite ». **Règle V1 stricte** : aucun « et » coordonnant deux résultats n'est toléré (validé 2026-06-20, à rouvrir en V2).

### 1.3 Listes de référence (V1, enrichissables)

**Verbes d'output à détecter** (déclenchent alerte « formulation output ») :
`développer`, `livrer`, `implémenter`, `mettre en place`, `mettre en œuvre`, `refactorer`, `coder`, `créer`, `construire`, `installer`, `déployer`, `documenter`, `rédiger`, `produire`, `réaliser`, `faire`, `terminer`, `finaliser`, `lancer`.

**Mots flous à détecter** (déclenchent alerte « mot ambigu ») :
`mieux`, `optimiser`, `améliorer`, `robuste`, `performant`, `simple`, `efficace`, `qualité`, `rapide`, `fiable`, `stable`, `propre`, `bon`, `meilleur`, `correct`, `adéquat`, `satisfaisant`, `acceptable`.

Ces listes vivent dans `src/content/heuristics.ts` (donnée, pas code), enrichissables sans modification du moteur.

---

## 2. Module Sprint

### 2.1 Définition de l'objectif de sprint
Un objectif de sprint = **un but unique et cohérent** sur l'itération (1 à 4 semaines). Il donne un sens à l'incrément. Ce n'est ni la liste des stories, ni un fourre-tout. Une équipe doit pouvoir le réciter de mémoire.

### 2.2 Règles spécifiques (s'ajoutent au tronc commun)
- **Un seul** but par sprint. Pas de « et ». Pas de liste.
- **Concret pour l'utilisateur final ou un système identifiable** : on doit pouvoir nommer qui ou quoi sera impacté.
- **Atteignable dans l'itération** : si on doute qu'on puisse faire la moitié, l'objectif est mal calibré.
- **Cohérent avec le backlog du sprint** : les stories du sprint doivent contribuer à l'objectif (test de cohérence côté facilitateur).
- **Calibrage ambition Sprint** : l'équipe doit estimer ses chances de succès à **plus de 70 %**. Un objectif de sprint n'est **pas** un pari.

### 2.3 Exemples (V1, à enrichir par retours d'atelier)

**Bons exemples**
- « Réduire de 50 % le taux d'abandon au paiement sur mobile d'ici la fin du sprint 24. »
- « Permettre à un utilisateur invité de finaliser une commande sans créer de compte, mesuré sur 100 sessions, fin de sprint. »
- « Diviser par deux le temps moyen de réponse de l'API `/search` (95e percentile) avant la fin de l'itération. »

**Mauvais exemples (avec diagnostic)**
- « Développer la nouvelle page de paiement. » → output, pas outcome ; verbe « développer ».
- « Améliorer la performance et finir la migration auth. » → composite, mot flou « améliorer ».
- « Refactorer le module commande. » → output pur ; aucun résultat externe.
- « Mettre en place le nouveau pipeline CI. » → output ; aucune mesure de succès observable côté utilisateur ou système.

---

## 3. Module PI (Program Increment, ~8–12 semaines)

### 3.1 Définition
Un objectif de PI = **un résultat de valeur métier livrable** à l'échelle du train (plusieurs équipes), sur 8–12 semaines. Typiquement classé **committed** (engagement) ou **stretch** (ambition haute).

### 3.2 Règles spécifiques
- **Formulé en valeur métier**, pas en livrables techniques.
- **Mesurable à l'échelle du PI** : la mesure existe et est observable à la PI Review.
- **Affecté à un porteur clair** (équipe, train, business owner).
- **Distinction committed / stretch** assumée (le stretch n'est pas un committed déguisé).
- **Calibrage ambition par classe** : un **committed** doit être estimé atteignable à **80–100 %** de confiance ; un **stretch** à **30–60 %**. Le moteur demande à l'utilisateur de classer chaque objectif et vérifie la cohérence du calibrage déclaré.

### 3.3 Score business (convention SAFe — validé V1)
Chaque objectif de PI porte une **valeur business 1–10** attribuée par un Business Owner. Le moteur **stocke et rappelle** cette valeur ; il **ne juge pas** la pertinence du chiffre (hors de portée pédagogique de l'outil). Champ optionnel à la rédaction, exigé à l'export pour permettre un suivi committed vs réalisé en V2.

### 3.4 Exemples (V1)

**Bons exemples**
- *Committed* — « Permettre à 80 % de nos clients entreprise d'activer le SSO en self-service, mesuré sur le dernier mois du PI. »
- *Stretch* — « Faire entrer trois clients pilotes sur la nouvelle offre marketplace avant la PI Review. »

**Mauvais exemples (avec diagnostic)**
- « Livrer le module facturation v2. » → output ; pas de mesure de valeur ; verbe « livrer ».
- « Améliorer la stabilité de la plateforme et réduire la dette technique. » → composite ; deux mots flous ; pas de seuil.
- *Committed estimé à 40 %* → incohérence de calibrage : un committed à 40 % de confiance est en réalité un stretch mal nommé.

---

## 4. Module OKR

> ✅ Doctrine refondue le 2026-06-21 (validée Lætitia, voir §7). Bi-niveau strict, articulation avec PI et Sprint explicite, distinction health metric ≠ KR.

### 4.1 Définition générale
Un OKR = **un Objective qualitatif** + **3 à 5 Key Results quantitatifs outcome-based**. Cadence trimestrielle par défaut. **Pas d'OKR individuel** (anti-pattern doctrinalement établi — Morisseau, Lamorte, Niven convergent).

### 4.2 Deux niveaux distincts, jamais fondus

| Niveau | Horizon | Porteur | Couverture V1 |
|---|---|---|---|
| **OKR entreprise** | Annuel, révision trimestrielle | CODIR animé par un coach OKR | À venir (D20) |
| **OKR équipe** | Trimestriel (90 jours) | Équipe en co-construction, animée par un facilitateur | Couvert |

### 4.3 Place dans la chaîne d'alignement vertical (matériel pédagogique central)

```
OKR entreprise  (annuel · le « pourquoi » stratégique)
        ↓ contribuent à
OKR équipe      (trimestriel · le « vers où » de l'équipe)
        ↓ se déclinent en
PI Objectives   (8–12 sem · le « quoi » engagé : committed/stretch)
        ↓ se déclinent en
Sprint Goals    (1–4 sem · le « comment » mesurable à court terme)
```

Confondre deux étages = perdre une dimension du pilotage. La spécificité grammaticale de chaque étage est ce que l'outil enseigne. À matérialiser visuellement dans la fiche Apprendre OKR équipe.

### 4.4 Règles spécifiques OKR équipe (V1)
S'ajoutent au tronc commun §1.

- **Objective** : qualitatif, inspirant, mémorisable, **sans chiffre** (le chiffre est dans les KR).
- **Key Results** : 3 à 5 par Objective. Chacun chiffré, chacun mesurable, chacun **outcome** (pas une tâche, pas un livrable).
- **Calibrage ambition par KR** : confiance estimée **50 % à 70 %** (déjà encodé dans `CONFIDENCE_RANGES.okr`). 100 % = trop facile, c'est une tâche planifiée. <30 % = irréaliste.
- **Pas de KR = projet** : « Livrer X », « Migrer Y », « Implémenter Z » ne sont pas des KR, ce sont des moyens.
- **Health metric ≠ KR** (apport Lamorte) : un seuil de santé qu'on surveille en continu (uptime > 99,9 %, code coverage > 80 %, latence p95 < 200 ms) est un *garde-fou*, pas un KR. Un KR vise un **changement à atteindre**, pas un état à maintenir. Enseigné en fiche, **non détecté par heuristique en V1** (faux positif coûteux). Trois cas du corpus mini-exercice « Indicateur du KR » opposent un vrai KR à une health metric pour ancrer la distinction.
- **KR auto-centré (sur le fonctionnement propre de l'équipe)** : doctrine retenue **pragmatique (Lamorte)**. Un KR dont le bénéficiaire est l'équipe elle-même (ex. « passer le délai de cycle interne de 11 j à 6 j ») est acceptable à **deux conditions** : (1) l'Objective parent reste tourné vers l'extérieur (ex. livrer plus de demandes aux clients) ; (2) ce n'est pas l'unique KR de l'Objective. L'école stricte (Doerr, Wodtke) refuse les KR auto-centrés ; le module les enseigne comme pratique acceptable mais à surveiller, avec un cas dédié dans le corpus mini-exercice « Contexte ».

### 4.5 Ce que le module OKR n'enseigne pas en V1 (limites assumées)
- Le **scoring d'atteinte** en fin de cycle (0.0 → 1.0 par KR, agrégation pondérée). L'outil enseigne à **rédiger**, pas à **scorer en fin de cycle**.
- L'**alignement bi-directionnel** (OKR équipe nourrissent les OKR entreprise). Concept avancé, reporté.
- Les **rituels d'engagement** (check-ins hebdomadaires, retrospective trimestrielle). Hors périmètre rédaction.

### 4.6 Exemples OKR équipe × dev (V1, à valider en bloc)

**Bon exemple complet**
- **Objective** : « Devenir l'outil de référence des équipes data pour l'observabilité des pipelines. »
- **KR1** : « Atteindre 500 équipes actives mensuelles utilisant le module pipeline d'ici fin du trimestre. »
- **KR2** : « Faire passer le NPS du module pipeline de 32 à 50. »
- **KR3** : « Réduire le temps moyen de détection d'un pipeline cassé de 45 min à 10 min. »

**Mauvais exemples (avec diagnostic pédagogique)**
- **Objective** « Améliorer l'observabilité de 30 % » → un Objective ne doit pas porter de chiffre, c'est le rôle des KR ; mot flou « améliorer ».
- **KR** « Livrer le nouveau dashboard métriques v2 » → c'est un projet/output, pas un KR.
- **KR** « Améliorer la satisfaction client » → pas de chiffre, pas d'unité, pas de seuil.
- **KR** « Maintenir l'uptime > 99,9 % » → health metric (garde-fou), pas un KR (qui vise un changement).
- *Six KR pour un Objective* → dilution ; ramener à 3–5.
- *KR estimé à 100 % de confiance* → trop facile ; c'est une tâche planifiée, pas un KR.

### 4.7 Sources doctrinales
- **Laurent Morisseau** — *La boîte à outils de la méthode OKR*, Dunod ; podcast CIO Revolution ; programme OKR 90 jours. Référence francophone Lean-Agile : défend bi-niveau annuel/trimestriel, articulation avec Sprint via les KR.
- **Ben Lamorte** — *The OKRs Field Book : A Step-by-Step Guide for Objectives and Key Results Coaches*, 2021 (PDF dossier). Apporte la distinction Top-Level vs Team-Level Workshops, et **health metrics vs measurable objectives**.
- **Paul Niven** — *OKRs For Dummies* (PDF dossier). Référence standard : structure 1 O + 3-5 KR, stretch ~70 %.

### 4.8 Piège « Trop d'Objectives par équipe » (déjà en code — corrigé le 2026-07-03)

> ⚠️ **Correction** : la première version de cette section (ajoutée le 2026-07-03) proposait ce piège comme un contenu candidat inédit. Erreur de vérification — ce piège **existe déjà**, livré dans `src/content/sheets/okr-equipe.dev.fr.ts` sous l'id `okr-equipe.sheet.too-many-okrs` (thème `okr.fondamentaux`), avant même cette session. Cette entrée documente l'existant a posteriori au lieu de dupliquer.

**Doctrine** : une équipe = un Objectif par cycle. Au-delà, dilution de la focalisation, plus d'arbitrage possible quand le temps manque. Sourcé Wodtke (*Radical Focus*, « Have a maximum of one OKR per team per quarter »), Lamorte (*The OKRs Field Book*, « Common mistakes in OKR design »), Doerr (*Measure What Matters*, focus comme premier super-pouvoir des OKR).

**Contenu déjà livré** : trois causes documentées (peur de laisser un sujet de côté, pression descendante, confusion OKR / liste de chantiers), méthode de tranchage (« lequel des trois, si on échoue, fait le plus mal au trimestre ? »), un exemple à 3 Objectifs empilés avec sa correction (un seul retenu, les autres vivent en KR ou en backlog).

**Pour aller plus loin (piste ouverte, non tranchée)** : le cas de terrain apporté par Lætitia le 2026-07-03 combinait prolifération **et** cascade individuelle simultanément. La fiche existante couvre bien la prolifération côté équipe ; le lien avec l'origine « objectif du DP » qui en surcharge l'équipe n'est pas explicitement traité. À rouvrir si des retours d'atelier montrent que c'est un manque réel — pas de contenu ajouté tant que ce n'est pas confirmé par l'usage.

---

### 4.9 Piège « Cascade individuelle depuis l'objectif de la direction »

> ✅ Codé le 2026-07-03 (validé Lætitia), livré dans `src/content/sheets/okr-equipe.dev.fr.ts` sous l'id `okr-equipe.sheet.individual-cascade` (thème `okr.pieges-kr`). Illustre par un cas de terrain la doctrine déjà validée en §4.1 (« pas d'OKR individuel »). Complète — sans le dupliquer — le piège voisin `okr-equipe.sheet.top-down` (§ ci-dessous « Sources ») : le top-down agit au niveau de l'équipe (l'OKR équipe est dicté), la cascade individuelle saute l'équipe entièrement (chaque personne reçoit une part de l'objectif de la direction). **Contenu narratif, ne passe pas par le moteur** (comme les exemples multi-objectifs Sprint §6 bis.2 et le piège §4.8 ci-dessus).

**Symptôme observé** : la direction (DP, direction produit, ou tout n+1 porteur d'un objectif de haut niveau) annonce son objectif, puis chaque membre de l'équipe se voit distribuer un « objectif individuel » qui reformule presque mot pour mot l'objectif de la direction, réduit à sa portion personnelle.

**Pourquoi c'est un problème** : trois défauts cumulés — (1) duplication, pas contribution (l'objectif individuel ne dit rien de plus que « je fais ma part ») ; (2) perte du critère « sous influence » (tronc commun §1.1) : le résultat dépend du collectif, pas de la personne seule ; (3) absence de co-construction, contraire à l'esprit OKR équipe (§4.2).

**Signaux à repérer sur le terrain** :
- L'objectif individuel est la même phrase que celui de la direction, en plus petit ou avec un chiffre réduit.
- La personne ne sait pas expliquer en une phrase pourquoi ce résultat est *sa* responsabilité propre et pas celle du collectif.
- Le « Résultat clé » individuel est en réalité une tâche assignée, pas un résultat dont elle est seule maîtresse.
- Tous les objectifs individuels de l'équipe se ressemblent fortement, peu de différenciation par rôle.
- Verbatim fréquent en entretien : « on m'a donné mes objectifs » plutôt que « j'ai construit les miens avec l'équipe ».

**Ce qu'on enseigne à la place** : il n'existe pas de version individuelle correcte de ce cas — c'est le point doctrinal (§4.1). La correction n'est pas de mieux écrire l'objectif individuel, c'est de remonter au bon niveau : l'équipe co-construit un seul OKR équipe qui contribue à l'objectif de la direction, et c'est cet OKR équipe partagé — pas des fragments individuels — qui relie le travail de chacun.

---

## 5. Modèle de score (proposition à valider)

Pour chaque objectif rédigé, le moteur produit :
- **Un score 0–100** = moyenne pondérée des critères vérifiés.
- **Un statut par critère** : ✅ atteint, ⚠️ partiel, ❌ raté.
- **Une justification textuelle par critère** (la règle qui a déclenché).

**Pondérations validées (V1)** — tronc commun :
- Outcome : 30 %
- Falsifiable : 25 %
- Borné : 15 %
- Sous influence : 15 %
- Ambition crédible : 15 %

Les règles spécifiques par type (composite, valeur business, nombre de KR…) influent sur le score via des **pénalités plafonnées** — pas de double pondération entre tronc commun et règle spécifique.

Seuils visuels :
- 80–100 : vert (objectif solide).
- 50–79 : ambre (utilisable mais à renforcer).
- 0–49 : rouge (à reformuler).

---

## 6. Ce que le moteur **ne fait pas** (limites assumées)

- Il ne juge pas la **pertinence stratégique** d'un objectif (est-ce le bon objectif pour le contexte business). Seule l'équipe et les parties prenantes le savent.
- Il ne **garantit pas** qu'un objectif noté 90 sera atteint — il garantit qu'il est **bien rédigé**.
- Il ne propose pas de **reformulation automatique** en V1 (pas d'IA). Il pointe les faiblesses, l'équipe corrige.

---

## 6 bis. Pièges identifiés par retours terrain — Sprint
> ⚠️ Section ajoutée le 2026-06-20 à la suite des retours de Lætitia. Les exemples proposés ici sont **à valider** avant intégration au contenu pédagogique et aux tests.

### 6 bis.0 Doctrine retenue : un seul Sprint Goal (validée 2026-06-20)
Position non négociable du module Sprint, alignée sur la **littérature reconnue** :
- *Scrum Guide 2020* : « The Sprint Goal is **the single objective** for the Sprint. »
- *Kniberg*, *Cohn* et écosystème Scrum : une seule phrase courte, mémorisable.
- *SAFe* : pluralité au niveau PI uniquement ; au niveau itération, les Iteration Goals dérivent et restent ramenés à un cap.

**Cinq raisons opératoires** (matériel de la fiche pédagogique à intégrer dans le mode Apprendre) :
1. **Focus** : un seul objectif force l'arbitrage à la sélection des stories.
2. **Mémorisable** : l'équipe doit pouvoir le réciter sans le lire.
3. **Critère de tri du backlog** : on demande à chaque story « contribues-tu à l'objectif ? ».
4. **Évaluation claire en fin de sprint** : atteint / pas atteint, sans ambiguïté.
5. **Communication aux parties prenantes** : un cap tient en une phrase ; une liste, non.

**Conséquence pour l'outil** : l'outil n'autorise qu'un seul objectif par sprint. Les équipes qui produisent N objectifs sont coachées vers la consolidation (fiche pédagogique « Pourquoi un seul Sprint Goal » et exemples annotés).

### 6 bis.1 Piège « Objectif rétrospectif »
**Symptôme observé** : l'équipe constitue d'abord la liste des stories qui rentrent dans la vélocité, puis bricole un objectif qui *résume* cette liste. L'objectif devient un effet, pas une cause.

**Signaux** : objectif qui ressemble à une énumération, plusieurs livrables nommés, formulation type « livrer X, Y, Z », plusieurs verbes coordonnés.

**Correction pédagogique** : l'objectif se pose en amont (ou en itération courte avec la sélection), il guide le choix des stories. Si la moitié du sprint ne contribue pas à l'objectif, soit l'objectif est faux, soit la sélection est mal calibrée.

#### Exemples candidats — **À VALIDER**
**Mauvais exemples "objectif rétrospectif" (à corriger en atelier)**
1. « Livrer la fonctionnalité de notification, terminer l'API export et corriger les bugs ouverts du module commande. »
   - Pièges : énumération (3 livrables), composite (« et »), tout est output.
2. « Avancer sur les 8 stories prioritaires du backlog. »
   - Pièges : énumération implicite, aucun outcome, l'objectif décrit le travail.
3. « Boucler l'onboarding et finaliser l'export PDF. »
   - Pièges : composite, deux livrables, aucun changement constatable décrit.
4. « Finir tout ce qui était prévu pour ce sprint. »
   - Pièges : objectif fourre-tout, équivalent à « faire le sprint », aucune direction.

**Bon exemple correspondant (correction de l'#1)**
- « Réduire de 30 % le délai entre l'envoi d'une commande et sa notification au client (95e percentile), d'ici fin de sprint. »

### 6 bis.2 Piège « Multi-objectifs » (équipes qui produisent N objectifs distincts)
**Symptôme observé** : l'équipe ne produit pas un objectif unique, mais une **liste d'objectifs distincts** pour le même sprint (« Objectif 1 : … ; Objectif 2 : … »). Différent du piège rétrospectif (qui est *un seul* objectif fourre-tout). Ici, ce sont plusieurs caps en parallèle.

**Pourquoi c'est un problème** : dilution du focus, perte de mémorisation, impossibilité de trancher en fin de sprint. Voir les 5 raisons du 6 bis.0.

**Correction pédagogique** : aider l'équipe à identifier l'**enjeu transverse** qui les a poussées à proposer ces N objectifs, et le formuler comme **un seul objectif** plus large. Si aucun enjeu transverse n'existe vraiment, c'est que le sprint mélange deux travaux qui auraient dû être deux sprints séparés (ou deux équipes).

#### Exemples candidats — **À VALIDER**
**Mauvais exemples "multi-objectifs déclarés" (à corriger)**
1. « Objectif 1 : Migrer l'authentification vers OAuth. Objectif 2 : Réduire les bugs sur le panier de 8 à 2. »
   - Diagnostic : deux caps sans lien, sélection de stories incohérente, équipe qui ne saura pas dire « atteint / pas atteint » globalement.
2. « Objectif 1 : Livrer la v1 du dashboard manager. Objectif 2 : Stabiliser l'API. Objectif 3 : Onboarder le nouveau dev. »
   - Diagnostic : trois caps, premier output, deuxième flou, troisième hors périmètre objectif sprint.

**Correction de l'exemple #1 (deux pistes possibles selon le contexte réel)**
- *Si l'enjeu transverse est la confiance utilisateur* → « Augmenter le taux de connexions sans incident (auth + panier) de 92 % à 99 % d'ici fin de sprint. »
- *Si les deux travaux n'ont aucun lien* → constat : ce sprint aurait dû n'en porter qu'un seul.

### 6 bis.3 Piège « Sprint maintenance sans valeur »
**Symptôme observé** : sprint dédié à la dette technique / bugs / stabilisation. L'équipe pense qu'il n'y a pas d'outcome formulable et bascule sur un objectif output (« refactorer X »).

**Correction pédagogique** : un sprint maintenance produit toujours un changement constatable, mais pour un public différent du sprint produit. Bénéficiaires possibles : utilisateur final (moins de bugs visibles), équipe support (moins d'escalades), équipe ops (déploiements plus rapides), équipe dev elle-même (vélocité ou stabilité futures). La méthode : nommer le bénéficiaire, nommer le changement, nommer la mesure.

#### Exemples candidats — **À VALIDER**
**Bons exemples "sprint maintenance" (avec bénéficiaire explicite)**
1. *Bénéficiaire : utilisateurs finaux* — « Réduire le nombre d'incidents de production sur le module commande de 14 à 5 par semaine d'ici fin de sprint. »
2. *Bénéficiaire : équipe support* — « Permettre à l'équipe support de résoudre 70 % des tickets module commande sans escalade vers la dev d'ici fin du sprint. »
3. *Bénéficiaire : ops / utilisateurs* — « Diviser par deux le temps moyen de déploiement d'un hotfix (de 4 h à 2 h) avant la fin du sprint. »
4. *Bénéficiaire : équipe oncall* — « Atteindre 0 alerte critique non triée durant l'astreinte week-end qui suit ce sprint. »
5. *Bénéficiaire : équipe dev elle-même* — « Diviser par deux le temps moyen passé par développeur sur les bugs hérités (mesuré sur le suivi temps), fin de sprint. »

**Mauvais exemples "sprint maintenance" courants (à corriger)**
1. « Refactorer le module commande. » → output, aucun bénéficiaire, aucune mesure.
2. « Réduire la dette technique. » → flou, pas de bénéficiaire, pas de mesure.
3. « Stabiliser la plateforme. » → flou (« stabiliser »), aucun seuil, pas de borne.

### 6 bis.4 Validation — ✅ validée en bloc le 2026-06-20
- (a) Exemples « rétrospectif » → **OK**.
- (b) Exemples « multi-objectifs » → **OK**. Note d'ingénierie : ces exemples ne passent pas par le moteur (sans heuristique dédiée, le score donnerait un signal faux). Ils servent uniquement la **fiche pédagogique** en mode Apprendre, pas les fixtures de test.
- (c) Exemples « maintenance » → **OK**.
- (d) Fiche « Pourquoi un seul Sprint Goal » → **OK** sur la doctrine §6 bis.0.
- (e) Heuristique multi-objectifs au moteur → **non en V1** (validé), à réévaluer après retours d'atelier.

### 6 bis.5 Implications techniques de la validation
- Enrichissement des listes heuristiques (§1.3) : ajout de `avancer`, `boucler`, `stabiliser`, `migrer` aux verbes d'output ; ajout de `dette` aux mots flous. Cohérent avec la marge d'enrichissement annoncée.
- Nouveau type de contenu : **fiches pédagogiques** (`PedagogicalSheet`) indexées par (type d'objectif, audience). V1 : une fiche pour Sprint × dev.
- Les exemples multi-objectifs ne sont pas insérés comme `AnnotatedExample` mais comme illustrations dans la fiche pédagogique (texte libre, pas de scoring).

---

## 6 ter. Spec « Puzzle Sprint » — corpus à valider

> ⚠️ Section ajoutée le 2026-06-20, remaniée à la demande de Lætitia : 6 catégories au lieu de 4, tuile à remplir dans la variation. Le code du mode Puzzle est **bloqué** tant que ce corpus n'est pas validé.

### 6 ter.1 Mécanique pédagogique

Six catégories de blocs organisent la structure d'un objectif outcome-based :

1. **Action verbale** — verbe qui amorce l'outcome (« Réduire »…). Verbes d'output comme distracteurs.
2. **Indicateur** — l'objet observable sans le chiffre (« le taux d'abandon au paiement »). Sujets flous comme distracteurs.
3. **Variation / cible (avec tuile chiffre)** — structure quantitative dans laquelle l'utilisateur saisit lui-même les valeurs (« de [X] à [Y] », « par [X] », « à [X] »…). L'utilisateur ne peut pas cliquer un chiffre tout fait : il doit s'engager sur une valeur. Les variantes adverbiales floues (« drastiquement », « significativement ») sont distracteurs.
4. **Contexte / bénéficiaire** — pour qui, où (« sur mobile »). Contextes vagues comme distracteurs.
5. **Préposition temporelle** — « d'ici », « avant », « pour »… Adverbes vagues comme distracteurs.
6. **Repère temporel** — « la fin du sprint », « la prochaine PI Review »… Repères flous comme distracteurs.

L'utilisateur assemble dans l'ordre de son choix (drag-and-drop libre). La phrase résultante est évaluée par le moteur existant. Pédagogiquement, l'utilisateur apprend que **l'ordre des blocs compte** ET que **les valeurs chiffrées comptent** : un objectif sans chiffre saisi ou avec un chiffre incohérent est moins solide.

**Disposition à l'écran** : 6 zones de catégorie organisées en 2 lignes de 3 colonnes (Action | Indicateur | Variation, puis Contexte | Préposition | Repère). Une zone de phrase en construction en bas, qui montre l'assemblage et le score en direct.

### 6 ter.2 Niveaux de difficulté

| Niveau | Blocs par catégorie standard (1, 2, 4, 6) | Composition | Catégories 3 et 5 (corpus restreint) |
|---|---|---|---|
| Facile | 4 | 2 bons + 2 neutres | 3 blocs (2 bons + 1 neutre) |
| Moyen | 6 | 2 bons + 2 neutres + 2 distracteurs | 4 blocs (2 bons + 1 neutre + 1 distracteur) |
| Difficile | 8 | 2 bons + 2 neutres + 4 distracteurs | 5 blocs (2 bons + 1 neutre + 2 distracteurs) |

« Neutre bien-formé » = bloc grammaticalement valide qui produit un objectif acceptable mais moins percutant. « Distracteur » = bloc qui dégrade le score.

### 6 ter.3 Corpus initial — Sprint × dev × FR — **À VALIDER**

#### Catégorie 1 — Action verbale
**Bons** « Réduire », « Diviser », « Faire passer », « Permettre à »
**Neutres** « Augmenter », « Atteindre », « Ramener », « Maintenir »
**Distracteurs** « Livrer », « Refactorer », « Mettre en place », « Améliorer »

#### Catégorie 2 — Indicateur (sans chiffre)
**Bons** « le taux d'abandon au paiement », « le temps moyen de réponse de l'API », « le nombre d'incidents de production », « le délai de déploiement d'un hotfix »
**Neutres** « le temps de résolution d'un ticket support », « le score NPS », « le taux d'erreur 5xx », « la couverture des tests automatisés »
**Distracteurs** « la nouvelle page de paiement », « la performance », « la dette technique », « tout ce qui était prévu pour ce sprint »

#### Catégorie 3 — Variation / cible (avec tuile chiffre)
Format spécial : chaque bloc contient un ou plusieurs champs `[X]` où l'utilisateur saisit lui-même la valeur. Le bloc déposé affiche le texte avec les inputs intégrés.

**Bons (structures précises avec chiffres à saisir)**
- « de [X] à [Y] » — variation absolue, 2 champs
- « par [X] » — facteur multiplicatif, 1 champ (ex. « diviser par 2 »)
- « à [X] » — cible absolue, 1 champ (ex. « atteindre 99 % »)

**Neutres bien-formés**
- « de [X] % » — pourcentage de variation, 1 champ

**Distracteurs (variations floues sans chiffres)**
- « significativement »
- « drastiquement »
- « de manière notable »
- « vers le haut »

#### Catégorie 4 — Contexte / bénéficiaire
**Bons** « sur mobile », « pour les utilisateurs invités », « pour l'équipe support », « en production »
**Neutres** « pour l'équipe oncall », « sur le module commande », « pour les nouveaux comptes », « (sans contexte explicite) »
**Distracteurs** « pour tout le monde », « en interne », « globalement », « partout »

#### Catégorie 5 — Préposition temporelle (corpus restreint)
**Bons** « d'ici », « avant »
**Neutres** « pour », « à »
**Distracteurs** « rapidement », « dès que possible »

#### Catégorie 6 — Repère temporel
**Bons** « la fin du sprint », « la prochaine PI Review », « le sprint 24 », « la fin du mois »
**Neutres** « la prochaine rétrospective », « la démo », « le mois suivant », « la prochaine PI Planning »
**Distracteurs** « bientôt », « un jour », « plus tard », « (sans repère) »

### 6 ter.4 Composition des niveaux à partir du corpus
- **Facile** : pour les catégories 1, 2, 4, 6 → 2 bons + 2 neutres ; pour les catégories 3 et 5 → 2 bons + 1 neutre. Aucun distracteur, l'enjeu est l'assemblage.
- **Moyen** : on ajoute 2 distracteurs (resp. 1) — les plus subtils.
- **Difficile** : tous les distracteurs disponibles.

### 6 ter.5 Validation — ✅ validée en bloc le 2026-06-20
- (a) Mécanique 6 catégories avec tuile chiffre → **OK**.
- (b) 3 niveaux et composition → **OK**.
- (c) Corpus de blocs → **OK**.
- (d) Phrase brute avec point final automatique → **OK**.

---

## 8. Mode Composer (assistant de rédaction, ex-Puzzle — D26)

### 8.1 Promesse
Outil **productif** : un coach (ou un utilisateur seul) compose un objectif réel pour son équipe, l'outil l'accompagne brique par brique, et il en repart avec un objectif rédigé qu'il peut **copier** ou **exporter en Markdown**.

Différence avec l'ancien Puzzle (D14 : pédagogie de l'erreur) : on n'apprend plus par l'erreur dans le Composer, **on aide à produire**. La pédagogie de l'erreur vit ailleurs (Défi QCM, contre-exemples annotés, fiches théoriques).

### 8.2 Mécanique
- **Squelette de phrase à trous** sur le plateau central : 6 zones (4 obligatoires `intention/mesure/cible/horizon` + 2 bonus `contexte/liaison`), chacune accepte **une seule carte** (option A validée : cohérent avec l'anti-pattern composite).
- **Main de cartes** en bas : onglets par catégorie, cartes cliquables qui se posent dans le slot correspondant.
- **Cartes-pièges (distractor) filtrées** hors de la main du Composer (cohérence D26 : un assistant ne propose pas des choix à éviter).
- **Garde-fous textuels** quand l'utilisateur compose une combinaison fautive (ex. liaison sans horizon → signalisation visuelle).
- **Champ « Pour quelle équipe ? »** en tête (optionnel) : apparaît dans l'export Markdown comme contexte.
- **Cartes personnalisables** dans Contexte (« pour l'équipe [X] ») et Échéance (« le [X] ») : l'utilisateur tape son propre vocabulaire.

### 8.3 Critères d'évaluation
**Aucun score affiché** dans ce mode (D26). Le moteur d'évaluation reste utilisé en silence pour l'export (toMarkdown) mais ne produit pas de verdict normatif visible.

---

## 9. Mode Analyser un objectif (page dédiée, D27)

### 9.1 Promesse
Utilitaire : « Tu as déjà rédigé un objectif. Colle-le, je te dis en 30 secondes ce qui tient et ce qui pèche. »

Distinct du Composer (qui produit) et du S'entraîner (qui apprend) : c'est un **outil de diagnostic libre**, page dédiée dans l'onglet Pratique du ModeSelector.

### 9.2 Doctrine d'analyse textuelle honnête
Avant D27, l'analyse passait des valeurs par défaut bidon au moteur (confidence=80, hasExplicitDeadline=true, isUnderTeamInfluence=true) → produisait des faux positifs (« Borné ✓ » sans échéance, « Confiance 80% » sans saisie). **Faux diagnostic, pas un outil fiable.**

Refondu : l'analyseur **n'évalue que ce qui est détectable dans le texte**. Six critères textuels :
1. **Verbe d'attaque** : détection des verbes d'output en première position
2. **Seuil chiffré** : présence d'au moins un chiffre
3. **Échéance bornée** : reconnaissance de patterns (« d'ici », « fin du », « sprint X », « PI Review », mois nommé, Q1-Q4…)
4. **Échéance floue** : détection des patterns vagues (« bientôt », « dès que possible »…)
5. **Mots flous** : extraction des mots-listes (cf. heuristics.fr.ts), avec regex compatible caractères accentués
6. **Bénéficiaire** : détection de « pour les/la/des/nos/notre/tous… X »
7. **Abréviations familières** : détection des raccourcis de jargon (prod, dev, perf, ci, qa, ux, ops, po, rte, etc.) à expliciter

### 9.3 Affichage
- **Encart Note** en tête : avoue ce que l'outil ne peut pas voir (ambition, calibrage, influence d'équipe).
- **Verdict synthétique** en une phrase.
- **« N choses à corriger »** : critères ratés priorisés.
- **« N choses qui tiennent »** : critères validés.
- **Pistes textuelles** (variante B validée) : pour chaque critère raté, suggestions tirées du corpus puzzle.
- **Raccourci clavier** : Entrée dans le textarea lance l'analyse (Maj+Entrée pour nouvelle ligne).

### 9.4 Limites assumées
Le mode Analyser n'évalue **pas** :
- L'ambition / le calibrage (demande une confidence saisie)
- L'influence réelle de l'équipe sur le résultat (jugement contextuel)
- La pertinence stratégique de l'objectif (relève du PO/PM)

Cette transparence est rendue explicite via l'encart Note.

---

## 10. Mode S'entraîner = menu de mini-exercices par partie d'objectif (D28)

### 10.1 Promesse
Plus de parcours empilé « échauffement + inspiration + écriture libre ». À la place, un **menu de 5 mini-exercices**, chacun adressant une partie de l'objectif. L'utilisateur choisit la partie qu'il veut renforcer.

### 10.2 Les 5 mini-exercices Sprint (MVP V1)

| Partie | Format | Mécanique |
|---|---|---|
| **Verbe** | Binaire output / outcome | Pattern Warmup existant. Corpus révisé par expert linguiste : « Mettre en place » → « Installer », « Diviser » → « Faire passer », « Faire entrer » → « Convertir » (3 substitutions pour clarté). |
| **Indicateur** | QCM 1 parmi 3 | Distinguer indicateur opérationnel d'un concept-parapluie flou (« la performance » vs « le temps moyen de réponse de l'API »). 10 cas validés V3 par panel pluridisciplinaire. Position des bonnes réponses équilibrée a=4, b=3, c=3. |
| **Variation chiffrée** | Grille à sélection multiple | Cocher les fragments précis (« de 50 à 30 ») et laisser les vagues (« significativement »). 8 fragments. |
| **Échéance** | Grille à sélection multiple | Cocher les fragments bornés (« d'ici fin du sprint », « avant le 30 septembre ») et laisser les flous. 8 fragments. |
| **Contexte** | QCM 1 parmi 4 | « Qui est le vrai bénéficiaire ? » Pour chaque objectif présenté, identifier la personne dont la vie change. 8 cas, vocabulaire francophone, sans acronymes ni anglicismes. |

### 10.3 Mécaniques transverses
- **Composant générique `Drill`** (src/ui/components/Drill.tsx) qui rend `QcmRunner` ou `GridRunner` selon le `kind` du corpus.
- **Pattern intro → playing → done** inspiré du Warmup.
- **Randomisation** à chaque lancement (Fisher-Yates non destructif).
- **Score live** dans le kicker.
- **Bilan final** avec verdict ("Solide / Bonne base / À retravailler").
- **Suggestion d'autres exercices** à la fin (`NextDrillsList`) pour proposer une suite naturelle.
- **Clé React `key={activeDrill}`** sur le composant Drill : force le remontage entre exercices pour éviter la persistance de state (bug fixé).

### 10.4 Corpus — règle de validation
Tout corpus mini-exercice est validé par Lætitia avant intégration. Méthode de production :
1. Première version produite par l'assistant
2. Révision V2 par sous-agent expert (linguiste-pédagogue ou Lean-Agile francophone)
3. Révision V3 par panel pluridisciplinaire (devs, PO, PM, DevSecOps, data)
4. Équilibrage final demandé par Lætitia (positions de bonne réponse)
5. Tests d'intégrité automatiques (cf. `src/content/drills/corpus-integrity.test.ts`)

Le fichier `proposition-corpus-mini-exercices.md` à la racine sert de support de validation entre sessions.

### 10.5 V1 et au-delà
**V1 MVP : Sprint uniquement**. PI et OKR équipe à étendre dans une session ultérieure (réplique du pattern + production des 4 corpus × 2 modules avec révision experte + validation Lætitia).

---

## 7. Journal de validation métier

### 2026-06-27 — Refonte doctrinale Composer + Analyser + Drills (D26 / D27 / D28)
- **D26** : le Puzzle devient « Composer », assistant de rédaction collectif. D14 (pédagogie de l'erreur) ne s'y applique plus.
- **D27** : nouveau mode « Analyser un objectif » en page dédiée. Diagnostic textuel honnête (n'évalue que ce qui est dans le texte, avoue ce qu'il ne peut pas voir).
- **D28** : S'entraîner refondu en menu de 5 mini-exercices par partie d'objectif. Verbe, Indicateur, Variation, Échéance, Contexte.
- Corpus V3 validé en bloc par Lætitia après deux révisions expertes (linguiste-pédagogue + panel pluridisciplinaire devs/PO/PM/DevSecOps/data).
- Substitutions warmup output/outcome appliquées : Mettre en place → Installer, Diviser → Faire passer, Faire entrer → Convertir.
- Composer enrichi : cartes Contexte francophones (équipes internes arrimées, consommateurs internes, clients finaux) + cartes personnalisables Contexte et Échéance.
- Sections 8, 9, 10 ajoutées à DOMAINE.md.

### 2026-06-21 — Module OKR refondu (bi-niveau, chaîne d'alignement)
Section 4 complètement réécrite après recherche doctrinale croisée (Morisseau, Lamorte, Niven).
- **Bi-niveau strict** acté : OKR entreprise (annuel) et OKR équipe (trimestriel), jamais fondus. Pas d'OKR individuel.
- **Phasage V1** : OKR équipe seulement, OKR entreprise reporté (cohérent avec audience `dev` actuelle, D20).
- **Chaîne d'alignement vertical** (Entreprise → Équipe → PI → Sprint) consignée comme matériel pédagogique central — répond à la confusion historique entre OKR équipe et Sprint Goal / PI Objective.
- **Health metric ≠ KR** (apport Lamorte) enseigné en fiche, pas codé comme heuristique en V1 (faux positif coûteux).
- Scoring d'atteinte en fin de cycle et alignement bi-directionnel explicitement hors périmètre V1.
- Sources doctrinales consignées en §4.7.

### 2026-06-20 — Itération « retours terrain » validée en bloc
- Doctrine « un seul Sprint Goal » consignée (§6 bis.0), sourcée Scrum Guide 2020 / Kniberg / Cohn.
- Trois pathologies de sprint planning formalisées : rétrospectif (§6 bis.1), multi-objectifs (§6 bis.2), maintenance sans valeur (§6 bis.3).
- Tous les exemples candidats validés. Nouveau type de contenu `PedagogicalSheet` introduit pour la fiche « Pourquoi un seul Sprint Goal ».
- Listes heuristiques enrichies : verbes (`avancer`, `boucler`, `stabiliser`, `migrer`), mots flous (`dette`).
- Pas d'heuristique multi-objectifs en V1.

### 2026-06-20 — V1 figée
1. **Verbes d'output** : liste par défaut validée (section 1.3), enrichissable sans modification du moteur.
2. **Mots flous** : liste par défaut validée (section 1.3), enrichissable.
3. **Calibrage ambition** : remplacé par une calibration **par type** (Sprint >70 %, PI committed 80–100 %, PI stretch 30–60 %, OKR KR 50–70 %). Décision d'ingénierie pour éviter une règle unique fausse pédagogiquement.
4. **Exemples annotés** : esquisses validées comme matériel V1 ; à enrichir par les retours d'atelier (loop d'amélioration prévu dans `STATUS.md`).
5. **Pondérations du score** : Outcome 30 / Falsifiable 25 / Borné 15 / Sous influence 15 / Ambition crédible 15 (section 5).
6. **Score business PI** : intégré comme **métadonnée** stockée et exigée à l'export, pas comme critère de qualité jugé par le moteur (section 3.3).
7. **Objectif composite** : règle stricte en V1 — aucun « et » coordonnant deux résultats. Réouverture en V2 pour discuter les cas tolérables.
