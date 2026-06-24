/**
 * Fiches pédagogiques — PI × Audience "dev" × FR.
 * Contenu dérivé de DOMAINE.md §3.
 */

import type { PedagogicalSheet } from "../../domain/ports";

export const PI_DEV_SHEETS_FR: PedagogicalSheet[] = [
  {
    id: "pi.sheet.committed-stretch",
    themeId: "pi.engagement",
    icon: "target",
    title: "Committed vs Stretch",
    heroPhrase: "Committed : 80 à 100 % de confiance. Stretch : 30 à 60 %. Pas l'inverse.",
    intro: "",
    practiceCtaLabel: "Rédiger un objectif de PI",
    sections: [
      {
        heading: "Committed",
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
        body: "Un committed estimé à 40 % de confiance est un stretch mal nommé. Soit on requalifie, soit on revoit l'ambition.",
        examples: [
          {
            bad: "Committed : « Faire passer 100 % de nos clients entreprise sur la marketplace » (confiance 30 %).",
            good: "Stretch : « Faire entrer 3 clients pilotes sur la marketplace » (confiance 50 %).",
            note: "L'engagement crédible dépend du calibrage, pas du wording.",
          },
        ],
      },
      {
        heading: "Qui le rédige, sur quelle base",
        icon: "learn",
        body: "Co-construit en PI Planning (event de 2 jours) par chaque équipe du train avec son Product Owner. Le Release Train Engineer facilite. Les features descendent de Product Management ; les PI Objectives sont rédigés côté équipes, et traduisent les features en outcomes attendus à la PI Review. Une équipe peut transformer 3 features en 2 PI Objectives, ou un PI Objective peut être servi par 4 features.",
        bullets: [
          "Vision produit (~10 min en ouverture du PI Planning)",
          "Features du PI (descendues de Product Management, déjà priorisées)",
          "Dépendances cross-équipes matérialisées sur le Program Board",
          "Objectifs stratégiques énoncés par les Business Owners en ouverture",
          "Capacité historique du train et de chaque équipe",
        ],
        examples: [
          {
            bad: "Recopier une feature comme PI Objective : « Livrer la feature SSO Enterprise ».",
            good: "« Permettre à 80 % des clients entreprise d'activer le SSO en self-service avant la fin du PI. »",
            note: "Le PI Objective traduit la feature en outcome attendu côté Business Owner.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, sections PI Planning et Team PI Objectives. Voir aussi : Business Value attribuée par les Business Owners dans un dialogue avec l'équipe, pas unilatéralement.",
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
        body: "Sans valeur business, pas de suivi committed/réalisé en rétrospective. C'est un préalable au bilan de PI.",
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
    title: "L'anatomie d'un PI Objective",
    heroPhrase:
      "Cinq briques pour la grammaire. Deux métadonnées pour la classe et la valeur. Une phrase, un engagement.",
    intro: "",
    practiceCtaLabel: "Va assembler ton premier PI Objective",
    sections: [
      {
        heading: "Les cinq briques de grammaire",
        icon: "target",
        kind: "bricks",
        body: "Un PI Objective bien rédigé porte les mêmes cinq briques qu'un Sprint Goal, mais à l'échelle du train et à l'horizon PI Review. La grammaire est universelle ; seul le vocabulaire change (business plutôt que technique, train plutôt qu'équipe seule).",
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
            hint: "La métrique observable à la PI Review",
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
            examples: "fin du PI, PI Review, dernier mois du PI",
            snippet: "avant la fin du PI",
            color: "blue",
          },
        ],
      },
      {
        heading: "Les deux métadonnées PI",
        icon: "wrench",
        body: "Le PI Objective ne se réduit pas à sa phrase. Il porte aussi deux métadonnées non visibles dans la phrase mais essentielles à l'engagement du train.",
        bullets: [
          "**Classe** : committed (engagement, confiance 80 à 100 %) ou stretch (ambition, confiance 30 à 60 %). Voir la fiche dédiée.",
          "**Valeur business** : 1 à 10, attribuée par le Business Owner en dialogue avec l'équipe. Permet le suivi committed vs réalisé en rétrospective de PI.",
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, sections PI Planning et Team PI Objectives. La grammaire à cinq briques recoupe celle du Sprint Goal (cf. fiche correspondante).",
      },
    ],
  },

  {
    id: "pi.sheet.planning-to-objective",
    themeId: "pi.fondamentaux",
    icon: "learn",
    title: "Du PI Planning au PI Objective",
    heroPhrase:
      "La vision descend, les features descendent, les PI Objectives remontent. Trois mouvements en deux jours.",
    intro: "",
    practiceCtaLabel: "Va co-construire un PI Objective",
    sections: [
      {
        heading: "L'événement PI Planning",
        icon: "target",
        body: "Un PI Planning est un événement de deux jours qui réunit toutes les équipes d'un train (5 à 12 équipes en général). C'est la pièce centrale de SAFe : un train n'a pas de PI Objectives valables sans cet événement, parce que la co-construction et l'alignement transverse n'arrivent pas par mail.",
        bullets: [
          "Jour 1 matin : vision produit, contexte stratégique, présentation des features priorisées.",
          "Jour 1 après-midi : chaque équipe planifie son PI et propose ses PI Objectives.",
          "Jour 2 matin : draft plans review, ajustements croisés entre équipes.",
          "Jour 2 après-midi : finalisation des PI Objectives, attribution Business Value, confidence vote.",
        ],
      },
      {
        heading: "Trois mouvements d'élaboration",
        icon: "wrench",
        body: "Le PI Objective n'apparaît pas de nulle part. Il naît du croisement de trois mouvements clairs, chacun porté par un acteur différent.",
        bullets: [
          "**Descente du contexte** : Product Management donne la vision, les Business Owners donnent les enjeux stratégiques. Sans cette descente, l'équipe planifie dans le vide.",
          "**Descente des features** : Product Management priorise et descend les features candidates au PI. L'équipe ne choisit pas tout, mais elle choisit comment les traduire.",
          "**Remontée des PI Objectives** : chaque équipe traduit les features en outcomes attendus, en intégrant ses contraintes de capacité et ses dépendances. La traduction remonte au train.",
        ],
        examples: [
          {
            bad: "Product Management arrive avec les features ET les PI Objectives déjà rédigés. Les équipes ne font qu'estimer.",
            good: "Product Management apporte la vision + les features. Les équipes proposent les PI Objectives qui traduisent les features dans leur réalité. Le train ajuste collectivement.",
            note: "La co-construction n'est pas un détail formel : c'est ce qui rend le PI Objective porteur d'engagement réel.",
          },
        ],
      },
      {
        heading: "Le rôle des acteurs clés",
        icon: "good",
        body: "",
        bullets: [
          "**Product Management** : descend les features priorisées, défend les arbitrages, écoute les retours du train.",
          "**Business Owners** : posent le contexte stratégique, attribuent la Business Value 1 à 10 en dialogue avec les équipes.",
          "**Release Train Engineer** : facilite l'événement, protège la qualité du processus (ROAM, confidence vote, time-box).",
          "**Product Owners (équipe)** : portent la voix produit dans la rédaction des PI Objectives.",
          "**Équipes (Devs + PO)** : rédigent les PI Objectives, estiment la capacité, soulèvent les dépendances.",
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
    title: "Comment savoir qu'un PI Objective est atteint",
    heroPhrase:
      "La PI Review n'est pas un débat. C'est une mesure contre ce qui a été dit en PI Planning.",
    intro: "",
    practiceCtaLabel: "Va définir un critère mesurable",
    sections: [
      {
        heading: "Pourquoi définir le critère en amont",
        icon: "target",
        body: "Si le critère d'atteinte se discute à la PI Review, on retombe dans le piège classique : chacun défend sa lecture, le Business Owner négocie sa note de Business Value, et la conversation devient politique. À l'inverse, un critère écrit en PI Planning est un contrat tacite. La PI Review devient une lecture, pas un débat.",
        bullets: [
          "Le critère est observable : un chiffre, un pourcentage, une étape franchie.",
          "Il est posé au moment de l'écriture du PI Objective, pas découvert après coup.",
          "Il dit « atteint / partiel / raté », pas « plutôt bien / plutôt mal ».",
        ],
      },
      {
        heading: "Le score réalisé à la PI Review",
        icon: "wrench",
        body: "À la PI Review, le Business Owner réévalue la Business Value 1 à 10 selon ce qui a été réellement livré. Le rapport entre la BV planifiée et la BV réalisée donne le score de prévisibilité du train (objectif SAFe : 80 à 100 % sur la durée).",
        bullets: [
          "**Committed atteint** : BV réalisée = BV planifiée.",
          "**Committed partiel** : BV réalisée < BV planifiée (généralement 50 à 80 %).",
          "**Stretch atteint** : BV réalisée = BV planifiée (bonus pour le train).",
          "**Stretch raté** : BV réalisée = 0 (sans pénalité, c'était un stretch).",
        ],
      },
      {
        heading: "Le test « comment le saura-t-on »",
        icon: "good",
        body: "À la fin du PI Planning, pour chaque PI Objective, demander : « comment saurons-nous, à la PI Review, si l'objectif est atteint ? » Si l'équipe ne sait pas répondre en 30 secondes, le PI Objective est mal posé. Reformuler avant de figer.",
        examples: [
          {
            bad: "PI Objective : « Renforcer la fiabilité du paiement. » Critère d'atteinte : non posé. À la PI Review, débat sur ce qu'on entend par « renforcer ».",
            good: "PI Objective : « Faire passer le taux de réussite des paiements de 96,2 % à 99,5 % d'ici la PI Review. » Critère : taux de réussite mesuré sur les 4 dernières semaines du PI, comparé à la baseline. Lecture immédiate.",
            note: "Le critère est implicite dans le PI Objective bien rédigé, mais le formuler explicitement évite les divergences d'interprétation à la Review.",
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
    themeId: "pi.engagement",
    icon: "warn",
    title: "Le PI Objective imposé",
    heroPhrase:
      "Un objectif descendu sans dialogue. L'équipe hoche la tête. La PI Review révèle le malentendu.",
    intro: "",
    practiceCtaLabel: "Va porter une objection constructive",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Quand le management ou les Business Owners arrivent en PI Planning avec un objectif déjà rédigé et le présentent comme non négociable, l'équipe a deux choix : hocher la tête (et perdre l'engagement réel) ou s'opposer (et passer pour difficile). Les deux mènent au même résultat : un objectif inerte qu'on porte sans y croire.",
        bullets: [
          "Un objectif imposé n'engage personne en pratique.",
          "Le confidence vote est faussé : l'équipe vote ce qu'on attend d'elle.",
          "À la PI Review, l'écart entre la promesse et la réalité érode la confiance des deux côtés.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
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
        body: "Le Release Train Engineer protège l'espace de négociation. Les Business Owners apportent le contexte stratégique ; les équipes apportent la traduction réaliste en PI Objective. Le ROAM est utilisé honnêtement, le confidence vote est anonyme si nécessaire.",
        examples: [
          {
            bad: "Business Owner : « Le PI Objective de votre équipe est : atteindre 100 contrats Enterprise. C'est ce que le board attend. »",
            good: "Business Owner : « Le board pousse pour scaler l'offre Enterprise ce PI. Comment vous voyez votre contribution réaliste ? » Équipe : « On peut viser 60 contrats committed, et un stretch à 100 si la nouvelle vague de leads se confirme. »",
            note: "Le contexte stratégique reste descendu. La traduction en PI Objective remonte de l'équipe.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, ROAM et confidence vote en PI Planning. Patrick Lencioni, The Five Dysfunctions of a Team, sur la culture de désaccord productif.",
      },
    ],
  },

  // ============================================================
  // Thème : Valeur business (+ 1 fiche nouvelle)
  // ============================================================
  {
    id: "pi.sheet.bv-uniforme",
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
        body: "La valeur business 1 à 10 existe pour permettre la priorisation : à la PI Review, le score réalisé pondère selon la valeur. Si tout est noté pareil, plus de priorité possible. C'est généralement le signe d'un Business Owner qui n'a pas pris le temps de discriminer, ou qui ne veut pas faire de choix qu'il devrait défendre.",
        bullets: [
          "Tout à 10 : « tout est important », donc rien n'est prioritaire.",
          "Tout à 5 : neutralité par défaut, équivalent à l'absence de note.",
          "Hans Samios (Lean-Agile Knowledge Base) note ce piège comme l'anti-pattern le plus fréquent en PI Planning.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
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
            bad: "PI Objectives notés : 10, 10, 10, 10, 10. Aucune priorité émerge à la PI Review.",
            good: "PI Objectives notés : 10 (compliance bloquante), 8 (croissance), 5 (dette technique), 3 (refonte UI). Le Business Owner défend chaque écart en moins de 30 secondes.",
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
    id: "pi.sheet.feature-vs-objective",
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "Une feature n'est pas un PI Objective",
    heroPhrase:
      "Une feature dit ce qu'on livre. Un PI Objective dit ce qui aura changé pour le bénéficiaire.",
    intro: "",
    practiceCtaLabel: "Va traduire une feature en PI Objective",
    sections: [
      {
        heading: "Pourquoi c'est l'erreur la plus fréquente",
        icon: "target",
        body: "Product Management descend des features (« SSO Enterprise », « refonte panier mobile »). Les équipes, sous pression de temps en PI Planning, recopient ces features dans leurs PI Objectives. Résultat : le Business Owner ne sait pas quoi noter en valeur business, la PI Review ne sait pas quoi mesurer, et la confusion grandit entre ce qu'on livre et ce qui doit changer.",
        bullets: [
          "Une feature est un livrable. Un PI Objective est un outcome attendu.",
          "Une feature peut être livrée sans atteindre l'outcome (et inversement).",
          "Le PI Objective rend la feature falsifiable : on saura si elle a fait son effet.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        body: "",
        bullets: [
          "Le PI Objective porte un nom de feature ou de projet (« Livrer X », « Refondre Y »).",
          "Aucune métrique n'est nommée.",
          "Le Business Owner peine à attribuer une valeur business (« je note l'effort, pas la valeur »).",
        ],
      },
      {
        heading: "Comment recadrer",
        icon: "wrench",
        body: "Devant chaque feature, poser la question : « qu'est-ce que cette feature, une fois livrée, va faire bouger chez le bénéficiaire ? » La réponse est le PI Objective. La feature reste, comme moyen pour y arriver.",
        examples: [
          {
            bad: "Feature recopiée : « Livrer la feature SSO Enterprise ce PI. »",
            good: "PI Objective dérivé : « Permettre à 80 % des clients entreprise d'activer le SSO en self-service avant la fin du PI. » La feature SSO Enterprise reste, mais comme moyen.",
            note: "Le test : si la feature est livrée mais que l'outcome ne bouge pas, le PI Objective n'est pas atteint. Cette tension est exactement ce qu'on veut révéler.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, recommandations explicites contre le « feature = PI Objective ». Agile Seekers (article 2024) liste cet anti-pattern comme le plus fréquent à l'introduction de SAFe.",
      },
    ],
  },

  {
    id: "pi.sheet.tous-committed",
    themeId: "pi.pieges-classiques",
    icon: "warn",
    title: "Tous les PI Objectives en committed",
    heroPhrase:
      "Un train sans stretch est un train sans ambition. Ou un train qui se ment sur sa capacité.",
    intro: "",
    practiceCtaLabel: "Va calibrer un mix committed / stretch",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Quand un train classe tous ses PI Objectives en committed, deux interprétations possibles : (1) il sous-promet pour être sûr d'atteindre 100 % à la PI Review (sandbagging à l'échelle train), ou (2) il sur-promet en s'engageant sur des objectifs qu'il ratera. Les deux abîment la confiance des Business Owners et coupent l'équipe de tout apprentissage stretch.",
        bullets: [
          "Le stretch est l'espace où on tente quelque chose dont l'issue est incertaine, où on apprend.",
          "Un train à 100 % committed se prive de cet espace.",
          "Le Business Owner ne sait plus quel objectif compte vraiment.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        body: "",
        bullets: [
          "Aucun objectif classé stretch sur la page de PI Planning.",
          "Les objectifs réalisés à 100 % à la PI Review trois PI consécutifs (signe de sandbagging).",
          "Ou inversement : taux de réalisation moyen sous 70 % (signe de sur-promesse).",
        ],
      },
      {
        heading: "Comment recadrer",
        icon: "wrench",
        body: "Le RTE peut suggérer un mix de référence : autour de 60 à 70 % de committed, 30 à 40 % de stretch. Le Business Owner peut demander explicitement « quel objectif vous engagez à coup sûr, et quel objectif vous tentez sans garantir ? ». La discrimination crée la lisibilité.",
        examples: [
          {
            bad: "5 PI Objectives, tous committed, tous notés à valeur business 10.",
            good: "3 PI Objectives committed (cap commercial, fiabilité, conformité), 2 stretch (marketplace pilote, intégration nouveau partenaire).",
            note: "Le mix raconte une histoire stratégique : voici ce qu'on tient, voici ce qu'on tente.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scaled Agile Framework, recommandations sur le mix committed / stretch. Ben Lamorte (The OKRs Field Book) sur la valeur d'apprentissage du stretch, transposable à PI.",
      },
    ],
  },
];
