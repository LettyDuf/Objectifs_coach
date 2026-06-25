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
    title: "OKR équipe : 1 Objective + 3 à 5 Key Results",
    heroPhrase:
      "L'Objective dit vers quoi. Les Key Results disent comment on saura qu'on y est arrivé.",
    intro: "",
    practiceCtaLabel: "Va écrire ton premier OKR équipe",
    sections: [
      {
        heading: "L'Objective : qualitatif et mémorisable",
        icon: "target",
        body: "Pas de chiffre dans l'Objective : le chiffre est l'affaire des KR. Une équipe doit pouvoir le réciter sans le lire.",
        examples: [
          {
            bad: "Améliorer notre observabilité de 30 %.",
            good: "Devenir l'outil de référence des équipes data pour l'observabilité.",
            note: "Un Objective est qualitatif et inspirant. Si tu as besoin d'un chiffre dans l'Objective, c'est qu'il devrait être dans un KR.",
          },
        ],
      },
      {
        heading: "Les Key Results : 3 à 5, chiffrés, outcome",
        icon: "practice",
        body: "Chaque KR vise un changement mesurable : « de X à Y », « par N », « à N % ». Pas de KR-projet (« livrer Z » n'est pas un KR). Au-delà de 5 KR, on dilue.",
        bullets: [
          "3 à 5 KR par Objective : assez pour couvrir, pas trop pour disperser.",
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
        body: "OKR entreprise (annuel, le pourquoi) → OKR équipe (trimestriel, le vers où) → PI Objectives (8-12 sem, le quoi engagé) → Sprint Goals (1-4 sem, le comment). Chaque étage a sa grammaire. Les confondre fait perdre une dimension du pilotage.",
      },
      {
        heading: "Qui le rédige, sur quelle base",
        icon: "target",
        body: "Co-construit par l'équipe entière (incluant son PM ou PO), animé par un facilitateur (leader d'équipe, coach OKR interne ou externe). Bottom-up, pas dicté top-down. Les OKR entreprise donnent la direction ; l'équipe propose comment elle y contribue — elle n'attend pas qu'on lui dicte ses KR. Cadre de travail : workshop de cadrage en début de cycle (typiquement une demi-journée), puis check-in hebdomadaire de 15-30 min.",
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
            good: "Lire l'OKR entreprise, en discuter en workshop, proposer un OKR équipe qui porte la couleur de l'équipe.",
            note: "Un OKR équipe que l'équipe n'a pas posé n'engage personne — c'est l'anti-pattern cascade brutale documenté par Wodtke.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Niven, OKRs For Dummies. Lamorte, The OKRs Field Book (2021) — Phase 1 Deployment Coaching, distinction Top-Level vs Team-Level Workshops. Morisseau, La boîte à outils OKR (Dunod). Wodtke, OKR Mistakes : « OKRs are great bottom up, not just top down. » Cadence trimestrielle, bi-niveau strict et co-construction convergent dans ces sources.",
      },
    ],
  },
  {
    id: "okr-equipe.sheet.kr-traps",
    themeId: "okr.pieges-kr",
    icon: "warn",
    title: "Les 4 pièges du Key Result",
    heroPhrase:
      "Un KR vise un résultat à atteindre. Pas une livraison, pas un état à maintenir, pas une certitude.",
    intro: "",
    practiceCtaLabel: "Va corriger un KR mal posé",
    sections: [
      {
        heading: "Piège 1 — Le KR-projet",
        icon: "bad",
        body: "« Livrer X », « Migrer Y », « Déployer Z » = un moyen, pas un résultat. Symptôme : verbe d'output en tête.",
        examples: [
          {
            bad: "Livrer le nouveau dashboard métriques v2 d'ici fin du trimestre.",
            good: "Atteindre 80 % d'équipes utilisant le dashboard métriques (de 0 à 24 équipes).",
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
    title: "L'anatomie d'un Key Result",
    heroPhrase:
      "Un Key Result tient en quatre briques. Si l'une manque, le KR est cassé.",
    intro: "",
    practiceCtaLabel: "Va construire un KR brique par brique",
    sections: [
      {
        heading: "Les quatre briques d'un Key Result",
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
    themeId: "okr.fondamentaux",
    icon: "warn",
    title: "Trop d'OKR par équipe",
    heroPhrase:
      "Plus tu ajoutes d'Objectives, plus tu dilues la focalisation. Une équipe = un Objective par cycle.",
    intro: "",
    practiceCtaLabel: "Va réduire ta liste à un seul Objective",
    sections: [
      {
        heading: "Le principe : un seul Objective par équipe par cycle",
        icon: "target",
        body: "L'OKR sert à concentrer l'énergie sur ce qui compte le plus. Si une équipe se donne trois ou quatre Objectives en parallèle, elle n'en a plus aucun — elle a une liste de courses. Christina Wodtke est explicite : « Have a maximum of one OKR per team per quarter ».",
        bullets: [
          "1 Objective + 3 à 5 Key Results : c'est le format de référence.",
          "Au-delà, l'équipe ne sait plus quoi arbitrer quand le temps manque.",
          "La focalisation est une compétence d'équipe : elle se travaille.",
        ],
      },
      {
        heading: "Pourquoi on tombe dedans",
        icon: "bad",
        body: "Plusieurs réflexes poussent à empiler les Objectives, tous compréhensibles, tous coûteux.",
        bullets: [
          "Peur de laisser un sujet de côté (« si on ne le met pas en OKR, personne ne s'en occupera »).",
          "Pression descendante (le management ajoute des Objectives au fil de l'eau).",
          "Confusion OKR / liste de chantiers (on met dedans tout ce que l'équipe fait, pas seulement ce qui doit changer).",
        ],
      },
      {
        heading: "Comment trancher",
        icon: "good",
        body: "Si la liste contient trois Objectives, demande : « Lequel des trois, si on échoue, fait le plus mal au trimestre ? ». Garde celui-là. Les autres sont du business as usual, des KR d'un autre Objective, ou attendent le cycle suivant.",
        examples: [
          {
            bad: "Objective 1 : Devenir la référence observabilité. Objective 2 : Réduire la dette technique. Objective 3 : Améliorer la satisfaction des stakeholders.",
            good: "Objective : Devenir la référence observabilité. (Les autres sujets vivent dans le backlog ou dans un KR de cet Objective.)",
            note: "Trois Objectives = trois équipes en parallèle dans la même équipe. C'est exactement ce que l'OKR cherche à éviter.",
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
        body: "L'équipe ouvre son OKR comme un fichier de suivi : on coche les jalons, on remonte les pourcentages d'avancement projet. Le KR devient « livrer le module X à 50 %, puis 80 %, puis 100 % ». On a transformé un outil d'outcome en un outil de gestion de projet.",
        bullets: [
          "Symptôme : les KR parlent de jalons (« phase 1 livrée », « MVP déployé »).",
          "Symptôme : le check-in OKR ressemble à un comité de pilotage projet.",
          "Symptôme : impossible de distinguer un KR d'une ligne de roadmap.",
        ],
      },
      {
        heading: "Pourquoi c'est un problème",
        icon: "warn",
        body: "Livrer un projet ne garantit pas l'outcome. On peut livrer le dashboard et que personne ne l'utilise. On peut migrer la stack et n'avoir aucun gain de performance perçu. L'OKR demande la question d'après : « qu'est-ce que ça doit faire bouger ? ».",
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
        body: "Pour chaque KR-projet, pose la question : « Ce projet existe pour faire bouger quoi ? ». La réponse devient le KR. Le projet retourne dans la roadmap ou le backlog, où il est suivi avec les outils de gestion de projet.",
        bullets: [
          "OKR = ce qui doit changer dans le monde, mesuré chiffré.",
          "Roadmap = ce que l'équipe va faire pour y contribuer.",
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
        body: "Le management déroule l'OKR entreprise puis distribue à chaque équipe son OKR équipe préparé en comité. L'équipe découvre ses Key Results dans un slide. C'est efficace en apparence : tout est aligné, tout est documenté. C'est inefficace en réalité : personne dans l'équipe ne se sent comptable de cibles qu'elle n'a pas calibrées.",
        bullets: [
          "Symptôme : les KR sont écrits avec un vocabulaire que l'équipe n'emploie pas.",
          "Symptôme : la confiance affichée est haute par politesse, basse en off.",
          "Symptôme : le check-in OKR est une obligation, pas un outil de pilotage.",
        ],
      },
      {
        heading: "Pourquoi le bottom-up est non négociable",
        icon: "warn",
        body: "L'équipe est la seule à connaître sa capacité réelle, ses contraintes techniques, les hypothèses produit qu'elle peut raisonnablement tester ce trimestre. Un OKR dicté ignore ces trois éléments : il est faux dès qu'il est écrit. Christina Wodtke l'a documenté comme l'un des plus grands « OKR mistakes » : « OKRs are great bottom up, not just top down ».",
      },
      {
        heading: "Le bon flux",
        icon: "good",
        body: "Le management partage l'OKR entreprise et les attendus stratégiques. Chaque équipe se réunit en workshop de cadrage (demi-journée typique), facilité par un coach ou un leader d'équipe. Elle propose son OKR. Ce qui remonte est arbitré et calibré dans un dialogue, pas imposé.",
        examples: [
          {
            bad: "Recevoir un slide « OKR équipe Q3 » du management et l'intégrer tel quel dans Jira.",
            good: "Lire l'OKR entreprise Q3, tenir un workshop d'équipe d'une demi-journée, proposer un OKR équipe et le soumettre au management pour calibrage.",
            note: "Le management arbitre ce qui remonte. Il ne fabrique pas ce qui descend.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Wodtke, OKR Mistakes : « OKRs are great bottom up, not just top down ». Lamorte, The OKRs Field Book : Phase 1 Deployment Coaching, distinction Top-Level vs Team-Level Workshops. Niven, OKRs For Dummies (co-construction comme condition d'engagement).",
      },
    ],
  },
];
