/**
 * Fiches pédagogiques — OKR équipe × Audience "dev" × FR.
 * Contenu dérivé de DOMAINE.md §4 (doctrine validée 2026-06-21).
 */

import type { PedagogicalSheet } from "../../domain/ports";

export const OKR_EQUIPE_DEV_SHEETS_FR: PedagogicalSheet[] = [
  {
    id: "okr-equipe.sheet.structure",
    themeId: "okr.fondamentaux",
    icon: "okr",
    title: "OKR équipe : 1 Objectif + 3 à 5 Résultats clés",
    heroPhrase:
      "L'Objectif dit vers quoi. Les Résultats clés disent comment on saura qu'on y est arrivé.",
    intro: "",
    practiceCtaLabel: "Va écrire ton premier OKR équipe",
    sections: [
      {
        heading: "L'Objectif : qualitatif et mémorisable",
        icon: "target",
        body: "Pas de chiffre dans l'Objectif : le chiffre est l'affaire des KR. Une équipe doit pouvoir le réciter sans le lire.",
        examples: [
          {
            bad: "Améliorer notre observabilité de 30 %.",
            good: "Devenir l'outil de référence des équipes data pour l'observabilité.",
            note: "Un Objectif est qualitatif et inspirant. Si tu as besoin d'un chiffre dans l'Objectif, c'est qu'il devrait être dans un KR.",
          },
        ],
      },
      {
        heading: "Les Résultats clés : 3 à 5, chiffrés, outcome",
        icon: "practice",
        body: "Chaque KR vise un changement mesurable : « de X à Y », « par N », « à N % ». Pas de Résultat clé projet (« livrer Z » n'est pas un KR). Au-delà de 5 KR, on dilue.",
        bullets: [
          "3 à 5 KR par Objectif : assez pour couvrir, pas trop pour disperser.",
          "Chaque KR a une métrique nommée, un point de départ, une cible.",
          "« Livrer », « Migrer », « Implémenter » sont des moyens, pas des KR.",
        ],
      },
      {
        heading: "Calibrage de l'ambition",
        icon: "challenge",
        body: "Chaque KR se vise avec 50 à 70 % de confiance d'atteinte. 100 % = c'est une tâche, pas un KR. Moins de 30 % = irréaliste, on s'épuise.",
      },
      {
        heading: "La place de l'OKR équipe",
        icon: "learn",
        body: "OKR entreprise (annuel, le pourquoi) → OKR équipe (trimestriel, le vers où) → objectifs de PI (8-12 sem, le quoi engagé) → objectifs de Sprint (1-4 sem, le comment). Chaque étage a sa grammaire. Les confondre fait perdre une dimension du pilotage.",
      },
      {
        heading: "Qui le rédige, sur quelle base",
        icon: "target",
        body: "Co-construit par l'équipe entière (incluant son PM ou PO), animé par un facilitateur (leader d'équipe, coach OKR interne ou externe). Bottom-up, pas dicté top-down. Les OKR entreprise donnent la direction ; l'équipe propose comment elle y contribue — elle n'attend pas qu'on lui dicte ses KR. Cadre de travail : atelier de cadrage en début de cycle (typiquement une demi-journée), puis check-in hebdomadaire de 15-30 min.",
        bullets: [
          "OKR entreprise du cycle en cours (le « pourquoi » stratégique)",
          "Retours du cycle OKR précédent (ce qui a marché, ce qui n'a pas)",
          "Connaissance terrain de l'équipe (ce qu'elle voit, que les autres ne voient pas)",
          "Capacités réelles (effort disponible et compétences)",
          "Hypothèses produit en cours, notamment pour calibrer les KR stretch",
        ],
        examples: [
          {
            bad: "Recevoir l'OKR équipe complet du management et l'exécuter tel quel.",
            good: "Lire l'OKR entreprise, en discuter en atelier, proposer un OKR équipe qui porte la couleur de l'équipe.",
            note: "Un OKR équipe que l'équipe n'a pas posé n'engage personne — c'est l'anti-pattern cascade brutale documenté par Wodtke.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Niven, OKRs For Dummies. Lamorte, The OKRs Field Book (2021) — Phase 1 Deployment Coaching, distinction Top-Level vs Team-Level Ateliers. Morisseau, La boîte à outils OKR (Dunod). Wodtke, OKR Mistakes : « OKRs are great bottom up, not just top down. » Cadence trimestrielle, bi-niveau strict et co-construction convergent dans ces sources.",
      },
    ],
  },
  {
    id: "okr-equipe.sheet.kr-traps",
    themeId: "okr.pieges-kr",
    icon: "warn",
    title: "Les 4 pièges du Résultat clé",
    heroPhrase:
      "Un KR vise un résultat à atteindre. Pas une livraison, pas un état à maintenir, pas une certitude.",
    intro: "",
    practiceCtaLabel: "Va corriger un KR mal posé",
    sections: [
      {
        heading: "Piège 1 — Le Résultat clé projet",
        icon: "bad",
        body: "« Livrer X », « Migrer Y », « Déployer Z » = un moyen, pas un résultat. Symptôme : verbe d'output en tête.",
        examples: [
          {
            bad: "Livrer le nouveau tableau de bord métriques v2 d'ici fin du trimestre.",
            good: "Atteindre 80 % d'équipes utilisant le tableau de bord métriques (de 0 à 24 équipes).",
            note: "Demande-toi : qu'est-ce que ce projet va faire bouger ? Adoption, temps gagné, incidents évités…",
          },
        ],
      },
      {
        heading: "Piège 2 — Le KR-flou",
        icon: "bad",
        body: "Pas de chiffre, pas d'unité, pas de seuil. Non falsifiable.",
        examples: [
          {
            bad: "Améliorer la satisfaction client.",
            good: "Faire passer le CSAT du module commande de 3,2 / 5 à 4,3 / 5.",
            note: "Nomme la métrique, donne la valeur de départ et la valeur cible.",
          },
        ],
      },
      {
        heading: "Piège 3 — La health metric déguisée en KR",
        icon: "bad",
        body: "Une health metric est un garde-fou qu'on surveille en continu (uptime, code coverage, latence p95). Un KR vise un **changement à atteindre**, pas un état à maintenir.",
        examples: [
          {
            bad: "Maintenir l'uptime au-dessus de 99,9 %.",
            good: "Faire passer l'uptime de 98,5 % à 99,9 % d'ici fin du trimestre.",
            note: "Si c'est déjà à 99,9 %, c'est une norme de service. Si tu veux l'améliorer, chiffre la progression. Sinon, surveille-la ailleurs, pas dans tes KR.",
          },
        ],
      },
      {
        heading: "Piège 4 — La sur-confiance",
        icon: "bad",
        body: "KR estimé atteint à 100 % = c'est une tâche planifiée, pas un KR. L'OKR pousse à l'ambition calibrée : 50 à 70 % de confiance.",
        examples: [
          {
            bad: "Faire passer la couverture de tests de 78 % à 80 % d'ici fin du trimestre. (confiance : 100 %)",
            good: "Faire passer la couverture de tests de 78 % à 90 %. (confiance : 60 %)",
            note: "Si l'équipe sait qu'elle va y arriver, l'ambition est trop faible. Vise un écart qui demande un vrai effort.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Lamorte, The OKRs Field Book : chapitres « Examples of ineffective and effective key results » et « Measurable objectives vs health metrics ».",
      },
    ],
  },
  {
    id: "okr-equipe.sheet.anatomy-kr",
    themeId: "okr.fondamentaux",
    icon: "target",
    title: "L'anatomie d'un Résultat clé",
    heroPhrase:
      "Un Résultat clé tient en quatre briques. Si l'une manque, le KR est cassé.",
    intro: "",
    practiceCtaLabel: "Va construire un KR brique par brique",
    sections: [
      {
        heading: "Les quatre briques d'un Résultat clé",
        icon: "target",
        body: "Un KR bien posé est une phrase courte qui combine quatre éléments. Visualise-les pour repérer ce qui manque.",
        kind: "bricks",
        bricksSentence:
          "Faire passer le NPS dev du module pipeline de 28 à 50 d'ici la fin du trimestre.",
        bricks: [
          {
            num: 1,
            label: "Verbe d'outcome",
            hint: "Le sens du mouvement.",
            examples: "Faire passer, Réduire, Atteindre, Diviser par",
            snippet: "Faire passer",
            color: "purple",
          },
          {
            num: 2,
            label: "Indicateur",
            hint: "La métrique nommée, pas le projet.",
            examples:
              "NPS dev, CSAT module commande, nombre d'incidents P1, temps moyen de résolution",
            snippet: "le NPS dev du module pipeline",
            color: "teal",
          },
          {
            num: 3,
            label: "Variation chiffrée",
            hint: "De X à Y. Le point de départ rend l'effort visible.",
            examples: "de 28 à 50, de 4,2 % à 1 %, par 3, à 90 %",
            snippet: "de 28 à 50",
            color: "pink",
          },
          {
            num: 4,
            label: "Échéance",
            hint: "Sans date, ce n'est pas un KR.",
            examples:
              "d'ici la fin du trimestre, d'ici fin Q3, d'ici le 30 septembre",
            snippet: "d'ici la fin du trimestre",
            color: "blue",
          },
        ],
      },
      {
        heading: "Et la confiance ?",
        icon: "challenge",
        body: "La confiance d'atteinte (50 à 70 %) accompagne le KR mais n'est pas dans la phrase. Elle s'écrit en note : « (confiance : 60 %) ». Voir la fiche calibrage.",
      },
      {
        heading: "Test rapide",
        icon: "practice",
        body: "Lis ton KR à voix haute. Si tu ne peux pas pointer les quatre briques, retravaille-le.",
        bullets: [
          "Pas de verbe d'outcome (« livrer », « migrer ») : c'est un projet, pas un KR.",
          "Pas d'indicateur nommé : on ne saura pas mesurer.",
          "Pas de point de départ : on ne saura pas si la cible est ambitieuse.",
          "Pas d'échéance : c'est une intention, pas un engagement.",
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Niven, OKRs For Dummies (structure d'un KR mesurable). Lamorte, The OKRs Field Book : chapitre « Effective vs ineffective key results ». Doerr, Measure What Matters (le « from X to Y by when »).",
      },
    ],
  },
  {
    id: "okr-equipe.sheet.too-many-okrs",
    isNamedPitfall: true,
    themeId: "okr.fondamentaux",
    icon: "warn",
    title: "Trop d'OKR par équipe",
    heroPhrase:
      "Plus tu ajoutes d'Objectifs, plus tu dilues la focalisation. Une équipe = un Objectif par cycle.",
    intro: "",
    practiceCtaLabel: "Va réduire ta liste à un seul Objectif",
    sections: [
      {
        heading: "Le principe : un seul Objectif par équipe par cycle",
        icon: "target",
        body: "L'OKR sert à concentrer l'énergie sur ce qui compte le plus. Si une équipe se donne trois ou quatre Objectifs en parallèle, elle n'en a plus aucun — elle a une liste de courses. Christina Wodtke est explicite : « Have a maximum of one OKR per team per quarter ». [traduction : « Avoir au maximum un OKR par équipe par trimestre. »]",
        bullets: [
          "1 Objectif + 3 à 5 Résultats clés : c'est le format de référence.",
          "Au-delà, l'équipe ne sait plus quoi arbitrer quand le temps manque.",
          "La focalisation est une compétence d'équipe : elle se travaille.",
        ],
      },
      {
        heading: "Pourquoi on tombe dedans",
        icon: "bad",
        body: "Plusieurs réflexes poussent à empiler les Objectifs, tous compréhensibles, tous coûteux.",
        bullets: [
          "Peur de laisser un sujet de côté (« si on ne le met pas en OKR, personne ne s'en occupera »).",
          "Pression descendante (le management ajoute des Objectifs au fil de l'eau).",
          "Confusion OKR / liste de chantiers (on met dedans tout ce que l'équipe fait, pas seulement ce qui doit changer).",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Plus de 3 Objectifs actifs pour la même équipe sur le même trimestre.",
          "Chaque Objectif capte une part mineure de la capacité de l'équipe — aucun n'est clairement le cap du trimestre.",
          "L'équipe ne peut pas réciter ses Objectifs de mémoire sans les relire.",
        ],
      },
      {
        heading: "Comment trancher",
        icon: "good",
        body: "Si la liste contient trois Objectifs, demande : « Lequel des trois, si on échoue, fait le plus mal au trimestre ? ». Garde celui-là. Les autres sont du business as usual, des KR d'un autre Objectif, ou attendent le cycle suivant.",
        examples: [
          {
            bad: "Objectif 1 : Devenir la référence observabilité. Objectif 2 : Réduire la dette technique. Objectif 3 : Améliorer la satisfaction des parties prenantes.",
            good: "Objectif : Devenir la référence observabilité. (Les autres sujets vivent dans le backlog ou dans un KR de cet Objectif.)",
            note: "Trois Objectifs = trois équipes en parallèle dans la même équipe. C'est exactement ce que l'OKR cherche à éviter.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Wodtke, Radical Focus (2e éd., 2021) : « Have a maximum of one OKR per team per quarter ». Lamorte, The OKRs Field Book : chapitre « Common mistakes in OKR design ». Doerr, Measure What Matters (focus comme premier super-pouvoir des OKR).",
      },
    ],
  },
  {
    id: "okr-equipe.sheet.sandbagging",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "bad",
    title: "Le sandbagging",
    heroPhrase:
      "Quand on calibre un KR pour être sûr de l'atteindre, on a déjà perdu l'esprit OKR.",
    intro: "",
    practiceCtaLabel: "Va remonter ton niveau d'ambition",
    sections: [
      {
        heading: "Le réflexe : poser la barre où on sait l'atteindre",
        icon: "bad",
        kind: "signals",
        body: "Sandbagging = poser un KR volontairement bas pour garantir un score de 100 %. C'est souvent rationnel à court terme (bonus, image, peur de l'échec) mais cela vide l'OKR de son sens : la cible n'est plus ambitieuse, elle décrit ce qui allait se produire de toute façon.",
        bullets: [
          "Symptôme : tous les KR atteints à 100 %, cycle après cycle.",
          "Symptôme : l'équipe est très détendue en fin de cycle, sans avoir rien dû arbitrer.",
          "Symptôme : la confiance déclarée en début de cycle est à 90 % ou plus.",
        ],
      },
      {
        heading: "L'antidote : calibrer à 50 à 70 % de confiance",
        icon: "good",
        body: "Un bon KR est calibré pour que l'équipe se dise « on a une vraie chance d'y arriver, mais on va devoir trouver des choses ». 100 % de confiance = c'est une tâche planifiée. Moins de 30 % = c'est de la pensée magique, l'équipe va décrocher.",
        examples: [
          {
            bad: "Faire passer la couverture de tests de 78 % à 80 %. (confiance : 100 %)",
            good: "Faire passer la couverture de tests de 78 % à 90 %. (confiance : 60 %)",
            note: "Si l'équipe est sûre à 100 %, l'ambition est trop faible. Vise un écart qui demande un vrai effort.",
          },
        ],
      },
      {
        heading: "Le rôle du facilitateur",
        icon: "challenge",
        body: "Le sandbagging se nomme. Quand un KR sort avec une confiance affichée trop haute, le facilitateur pose la question : « Si on y arrive à coup sûr, qu'est-ce qu'on apprend ? ». Souvent, rien. Et c'est là qu'on remonte la barre.",
      },
      {
        heading: "Source",
        kind: "source",
        body: "Doerr, Measure What Matters (la culture du « stretch » et la séparation OKR / évaluation individuelle). Lamorte, The OKRs Field Book : section « Avoiding sandbagging ». Wodtke, Radical Focus : importance du calibrage à 50-70 %.",
      },
    ],
  },
  {
    id: "okr-equipe.sheet.project-tracking",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "bad",
    title: "L'OKR utilisé comme suivi de projet",
    heroPhrase:
      "L'OKR n'est pas un tableau de bord de chantiers. Si tu listes ce que tu vas faire, ce n'est plus un OKR.",
    intro: "",
    practiceCtaLabel: "Va recadrer ton OKR en outcome",
    sections: [
      {
        heading: "Le glissement",
        icon: "bad",
        kind: "signals",
        body: "L'équipe ouvre son OKR comme un fichier de suivi : on coche les jalons, on remonte les pourcentages d'avancement projet. Le KR devient « livrer le module X à 50 %, puis 80 %, puis 100 % ». On a transformé un outil d'outcome en un outil de gestion de projet.",
        bullets: [
          "Symptôme : les KR parlent de jalons (« phase 1 livrée », « MVP déployé »).",
          "Symptôme : le check-in OKR ressemble à un comité de pilotage projet.",
          "Symptôme : impossible de distinguer un KR d'une ligne de feuille de route.",
        ],
      },
      {
        heading: "Pourquoi c'est un problème",
        icon: "warn",
        body: "Livrer un projet ne garantit pas l'outcome. On peut livrer le tableau de bord et que personne ne l'utilise. On peut migrer la stack et n'avoir aucun gain de performance perçu. L'OKR demande la question d'après : « qu'est-ce que ça doit faire bouger ? ».",
        examples: [
          {
            bad: "KR : Migrer le service de paiement vers la nouvelle stack à 100 % d'ici fin Q2.",
            good: "KR : Réduire la latence p95 du service de paiement de 1,2 s à 400 ms d'ici fin Q2.",
            note: "La migration est le moyen. Le KR mesure ce que le moyen est censé produire.",
          },
        ],
      },
      {
        heading: "Comment redresser",
        icon: "good",
        body: "Pour chaque Résultat clé projet, pose la question : « Ce projet existe pour faire bouger quoi ? ». La réponse devient le KR. Le projet retourne dans la feuille de route ou le backlog, où il est suivi avec les outils de gestion de projet.",
        bullets: [
          "OKR = ce qui doit changer dans le monde, mesuré chiffré.",
          "Feuille de route = ce que l'équipe va faire pour y contribuer.",
          "Backlog = comment l'équipe va le faire, sprint après sprint.",
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Niven, OKRs For Dummies : distinction outcome / output. Lamorte, The OKRs Field Book : chapitre « Output-based vs outcome-based key results ». Wodtke, Radical Focus : « OKRs are not a task list ».",
      },
    ],
  },
  {
    id: "okr-equipe.sheet.top-down",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "bad",
    title: "L'OKR équipe dicté top-down",
    heroPhrase:
      "Un OKR qu'une équipe n'a pas posé n'engage personne. Bottom-up n'est pas une option.",
    intro: "",
    practiceCtaLabel: "Va co-construire ton OKR avec ton équipe",
    sections: [
      {
        heading: "Le scénario",
        icon: "bad",
        kind: "signals",
        body: "Le management déroule l'OKR entreprise puis distribue à chaque équipe son OKR équipe préparé en comité. L'équipe découvre ses Résultats clés dans un slide. C'est efficace en apparence : tout est aligné, tout est documenté. C'est inefficace en réalité : personne dans l'équipe ne se sent comptable de cibles qu'elle n'a pas calibrées.",
        bullets: [
          "Symptôme : les KR sont écrits avec un vocabulaire que l'équipe n'emploie pas.",
          "Symptôme : la confiance affichée est haute par politesse, basse en off.",
          "Symptôme : le check-in OKR est une obligation, pas un outil de pilotage.",
        ],
      },
      {
        heading: "Pourquoi le bottom-up est non négociable",
        icon: "warn",
        body: "L'équipe est la seule à connaître sa capacité réelle, ses contraintes techniques, les hypothèses produit qu'elle peut raisonnablement tester ce trimestre. Un OKR dicté ignore ces trois éléments : il est faux dès qu'il est écrit. Christina Wodtke l'a documenté comme l'un des plus grands « OKR mistakes » : « OKRs are great bottom up, not just top down ». [traduction : « Les OKR fonctionnent très bien de manière ascendante, pas seulement descendante. »]",
      },
      {
        heading: "Le bon flux",
        icon: "good",
        body: "Le management partage l'OKR entreprise et les attendus stratégiques. Chaque équipe se réunit en atelier de cadrage (demi-journée typique), facilité par un coach ou un leader d'équipe. Elle propose son OKR. Ce qui remonte est arbitré et calibré dans un dialogue, pas imposé.",
        examples: [
          {
            bad: "Recevoir un slide « OKR équipe Q3 » du management et l'intégrer tel quel dans Jira.",
            good: "Lire l'OKR entreprise Q3, tenir un atelier d'équipe d'une demi-journée, proposer un OKR équipe et le soumettre au management pour calibrage.",
            note: "Le management arbitre ce qui remonte. Il ne fabrique pas ce qui descend.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Wodtke, OKR Mistakes : « OKRs are great bottom up, not just top down ». Lamorte, The OKRs Field Book : Phase 1 Deployment Coaching, distinction Top-Level vs Team-Level Ateliers. Niven, OKRs For Dummies (co-construction comme condition d'engagement).",
      },
    ],
  },
  {
    id: "okr-equipe.sheet.individual-cascade",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "bad",
    title: "La cascade individuelle depuis l'objectif de la direction",
    heroPhrase:
      "Un objectif individuel qui recopie celui de la direction n'engage personne de plus qu'une liste de tâches — c'est le niveau équipe qu'on a sauté.",
    intro: "",
    practiceCtaLabel: "Va construire un OKR équipe co-construit",
    sections: [
      {
        heading: "Le scénario",
        icon: "bad",
        kind: "signals",
        body: "La direction (DP, direction produit, ou tout n+1 porteur d'un objectif de haut niveau) annonce son objectif. Au lieu de le faire descendre au niveau de l'équipe, le manager le découpe directement en « objectifs individuels » : chaque personne reçoit une reformulation réduite du même objectif, avec son nom dessus.",
        bullets: [
          "Symptôme : l'objectif individuel est la même phrase que celui de la direction, en plus petit.",
          "Symptôme : personne ne sait dire en une phrase pourquoi ce résultat est sa responsabilité propre et pas celle du collectif.",
          "Symptôme : le « Résultat clé » individuel est en réalité une tâche assignée (« livrer X », « finir Y »), pas un résultat mesurable dont la personne est seule maîtresse.",
        ],
      },
      {
        heading: "Pourquoi c'est un problème",
        icon: "warn",
        body: "Ce n'est pas une variante acceptable du bon flux, c'est un saut de niveau. L'OKR équipe (co-construit, calibré collectivement) est remplacé par une distribution individuelle qui viole le critère « sous influence » du tronc commun : le résultat final dépend du travail de plusieurs personnes, pas d'une seule. Mesurer un individu dessus est à la fois injuste et peu falsifiable. C'est la même famille que « L'OKR équipe dicté top-down » (voir fiche liée), un niveau plus bas : au lieu d'imposer l'OKR à l'équipe, on saute directement l'équipe.",
      },
      {
        heading: "Le bon niveau",
        icon: "good",
        body: "L'équipe co-construit un seul OKR équipe qui contribue à l'objectif de la direction — et c'est cet OKR équipe partagé, pas des fragments individuels, qui relie le travail de chacun. Le lien avec le travail quotidien de chaque personne se fait par les rituels d'équipe (planification, priorisation du backlog), pas par un objectif personnel dupliqué.",
        examples: [
          {
            bad: "Dev A : Améliorer la fiabilité de l'API de paiement. Dev B : Réduire les frictions du parcours de paiement. Dev C : Contribuer à l'amélioration du taux de conversion sur le paiement.",
            good: "OKR équipe : Faire de notre parcours de paiement la référence de fluidité pour nos clients entreprise, avec des Résultats clés partagés (taux d'abandon, satisfaction post-paiement, incidents de production).",
            note: "Le travail de Dev A, B et C contribue à un seul OKR équipe via le backlog partagé — aucun n'a besoin d'un objectif personnel dupliqué.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Morisseau, La boîte à outils de la méthode OKR (bi-niveau annuel/trimestriel, pas d'OKR individuel). Lamorte, The OKRs Field Book (distinction Top-Level vs Team-Level Workshops). Niven, OKRs For Dummies (structure 1 O + 3-5 KR portée par l'équipe, pas par l'individu). Voir aussi la fiche « L'OKR équipe dicté top-down » : même famille de piège, un niveau plus haut.",
      },
    ],
  },

  {
    id: "okr-equipe.sheet.set-and-forget",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "warn",
    title: "Le set-it-and-forget-it",
    heroPhrase:
      "L'OKR est fixé en début de trimestre, puis plus jamais rouvert. Il redevient réel seulement le jour du bilan.",
    intro: "",
    practiceCtaLabel: "Va remettre un OKR au centre d'un suivi régulier",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Un OKR fixé sans suivi régulier ne guide aucune décision entre le jour où il est écrit et le jour où il est jugé. Sans check-in, une dérive de trois semaines n'est découverte qu'à la fin du trimestre, l'équipe découvre l'échec au bilan, jamais assez tôt pour corriger le tir.",
        bullets: [
          "Un OKR fixé sans suivi régulier ne guide aucune décision entre sa rédaction et son bilan.",
          "Sans check-in, une dérive de plusieurs semaines n'est découverte qu'à la fin du trimestre.",
          "L'équipe découvre l'échec au bilan, jamais assez tôt pour corriger le tir.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Aucun rituel ne mentionne l'OKR entre sa rédaction et la revue de fin de trimestre.",
          "Personne ne sait dire, à mi-trimestre, si l'OKR est en bonne voie ou pas.",
          "Le premier vrai bilan de la progression a lieu le jour même du bilan final.",
        ],
      },
      {
        heading: "Réintroduire le check-in",
        icon: "wrench",
        body: "Mettre en place un point dédié toutes les deux semaines qui vérifie la progression du Résultat clé, pas seulement l'état des tâches.",
        examples: [
          {
            bad: "OKR rédigé en semaine 1 du trimestre, jamais revu jusqu'au bilan en semaine 12.",
            good: "Point dédié toutes les deux semaines : « où en est le Résultat clé, qu'est-ce qui bloque, faut-il ajuster l'effort ? »",
            note: "Le suivi régulier transforme l'OKR d'un vœu figé en un outil de pilotage vivant.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Ben Lamorte, sur la nécessité de check-ins bi-hebdomadaires plutôt qu'une seule revue en fin de trimestre pour éviter le « set it and forget it ».",
      },
    ],
  },

  {
    id: "okr-equipe.sheet.reverse-engineered-kr",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "warn",
    title: "Le KR reverse-engineered",
    heroPhrase:
      "L'équipe part de son backlog déjà décidé, puis invente un Résultat clé qui colle dessus. Rien ne change dans le travail réel.",
    intro: "",
    practiceCtaLabel: "Va vérifier si un KR a vraiment changé un plan",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le backlog ne change pas d'un mot après la rédaction des OKR : ils ne font que l'habiller. Le Résultat clé est choisi parce qu'il est facile à atteindre avec le travail déjà prévu, pas l'inverse, et les OKR ne font jamais reconsidérer ou reprioriser le plan existant.",
        bullets: [
          "Le backlog ne change pas d'un mot après la rédaction des OKR : ils ne font que l'habiller.",
          "Le Résultat clé est choisi parce qu'il colle au travail déjà prévu, pas l'inverse.",
          "Les OKR ne font jamais reconsidérer ou reprioriser le plan existant.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Le Résultat clé est rédigé après que la roadmap du trimestre est déjà figée.",
          "Aucun élément du backlog n'a été retiré ou ajouté à cause des OKR.",
          "Le Résultat clé se mesure exactement par ce que l'équipe avait déjà prévu de livrer.",
        ],
      },
      {
        heading: "Laisser le KR reprioriser",
        icon: "wrench",
        body: "Rédiger le Résultat clé à partir de l'effet recherché, puis le laisser challenger le backlog existant. Si rien dans le plan ne change, le Résultat clé n'était pas réel.",
        examples: [
          {
            bad: "Le backlog du trimestre est déjà arbitré ; le Résultat clé rédigé ensuite reprend exactement les livrables déjà prévus.",
            good: "Le Résultat clé est fixé sur l'effet recherché ; deux éléments du backlog jugés non alignés sont retirés, un nouveau est ajouté pour l'atteindre.",
            note: "Un vrai OKR change ce que l'équipe fait, pas seulement comment elle le raconte.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Jeff Gothelf, OKR Anti-pattern: reverse engineering key results to match your backlog.",
      },
    ],
  },

  {
    id: "okr-equipe.sheet.no-stretch",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "warn",
    title: "L'objectif sans stretch",
    heroPhrase:
      "La cible est fixée sans ambition. La confiance de réussite frôle 100 % dès le premier jour.",
    intro: "",
    practiceCtaLabel: "Va recalibrer l'ambition d'un KR trop facile",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Un Résultat clé fixé à 95-100 % de confiance de réussite n'est plus un OKR, c'est une tâche planifiée. Sans tension créative, l'équipe ne cherche pas de nouvelle façon de faire, elle exécute du connu. L'ambition calibrée, autour de 50 à 70 % de confiance, est ce qui distingue un OKR d'un engagement classique.",
        bullets: [
          "Un Résultat clé fixé à 95-100 % de confiance n'est plus un OKR, c'est une tâche planifiée.",
          "Sans tension créative, l'équipe exécute du connu au lieu de chercher une nouvelle façon de faire.",
          "L'ambition calibrée (50 à 70 % de confiance) distingue un OKR d'un engagement classique.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "L'équipe est certaine, dès la rédaction, d'atteindre la cible.",
          "Le Résultat clé est atteint dans les toutes premières semaines du trimestre, sans effort notable.",
          "Personne ne peut citer une nouvelle façon de travailler que cet OKR a demandée.",
        ],
      },
      {
        heading: "Recalibrer l'ambition",
        icon: "wrench",
        body: "Demander à l'équipe son niveau de confiance honnête sur la cible. Viser 50 à 70 % : en dessous, la cible est déraisonnable ; au-dessus, elle n'est pas un OKR.",
        examples: [
          {
            bad: "Faire passer la couverture de tests automatisés de 78 % à 80 % d'ici fin du trimestre.",
            good: "Faire passer la couverture de tests automatisés de 78 % à 92 % d'ici fin du trimestre, à environ 60 % de confiance pour l'équipe.",
            note: "L'écart demande un vrai effort, dans la fourchette OKR.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Christina Wodtke (Radical Focus), sur les objectifs « trop faciles » comme l'un des trois modes d'échec courants des OKR, avec le trop nombreux et le trop vague.",
      },
    ],
  },

  {
    id: "okr-equipe.sheet.vague-objective",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "warn",
    title: "L'objectif trop vague",
    heroPhrase:
      "Personne ne sait dire la même chose de ce à quoi ressemble la réussite. Chacun se fait sa propre idée.",
    intro: "",
    practiceCtaLabel: "Va tester la clarté d'un objectif qualitatif",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Un objectif qualitatif doit être inspirant mais interprétable de façon univoque, pas ouvert à toutes les lectures. Deux membres de l'équipe qui décrivent séparément « à quoi ressemble la réussite » racontent alors deux histoires différentes, et le flou de l'objectif se répercute sur le choix des Résultats clés, qui partent dans des directions disjointes.",
        bullets: [
          "Un objectif qualitatif doit être inspirant mais interprétable de façon univoque.",
          "Deux membres de l'équipe qui le décrivent séparément racontent deux histoires différentes.",
          "Le flou de l'objectif se répercute sur des Résultats clés qui partent dans des directions disjointes.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Demander à deux personnes de décrire l'objectif dans leurs mots produit deux réponses très différentes.",
          "L'objectif pourrait s'appliquer à n'importe quelle équipe de l'entreprise sans rien changer au libellé.",
          "Les Résultats clés rattachés semblent parfois sans lien évident entre eux.",
        ],
      },
      {
        heading: "Le test des deux voix",
        icon: "wrench",
        body: "Faire reformuler l'objectif indépendamment par deux membres de l'équipe. Si leurs versions divergent nettement, l'objectif est trop vague et doit être réécrit.",
        examples: [
          {
            bad: "Objectif : « Être excellents pour nos utilisateurs. »",
            good: "Objectif : « Faire de notre plateforme de paiement la plus fiable de notre marché. »",
            note: "Le second objectif reste qualitatif et inspirant, mais désigne un terrain précis (fiabilité, paiement, marché) que tout le monde peut se représenter pareil.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Christina Wodtke (Radical Focus), sur les objectifs « trop vagues » comme mode d'échec courant des OKR.",
      },
    ],
  },

  {
    id: "okr-equipe.sheet.kr-without-guardrail",
    isNamedPitfall: true,
    themeId: "okr.pieges-kr",
    icon: "warn",
    title: "Le KR sans garde-fou",
    heroPhrase:
      "Un Résultat clé de croissance poussé seul, sans contre-mesure. L'effet secondaire se dégrade en coulisse, hors du radar.",
    intro: "",
    practiceCtaLabel: "Va ajouter un garde-fou à un KR de croissance",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Un Résultat clé de croissance poussé seul crée une incitation à optimiser ce chiffre au détriment du reste. L'effet secondaire indésirable se dégrade en coulisse, sans qu'aucun indicateur ne l'alerte, et le succès affiché du KR peut cacher une dégradation réelle ailleurs dans le produit.",
        bullets: [
          "Un Résultat clé de croissance poussé seul incite à optimiser ce chiffre au détriment du reste.",
          "L'effet secondaire indésirable se dégrade en coulisse, sans qu'aucun indicateur ne l'alerte.",
          "Le succès affiché du KR peut cacher une dégradation réelle ailleurs dans le produit.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Un seul KR de volume ou de croissance existe, sans aucun KR de qualité en vis-à-vis.",
          "Une autre équipe (support, rétention, qualité) signale une dégradation qui coïncide avec la poussée du KR.",
          "Personne n'a listé, à la rédaction du KR, ce qui pourrait se dégrader en le poussant fort.",
        ],
      },
      {
        heading: "Ajouter le garde-fou",
        icon: "wrench",
        body: "Associer à tout Résultat clé de croissance ou de volume un indicateur garde-fou explicite, qui ne doit pas se dégrader au-delà d'un seuil défini à l'avance.",
        examples: [
          {
            bad: "Faire passer le taux d'inscription depuis la landing page de 4 % à 12 %.",
            good: "Faire passer le taux d'inscription depuis la landing page de 4 % à 12 %, garde-fou : le taux de churn à 30 jours des nouveaux inscrits ne doit pas dépasser 8 % (actuellement 6 %).",
            note: "Le garde-fou rend visible l'effet secondaire avant qu'il ne devienne un problème caché.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Pratique OKR courante (Doerr, Lamorte) recommandant d'associer un indicateur garde-fou à tout Résultat clé de croissance pour éviter les effets pervers.",
      },
    ],
  },
];
