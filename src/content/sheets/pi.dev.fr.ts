/**
 * Fiches pédagogiques — PI × Audience "dev" × FR.
 * Contenu dérivé de DOMAINE.md §3.
 */

import type { PedagogicalSheet } from "../../domain/ports";

export const PI_DEV_SHEETS_FR: PedagogicalSheet[] = [
  {
    id: "pi.sheet.engagé-stretch",
    themeId: "pi.engagement",
    icon: "target",
    title: "Engagé vs Stretch",
    heroPhrase: "Engagé : 80 à 100 % de confiance. Stretch : 30 à 60 %. Pas l'inverse.",
    intro: "",
    practiceCtaLabel: "Rédiger un objectif de PI",
    sections: [
      {
        heading: "Engagé",
        icon: "good",
        body: "Un objectif que l'équipe s'engage à atteindre. Confiance attendue : 80 à 100 %. En dessous, ce n'est plus un engagement, c'est un pari.",
      },
      {
        heading: "Stretch",
        icon: "okr",
        body: "Un objectif qu'on vise sans le garantir. Confiance attendue : 30 à 60 %. Ambitieux par construction : ne pas l'atteindre n'est pas un échec.",
      },
      {
        heading: "Le piège classique",
        icon: "warn",
        body: "Un engagé estimé à 40 % de confiance est un stretch mal nommé. Soit on requalifie, soit on revoit l'ambition.",
        examples: [
          {
            bad: "Engagé : « Faire passer 100 % de nos clients entreprise sur la marketplace » (confiance 30 %).",
            good: "Stretch : « Faire entrer 3 clients pilotes sur la marketplace » (confiance 50 %).",
            note: "L'engagement crédible dépend du calibrage, pas du wording.",
          },
        ],
      },
      {
        heading: "Qui le rédige, sur quelle base",
        icon: "learn",
        body: "Co-construit en PI Planning (event de 2 jours) par chaque équipe du train avec son Product Owner. Le Release Train Engineer facilite. Les fonctionnalités descendent de Product Management ; les objectifs de PI sont rédigés côté équipes, et traduisent les fonctionnalités en outcomes attendus à la revue de PI. Une équipe peut transformer 3 fonctionnalités en 2 objectifs de PI, ou un objectif de PI peut être servi par 4 fonctionnalités. Le piège de la fonctionnalité recopiée a sa propre fiche dans « Les pièges classiques ».",
        bullets: [
          "Vision produit (~10 min en ouverture du PI Planning)",
          "Fonctionnalités du PI (descendues de Product Management, déjà priorisées)",
          "Dépendances cross-équipes matérialisées sur le Program Board",
          "Objectifs stratégiques énoncés par les Business Owners en ouverture",
          "Capacité historique du train et de chaque équipe",
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, sections PI Planning et Team objectifs de PI. Voir aussi : Business Value attribuée par les Business Owners dans un dialogue avec l'équipe, pas unilatéralement.",
      },
    ],
  },
  {
    id: "pi.sheet.business-value",
    themeId: "pi.valeur-business",
    icon: "wrench",
    title: "Valeur business",
    heroPhrase: "La valeur business est stockée, pas jugée. Le moteur n'a pas d'avis sur ta stratégie.",
    intro: "",
    practiceCtaLabel: "Rédiger un objectif avec valeur business",
    sections: [
      {
        heading: "Pourquoi c'est demandé",
        icon: "target",
        body: "Sans valeur business, pas de suivi engagé/réalisé en rétrospective. C'est un préalable au bilan de PI.",
      },
      {
        heading: "Quel chiffre",
        icon: "wrench",
        body: "À discuter avec le Business Owner. 1 = peu de valeur, 10 = valeur maximale. Un PI où tout est à 10 perd le sens du tri.",
      },
    ],
  },

  // ============================================================
  // Thème : Les fondamentaux (1 fiche nouvelle, parité avec Sprint)
  // ============================================================
  {
    id: "pi.sheet.anatomy",
    themeId: "pi.fondamentaux",
    icon: "target",
    title: "L'anatomie d'un objectif de PI",
    heroPhrase:
      "Cinq briques pour la grammaire. Deux métadonnées pour la classe et la valeur. Une phrase, un engagement.",
    intro: "",
    practiceCtaLabel: "Va assembler ton premier objectif de PI",
    sections: [
      {
        heading: "Les cinq briques de grammaire",
        icon: "target",
        kind: "bricks",
        body: "Un objectif de PI bien rédigé porte les mêmes cinq briques qu'un objectif de Sprint, mais à l'échelle du train et à l'horizon revue de PI. La grammaire est universelle ; seul le vocabulaire change (business plutôt que technique, train plutôt qu'équipe seule).",
        bricksSentence:
          "Permettre à 80 % des clients entreprise d'activer le SSO en self-service avant la fin du PI.",
        bricks: [
          {
            num: 1,
            label: "Verbe outcome",
            hint: "L'action qui amorce le résultat",
            examples: "Permettre à, Faire passer, Réduire, Atteindre",
            snippet: "Permettre à",
            color: "purple",
          },
          {
            num: 2,
            label: "Indicateur business",
            hint: "La métrique observable à la revue de PI",
            examples: "% clients activés, NPS, GMV, churn",
            snippet: "80 %",
            color: "pink",
          },
          {
            num: 3,
            label: "Segment / bénéficiaire",
            hint: "Pour qui ça compte",
            examples: "clients entreprise, segment premium, équipes consommatrices",
            snippet: "des clients entreprise",
            color: "teal",
          },
          {
            num: 4,
            label: "Action observable",
            hint: "Ce que le bénéficiaire fera",
            examples: "activer en self-service, prendre une décision, déployer",
            snippet: "d'activer le SSO en self-service",
            color: "amber",
          },
          {
            num: 5,
            label: "Échéance PI",
            hint: "Quand on mesure",
            examples: "fin du PI, revue de PI, dernier mois du PI",
            snippet: "avant la fin du PI",
            color: "blue",
          },
        ],
      },
      {
        heading: "Les deux métadonnées PI",
        icon: "wrench",
        body: "L'objectif de PI ne se réduit pas à sa phrase. Il porte aussi deux métadonnées non visibles dans la phrase mais essentielles à l'engagement du train.",
        bullets: [
          "**Classe** : engagé (engagement, confiance 80 à 100 %) ou stretch (ambition, confiance 30 à 60 %). Voir la fiche dédiée.",
          "**Valeur business** : 1 à 10, attribuée par le Business Owner en dialogue avec l'équipe. Permet le suivi engagé vs réalisé en rétrospective de PI.",
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, sections PI Planning et Team objectifs de PI. La grammaire à cinq briques recoupe celle du objectif de Sprint (cf. fiche correspondante).",
      },
    ],
  },

  {
    id: "pi.sheet.planning-to-objective",
    themeId: "pi.fondamentaux",
    icon: "learn",
    title: "Du PI Planning au objectif de PI",
    heroPhrase:
      "La vision descend, les fonctionnalités descendent, les objectifs de PI remontent. Trois mouvements en deux jours.",
    intro: "",
    practiceCtaLabel: "Va co-construire un objectif de PI",
    sections: [
      {
        heading: "L'événement PI Planning",
        icon: "target",
        body: "Un PI Planning est un événement de deux jours qui réunit toutes les équipes d'un train (5 à 12 équipes en général). C'est la pièce centrale de SAFe : un train n'a pas de objectifs de PI valables sans cet événement, parce que la co-construction et l'alignement transverse n'arrivent pas par mail.",
        bullets: [
          "Jour 1 matin : vision produit, contexte stratégique, présentation des fonctionnalités priorisées.",
          "Jour 1 après-midi : chaque équipe planifie son PI et propose ses objectifs de PI.",
          "Jour 2 matin : draft plans review, ajustements croisés entre équipes.",
          "Jour 2 après-midi : finalisation des objectifs de PI, attribution Business Value, vote de confiance.",
        ],
      },
      {
        heading: "Trois mouvements d'élaboration",
        icon: "wrench",
        body: "L'objectif de PI n'apparaît pas de nulle part. Il naît du croisement de trois mouvements clairs, chacun porté par un acteur différent. Quand les objectifs arrivent tout écrits dans le train, c'est le piège de l'objectif imposé : sa fiche détaille comment le recadrer.",
        bullets: [
          "**Descente du contexte** : Product Management donne la vision, les Business Owners donnent les enjeux stratégiques. Sans cette descente, l'équipe planifie dans le vide.",
          "**Descente des fonctionnalités** : Product Management priorise et descend les fonctionnalités candidates au PI. L'équipe ne choisit pas tout, mais elle choisit comment les traduire.",
          "**Remontée des objectifs de PI** : chaque équipe traduit les fonctionnalités en outcomes attendus, en intégrant ses contraintes de capacité et ses dépendances. La traduction remonte au train.",
        ],
      },
      {
        heading: "Le rôle des acteurs clés",
        icon: "good",
        body: "",
        bullets: [
          "**Product Management** : descend les fonctionnalités priorisées, défend les arbitrages, écoute les retours du train.",
          "**Business Owners** : posent le contexte stratégique, attribuent la Business Value 1 à 10 en dialogue avec les équipes.",
          "**Release Train Engineer** : facilite l'événement, protège la qualité du processus (ROAM, vote de confiance, time-box).",
          "**Product Owners (équipe)** : portent la voix produit dans la rédaction des objectifs de PI.",
          "**Équipes (Devs + PO)** : rédigent les objectifs de PI, estiment la capacité, soulèvent les dépendances.",
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, section PI Planning (le seul événement non négociable de SAFe). Voir aussi Dean Leffingwell sur l'importance de la co-localisation (physique ou bien orchestrée à distance) pour la qualité de la co-construction.",
      },
    ],
  },

  {
    id: "pi.sheet.objective-met",
    themeId: "pi.fondamentaux",
    icon: "good",
    title: "Comment savoir qu'un objectif de PI est atteint",
    heroPhrase:
      "La revue de PI n'est pas un débat. C'est une mesure contre ce qui a été dit en PI Planning.",
    intro: "",
    practiceCtaLabel: "Va définir un critère mesurable",
    sections: [
      {
        heading: "Pourquoi définir le critère en amont",
        icon: "target",
        body: "Si le critère d'atteinte se discute à la revue de PI, on retombe dans le piège classique : chacun défend sa lecture, le Business Owner négocie sa note de Business Value, et la conversation devient politique. À l'inverse, un critère écrit en PI Planning est un contrat tacite. La revue de PI devient une lecture, pas un débat.",
        bullets: [
          "Le critère est observable : un chiffre, un pourcentage, une étape franchie.",
          "Il est posé au moment de l'écriture du objectif de PI, pas découvert après coup.",
          "Il dit « atteint / partiel / raté », pas « plutôt bien / plutôt mal ».",
        ],
      },
      {
        heading: "Le score réalisé à la revue de PI",
        icon: "wrench",
        body: "À la revue de PI, le Business Owner réévalue la Business Value 1 à 10 selon ce qui a été réellement livré. Le rapport entre la BV planifiée et la BV réalisée donne le score de prévisibilité du train (objectif SAFe : 80 à 100 % sur la durée).",
        bullets: [
          "**Engagé atteint** : BV réalisée = BV planifiée.",
          "**Engagé partiel** : BV réalisée < BV planifiée (généralement 50 à 80 %).",
          "**Stretch atteint** : BV réalisée = BV planifiée (bonus pour le train).",
          "**Stretch raté** : BV réalisée = 0 (sans pénalité, c'était un stretch).",
        ],
      },
      {
        heading: "Le test « comment le saura-t-on »",
        icon: "good",
        body: "À la fin du PI Planning, pour chaque objectif de PI, demander : « comment saurons-nous, à la revue de PI, si l'objectif est atteint ? » Si l'équipe ne sait pas répondre en 30 secondes, l'objectif de PI est mal posé. Reformuler avant de figer.",
        examples: [
          {
            bad: "objectif de PI : « Renforcer la fiabilité du paiement. » Critère d'atteinte : non posé. À la revue de PI, débat sur ce qu'on entend par « renforcer ».",
            good: "objectif de PI : « Faire passer le taux de réussite des paiements de 96,2 % à 99,5 % d'ici la revue de PI. » Critère : taux de réussite mesuré sur les 4 dernières semaines du PI, comparé à la valeur de référence. Lecture immédiate.",
            note: "Le critère est implicite dans l'objectif de PI bien rédigé, mais le formuler explicitement évite les divergences d'interprétation à la Review.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, section PI System Demo et PI Predictability Measure. Convergent avec Mike Cohn sur l'importance du critère d'acceptation posé en amont, transposé à l'échelle PI.",
      },
    ],
  },

  // ============================================================
  // Thème : Engagement et calibrage (+ 1 fiche nouvelle)
  // ============================================================
  {
    id: "pi.sheet.objective-impose",
    isNamedPitfall: true,
    themeId: "pi.engagement",
    icon: "warn",
    title: "L'objectif de PI imposé",
    heroPhrase:
      "Un objectif descendu sans dialogue. L'équipe hoche la tête. La revue de PI révèle le malentendu.",
    intro: "",
    practiceCtaLabel: "Va porter une objection constructive",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Quand le management ou les Business Owners arrivent en PI Planning avec un objectif déjà rédigé et le présentent comme non négociable, l'équipe a deux choix : hocher la tête (et perdre l'engagement réel) ou s'opposer (et passer pour difficile). Les deux mènent au même résultat : un objectif inerte qu'on porte sans y croire.",
        bullets: [
          "Un objectif imposé n'engage personne en pratique.",
          "Le vote de confiance est faussé : l'équipe vote ce qu'on attend d'elle.",
          "À la revue de PI, l'écart entre la promesse et la réalité érode la confiance des deux côtés.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "L'objectif est annoncé, pas débattu : « voici ce qu'on attend de vous ce PI ».",
          "Les questions de capacité sont éludées (« on verra à mi-PI »).",
          "Le ROAM ne contient que des risques mineurs.",
          "Confidence vote convergent à 5/5 sans hésitation, signe d'un assentiment factice.",
        ],
      },
      {
        heading: "Comment recadrer",
        icon: "wrench",
        body: "Le Release Train Engineer protège l'espace de négociation. Les Business Owners apportent le contexte stratégique ; les équipes apportent la traduction réaliste en objectif de PI. Le ROAM est utilisé honnêtement, le vote de confiance est anonyme si nécessaire.",
        examples: [
          {
            bad: "Business Owner : « L'objectif de PI de votre équipe est : atteindre 100 contrats Enterprise. C'est ce que le board attend. »",
            good: "Business Owner : « Le board pousse pour mettre à l'échelle l'offre Enterprise ce PI. Comment vous voyez votre contribution réaliste ? » Équipe : « On peut viser 60 contrats engagés, et un stretch à 100 si la nouvelle vague de leads se confirme. »",
            note: "Le contexte stratégique reste descendu. La traduction en objectif de PI remonte de l'équipe.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, ROAM et vote de confiance en PI Planning. Patrick Lencioni, The Five Dysfunctions of a Team, sur la culture de désaccord productif.",
      },
    ],
  },

  // ============================================================
  // Thème : Valeur business (+ 1 fiche nouvelle)
  // ============================================================
  {
    id: "pi.sheet.bv-uniforme",
    isNamedPitfall: true,
    themeId: "pi.valeur-business",
    icon: "warn",
    title: "La Business Value uniforme",
    heroPhrase:
      "Tout à 10. Tout à 5. Aucune valeur ne se distingue. Le Business Owner abdique son rôle.",
    intro: "",
    practiceCtaLabel: "Va aider le Business Owner à différencier",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "La valeur business 1 à 10 existe pour permettre la priorisation : à la revue de PI, le score réalisé pondère selon la valeur. Si tout est noté pareil, plus de priorité possible. C'est généralement le signe d'un Business Owner qui n'a pas pris le temps de discriminer, ou qui ne veut pas faire de choix qu'il devrait défendre.",
        bullets: [
          "Tout à 10 : « tout est important », donc rien n'est prioritaire.",
          "Tout à 5 : neutralité par défaut, équivalent à l'absence de note.",
          "Hans Samios (Lean-Agile Knowledge Base) note ce piège comme l'anti-pattern le plus fréquent en PI Planning.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Les valeurs business sont remplies en quelques secondes, sans discussion.",
          "Aucune note inférieure à 5 (« si je note bas, l'équipe va le mal prendre »).",
          "Pas de dialogue avec l'équipe au moment de l'attribution.",
        ],
      },
      {
        heading: "Comment recadrer",
        icon: "wrench",
        body: "L'attribution se fait dans un dialogue, pas en silence. Forcer une distribution : au moins une note basse, au moins une haute. Le Business Owner doit pouvoir justifier chaque écart.",
        examples: [
          {
            bad: "objectifs de PI notés : 10, 10, 10, 10, 10. Aucune priorité émerge à la revue de PI.",
            good: "objectifs de PI notés : 10 (compliance bloquante), 8 (croissance), 5 (dette technique), 3 (refonte UI). Le Business Owner défend chaque écart en moins de 30 secondes.",
            note: "Une distribution variée révèle qu'un choix stratégique a été fait. C'est ce qu'on attend du Business Owner.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Hans Samios (Personal Lean-Agile Knowledge Base), section how_do_we_assign_business_value_to_pi_objectives. Scaled Agile Framework, recommandation explicite contre la business value uniforme.",
      },
    ],
  },

  // ============================================================
  // Thème : Les pièges classiques (2 fiches nouvelles)
  // ============================================================
  {
    id: "pi.sheet.fonctionnalité-vs-objective",
    isNamedPitfall: true,
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "Une fonctionnalité n'est pas un objectif de PI",
    heroPhrase:
      "Une fonctionnalité dit ce qu'on livre. Un objectif de PI dit ce qui aura changé pour le bénéficiaire.",
    intro: "",
    practiceCtaLabel: "Va traduire une fonctionnalité en objectif de PI",
    sections: [
      {
        heading: "Pourquoi c'est l'erreur la plus fréquente",
        icon: "target",
        body: "Product Management descend des fonctionnalités (« SSO Enterprise », « refonte panier mobile »). Les équipes, sous pression de temps en PI Planning, recopient ces fonctionnalités dans leurs objectifs de PI. Résultat : le Business Owner ne sait pas quoi noter en valeur business, la revue de PI ne sait pas quoi mesurer, et la confusion grandit entre ce qu'on livre et ce qui doit changer.",
        bullets: [
          "Une fonctionnalité est un livrable. Un objectif de PI est un outcome attendu.",
          "Une fonctionnalité peut être livrée sans atteindre l'outcome (et inversement).",
          "L'objectif de PI rend la fonctionnalité falsifiable : on saura si elle a fait son effet.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "L'objectif de PI porte un nom de fonctionnalité ou de projet (« Livrer X », « Refondre Y »).",
          "Aucune métrique n'est nommée.",
          "Le Business Owner peine à attribuer une valeur business (« je note l'effort, pas la valeur »).",
        ],
      },
      {
        heading: "Comment recadrer",
        icon: "wrench",
        body: "Devant chaque fonctionnalité, poser la question : « qu'est-ce que cette fonctionnalité, une fois livrée, va faire bouger chez le bénéficiaire ? » La réponse est l'objectif de PI. La fonctionnalité reste, comme moyen pour y arriver.",
        examples: [
          {
            bad: "Fonctionnalité recopiée : « Livrer la fonctionnalité SSO Enterprise ce PI. »",
            good: "objectif de PI dérivé : « Permettre à 80 % des clients entreprise d'activer le SSO en self-service avant la fin du PI. » La fonctionnalité SSO Enterprise reste, mais comme moyen.",
            note: "Le test : si la fonctionnalité est livrée mais que l'outcome ne bouge pas, l'objectif de PI n'est pas atteint. Cette tension est exactement ce qu'on veut révéler.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, recommandations explicites contre le « fonctionnalité = objectif de PI ». Agile Seekers (article 2024) liste cet anti-pattern comme le plus fréquent à l'introduction de SAFe.",
      },
    ],
  },

  {
    id: "pi.sheet.tous-committed",
    isNamedPitfall: true,
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "Tous les objectifs de PI en engagé",
    heroPhrase:
      "Un train sans stretch est un train sans ambition. Ou un train qui se ment sur sa capacité.",
    intro: "",
    practiceCtaLabel: "Va calibrer un mix engagé / stretch",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Quand un train classe tous ses objectifs de PI en engagé, deux interprétations possibles : (1) il sous-promet pour être sûr d'atteindre 100 % à la revue de PI (sandbagging à l'échelle train), ou (2) il sur-promet en s'engageant sur des objectifs qu'il ratera. Les deux abîment la confiance des Business Owners et coupent l'équipe de tout apprentissage stretch.",
        bullets: [
          "Le stretch est l'espace où on tente quelque chose dont l'issue est incertaine, où on apprend.",
          "Un train à 100 % engagé se prive de cet espace.",
          "Le Business Owner ne sait plus quel objectif compte vraiment.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Aucun objectif classé stretch sur la page de PI Planning.",
          "Les objectifs réalisés à 100 % à la revue de PI trois PI consécutifs (signe de sandbagging).",
          "Ou inversement : taux de réalisation moyen sous 70 % (signe de sur-promesse).",
        ],
      },
      {
        heading: "Comment recadrer",
        icon: "wrench",
        body: "Le RTE peut suggérer un mix de référence : autour de 60 à 70 % d'engagé, 30 à 40 % de stretch. Le Business Owner peut demander explicitement « quel objectif vous engagez à coup sûr, et quel objectif vous tentez sans garantir ? ». La discrimination crée la lisibilité.",
        examples: [
          {
            bad: "5 objectifs de PI ce trimestre, tous classés engagé. Aucun stretch.",
            good: "3 objectifs de PI engagés (cap commercial, fiabilité, conformité), 2 stretch (marketplace pilote, intégration nouveau partenaire).",
            note: "Le mix raconte une histoire stratégique : voici ce qu'on tient, voici ce qu'on tente.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, recommandations sur le mix engagé / stretch. Ben Lamorte (The OKRs Field Book) sur la valeur d'apprentissage du stretch, transposable à PI.",
      },
    ],
  },

  {
    id: "pi.sheet.ip-iteration-overloaded",
    isNamedPitfall: true,
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "L'Innovation and Planning phagocyté",
    heroPhrase:
      "L'itération IP existe pour respirer, innover et se stabiliser. Le train la remplit de tickets comme n'importe quelle autre itération.",
    intro: "",
    practiceCtaLabel: "Va protéger une itération IP menacée",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "L'Innovation and Planning (IP) Iteration est prévue par SAFe comme un tampon : absorber l'incertitude d'estimation, dégager du temps d'innovation et de formation, stabiliser, préparer le PI suivant. Quand le train y planifie une charge normale, ce tampon disparaît, la marge de manœuvre du train aussi, et le rythme devient intenable.",
        bullets: [
          "L'itération IP est un espace tampon, pas une itération de plus pour rattraper le retard.",
          "Sans cette marge, la moindre estimation optimiste rend tout le PI intenable.",
          "Le temps d'innovation et de formation prévu par SAFe disparaît en premier.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "La charge planifiée sur l'itération IP est proche de celle des autres itérations.",
          "Le train n'a jamais de créneau formation ou hackathon sur un PI entier.",
          "L'itération IP sert systématiquement à finir ce qui a débordé des itérations précédentes.",
        ],
      },
      {
        heading: "Rendre le tampon à l'itération IP",
        icon: "wrench",
        body: "Protéger explicitement l'itération IP comme du temps sans charge planifiée dédiée à rattraper du retard, et suivre son taux de charge comme un indicateur de santé du train à part entière.",
        examples: [
          {
            bad: "Itération IP planifiée à 90 % de charge avec les tickets en retard des itérations précédentes.",
            good: "Itération IP réservée à la stabilisation, l'innovation et la préparation du PI suivant : moins de 20 % de charge planifiée, le reste laissé ouvert.",
            note: "Le tampon retrouve sa fonction : absorber l'imprévu du PI qui vient de se terminer, pas prolonger sa charge.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, description de l'Innovation and Planning Iteration comme espace de stabilisation, innovation et préparation, distinct des itérations de développement.",
      },
    ],
  },

  {
    id: "pi.sheet.iteration-by-iteration-planning",
    isNamedPitfall: true,
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "Le plan iteration par iteration",
    heroPhrase:
      "Le train détaille l'itération 1 dans les moindres détails. Le reste du PI n'existe encore nulle part.",
    intro: "",
    practiceCtaLabel: "Va esquisser un PI entier avant de le détailler",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Une itération parfaitement détaillée ne dit rien sur la faisabilité du PI entier. Quand le train ne construit sa vision qu'itération après itération, les dépendances entre équipes n'apparaissent qu'en fin de PI, quand il est trop tard pour les anticiper, et la revue du plan de draft ne peut challenger que ce qui a été rendu visible.",
        bullets: [
          "Une itération parfaitement détaillée ne dit rien sur la faisabilité du PI entier.",
          "Les dépendances entre équipes n'apparaissent qu'en fin de PI, trop tard pour les anticiper.",
          "La revue du plan de draft ne peut challenger que ce qui a été rendu visible.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "À la revue du plan de draft, seule l'itération 1 a un contenu détaillé.",
          "Le Program Board reste vide au-delà de l'itération 1.",
          "Les risques identifiés portent tous sur le court terme, aucun sur la fin du PI.",
        ],
      },
      {
        heading: "Planifier en largeur avant la profondeur",
        icon: "wrench",
        body: "Esquisser les 5 itérations à haut niveau dès la revue du plan de draft, avec les dépendances inter-équipes posées sur le Program Board, avant d'affiner le détail d'une seule itération.",
        examples: [
          {
            bad: "Itération 1 planifiée récit par récit ; itérations 2 à 5 laissées en blanc en attendant d'y voir plus clair.",
            good: "Les 5 itérations esquissées à haut niveau dès la revue du plan de draft, dépendances inter-équipes posées sur le Program Board avant d'affiner le détail de l'itération 1.",
            note: "La vision d'ensemble précède le détail, pas l'inverse.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Journey, PI Planning — Plan to Discover the Next PI, sur la nécessité d'un plan de bout en bout avant l'approfondissement itération par itération.",
      },
    ],
  },

  {
    id: "pi.sheet.commitment-ceremony",
    isNamedPitfall: true,
    themeId: "pi.engagement",
    icon: "warn",
    title: "La cérémonie d'engagement",
    heroPhrase:
      "Chaque récit découpé, estimé, verrouillé au chiffre près. Le PI Planning devient un rituel de contrôle, pas un dialogue sur la valeur.",
    intro: "",
    practiceCtaLabel: "Va recentrer un PI Planning sur la valeur",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le temps du PI Planning part dans le découpage et l'estimation des récits, pas dans la discussion de la valeur avec le Business Owner. Les objectifs de PI deviennent une formalité signée en fin de journée, pas le fil conducteur de l'événement : l'équipe s'engage sur un chiffre d'estimation plus que sur un effet à produire.",
        bullets: [
          "Le temps de Planning part dans le découpage et l'estimation, pas dans la discussion de la valeur.",
          "Les objectifs de PI sont rédigés en fin d'événement, dans la précipitation.",
          "Le vote de confiance porte sur « avoir fini d'estimer », pas sur l'atteinte de l'objectif.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "La majorité du temps de Planning est passée à estimer et découper, pas à discuter des objectifs.",
          "Les objectifs de PI sont rédigés dans les dernières minutes avant le vote de confiance.",
          "Le Business Owner n'intervient jamais pendant les deux jours de l'événement.",
        ],
      },
      {
        heading: "Remettre l'objectif avant l'estimation",
        icon: "wrench",
        body: "Garder le découpage et l'estimation comme des moyens, pas comme le centre de l'événement. Ouvrir la journée 1 par la discussion des objectifs de PI avec les Business Owners ; le détail d'exécution vient ensuite, au service de ces objectifs déjà clarifiés.",
        examples: [
          {
            bad: "Journée 1 du PI Planning entièrement consacrée au découpage et à l'estimation des récits ; les objectifs de PI rédigés en 20 minutes juste avant le vote de confiance.",
            good: "La discussion des objectifs de PI avec le Business Owner ouvre la journée 1 ; le découpage des récits vient ensuite, au service des objectifs déjà clarifiés.",
            note: "L'ordre du Planning matérialise ce qui compte vraiment : l'objectif d'abord, le détail d'exécution ensuite.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Top 12 mistakes to avoid during PI Planning (LinkedIn), sur la dérive du PI Planning en cérémonie d'engagement centrée sur l'estimation plutôt que sur la valeur.",
      },
    ],
  },

  {
    id: "pi.sheet.unprepared-pi-planning",
    isNamedPitfall: true,
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "Le PI Planning non préparé",
    heroPhrase:
      "Les équipes découvrent les fonctionnalités en direct, pendant l'événement. La préparation qui devait précéder n'a pas eu lieu.",
    intro: "",
    practiceCtaLabel: "Va préparer un PI Planning en amont",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le backlog n'est pas préparé : les équipes découvrent les fonctionnalités pendant l'événement, pas avant. Les dépendances inter-équipes ne sont pas identifiées en amont, elles surgissent en direct. Les objectifs de PI rédigés sur cette base restent fragiles, car personne n'a eu le temps d'en vérifier la faisabilité.",
        bullets: [
          "Le backlog n'est pas préparé : les équipes découvrent les fonctionnalités pendant l'événement.",
          "Les dépendances inter-équipes ne sont pas identifiées en amont, elles surgissent en direct.",
          "Les objectifs de PI rédigés sur cette base restent fragiles, jamais vérifiés en amont.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Le Pre-PI Planning n'a pas eu lieu, ou sans les bonnes personnes.",
          "Des questions de compréhension basique sur une fonctionnalité se posent en pleine séance de Planning.",
          "Le contenu proposé change significativement entre le début et la fin de l'événement.",
        ],
      },
      {
        heading: "Préparer avant de planifier",
        icon: "wrench",
        body: "Investir dans le Pre-PI Planning : backlog relu et clarifié, dépendances pré-identifiées, rôles clés briefés avant l'événement.",
        examples: [
          {
            bad: "Les Product Managers présentent des fonctionnalités inédites en séance ; les équipes découvrent le périmètre en même temps qu'elles doivent en tirer des objectifs de PI.",
            good: "Le contenu du backlog est revu et clarifié en Pre-PI Planning deux semaines avant ; les équipes arrivent au PI Planning avec les questions de compréhension déjà résolues.",
            note: "La qualité des objectifs de PI dépend de la préparation qui précède l'événement, pas de l'événement lui-même.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Agile Seekers, Overcoming Common PI Planning Anti-Patterns With Discovery Mindset, sur le manque de préparation comme cause principale d'un PI Planning désorganisé.",
      },
    ],
  },

  {
    id: "pi.sheet.empty-program-board",
    isNamedPitfall: true,
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "Le Program Board vide",
    heroPhrase:
      "Aucune dépendance inter-équipes n'est rendue visible. L'objectif d'une équipe dépend pourtant d'une autre, en silence.",
    intro: "",
    practiceCtaLabel: "Va tracer une dépendance sur un Program Board",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Un objectif de PI peut dépendre d'une livraison d'une autre équipe sans que ce lien soit jamais tracé. Sans Program Board rempli, personne ne voit venir le risque avant qu'il ne se matérialise, et le ROAM reste vide alors que les dépendances existent bel et bien.",
        bullets: [
          "Un objectif de PI peut dépendre d'une autre équipe sans que ce lien soit jamais tracé.",
          "Sans le Program Board rempli, personne ne voit venir le risque avant qu'il ne se matérialise.",
          "Le ROAM reste vide alors que les dépendances existent bel et bien.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Le Program Board est vide ou quasi vide à la fin du PI Planning.",
          "Un objectif de PI mentionne un livrable d'une autre équipe sans fil visible vers cette équipe.",
          "Les glissements de dépendances sont découverts à la revue de PI, jamais avant.",
        ],
      },
      {
        heading: "Rendre la dépendance visible",
        icon: "wrench",
        body: "Rendre chaque dépendance explicite sur le Program Board pendant le Planning, et la référencer directement dans le ROAM de l'objectif de PI concerné.",
        examples: [
          {
            bad: "Objectif de PI : « Lancer le paiement en un clic », qui suppose une API de tokenisation livrée par l'équipe Paiement Plateforme, jamais tracée sur le Program Board.",
            good: "Objectif de PI : « Lancer le paiement en un clic », dépendance vers l'équipe Paiement Plateforme tracée sur le Program Board (API de tokenisation, semaine 3), risque inscrit au ROAM.",
            note: "La dépendance devient un objet suivi, pas un pari silencieux.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, Program Board et ROAM, artefacts destinés à rendre visibles les dépendances inter-équipes dès le PI Planning.",
      },
    ],
  },

  {
    id: "pi.sheet.po-bypass",
    isNamedPitfall: true,
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "Le contournement du Product Owner",
    heroPhrase:
      "Le travail arrive directement à l'équipe, sans passer par le Product Owner. L'objectif de PI perd son garant.",
    intro: "",
    practiceCtaLabel: "Va rediriger une demande qui a contourné le PO",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le Product Owner est le garant du lien entre le travail réel et les objectifs de PI engagés. Une demande qui arrive en direct à l'équipe n'est jamais confrontée à cet objectif, et le train perd la capacité de dire non à une demande qui ne sert aucun objectif validé.",
        bullets: [
          "Le Product Owner est le garant du lien entre le travail réel et les objectifs de PI engagés.",
          "Une demande qui arrive en direct à l'équipe n'est jamais confrontée à cet objectif.",
          "Le train perd la capacité de dire non à une demande qui ne sert aucun objectif validé.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Un manager ou un client sollicite directement un développeur, sans passer par le Product Owner.",
          "Du travail apparaît dans le sprint sans lien tracé vers un objectif de PI engagé.",
          "Le Product Owner découvre après coup qu'une demande a été traitée en dehors de son arbitrage.",
        ],
      },
      {
        heading: "Rediriger vers le Product Owner",
        icon: "wrench",
        body: "Rappeler que toute demande entrante passe par le Product Owner, qui l'évalue face aux objectifs de PI engagés avant qu'elle entre au plan.",
        examples: [
          {
            bad: "Un directeur commercial demande directement à un développeur d'ajouter un champ au formulaire, en urgence, sans passer par le Product Owner.",
            good: "La demande du directeur commercial est redirigée vers le Product Owner, qui l'évalue face aux objectifs de PI engagés avant de décider si et quand elle entre au plan.",
            note: "Le Product Owner reste le point de passage qui protège la cohérence des objectifs, même sous pression hiérarchique.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Top 12 mistakes to avoid during PI Planning (LinkedIn), sur le contournement du Product Owner comme cause de perte d'alignement et de vélocité.",
      },
    ],
  },
];
