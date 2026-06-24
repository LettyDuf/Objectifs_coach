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
