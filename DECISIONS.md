# DECISIONS

Format : pour chaque décision, trois lignes — **Contexte**, **Choix**, **Alternative écartée**.

## D1 — Architecture hexagonale stricte
- Contexte : outil pédagogique appelé à évoluer (types d'objectifs, contenu métier, format d'export). La logique métier doit survivre à un changement d'UI.
- Choix : un cœur de domaine TypeScript pur (`src/domain/`), aucun import de React ni de framework. Ports d'entrée (évaluer) et de sortie (export, contenu pédagogique). Adaptateurs côté `src/adapters/`. UI React = adaptateur driving dans `src/ui/`.
- Alternative écartée : tout mettre dans des composants React. Refusé : couplage UI/métier irréversible, tests métier impossibles sans rendu.

## D2 — Stack : Vite + React + TypeScript + Vitest
- Contexte : besoin d'un build local rapide, d'un livrable web ouvrable en double-clic après build, et d'un harnais de tests sur le domaine.
- Choix : Vite (dev server + build), React 18, TypeScript en mode strict, Vitest pour les tests unitaires du domaine, ESLint + Prettier.
- Alternative écartée : Next.js. Refusé : SSR inutile (pas de backend, pas de SEO), ajoute de la complexité hors sujet.

## D3 — Pas d'IA / pas de LLM dans le V1
- Contexte : besoin d'un feedback pédagogique honnête, déterministe, explicable, sans clé API.
- Choix : moteur d'évaluation = grille auto-co-construite (questions au format binaire ou choix) + heuristiques objectives sur le texte (verbe d'action, présence d'un nombre, mots flous, formulation outcome vs output). Chaque diagnostic justifié par une règle traçable.
- Alternative écartée : analyse texte par LLM à chaque frappe. Refusé : coût, latence, opacité pédagogique, dépendance externe volatile.

## D4 — Contenu pédagogique externalisé en données
- Contexte : la pédagogie évoluera plus vite que le code (corrections, nouveaux exemples, formulations).
- Choix : définitions, libellés de critères, exemples annotés et messages de feedback dans des fichiers de données TypeScript typés (`src/content/`), chargés par les adaptateurs. Aucun texte métier en dur dans le moteur ou l'UI.
- Alternative écartée : strings hardcodés dans les composants. Refusé : Lætitia ne peut plus corriger sans toucher au code.

## D5 — Pas de persistance dans le V1
- Contexte : usage atelier, éphémère par construction.
- Choix : aucun stockage. Export à la demande en Markdown, JSON, ou copie presse-papier. État en mémoire React uniquement.
- Alternative écartée : `localStorage`. Refusé : crée une attente d'historique non couverte, conflits multi-onglets, complexité hors V1.

## D6 — Tests sur le domaine via les exemples annotés
- Contexte : la qualité pédagogique se juge sur des cas concrets.
- Choix : chaque exemple annoté (bon ou mauvais) du contenu pédagogique sert aussi de fixture Vitest. On ne livre pas une règle de scoring sans test associé.
- Alternative écartée : tests synthétiques inventés. Refusé : on perd l'alignement entre ce que l'utilisatrice valide et ce que le code vérifie.

## D7 — Couleurs porteuses de sens
- Contexte : feedback visuel doit être lisible instantanément, à distance, en atelier.
- Choix : tokens sémantiques `--color-good` (vert), `--color-warn` (ambre), `--color-bad` (rouge), `--color-neutral`. Couleur **jamais** seule porteuse d'info (toujours doublée d'une icône et d'un texte) — exigence WCAG.
- Alternative écartée : nuancier décoratif. Refusé : design ≠ décoration ; les couleurs portent la pédagogie.

## D8 — Audience paramétrée dès la conception, une seule activée en V1
- Contexte : vision long terme = outil pour plusieurs niveaux hiérarchiques (dev, PO, PM, gestionnaire). Le V1 ne traite que l'audience « équipe de développeurs », mais l'archi doit accueillir les autres sans réécriture.
- Choix : modéliser `Audience` comme un type explicite dans le domaine (`'dev'` en V1, extensible). Le contenu pédagogique (exemples, vocabulaire, pièges) est indexé `(type d'objectif, audience)`. Le moteur de scoring reste **commun** à toutes les audiences — un bon objectif est un bon objectif quelle que soit l'audience ; seul le matériel d'apprentissage diffère.
- Alternative écartée : coder uniquement pour les devs et généraliser plus tard. Refusé : refactor garanti, et risque de fuites de vocabulaire spécifique-dev dans le moteur.

## D9 — Parcours mono-type : sélection en entrée, isolation jusqu'à la sortie (exception : Puzzle, voir D16)
- Contexte : trois types d'objectifs très différents (Sprint, PI, OKR). Les exposer simultanément crée de la confusion pédagogique — l'utilisateur perd la spécificité de chaque cadre.
- Choix : écran d'accueil = sélecteur de type (Sprint / PI / OKR). Une fois choisi, toute la session (apprendre, s'entraîner, export) reste dans ce type. Pour changer de type, retour au sélecteur. Pas de comparaison côte à côte, pas d'agrégation.
- Alternative écartée : navigation libre par onglets entre les trois. Refusé : casse la divulgation progressive, encourage le mélange des genres.
- **Exception assumée (D16)** : le mode Puzzle dispose d'un sélecteur de type interne. Décision prise en connaissance des risques (incohérence avec les autres modes, parasitage potentiel en atelier) — voir D16 pour le débat complet.

## D10 — Calibrage ambition par type d'objectif
- Contexte : un seuil unique de calibrage (« 3–7 chances sur 10 ») est pédagogiquement faux. Un sprint n'est pas un pari ; un stretch SAFe n'est pas un committed ; un KR OKR vise ~70 %.
- Choix : seuils différenciés. Sprint : confiance >70 %. PI committed : 80–100 %. PI stretch : 30–60 %. OKR KR : 50–70 %. L'utilisateur déclare sa confiance estimée, le moteur vérifie la cohérence avec le type/classe choisi.
- Alternative écartée : un seuil unique au tronc commun. Refusé : invalide pour au moins un type sur trois.

## D11 — Score business du PI : métadonnée, pas critère
- Contexte : SAFe attribue une valeur business 1–10 par PI objective via le Business Owner. Question : le moteur juge-t-il ce chiffre ?
- Choix : non. Le moteur **stocke et rappelle** la valeur business mais ne la note pas — la pertinence stratégique sort du périmètre pédagogique. Champ optionnel à la rédaction, exigé à l'export (préparation du suivi committed/réalisé en V2).
- Alternative écartée : intégrer la valeur business comme critère de qualité. Refusé : invente une règle là où aucune ne fait consensus, et brouille la frontière entre rédaction et stratégie.

## D16 — Puzzle générique multi-type avec sélecteur interne (exception à D9)
- Contexte : Lætitia veut un jeu unique pour tous les objectifs, avec sélecteur de type interne pour permettre la comparaison rapide entre Sprint/PI/OKR. Débat critique tenu : conflit avec D9 (mono-type), risque de parasitage en atelier, asymétrie avec les autres modes (Apprendre/S'entraîner/Défi restent mono-type), risque pédagogique inverse (banalisation de la spécificité PI vs Sprint). Tous les arguments contre exposés, option B retenue par Lætitia en connaissance de cause.
- Choix : un composant `Puzzle` unique avec sélecteur de type en tête. Le corpus de blocs change selon le type. Métadonnées annexes affichées conditionnellement (committed/stretch + valeur business pour PI). Bascule de type vide la zone d'assemblage (pas de pollution croisée). Les écrans `SprintPuzzle.tsx` et `PIPuzzle.tsx` sont marqués obsolètes.
- Alternative écartée : (A) puzzle par type strict — refusé : pas la pédagogie souhaitée ; (C) refonte trans-type complète — refusé : trop radical, perte de focus en atelier ; (D) mode « comparer » dédié — refusé : pas l'expérience souhaitée.

## D17 — Système de gabarit Screen (composition visuelle unifiée)
- Contexte : retour Lætitia — composition front « peu intelligente », empilement vertical monotone, actions noyées dans 6 emplacements différents, pas de hiérarchie visuelle, écrans incohérents entre eux. Audit UI structurelle commandé à un sous-agent expert (rapport archivé `audits/2026-06-21-audit-ui-structurelle.md`).
- Choix : un gabarit unique `Screen` réutilisé par tous les écrans. Trois zones structurelles : `ScreenHeader` (sticky haut, eyebrow + titre + lede + actions secondaires), `ScreenBody` en 4 variantes (`single`, `rail`, `wide-rail`, `source-aside`) avec `Zone primary` (carte) + `Zone context` (rail sticky), `ScreenActions` (sticky bas, à la Linear : gauche tertiaire / centre statut / droite primaire avec backdrop-blur). 5 composants React de layout dans `src/ui/layout/`. Pilote : `SprintPractice`. Si validé, propagation à Challenge, Puzzle, Learn, Selectors, PIPractice.
- Alternative écartée : refondre les 6 écrans d'un coup. Refusé : risque de régression série, validation impossible avant de tout avoir refait.

## D15 — Refonte UX laptop-first en 3 vagues (audits design + a11y)
- Contexte : retour Lætitia — l'outil sera utilisé sur laptop uniquement, non sur mobile. Le layout 880 px centré sous-utilise l'espace. Deux audits ont été commandés à des sous-agents experts (design/UX et accessibilité WCAG 2.1 AA), rapports archivés dans `audits/2026-06-20-*.md`.
- Choix : refonte en 3 vagues. Vague 1 (en cours) = fondations : contenu à 1320 px, échelle typo étendue (xs/sm/base/md/lg/xl/xxl), `.section-title` border-bottom, layouts 2 colonnes pour Practice/Challenge avec `EvaluationPanel` sticky droit, Puzzle en 2 colonnes (blocs/cible), `.btn--lg` sur CTAs primaires, **les 4 bloquants WCAG résolus** (radiogroup natif, suppression `role="listitem"` sur `<button>`, séparation handle/draggable, alternative clavier pour D&D + announcer). Vague 2 = finitions ; vague 3 = polissage (mode plein écran, chip mode actif).
- Alternative écartée : tout faire d'un bloc. Refusé : risque de régression silencieuse, validation à l'usage difficile.

## D14 — Mode Puzzle : drag-and-drop libre, 3 niveaux, validation par score
- Contexte : retour explicite de Lætitia — la dimension "jeu" promise au cadrage initial n'est pas couverte par le mode Défi (réécriture libre). Besoin d'un vrai puzzle, mécanique d'assemblage de blocs.
- Choix : drag-and-drop libre via `@dnd-kit/core` + `@dnd-kit/sortable` (standard React moderne, accessibilité clavier solide, gestion tactile correcte). 3 niveaux de difficulté (facile/moyen/difficile) qui varient la quantité et la proportion de distracteurs dans le corpus. Validation = score ≥ 80 sur la phrase assemblée, évalué par le moteur existant. Aucune nouvelle règle moteur.
- Alternative écartée : (a) clic-toggle par catégorie (plus accessible mais moins joueur ; rejeté par Lætitia) ; (b) HTML5 native drag-and-drop (mauvais clavier + tactile fragile). Coût assumé : +~30 Ko gzippés sur le bundle.

## D12 — Distribution en HTML monofichier (zéro install pour l'usage)
- Contexte : l'utilisatrice et son public cible (équipes en atelier) ne veulent pas ouvrir un terminal pour lancer l'outil. Le développement nécessite Node ; l'usage non.
- Choix : `vite-plugin-singlefile` produit un unique `coach-objectifs.html` (~170 KB) qui inline JS et CSS. Ouverture par double-clic, aucun serveur, aucun navigateur particulier requis. `base: './'` pour fonctionner en file://. Le script `npm run build` copie automatiquement le résultat à la racine du projet.
- Alternative écartée : déployer sur un hébergement statique. Refusé pour le V1 (ajoute une dépendance opérationnelle, complique le partage interne, soulève la question de l'authentification).

## D13 — Français uniquement en V1
- Contexte : public cible identifié, ressource limitée.
- Choix : tous les libellés en français, aucun mécanisme i18n.
- Alternative écartée : i18n dès le départ. Refusé : sur-conception, ralentit le V1 sans bénéfice.

## D18 — OKR : deux types distincts dans le sélecteur principal (option 2)
- Contexte : la doctrine OKR (Morisseau, Lamorte, Niven) impose un bi-niveau strict — OKR entreprise (annuel) et OKR équipe (trimestriel) ne s'écrivent pas avec la même grammaire ni la même cadence. Lætitia a aussi écarté l'OKR individuel (anti-pattern). Question d'archi : un seul type `okr` avec sous-sélecteur, ou deux types distincts dans le sélecteur principal.
- Choix : deux types distincts dans la home — `okr-equipe` et `okr-entreprise`. Force la distinction pédagogique dès l'entrée d'atelier (cohérent avec D9). La home n'affiche pas 4 cartes : une carte « OKR » ouvre une page intermédiaire qui permet de choisir le niveau (voir D19).
- Alternative écartée : un seul type `okr` avec sous-sélecteur dans l'écran S'entraîner. Refusé : noie la distinction de cadence et de grammaire dans un sous-paramètre, alourdit la logique de critères dans le moteur (branches conditionnelles selon niveau).

## D19 — Navigation OKR à 3 niveaux : Type → LevelSelector → Mode
- Contexte : conséquence directe de D18 — il faut un écran de choix entre OKR équipe et OKR entreprise sans surcharger la home.
- Choix : une page intermédiaire `LevelSelector` apparaît quand l'utilisateur clique la carte OKR. Pattern visuel identique au `ModeSelector` (deux cards explicites, eyebrow, picto cercle, CTA). Cohérent avec le pattern de progression linéaire déjà en place (TypeSelector → ModeSelector). Cohérent aussi avec le gabarit Screen (D17).
- Alternative écartée : carrousel inline sur la carte OKR de la home. Refusé : cache l'option « entreprise » derrière une interaction non visible, moins accessible au clavier, casse le pattern « 1 clic = 1 choix » des autres écrans.

## D21 — Refonte Théorie/Pratique : onglets ModeSelector + thèmes + migration warmup/exemples vers Practice
- Contexte : retour utilisatrice 2026-06-22. Le mélange théorie + exercices dans Apprendre créait une **redondance hiérarchique** avec les autres modes (S'entraîner / Défi / Puzzle) qui sont déjà de la pratique pure. Une première rustine (onglets `LearnTabs` dans Apprendre) matérialisait la distinction au mauvais niveau.
- Choix : restructurer au niveau ModeSelector via des **onglets Théorie / Pratique** avec palette différenciée (bleu marine pour la théorie, corail pour la pratique). Trois conséquences :
  - **« Apprendre » renommé « Théorie »** : l'écran ne contient plus que les fiches, organisées en **grille de thèmes** (composant `ThemeGrid`) qui donne envie d'explorer au lieu d'une liste plate. Champ optionnel `themeId` sur `PedagogicalSheet`, type `LearningTheme` + port `getThemes` ajoutés au domaine.
  - **S'entraîner devient un hub progressif en 3 étapes** : (1) Échauffement output/outcome — le warmup migre depuis Apprendre, (2) Inspire-toi — les exemples annotés migrent depuis Apprendre, (3) Écris — le formulaire de rédaction existant. Étapes 1 et 2 en accordéon ; étape 3 toujours visible. Composants partagés `PracticeExamples` (Sprint/PI) et `OkrPracticeExamples` (variante OKR avec O + KR).
  - **Tokens** : `--color-theory` (#1E40AF bleu marine, lecture/posé) et `--color-practice` (alias de `--color-accent`, action/engagement). Cards et onglets héritent.
- Alternative écartée : (a) onglets Théorie/Pratique dans Apprendre uniquement — refusé : redondance hiérarchique pointée par Lætitia, le facilitateur s'attend à voir la distinction au niveau supérieur ; (b) groupes verticaux « Pour apprendre / Pour pratiquer » sans onglets — refusé : moins clair que des onglets actifs, ne matérialise pas la palette différenciée ; (c) introduire un mode « S'échauffer » séparé — refusé : multiplie les modes (5 ou 6) sans bénéfice clair, le warmup est mieux placé en amont du formulaire de rédaction.

## D20 — V1 OKR : équipe uniquement, entreprise « à venir »
- Contexte : audience V1 = `dev`. Un dev rédige ses OKR équipe, pas les OKR entreprise (rédigés par le CODIR avec un coach). Phaser la livraison réduit le risque d'enseigner un contenu déconnecté de l'usage réel de l'audience cible.
- Choix : V1 livre `okr-equipe` complet (Apprendre + S'entraîner, à l'image du démarrage Sprint et PI). Le LevelSelector affiche `okr-entreprise` désactivé avec mention « à venir » (pattern déjà utilisé pour les modes Défi/Puzzle des autres types à leur démarrage). Défi QCM et Puzzle OKR équipe = second incrément.
- Alternative écartée : (a) livrer les deux niveaux en parallèle — refusé : double la charge de validation pédagogique avant un retour d'usage ; (b) ouvrir une nouvelle audience (`dirigeant`, `pm`) pour OKR entreprise — refusé : ouvre un chantier multi-audience qu'on a évité jusqu'ici.

## D22 — Puzzle : clic direct sur les blocs source + signalisation live (au lieu de blocage dur)
- Contexte : retour utilisatrices 2026-06-26 — « le Puzzle est trop compliqué, perturbant de pouvoir se tromper, les gens veulent pouvoir se fier à l'outil ». Le bouton « + » à côté de chaque bloc était jugé peu intuitif. La demande initiale était de **bloquer les combinaisons fautives**.
- Choix : (1) **mécanique** — clic direct sur les blocs source pour les ajouter (le D&D reste pour réordonner les blocs déjà placés). Le bloc source devient un `<button>`, plus de `useDraggable` ni de bouton « + » séparé. (2) **garantir la fiabilité perçue sans casser l'apprentissage** — au lieu de bloquer dur (qui supprimerait la valeur pédagogique du Puzzle, cf. D14), apporter un équivalent perceptif via : un **bandeau live** affiché dès le 1er bloc posé (compte de blocs, catégories couvertes, compte de pièges détectés) ; un **marquage visuel des distracteurs placés** (liseré ambre + badge `!` + tooltip de catégorie). Le score moteur reste affiché dès que la phrase est complète. L'utilisateur sait en temps réel s'il est en train de poser un piège, mais peut s'entêter (et apprendre).
- Alternative écartée : **bloquer physiquement les combinaisons fautives** (l'outil interdit l'assemblage d'un verbe d'output en tête, etc.). Refusée : transforme le Puzzle en assistant de rédaction, supprime la pédagogie de l'erreur (D14 — la mécanique repose sur le contraste « bon vs distracteur » que l'utilisateur doit apprendre à discriminer). Cohérence aussi avec D9 + D17 : on guide perceptivement, on n'opérationnalise pas un wizard.

## D23 — Puzzle harmonisé avec le gabarit Screen (zone primary = production, context = palette)
- Contexte : retour utilisatrice 2026-06-26 sur capture du Puzzle PI : « la disposition n'est pas intuitive, le regard n'est pas guidé, l'UX n'est pas harmonisée avec l'existant ». Audit design (sous-agent) confirme : le Puzzle utilisait `variant: "source-aside"` avec la palette de blocs en `primary` (zone gauche large) et la production utilisateur en `context` (zone droite sticky). Inversion par rapport au reste de l'app (PIPractice / SprintPractice / Challenge) où `primary` contient toujours la production utilisateur (textarea, formulaire) et `context` les outils d'aide (EvaluationPanel sticky).
- Choix : passage du Puzzle en `variant: "wide-rail"`. `primary` = zone d'assemblage + phrase assemblée + bandeau live + EvaluationPanel, structurée en deux étapes numérotées (« 1. Construis ta phrase », « 2. Lis le diagnostic ») via le pattern `.practice-step` (variante `head` pour usage en `<section>`). `context` = palette des 6 catégories de blocs en 1 colonne empilée, sticky avec scroll interne. Métadonnées PI déplacées dans un `<details>` repliable « Paramètres PI » au sommet de `primary` (récap inline dans le `<summary>`). Redondance du score supprimée (chip retiré des `actions.status`, le score reste dans EvaluationPanel uniquement). Bug pédagogique fixé en passant : `isComplete()` exige désormais au moins 4 catégories distinctes posées avant de déclencher l'évaluation, sinon une phrase d'un seul bloc obtenait un score moteur faussement positif (constante `MIN_DISTINCT_CATEGORIES = 4` exportée).
- Alternative écartée : (a) garder `source-aside` et juste retoucher visuellement le placement des métadonnées — refusé : ne résout pas l'asymétrie avec les autres écrans, le regard continue de partir vers la palette au lieu de la production ; (b) inverser `source-aside` (palette à droite large) — refusé : le rail droit reste sticky et étroit par contrat, élargir casse la cohérence du gabarit ; (c) créer un 5e variant `aside-source` dédié au Puzzle — refusé : multiplier les variants pour un cas unique va à l'encontre de D17 (un système de gabarit, pas une accumulation d'exceptions).

## D24 — Révision de doctrine : micro-animations autorisées quand elles servent la pédagogie
- Contexte : la doctrine initiale (2026-06-20) refusait les animations pour rester sobre. Le concept Puzzle « Plateau de cartes » (D25) introduit une animation de dépôt (180 ms ease-out) qui matérialise le geste « je joue cette carte ». Sans le mouvement, le clic devient un « hop » abrupt qui empêche le cerveau de suivre l'objet.
- Choix : les micro-animations (≤ 200 ms, ease-out, déplacement court) sont autorisées **quand elles servent la lecture d'un geste pédagogique** (déposer, valider, basculer). Toute animation décorative (bounce, parallax, hover « lift ») reste refusée. Respect obligatoire de `prefers-reduced-motion: reduce` : animation ramenée à 0 ms si la préférence système est activée.
- Alternative écartée : interdire toute animation (doctrine initiale). Refusé : prive la mécanique de plateau de cartes d'un repère visuel essentiel, dégrade la sensation de jouabilité demandée par l'utilisatrice.


## D25 — Puzzle refondu en plateau de cartes (concept retenu sur 3 propositions)
- Contexte : retour utilisatrice 2026-06-26 sur l'écran Puzzle déjà refondu deux fois : « ça manque de fluidité et d'intuitivité, je voudrais une dynamique de jouabilité d'excellence en harmonie avec le reste de l'outil ». Audit game design / direction artistique commandé à un sous-agent (3 concepts comparés : Composeur d'encres, Partition Lean, Plateau de cartes).
- Choix : **Plateau de cartes**. Métaphore deckbuilding léger. Plateau central avec **6 zones fixes** (4 obligatoires : Intention / Mesure / Cible / Horizon ; 2 bonus : Contexte / Liaison). Chaque zone accepte **1 seule carte** (option A validée par mockup : cohérent avec la pédagogie anti-composite des fiches). Cartes en main (onglets de catégorie + grille scrollable). Cartes-pièges acceptées (D14 préservé) mais marquées d'un picto « risque » discret. Animation slide-in 180 ms lors du dépôt (D24).
- Modèle domaine : ajout d'un champ `slotKey` optionnel sur `PlacedBlock` pour identifier la zone du plateau. Constante `REQUIRED_SLOTS = ["intention", "mesure", "cible", "horizon"]`. `assembleSentence` ordonne la phrase canoniquement : Intention + Mesure + Cible + Liaison? + Contexte + Horizon. `isComplete` exige les 4 slots obligatoires remplis quand le mode slot est actif.
- Alternative écartée : (1) Composeur d'encres — refusé : restait un formulaire amélioré ; (2) Partition Lean — refusé : trop scolaire ; (3) zone Contexte avec 2 cartes empilées — refusé : contredit la pédagogie anti-composite enseignée par les fiches existantes (PI Objective composite, KR composite).

## D26 — Le Puzzle devient un assistant de rédaction collectif (changement de doctrine)
- Contexte : après 6 refontes successives du Puzzle (drag-and-drop, plateau de cartes, squelette de phrase, etc.) sans convergence, diagnostic posé par l'ingénieur : le Puzzle souffrait d'une crise de doctrine — il essayait de cumuler trois promesses contradictoires (apprendre la grammaire, jouer, évaluer). Lætitia tranche : « on monte un assistant sous forme de puzzle ». La promesse change.
- Choix : le module devient un **assistant de rédaction d'objectifs**, principalement utilisé en atelier collectif sur écran partagé (le coach saisit, l'équipe regarde), occasionnellement en solo. Usage productif (sortir un objectif réel) et non plus exercice. La mécanique « assembler des cartes » est conservée parce qu'elle reste lisible à plusieurs, mais sa finalité change.
- Conséquences pédagogiques : **D14 (pédagogie de l'erreur) ne s'applique plus à ce mode** — on n'apprend plus par l'erreur dans un assistant, on aide à produire. Les pièges (cartes "distractor") deviennent des **garde-fous actifs** : quand l'utilisateur en pose une, l'assistant propose immédiatement une alternative qualitative cliquable (pas de score 88/100, pas de verdict normatif). Le moteur d'évaluation reste actif en arrière-plan mais ne s'affiche plus comme panneau de score.
- Conséquences UX : (1) champ « Pour quelle équipe ? » en tête (optionnel) — règle aussi la question des scénarios d'équipes sans imposer une liste figée ; (2) suppression de l'EvaluationPanel sur ce mode ; (3) ajout d'une sortie utile (bouton « Copier l'objectif » + « Exporter en Markdown ») ; (4) renommage en « Composer » pour aligner le nom sur la promesse (« Puzzle » connotait le jeu).
- Cohabitation : le mode « S'entraîner » (page blanche évaluée par le moteur) reste pour les expérimentés qui veulent se challenger sur leur propre rédaction. Deux promesses distinctes, plus de confusion entre apprentissage et production.
- Alternative écartée : continuer à itérer sur le Puzzle-jeu. Refusé : 6 itérations sans convergence = signal que le problème est doctrinal, pas formel. Continuer aurait été ajouter une 7e refonte cosmétique sans résoudre la contradiction fondamentale.

## D27 — Mode « Analyser un objectif » : page dédiée, diagnostic textuel honnête
- Contexte : retour utilisatrice 2026-06-27 — le diagnostic libre était auparavant disposé sous le textarea S'entraîner étape 3, en doublon avec les diagnostics inline des exemples annotés. Et il produisait des faux positifs (« Borné ✓ » sans échéance) parce qu'il appelait coach.evaluate avec des valeurs par défaut factices (confidence=80, hasExplicitDeadline=true, isUnderTeamInfluence=true). Lætitia : « ton outil de diagnostique est mauvais et absolument pas fiable ».
- Choix : créer un mode **« Analyser un objectif »** dans une page dédiée (onglet Pratique du ModeSelector). Refondre l'analyse en **analyse textuelle honnête** qui n'évalue que ce qui est détectable dans le texte. Critères : verbe d'attaque (détecte output/outcome via heuristiques), présence de chiffre, échéance bornée (regex patterns), mots flous, bénéficiaire (« pour les X »), abréviations familières. Verdict synthétique en une phrase. Pistes textuelles (variante B validée). Encart « Note » de transparence avoue ce que l'outil ne peut pas voir (ambition, calibrage, influence).
- Conséquences : (1) Diagnostic supprimé sur les 3 écrans Practice étape 3 + EvaluationPanel inline retiré des exemples annotés Sprint et OKR. (2) Le mode S'entraîner perd sa fonction « écrire à blanc avec moteur » qui passera en mini-exercices (cf. D28). (3) Le moteur classique reste utilisé par le Composer (en silence, pour l'export) et par les exemples (compatibilité — non affiché).
- Alternative écartée : améliorer le diagnostic existant en demandant à l'utilisateur de saisir les métadonnées (confidence, échéance, influence). Refusé : alourdit l'utilisation et ne règle pas le problème de fond (le mode S'entraîner mélangeait trois usages).


## D28 — S'entraîner refondu en menu de 5 mini-exercices ludiques par partie d'objectif
- Contexte : retour utilisatrice 2026-06-27 — « la page entrainement on va la développer avec des petits exercices amusants sur les différentes parties de l'objectif ». Le mode S'entraîner cumulait trois étapes empilées (échauffement + exemples annotés + écriture libre) qui se cannibalisaient.
- Choix : SprintPractice devient un **menu d'exercices** avec 5 cards (Verbe, Indicateur, Variation, Échéance, Contexte). Chaque card lance un mini-exercice plein écran avec un format adapté au concept : binaire pour les distinctions tranchées, QCM 1-parmi-N pour les nuances, grille à sélection multiple pour les fragments à repérer. Format par partie :
  - **Verbe** : binaire output/outcome (réutilise le Warmup existant, corpus révisé par expert linguiste).
  - **Indicateur** : QCM 1-parmi-3 « indicateur opérationnel vs concept-parapluie ».
  - **Variation chiffrée** : grille à sélection multiple « coche les fragments précis ».
  - **Échéance** : grille à sélection multiple « coche les fragments bornés ».
  - **Contexte** : QCM 1-parmi-4 « qui est le vrai bénéficiaire ? ».
- Architecture : nouveau composant générique `Drill` (src/ui/components/Drill.tsx) qui rend `QcmRunner` ou `GridRunner` selon le `kind` du corpus. Pattern intro → playing → done inspiré du Warmup. À la fin de chaque exercice : suggestion `NextDrillsList` vers les 4 autres.
- Conséquences : étape « écrire à blanc » totalement supprimée du parcours S'entraîner (vit désormais dans le mode Analyser, D27). Suppression de tous les diagnostics doublons. Cards harmonisées sur le pattern .card-button (cohérence avec ModeSelector et TypeSelector). Corpus V3 validé en bloc par Lætitia après deux révisions expertes (Lean-Agile francophone puis panel pluridisciplinaire devs/PO/PM/DevSecOps/data).
- Alternative écartée : continuer à empiler des étapes dans S'entraîner. Refusé : trois étapes hétérogènes (échauffement / inspiration / production) ne forment pas un parcours cohérent, et la production libre relève de l'Analyser.


## D29 — Doctrine assumée : KR auto-centré acceptable sous conditions (Lamorte)
- Contexte : lors de la production du corpus mini-exercice « Contexte » OKR équipe (2026-06-27), un cas pose « passer le délai de cycle interne de 11 j à 6 j » avec comme bénéficiaire « l'équipe elle-même ». Question soulevée : ce type de KR auto-centré (inward-looking) est-il pédagogiquement valide ? L'école stricte (Doerr, Wodtke) le refuse comme métrique-vanité interne, l'école pragmatique (Lamorte Field Book) l'accepte sous conditions.
- Choix : retenir la **doctrine pragmatique (Lamorte)**. Un KR auto-centré est acceptable à deux conditions : (1) l'Objective parent reste tourné vers l'extérieur, (2) ce n'est pas l'unique KR de l'Objective. Le cas reste dans le corpus (Contexte cas 3) comme piège pédagogique utile : beaucoup d'apprenants vont chercher un bénéficiaire externe par réflexe et se tromper. Doctrine consignée dans DOMAINE.md §4.4.
- Alternative écartée : doctrine stricte (refus catégorique des KR auto-centrés). Refusée parce que (a) ces KR existent dans la vraie vie et un coach OKR doit savoir les repérer, (b) cela aurait obligé à remplacer le cas et à priver le corpus d'un piège pédagogique opérationnel. La position est désormais explicite plutôt qu'implicite.

## D30 — Francisation systématique du vocabulaire pédagogique (2026-06-28)
- Contexte : retour utilisatrice — anglicismes parasites encore présents (« dashboard » notamment). Audit a révélé ~800 occurrences dans fiches, quiz, drills, scenarios, puzzles et libellés UI.
- Choix : doctrine **francisation par défaut, conservation en VO seulement pour la terminologie officielle non négociable des cadres enseignés**.
  - Traduit : dashboard → tableau de bord ; baseline → valeur de référence (étendu 2026-06-28) ; deadline → échéance ; stakeholders → parties prenantes ; roadmap → feuille de route ; workshop → atelier ; onboarding → intégration ; oncall → astreinte ; MTTR → TMR ; spike → exploration ; Sprint Goal → objectif de Sprint ; Product Goal → objectif de produit ; Product Backlog → backlog produit ; Daily Scrum → mêlée quotidienne ; PI Objective → objectif de PI ; PI Review → revue de PI ; confidence vote → vote de confiance ; Agile Release Train → train de livraison ; committed → engagé ; Objective → Objectif (majuscule comme marqueur OKR) ; Key Result → Résultat clé ; feature → fonctionnalité ; story → récit.
  - Conservés en VO : Sprint Backlog, Product Owner (PO), Scrum Master, Developers, PI Planning, PM (Product Manager), RTE (Release Train Engineer), Inspect and Adapt, ROAM, stretch.
  - Citations littérales du Scrum Guide / Wodtke / Cohn : VO conservée entre guillemets, traduction française entre crochets ajoutée à la suite. Permet vérification du texte officiel + accessibilité francophone (option 1a validée).
- Conséquences : valeurs de discriminant TS (`piClass: "committed"`) **non touchées** (code), seuls les libellés visibles ont été francisés (Puzzle.tsx : « Engagé » / « Stretch »). Train Onboarding fictif renommé en « Train Intégration nouveaux clients ». Messages d'erreur du moteur (criteria/okr.ts) francisés (Objectif qualitatif, Résultats clés).
- Alternative écartée : francisation partielle au cas par cas selon urgence. Refusée : risque de drift permanent avec accumulation continue d'anglicismes faute de doctrine claire. Tableau de référence consigné ici pour stabilité.

## D31 — Encart « squelette d'un objectif » en tête de l'onglet Pratique
- Contexte : reconstitué a posteriori le 2026-07-03 — la décision existait dans le code (`src/content/skeleton/skeleton.fr.ts`, commit `991f10d`) mais n'avait jamais été rédigée ici.
- Choix : afficher, avant tout exercice, un encart neutre listant les 5 briques nommées d'un bon objectif (verbe outcome, indicateur, variation chiffrée, contexte, échéance), sans exemple ni phrase complète — volontairement dépouillé pour ne pas anticiper les exemples annotés. Couleurs identiques à `SheetCard`/`BricksDisplay` pour la cohérence transverse. Un lien renvoie vers la fiche théorique fondamentale du type d'objectif actif.
- Alternative écartée : intégrer une phrase d'exemple complète dans l'encart. Écartée (implicite dans le code) pour ne pas dupliquer le contenu déjà présent dans les fiches et les exemples annotés.

## D32 — Cible de repli pour OKR entreprise dans `SKELETON_THEME_TARGET`
- Contexte : découvert le 2026-07-03 en vérifiant le build après un ajout de contenu — `SKELETON_THEME_TARGET` (`Record<ObjectiveType, string>`, D31) n'avait pas été mis à jour lors de l'ajout du 4e `ObjectiveType` (`okr-entreprise`, session du 2026-06-21). Conséquence : `tsc --noEmit` échouait, donc `npm run build` était cassé depuis — le monofichier `coach-objectifs.html` n'était plus reconstructible.
- Choix : mapper `"okr-entreprise"` vers le thème `okr.fondamentaux` (celui de l'OKR équipe), en commentaire explicite que c'est un repli temporaire tant que le module OKR entreprise n'existe pas (D20). Sans conséquence utilisateur : ce niveau n'est pas encore routable (`LevelSelector` le marque « à venir »), le lien ne sera donc jamais suivi en pratique.
- Alternative écartée : rendre `SKELETON_THEME_TARGET` partiel (`Partial<Record<...>>`) pour éviter d'avoir à choisir une valeur de repli. Écartée : aurait déplacé le problème vers l'appelant (gestion d'un `undefined` possible) pour un encart qui n'a de toute façon qu'un seul consommateur aujourd'hui — sur-ingénierie pour un cas qui se résoudra de lui-même quand D20 sera traité.

## D33 — Mode « Anti-patterns » dérivé des fiches existantes, pas un corpus séparé
- Contexte : Lætitia veut un exercice de reconnaissance des pièges (« à quel anti-pattern correspond ce mauvais exemple ? »), en plus de Théorie, dans l'onglet Pratique existant.
- Choix : **aucun nouveau contenu écrit**. Nouveau champ `isNamedPitfall?: boolean` sur `PedagogicalSheet` (ports.ts), posé explicitement sur les 13 fiches confirmées avec Lætitia (Sprint 4, PI 4, OKR équipe 5 — validation du 2026-07-03) qui contiennent chacune exactement un exemple `{ bad, good }`. Nouveau domaine pur `pitfall-quiz.ts` qui dérive les cas du quiz depuis ces fiches. Nouvelle carte « Anti-patterns » dans `PRACTICE_MODES` (ModeSelector) — pas un 3e onglet à côté de Théorie/Pratique, pour ne pas toucher au modèle binaire déjà itéré plusieurs fois (D21). Routage mono-type par `type`, comme `ChallengeQuiz` — pas d'exception à D9.
- Alternative écartée (corpus séparé avec distracteurs travaillés, comme le Défi QCM) : refusée pour un V1 — aurait demandé d'écrire un nouveau corpus par module avec le même niveau de soin (options « partial », subtilité), dupliquant en substance ce que les fiches de pièges disent déjà. Peut être introduit plus tard si le format dérivé s'avère trop simple en usage réel.
- Alternative écartée (3e onglet Anti-patterns au niveau du sélecteur de mode) : refusée — casserait la distinction Théorie (bleu marine) / Pratique (corail) établie et re-débattue plusieurs fois (D21), pour un gain non démontré avant test terrain.
- Fiches marquées `isNamedPitfall` : Sprint — `not-a-récit-list`, `vanity-goal`, `pet-project-goal`, `renew-the-goal`. PI — `fonctionnalité-vs-objective`, `tous-committed`, `objective-impose`, `bv-uniforme`. OKR équipe — `sandbagging`, `project-tracking`, `top-down`, `too-many-okrs`, `individual-cascade`.

## D34 — Feedback Anti-patterns en 3 temps (raison / catégorie / signal) + lien vers la fiche
- Contexte : retour Lætitia sur le quiz Anti-patterns — l'explication brute ne suffisait pas ; elle veut comprendre *pourquoi cet exemple appartient à cette famille de piège*, *comment le repérer* la prochaine fois, et pouvoir *aller lire la fiche complète*.
- Choix : nouveau `kind: "signals"` sur `PedagogicalSection` (aux côtés de `source`/`bricks`), posé explicitement sur la section « Signaux d'alerte »/« Comment ça se voit » déjà existante de 12 des 13 fiches marquées `isNamedPitfall` (une par fiche, jamais par inférence sur le texte du heading — trop fragile, les libellés varient : « Signaux d'alerte », « Comment ça se voit », « Le scénario », « Le glissement »...). `PitfallQuizCase` étendu avec `categoryRule` (dérivé du `heroPhrase` existant de la fiche — répond à « pourquoi ce type de piège »), `detectionSignal` (dérivé de la section `kind: "signals"`) et `themeId` (pour le lien). Bouton « Voir la fiche complète » dans le feedback, qui réutilise directement `selectTheme` déjà présent dans App.tsx — pas de nouvelle fonction de routage.
- Contenu ajouté (pas seulement dérivé) : `okr-equipe.sheet.too-many-okrs` n'avait aucune section « signaux d'alerte » explicite — nouvelle section rédigée (3 bullets, dérivés de sa section « Pourquoi on tombe dedans » déjà existante), **à valider par Lætitia** comme tout contenu métier neuf.
- Alternative écartée (inférer le signal en cherchant un heading contenant « alerte » ou « voit ») : refusée — magie implicite fragile, cassée dès qu'une fiche future choisit un autre libellé (déjà le cas pour 4 des 13 fiches ici : « Le scénario », « Le glissement », « Le réflexe... »).

## D35 — Chiffres décoratifs sur les distracteurs du Défi QCM (anti-raccourci de comptage)
- Contexte : retour Lætitia — « on a pas besoin de réfléchir, on sait que si il y a deux nombres il y a de forte chance que ce soit la bonne réponse ». Audit programmatique des 36 cas (3 modules) : 24/36 avaient la bonne réponse strictement plus riche en chiffres que les 3 distracteurs, dont 15/36 avec un écart franc (2+ chiffres vs 0-1) — un raccourci de lecture qui contourne l'objectif pédagogique (juger la structure d'une reformulation, pas compter des chiffres).
- Choix : sur les 15 cas à écart franc, chaque distracteur reçoit un ou deux chiffres **décoratifs**, puisés dans le contexte ou les métriques déjà affichées du cas (taille d'équipe, volumétrie, métrique déjà donnée en toile de fond) — jamais une valeur qui comblerait le vrai manque pédagogique enseigné par l'option (seuil, avant/après, échéance). Exemple validé avant réécriture en masse : un distracteur « partial » dont le défaut est « pas d'avant/après chiffré » ne doit jamais recevoir un chiffre qui lui donnerait justement un avant/après — sinon on change silencieusement la bonne réponse. Verdicts et explications structurelles inchangés partout.
- Alternative écartée (mélanger aléatoirement des chiffres non liés au cas) : refusée — aurait introduit des chiffres arbitraires sans lien avec le contexte, cassant la cohérence narrative de chaque cas pour un gain identique.
- Alternative écartée (retirer les chiffres de la bonne réponse) : impossible — la bonne réponse a structurellement besoin d'un avant/après chiffré et/ou d'une échéance, c'est précisément ce qui en fait un bon outcome mesurable. Le problème n'est pas que la bonne réponse ait des chiffres, mais que les distracteurs n'en aient pas.
- Reste en suspens : 9 cas à écart plus modéré (bonne réponse strictement au-dessus des distracteurs mais sans l'écart franc 2+ vs 0-1) laissés tels quels — priorité mineure, à retoucher seulement si signalé.

## D36 — Renommage de fiche « Renouveler le goal, pas le copier-coller » → « Le goal recyclé »
- Contexte : retour Lætitia sur le quiz Anti-patterns — le titre de cette fiche est le seul des 13 pièges à être phrasé comme un conseil d'action (« Renouveler le goal, pas le copier-coller ») plutôt que comme le nom du piège lui-même (comparer à « Le vanity goal », « Le goal de confort »...). Confusant en contexte quiz, où chaque option doit se lire comme la réponse à « à quel piège ça correspond ? », pas comme une recommandation.
- Choix : renommage du titre de la fiche elle-même (`sprint.sheet.renew-the-goal`), pas d'un simple libellé propre au quiz — un seul nom à maintenir, cohérent partout (Théorie, breadcrumb, Anti-patterns). Nom validé par Lætitia : « Le goal recyclé ».
- Alternative écartée (champ `quizLabel` séparé, gardant le titre Théorie inchangé) : proposée mais non retenue par Lætitia — aurait maintenu deux noms différents pour le même piège selon l'écran, au lieu d'un renommage franc.
- Impact : uniquement le champ `title` de la fiche (heroPhrase, sections, exemples inchangés). `correctLabel` du quiz Anti-patterns le reprend automatiquement (dérivé de `sheet.title`, pas de code à toucher).

## D37 — Cartes détachées pour le feedback Anti-patterns (lisibilité)
- Contexte : retour Lætitia — l'encart de feedback (fond teinté rouge/vert/ambre) « ressemble à un gros paragraphe gris », malgré les trois titres de section (D34). Les trois blocs dt/dd flottaient tous sur le même fond plat, sans séparation visuelle.
- Choix : chaque paire titre/texte devient une carte détachée (`pitfall-feedback__item`, fond blanc semi-transparent superposé au fond teinté, coins arrondis, padding) — casse la masse en trois unités de lecture distinctes. Titre de section passé de `color-text-muted` à `color-text` à 65 % d'opacité (plus de présence sans dépendre d'une teinte figée au rouge, puisque le même bloc sert aussi pour les bonnes réponses sur fond vert).
- Alternative écartée (garder la liste plate mais foncer le texte) : aurait amélioré le contraste sans résoudre le vrai problème signalé — l'absence de séparation entre les trois idées.

## D38 — Purge de « goal » dans les 4 titres de pièges Sprint (cohérence D30)
- Contexte : en proposant un remplaçant pour « Renouveler le goal, pas le copier-coller » (D36), Lætitia a relevé une incohérence que j'avais moi-même laissée passer : mes propositions de renommage gardaient toutes le mot « goal », alors que « goal » est un anglicisme non listé dans les exceptions D30 (Sprint Backlog, PO, Scrum Master, Developers, PI Planning, PM, RTE, Inspect and Adapt, ROAM, stretch) — et D30 avait explicitement acté « Sprint Goal → objectif de Sprint ». Trois autres titres de pièges Sprint gardaient le même défaut : « Le vanity goal », « Le goal de confort », « Le goal recyclé ».
- Choix : renommage des 4 titres, validés par Lætitia : « L'objectif vitrine » (vanity-goal), « L'objectif de confort » (pet-project-goal), « L'objectif recyclé » (renew-the-goal), « L'objectif liste de tâches » (not-a-récit-list, qui en profite pour devenir un nom court cohérent avec les 3 autres au lieu d'une phrase de négation longue). Les mentions du nom du piège **dans le corps de la fiche elle-même** (ex. « Le vanity goal coche la case... ») ont été mises à jour en cohérence directe — sinon la fiche se serait auto-référencée par un nom qui n'existe plus.
- Alternative écartée (garder « goal » comme exception de fait, au même titre que « Sprint », « PO »...) : pas tranchée ici, Lætitia a choisi de renommer plutôt que d'ajouter une exception à D30.
- Reste en suspens, dette distincte et plus large : le mot « goal » apparaît encore ~51 fois dans le corps des fiches Sprint (`heroPhrase`, texte courant, ex. « Un goal qui sonne bien... », « Le même goal sprint après sprint... ») — usage générique du terme, pas une auto-référence à un nom de piège. Une purge complète nécessiterait de relire chaque phrase pour choisir entre « objectif » et « objectif de Sprint » selon le contexte — hors du périmètre de ce correctif ciblé, à traiter dans une session dédiée si souhaité.

