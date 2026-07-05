/**
 * Fiches pédagogiques — Sprint × Audience "dev" × FR.
 * Contenu dérivé de DOMAINE.md §1, §6 bis.
 */

import type { PedagogicalSheet } from "../../domain/ports";

export const SPRINT_DEV_SHEETS_FR: PedagogicalSheet[] = [
  {
    id: "sprint.sheet.anatomy",
    themeId: "sprint.fondamentaux",
    icon: "target",
    title: "L'anatomie d'un objectif de Sprint",
    heroPhrase:
      "Verbe d'outcome, indicateur, variation chiffrée, contexte, échéance. Cinq briques. Une phrase.",
    intro: "",
    practiceCtaLabel: "Va assembler ton premier objectif de Sprint",
    sections: [
      {
        heading: "Les cinq briques",
        icon: "target",
        kind: "bricks",
        body: "Un objectif de Sprint solide tient en une phrase et porte cinq briques. Chacune répond à une question. Si l'une manque, l'objectif est ambigu : quelqu'un finira par défendre un verdict qu'un autre contestera.",
        bricksSentence:
          "Réduire le taux d'abandon au paiement de 50 % sur mobile d'ici la fin du sprint 24.",
        bricks: [
          {
            num: 1,
            label: "Verbe outcome",
            hint: "L'action qui amorce le résultat",
            examples: "Réduire, Faire passer, Atteindre, Permettre à",
            snippet: "Réduire",
            color: "purple",
          },
          {
            num: 2,
            label: "Indicateur",
            hint: "La métrique nommée",
            examples: "taux d'abandon, p95 de l'API, NPS dev",
            snippet: "le taux d'abandon au paiement",
            color: "teal",
          },
          {
            num: 3,
            label: "Variation chiffrée",
            hint: "L'avant et l'après",
            examples: "de X à Y, par N, à N %",
            snippet: "de 50 %",
            color: "pink",
          },
          {
            num: 4,
            label: "Contexte",
            hint: "Sur quoi, pour qui",
            examples: "sur mobile, pour les invités, en production",
            snippet: "sur mobile",
            color: "amber",
          },
          {
            num: 5,
            label: "Échéance",
            hint: "D'ici quand",
            examples: "fin du sprint, sprint 24, prochaine démo",
            snippet: "d'ici la fin du sprint 24",
            color: "blue",
          },
        ],
      },
      {
        heading: "Le test des cinq briques",
        icon: "good",
        body: "Lire son objectif à voix haute et compter. Si une brique manque, l'identifier explicitement avant de figer.",
        examples: [
          {
            bad: "Améliorer le tunnel de paiement.",
            good: "Faire passer le taux de conversion du tunnel mobile de 2,3 % à 3,5 % d'ici la fin du sprint 24.",
            note: "Verbe (Faire passer) · Indicateur (taux de conversion) · Variation (de 2,3 à 3,5 %) · Contexte (tunnel mobile) · Échéance (sprint 24). Cinq briques, une phrase.",
          },
        ],
      },
      {
        heading: "Le piège du contexte implicite",
        icon: "warn",
        body: "Le contexte est souvent omis (« on sait de quoi on parle »). C'est un risque : en revue de sprint, la mémoire collective diverge. Mieux vaut nommer le contexte même s'il semble évident.",
      },
      {
        heading: "Source",
        kind: "source",
        body: "Cette grammaire à cinq briques recoupe la doctrine du puzzle (voir mode Puzzle dans la pratique). Elle s'inspire des SMART goals (Doran, 1981) débarrassés de leur ambiguïté Mesurable/Atteignable, et de Kniberg pour le rôle du contexte.",
      },
    ],
  },

  {
    id: "sprint.sheet.single-goal",
    themeId: "sprint.fondamentaux",
    icon: "target",
    title: "Un seul objectif de Sprint",
    heroPhrase: "Un seul objectif par sprint. Pas deux. Pas une liste.",
    intro: "",
    practiceCtaLabel: "Va corriger un objectif mal posé",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "",
        bullets: [
          "Focus : un seul objectif force l'arbitrage des récits.",
          "Mémorisable : récitable sans lire l'écran.",
          "Trie le backlog : « cette récit contribue-t-elle à l'objectif ? »",
          "Bilan clair en fin de sprint : atteint / pas atteint.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        body: "",
        bullets: [
          "Le tableau affiche « Objectif 1 / Objectif 2 / Objectif 3 ».",
          "L'objectif est rédigé après la sélection des récits.",
          "Il contient un « et » coordonnant deux résultats.",
          "Personne ne le récite à la rétro sans le relire.",
        ],
      },
      {
        heading: "Comment consolider",
        icon: "wrench",
        body: "Identifier l'enjeu transverse qui relie les N objectifs proposés, puis le reformuler en un seul outcome. Si aucun enjeu transverse n'existe vraiment, c'est que le sprint mélange deux travaux qui auraient dû être deux sprints.",
        examples: [
          {
            bad: "Objectif 1 : Migrer l'authentification vers OAuth. Objectif 2 : Réduire les bugs sur le panier de 8 à 2.",
            good: "Augmenter le taux de connexions sans incident (auth + panier) de 92 % à 99 % d'ici fin de sprint.",
            note: "Enjeu transverse : la confiance utilisateur dans le tunnel d'achat. Les deux travaux y contribuent.",
          },
        ],
      },
      {
        heading: "Qui le rédige, sur quelle base",
        icon: "learn",
        body: "Co-construit en Sprint Planning par l'équipe Scrum entière : le PO propose un cap dérivé du objectif de produit, les Devs challengent au regard de leur capacité et de leur connaissance technique, le Scrum Master facilite la convergence. Pas un acte solo du PO. L'objectif de Sprint défini, les récits du backlog deviennent des hypothèses de ce qui aidera à l'atteindre.",
        bullets: [
          "objectif de produit (le cap moyen terme du produit, l'amont)",
          "État du backlog produit (ce qui est prioritaire et prêt)",
          "Vélocité historique de l'équipe (capacité réaliste sur l'itération)",
          "Retour de la dernière rétrospective (ce qu'on change ou garde)",
          "Retour de la dernière Sprint Review (ce qui a bougé côté utilisateur)",
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum Guide 2020 : « The Sprint Goal is the single objective for the Sprint » [traduction : « L'objectif de Sprint est l'unique objectif du Sprint »] et « The Developers… define a Sprint Goal that communicates why the Sprint is valuable to stakeholders. » [traduction : « Les Developers… définissent un objectif de Sprint qui communique pourquoi le Sprint a de la valeur pour les parties prenantes. »] Convergent avec Kniberg, Cohn. SAFe : pluralité au niveau PI uniquement.",
      },
    ],
  },

  {
    id: "sprint.sheet.product-goal-link",
    themeId: "sprint.fondamentaux",
    icon: "learn",
    title: "L'objectif de Sprint et l'objectif de produit",
    heroPhrase:
      "L'objectif de produit donne le cap. L'objectif de Sprint est l'étape qui sert ce cap, dans la fenêtre du sprint.",
    intro: "",
    practiceCtaLabel: "Va écrire un objectif de Sprint aligné",
    sections: [
      {
        heading: "Pourquoi cette relation compte",
        icon: "target",
        body: "Le Scrum Guide 2020 introduit explicitement le **Product Goal** (objectif de produit) : un cap moyen terme du produit, formulé en outcome. Chaque objectif de Sprint est une étape vers ce cap. Cette chaîne d'alignement rend chaque sprint signifiant. L'équipe sait pourquoi elle fait ce qu'elle fait.",
        bullets: [
          "L'objectif de produit vit à l'année / au trimestre, l'objectif de Sprint à l'itération.",
          "Sans objectif de produit, l'objectif de Sprint flotte (le PO décide chaque fois sans cap stable).",
          "Sans objectif de Sprint, l'objectif de produit devient une plaque décorative sans traduction opérationnelle.",
        ],
      },
      {
        heading: "Comment dériver l'un de l'autre",
        icon: "wrench",
        body: "L'objectif de Sprint n'est pas un objectif de produit en miniature. Il en est une étape concrète, formulée avec les cinq briques d'un objectif de Sprint, dans la fenêtre du sprint.",
        examples: [
          {
            bad: "objectif de produit : « Devenir l'outil de paiement le plus simple du marché ». objectif de Sprint : « Devenir l'outil de paiement le plus simple du marché ».",
            good: "objectif de produit : « Devenir l'outil de paiement le plus simple du marché ». objectif de Sprint : « Faire passer le temps moyen pour finaliser un paiement de 45 s à 30 s d'ici la fin du sprint 24 ».",
            note: "L'objectif de Sprint traduit le cap en mesure observable sur l'itération.",
          },
        ],
      },
      {
        heading: "Le test d'alignement",
        icon: "good",
        body: "À chaque Sprint Planning, poser la question : « notre objectif de Sprint contribue-t-il directement à notre objectif de produit en cours ? » Si l'équipe ne sait pas répondre clairement, soit l'objectif de produit n'est pas vraiment partagé, soit l'objectif de Sprint s'éparpille.",
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum Guide 2020 (révision Schwaber/Sutherland) : ajout du Product Goal (objectif de produit) aux Scrum artifacts. Voir aussi Roman Pichler sur la cascade vision → objectif de produit → objectif de Sprint.",
      },
    ],
  },

  {
    id: "sprint.sheet.goal-is-met",
    themeId: "sprint.fondamentaux",
    icon: "good",
    title: "Comment savoir que l'objectif de Sprint est atteint",
    heroPhrase:
      "La définition de succès se pose en Sprint Planning, pas à la Sprint Review. Tu écris l'objectif et son critère d'atteinte ensemble.",
    intro: "",
    practiceCtaLabel: "Va définir le critère d'atteinte",
    sections: [
      {
        heading: "Pourquoi définir le succès en amont",
        icon: "target",
        body: "Si le critère d'atteinte se discute à la Sprint Review, tout le monde devient juge et partie. Le facilitateur défend que c'est atteint, le PO ergote, les Devs s'épuisent à argumenter. À l'inverse, un critère écrit en amont est un contrat : la Review n'est plus qu'une lecture.",
        bullets: [
          "Le critère est observable (chiffre, état, mesure).",
          "Il est posé avant le sprint, pas pendant.",
          "Il dit « atteint / pas atteint », pas « plutôt bien / plutôt mal ».",
        ],
      },
      {
        heading: "Trois niveaux d'atteinte (à connaître, sans les multiplier)",
        icon: "learn",
        body: "Tu peux formaliser trois verdicts en fin de sprint, mais l'objectif doit fonctionner même avec un binaire atteint/raté. Les nuances servent en rétro, pas à l'affichage du résultat.",
        bullets: [
          "**Atteint** : le critère mesurable est rempli ou dépassé.",
          "**Partiel** : on n'a pas atteint la cible mais on a appris quelque chose qui change le sprint suivant.",
          "**Raté** : ni la cible ni l'apprentissage. À examiner sérieusement en rétro.",
        ],
      },
      {
        heading: "Le test de la phrase « Comment saurons-nous »",
        icon: "wrench",
        body: "À la fin du Sprint Planning, demander : « comment saurons-nous, en fin de sprint, si nous l'avons atteint ? » Si l'équipe ne sait pas répondre en moins de 30 secondes, l'objectif est mal posé. Reformuler avant de démarrer.",
        examples: [
          {
            bad: "objectif de Sprint : « Rendre le module commande plus fiable. » Critère d'atteinte : non posé.",
            good: "objectif de Sprint : « Réduire le nombre d'incidents production du module commande de 14 à 5 par semaine d'ici la fin du sprint. » Critère : nombre d'incidents mesuré la dernière semaine du sprint, comparé à la moyenne hebdomadaire précédente.",
            note: "Le critère d'atteinte est implicite dans l'objectif bien rédigé, mais le formuler explicitement protège contre les divergences d'interprétation.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Mike Cohn, Succeeding with Agile, chapitre sur les Sprint Reviews. Convergent avec Henrik Kniberg, Lean from the Trenches, sur l'importance de poser le critère d'atteinte avant l'observation.",
      },
    ],
  },

  {
    id: "sprint.sheet.maintenance-value",
    themeId: "sprint.cas-particuliers",
    icon: "wrench",
    title: "Sprint de maintenance : trouver la valeur",
    heroPhrase: "Un sprint de maintenance a toujours un bénéficiaire. À toi de le nommer.",
    intro: "",
    practiceCtaLabel: "Reformuler un objectif de maintenance",
    sections: [
      {
        heading: "Trois questions à se poser",
        icon: "target",
        body: "",
        bullets: [
          "Pour qui ce travail produit-il un changement ?",
          "Quel changement constatable du point de vue du bénéficiaire ?",
          "Quelle mesure rendra ce changement visible à la revue de sprint ?",
        ],
      },
      {
        heading: "Quatre bénéficiaires fréquents",
        icon: "learn",
        body: "",
        bullets: [
          "Utilisateur final : moins de bugs visibles, moins d'incidents en production.",
          "Équipe support : moins d'escalades, temps de résolution plus court.",
          "Équipe ops / astreinte : déploiements plus rapides, astreintes plus calmes.",
          "Équipe dev : vélocité retrouvée, moins de temps sur les bugs hérités.",
        ],
      },
      {
        heading: "Quatre familles de maintenance (ISO/IEC 14764)",
        icon: "puzzle",
        body: "Nommer la famille aide à reconnaître qu'on a bien un travail de maintenance avec un bénéficiaire — pas une tâche sans objectif.",
        bullets: [
          "Corrective : corriger un défaut déjà en production (bugs, incidents).",
          "Adaptative : s'ajuster à un changement d'environnement (dépendances, OS, réglementation).",
          "Perfective : améliorer la performance ou l'expérience sur un usage déjà en place.",
          "Préventive : réduire un risque futur avant qu'il ne devienne un incident (tests de reprise, durcissement, supervision).",
        ],
      },
      {
        heading: "Un exemple par famille",
        icon: "wrench",
        body: "Le réflexe est le même dans les quatre cas : remplacer la tâche par ce qu'elle change pour quelqu'un, avec une mesure.",
        examples: [
          {
            bad: "Corriger les bugs du backlog support avant la fin du sprint.",
            good: "Faire passer le nombre de tickets support ouverts depuis plus de 30 jours de 27 à 10, d'ici fin de sprint.",
            note: "Corrective : traiter des tickets est un output. Le nombre de tickets anciens non résolus montre l'effet réel côté équipe support.",
          },
          {
            bad: "Migrer les services vers la version supportée de Node.js.",
            good: "Éliminer les 8 vulnérabilités critiques liées aux dépendances obsolètes, sans régression sur les 3 parcours critiques testés, d'ici fin de sprint.",
            note: "Adaptative : migrer est un output technique. Ce qui compte, c'est la réduction du risque de sécurité réel.",
          },
          {
            bad: "Refactorer le module de recherche pour améliorer les performances.",
            good: "Faire passer le temps de réponse p95 de la recherche de 1,2 s à 400 ms, d'ici fin de sprint.",
            note: "Perfective : la complexité du code est un moyen. Ce que l'utilisateur perçoit, c'est la vitesse de réponse.",
          },
          {
            bad: "Préparer et exécuter le test de reprise annuel en staging.",
            good: "Faire passer le nombre d'écarts critiques de reprise non résolus de 4 à 0, avec preuve : test de bascule complet exécuté en staging (RTO et RPO mesurés), d'ici fin de sprint.",
            note: "Préventive : faire le test est un output. La preuve d'écarts résolus est ce qui donne une vraie valeur au sprint — sinon le test devient un rituel qu'on coche.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "ISO/IEC 14764 (taxonomie corrective / adaptative / perfective / préventive), reprise par Lientz & Swanson (1980) et la littérature technique courante sur la maintenance logicielle.",
      },
    ],
  },

  // ============================================================
  // Thème : Les pièges classiques (4 fiches)
  // ============================================================
  {
    id: "sprint.sheet.not-a-récit-list",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'objectif liste de tâches",
    heroPhrase:
      "L'équipe s'engage sur un résultat. Les récits sont une hypothèse de ce qui aidera à l'atteindre.",
    intro: "",
    practiceCtaLabel: "Va corriger un objectif mal posé",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "Le Scrum Guide est clair : la sélection des items du backlog produit (Product Backlog Items) est une **hypothèse** de ce qui aidera à atteindre l'objectif de Sprint, pas l'engagement en soi. Si l'équipe s'engage sur les récits au lieu de l'objectif, le sprint devient une course à la complétion, pas une recherche de valeur.",
        bullets: [
          "L'engagement porte sur le résultat, pas sur la livraison.",
          "Si la moitié des récits suffisent à atteindre l'objectif, on s'arrête.",
          "Si les récits ne suffisent pas, on ajuste les récits, pas l'objectif.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "« On a fini tous les récits » devient la fierté de fin de sprint, indépendamment du résultat constaté.",
          "L'objectif de Sprint est rédigé après la sélection des récits pour les résumer.",
          "À la rétro, l'équipe parle de récits livrées, pas de bénéficiaires touchés.",
        ],
      },
      {
        heading: "Comment recadrer",
        icon: "wrench",
        body: "Reformuler l'objectif en outcome avant de finaliser la sélection. Demander : « quelles récits nous permettent vraiment d'atteindre cet objectif ? » et laisser tomber le reste.",
        examples: [
          {
            bad: "Livrer les 12 récits de l'epic intégration.",
            good: "Permettre à 80 % des nouveaux utilisateurs de compléter l'inscription en moins de 90 secondes, fin de sprint.",
            note: "Les récits deviennent un moyen mesuré contre l'outcome, pas une fin en soi.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum Guide 2020 : « The selected Product Backlog items are a hypothesis of what is needed to achieve the Sprint Goal. » [traduction : « Les items sélectionnés du backlog produit sont une hypothèse de ce qui est nécessaire pour atteindre l'objectif de Sprint. »] Voir aussi Scrum.org, Sprint Backlog Antipatterns.",
      },
    ],
  },

  {
    id: "sprint.sheet.vanity-goal",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'objectif vitrine",
    heroPhrase:
      "Un objectif qui sonne bien mais n'engage personne. Il rassure les parties prenantes sans rien promettre.",
    intro: "",
    practiceCtaLabel: "Va corriger un objectif vitrine",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "L'objectif vitrine coche la case « on a un objectif de Sprint » sans accepter le coût d'un engagement vérifiable. Personne ne saura à la fin du sprint si l'objectif est atteint ou pas, donc tout le monde déclare la victoire.",
        bullets: [
          "Aucune mesure ne tranche en fin de sprint.",
          "L'objectif est compatible avec n'importe quel résultat.",
          "Il rassure les parties prenantes mais ne change pas le comportement de l'équipe.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Présence de mots flous (« renforcer », « valoriser », « consolider », « explorer »).",
          "Aucun chiffre, aucune métrique, aucun bénéficiaire nommé.",
          "Le test « est-ce qu'on peut être en désaccord sur l'atteinte ? » donne oui.",
        ],
      },
      {
        heading: "Comment reformuler",
        icon: "wrench",
        body: "Repérer le mot flou, demander « tu veux dire quoi, concrètement, mesurable comment ? » et écrire la réponse comme nouvel objectif.",
        examples: [
          {
            bad: "Renforcer l'expérience utilisateur sur le module commande.",
            good: "Faire passer le taux de complétion du tunnel de paiement de 68 % à 80 % d'ici fin de sprint.",
            note: "Le renforcement disparaît au profit de ce qu'il était censé produire.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum.org, Sprint Anti-Patterns. Convergent avec le test pédagogique de Mike Cohn : « can two people defending opposite verdicts both be right ? » [traduction : « deux personnes défendant des verdicts opposés peuvent-elles avoir raison toutes les deux ? »] Si oui, l'objectif est creux.",
      },
    ],
  },

  {
    id: "sprint.sheet.pet-project-goal",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'objectif de confort",
    heroPhrase:
      "Un objectif qui sert un seul interlocuteur ou une obsession interne. Aucun bénéficiaire externe ne ressent l'effet.",
    intro: "",
    practiceCtaLabel: "Va recentrer un objectif mal aligné",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "L'objectif de confort est techniquement bien rédigé mais sert un public minoritaire ou interne : demande d'un manager isolé, refactor que seule l'équipe verra, fonctionnalité réclamée par un seul client. La vélocité est dépensée sans contrepartie utilisateur.",
        bullets: [
          "Aucun bénéficiaire externe n'est nommé, ou un seul.",
          "L'effet attendu reste dans l'équipe (vélocité, propreté du code).",
          "Le retour sur effort est défendable mais sur un public marginal.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Le bénéficiaire nommé est un membre de l'équipe ou un manager.",
          "L'effet attendu n'est observable qu'en interne.",
          "Le sprint d'avant avait déjà un objectif sur le même sous-sujet.",
        ],
      },
      {
        heading: "Le test « qui en profite hors de l'équipe ? »",
        icon: "wrench",
        body: "Avant de figer l'objectif, nommer 3 bénéficiaires hors équipe et l'effet observable sur chacun. Si la liste est vide, l'objectif est un objectif de confort.",
        examples: [
          {
            bad: "Refactorer le module de gestion des permissions pour qu'il soit plus clair.",
            good: "Permettre aux administrateurs clients de modifier les rôles utilisateurs en moins de 30 secondes (vs 4 min aujourd'hui), fin de sprint.",
            note: "Le bénéficiaire passe de l'équipe à un utilisateur externe avec une mesure observable.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Christina Wodtke (Radical Focus) et Mike Cohn convergent : l'objectif d'un sprint doit servir un changement constatable par un public extérieur à l'équipe pour mériter la vélocité dépensée.",
      },
    ],
  },

  {
    id: "sprint.sheet.renew-the-goal",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'objectif recyclé",
    heroPhrase:
      "Le même objectif sprint après sprint signale soit qu'on n'apprend rien, soit qu'on ne mesure jamais.",
    intro: "",
    practiceCtaLabel: "Va écrire un nouvel objectif",
    sections: [
      {
        heading: "Pourquoi le renouveler",
        icon: "target",
        body: "Si l'objectif du sprint N est identique à celui du sprint N-1 (et N-2), trois lectures possibles : (1) l'objectif n'est pas atteint, donc il faut le revoir ou changer d'approche ; (2) il est atteint mais on ne le mesure pas ; (3) c'est un faux objectif qui ne sert que d'étiquette. Aucune n'est saine.",
        bullets: [
          "Un objectif porte une intention bornée : quand l'intention est servie, l'objectif passe à autre chose.",
          "Répéter sans mesurer transforme l'objectif en formule magique.",
          "L'apprentissage d'un sprint doit modifier le suivant : nouvel objectif ou approche modifiée.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Trois sprints consécutifs avec le même objectif (ou variantes mineures).",
          "Personne ne sait dire si l'objectif précédent a été atteint.",
          "La rétro ne parle pas de l'objectif, seulement des récits.",
        ],
      },
      {
        heading: "Comment renouveler",
        icon: "wrench",
        body: "À la fin de chaque sprint, statuer sur l'objectif : atteint, partiel, raté. Si atteint, passer à l'enjeu suivant. Si partiel ou raté, soit relever le seuil de la prochaine étape, soit changer d'approche (l'objectif ne se reproduit pas à l'identique).",
        examples: [
          {
            bad: "Améliorer la conversion du tunnel de paiement (sprint après sprint).",
            good: "Sprint 24 : faire passer la conversion de 12 % à 18 %. Sprint 25 (si atteint) : faire passer le taux d'abandon mobile de 35 % à 22 %. Sprint 25 (si raté) : reformuler l'hypothèse, peut-être que le problème n'est pas la conversion mais le ré-engagement.",
            note: "Le sprint suivant porte un objectif **différent**, soit qu'on monte d'un cran, soit qu'on change d'angle.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Henrik Kniberg sur l'apprentissage d'un sprint à l'autre. Et Scrum.org : « The Sprint Goal is a single objective for the Sprint, not a recurring theme. » [traduction : « L'objectif de Sprint est un objectif unique du Sprint, pas un thème récurrent. »]",
      },
    ],
  },

  // ============================================================
  // Thème : Cas particuliers (3 nouvelles fiches)
  // ============================================================
  {
    id: "sprint.sheet.discovery-exploration",
    themeId: "sprint.cas-particuliers",
    icon: "learn",
    title: "Sprint d'exploration (ou exploration)",
    heroPhrase:
      "Tu n'as pas une livraison à faire, tu as une question à trancher. L'objectif de Sprint vise une preuve, pas un livrable.",
    intro: "",
    practiceCtaLabel: "Va écrire un objectif de Sprint d'exploration",
    sections: [
      {
        heading: "La logique de l'exploration",
        icon: "target",
        body: "Un sprint d'exploration sert à trancher une incertitude (technique, produit, marché) avant de s'engager sur du développement. L'objectif de Sprint n'est donc pas « livrer X » mais « répondre à la question Y avec une preuve observable ». Le piège : confondre le sprint d'exploration avec un sprint sans objectif.",
        bullets: [
          "L'incertitude à lever est nommée explicitement (la question).",
          "Le critère de réponse est observable : un prototype, un test utilisateur, une mesure de performance, une preuve de concept chiffrée.",
          "L'équipe accepte un verdict : « la réponse est non, on n'y va pas » est un succès de l'exploration.",
        ],
      },
      {
        heading: "Reformuler en outcome",
        icon: "wrench",
        body: "L'objectif de Sprint d'exploration prend la forme « répondre à [question] avec [preuve] d'ici fin de sprint ». La preuve est ce qui rend l'objectif mesurable.",
        examples: [
          {
            bad: "Explorer la faisabilité du paiement en crypto.",
            good: "Répondre à : « peut-on intégrer le paiement crypto en moins de 6 semaines sans dépendre d'un prestataire tiers ? » avec une preuve de concept fonctionnelle couvrant 3 cryptos majeures et une estimation chiffrée du coût d'intégration, d'ici fin de sprint.",
            note: "La question est posée, la preuve est définie. À la Review, on peut dire oui ou non sans débat.",
          },
        ],
      },
      {
        heading: "Le piège de l'exploration sans verdict",
        icon: "warn",
        body: "Un sprint d'exploration qui ne tranche pas est un sprint perdu. La pire formulation : « explorer », « étudier », « regarder ». Ces verbes ne s'engagent à rien. Le verdict doit être annoncé en début de sprint comme une question fermée (oui ou non, et ce qui change).",
      },
      {
        heading: "Source",
        kind: "source",
        body: "Marty Cagan (Inspired) sur la discovery produit. Mike Cohn pour les explorations techniques en Scrum. Convergent : un exploration a une question, un budget temps et un verdict.",
      },
    ],
  },

  {
    id: "sprint.sheet.event-prep",
    themeId: "sprint.cas-particuliers",
    icon: "challenge",
    title: "Sprint préparatoire à un événement",
    heroPhrase:
      "Une release, une démo, une conférence. L'objectif ne dit pas « tout préparer » mais ce qui changera chez le public visé.",
    intro: "",
    practiceCtaLabel: "Va écrire l'objectif d'un sprint d'événement",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "warn",
        body: "Un sprint préparatoire (release, conférence, démo client important) attire les goals creux du type « préparer la conférence ». Tout le monde est mobilisé, personne ne sait précisément ce qu'on cherche à produire chez les participants. Résultat : on s'agite, on accumule des tâches, et la satisfaction post-événement reste subjective.",
        bullets: [
          "Le bénéficiaire est le **public** de l'événement, pas l'équipe.",
          "L'effet attendu est nommé : ce que le public doit ressentir / faire / décider.",
          "La mesure existe : retours après l'événement, conversions, demandes de suite.",
        ],
      },
      {
        heading: "Reformuler en outcome côté public",
        icon: "wrench",
        body: "L'objectif de Sprint vise le changement chez le public, pas la complétion du contenu.",
        examples: [
          {
            bad: "Préparer la conférence client annuelle prévue fin de sprint.",
            good: "Obtenir au moins 10 demandes de RDV commercial qualifiées de la part des participants de la conférence client annuelle, d'ici 48 h après l'événement.",
            note: "Le contenu de la conférence devient un moyen pour atteindre ce résultat, pas une fin en soi. L'équipe arbitre ce qu'elle prépare en fonction de ça.",
          },
        ],
      },
      {
        heading: "Le piège de l'échéance floue",
        icon: "warn",
        body: "L'événement crée une échéance forte (la date), ce qui peut faire croire que l'échéance suffit comme borne. Mais une échéance n'est pas un objectif : l'objectif dit ce qu'on cherche à obtenir avant ou après cette échéance. Sans cet ajout, la date devient le seul critère et tout le travail s'aligne dessus, même s'il rate l'effet.",
      },
      {
        heading: "Source",
        kind: "source",
        body: "Convergent avec la doctrine outcome-over-output (Marty Cagan, Christina Wodtke). Adapté au contexte sprint par Henrik Kniberg dans ses retours sur les release sprints.",
      },
    ],
  },

  {
    id: "sprint.sheet.external-blockers",
    themeId: "sprint.cas-particuliers",
    icon: "wrench",
    title: "Sprint avec dépendances bloquantes externes",
    heroPhrase:
      "Tu ne contrôles pas tout. L'objectif dit ce que tu peux honnêtement engager, avec un plan B explicite.",
    intro: "",
    practiceCtaLabel: "Va écrire un objectif honnête face aux blocages",
    sections: [
      {
        heading: "La situation",
        icon: "target",
        body: "L'équipe attend une API externe, une validation légale, un accès production, une décision d'un autre département. Sans cette entrée, une partie de l'objectif est inatteignable. Deux mauvais réflexes : (1) prétendre que le blocage va se lever et s'engager comme si de rien n'était ; (2) renoncer à l'objectif et faire un sprint « au mieux » sans cap.",
        bullets: [
          "Le blocage est nommé en début de sprint, pas découvert à mi-parcours.",
          "L'objectif porte sur ce que l'équipe peut vraiment engager (donc parfois sur une étape antérieure au blocage).",
          "Un plan B explicite est posé pour les ressources non bloquées.",
        ],
      },
      {
        heading: "Trois formulations honnêtes",
        icon: "wrench",
        body: "Selon la nature du blocage, l'objectif de Sprint s'adapte.",
        bullets: [
          "**Si le blocage est probable à se lever** : « Faire passer X de A à B **conditionnellement à la réception de Y avant le jour J du sprint**. À défaut, livrer la version isolée prête à intégrer dès réception. »",
          "**Si le blocage est durable** : « Réduire de 30 % le temps de traitement des cas sans dépendance Y, en isolant l'intégration Y pour livraison dès qu'elle est disponible. »",
          "**Si le blocage est inconnu** : « Lever en première semaine la dépendance Y (sous responsabilité du Product Owner) puis exécuter sur le reste du sprint ». L'objectif devient en partie l'engagement à débloquer.",
        ],
      },
      {
        heading: "Le piège du « on fera au mieux »",
        icon: "warn",
        body: "« On fera de notre mieux » n'est pas un objectif de Sprint. C'est une posture, pas un cap. Si tu ne peux pas chiffrer ce que tu engages, demande-toi si ce sprint a vraiment un sens, ou s'il faut le repousser et utiliser la fenêtre pour autre chose (exploration, technique, refonte).",
      },
      {
        heading: "Source",
        kind: "source",
        body: "Henrik Kniberg sur la gestion des dépendances en Scrum at Scale. SAFe propose le ROAM (Risks Owned, Accepted, Mitigated) au PI Planning ; appliqué à l'échelle sprint, la même logique s'applique.",
      },
    ],
  },

  {
    id: "sprint.sheet.alibi-goal",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'objectif alibi",
    heroPhrase:
      "Les récits sont choisis avant l'objectif. L'objectif n'est qu'une étiquette collée après coup pour leur donner un air de cohérence.",
    intro: "",
    practiceCtaLabel: "Va vérifier l'ordre d'un objectif suspect",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "La sélection des récits précède la rédaction de l'objectif, jamais l'inverse. Le Product Owner ou l'équipe remplit le sprint avec ce qui rentre dans la vélocité, puis rédige une phrase qui les relie après coup. L'objectif n'a alors aucun pouvoir de décision : il ne change rien au travail réel.",
        bullets: [
          "La sélection des récits précède la rédaction de l'objectif, jamais l'inverse.",
          "Plusieurs formulations d'objectif colleraient aussi bien aux mêmes récits.",
          "Retirer l'objectif de la page ne changerait rien au travail du sprint.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "L'objectif est écrit en dernier, après la sélection des récits au Sprint Planning.",
          "Personne ne sait dire ce qui ferait échouer le sprint si tous les récits étaient livrés.",
          "Changer l'ordre des mots de l'objectif ne changerait rien au travail prévu.",
        ],
      },
      {
        heading: "Le test de l'ordre",
        icon: "wrench",
        body: "Avant de sélectionner le moindre récit, décider et écrire l'effet attendu. Les récits deviennent ensuite une hypothèse sur ce qui devrait produire cet effet, pas une liste qu'on habille après coup.",
        examples: [
          {
            bad: "Objectif : « Améliorer le parcours d'achat. » Récits sélectionnés : filtre prix, tri par avis, bouton d'achat fixe, choisis pour remplir la vélocité, objectif écrit après.",
            good: "Faire passer le taux d'ajout au panier de 24 % à 30 % d'ici la fin du sprint. Hypothèse à vérifier : le filtre prix, le tri par avis et le bouton fixe y contribuent.",
            note: "Le même travail, mais l'ordre s'inverse : l'effet attendu est décidé avant les moyens, pas déduit après.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum.org, 27 Sprint Anti-Patterns : les équipes sélectionnent des éléments du backlog puis tentent de leur fabriquer un objectif commun, même sans fil conducteur réel.",
      },
    ],
  },

  {
    id: "sprint.sheet.composite-goal",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'objectif composite",
    heroPhrase:
      "Deux objectifs recousus par « et ». Si l'un échoue et l'autre réussit, personne ne sait si le sprint a gagné.",
    intro: "",
    practiceCtaLabel: "Va séparer un objectif composite",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le tronc commun d'un bon objectif de Sprint est un but unique et cohérent. Un « et » qui relie deux effets mesurés séparément casse cette unité : l'un des deux peut être atteint sans que l'autre le soit, et le verdict de réussite devient une négociation, pas un fait.",
        bullets: [
          "« Et » relie deux effets mesurés séparément, pas un seul.",
          "L'équipe protège en priorité le plus facile des deux, pas forcément le plus important.",
          "À la Revue, la réussite se discute au lieu de se constater.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "L'objectif contient « et » entre deux verbes ou deux indicateurs différents.",
          "À la Revue, l'équipe négocie lequel des deux comptait vraiment.",
          "Deux tableaux de bord différents sont montrés pour justifier la réussite.",
        ],
      },
      {
        heading: "Le test du split",
        icon: "wrench",
        body: "Séparer mentalement l'objectif de part et d'autre du « et ». Si les deux morceaux ont chacun leur propre indicateur et leur propre sens sans l'autre, ce sont deux objectifs, pas un. Choisir celui qui compte le plus pour ce sprint ; l'autre attend son tour.",
        examples: [
          {
            bad: "Réduire le temps de chargement de la page produit et augmenter le taux de clic sur les recommandations.",
            good: "Faire passer le temps de chargement de la page produit de 3,2 s à 1,5 s d'ici la fin du sprint.",
            note: "Le taux de clic sur les recommandations devient un sujet du sprint suivant, pas un objectif caché dans celui-ci.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum.org, Sprint Anti-Patterns, sur les objectifs qui juxtaposent plusieurs éléments du backlog sans fil conducteur unique.",
      },
    ],
  },

  {
    id: "sprint.sheet.invisible-goal",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'objectif invisible",
    heroPhrase:
      "Il existe sur le tableau. Il n'existe nulle part ailleurs : ni au Daily, ni à la Revue, ni à la Rétrospective.",
    intro: "",
    practiceCtaLabel: "Va ramener un objectif dans les rituels",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "L'objectif est rempli dans l'outil de suivi puis jamais rouvert. Le Daily Scrum se résume à un tour de statut des tickets. La Revue présente les récits livrés, pas l'effet visé. L'objectif ne pilote alors aucune décision réelle : c'est un champ de formulaire, pas un cap.",
        bullets: [
          "Le Daily Scrum ne mentionne jamais où en est l'objectif, seulement les tickets.",
          "À la Revue, on présente des récits livrés, pas l'effet attendu par l'objectif.",
          "L'équipe pourrait citer les récits du sprint sans pouvoir citer l'objectif.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "L'objectif n'est mentionné dans aucun rituel après le Sprint Planning.",
          "Demander l'objectif du sprint en cours à un membre de l'équipe produit une hésitation.",
          "Le champ objectif de l'outil de suivi est rempli, mais jamais rouvert.",
        ],
      },
      {
        heading: "Le test du silence",
        icon: "wrench",
        body: "Réintroduire l'objectif dans chaque rituel : le Daily s'ouvre en s'y rapportant, la Revue le rappelle avant de montrer les récits, la Rétro demande explicitement s'il a été atteint.",
        examples: [
          {
            bad: "Daily Scrum : « Hier j'ai fait le ticket X, aujourd'hui je fais le ticket Y. »",
            good: "Daily Scrum : « Le ticket X que j'ai fini nous rapproche de l'objectif du sprint parce que... »",
            note: "Le rituel change de forme : on relie le travail du jour à l'effet visé, pas seulement à la tâche.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Age-of-Product.com, Missing Sprint Goals : un objectif absent des rituels quotidiens n'a d'existence que sur le papier.",
      },
    ],
  },

  {
    id: "sprint.sheet.never-renegotiated-goal",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'objectif jamais renégocié",
    heroPhrase:
      "Le Sprint Backlog change en cours de route. Personne ne se demande si l'objectif tient encore.",
    intro: "",
    practiceCtaLabel: "Va protéger un objectif face à un imprévu",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le Scrum Guide autorise à renégocier le périmètre en cours de sprint avec le Product Owner, tant que l'objectif reste protégé. Beaucoup d'équipes renégocient le périmètre sans jamais revenir sur l'objectif : il devient un vœu figé au premier jour, jamais réévalué à la lumière des faits du sprint.",
        bullets: [
          "Le périmètre peut légitimement bouger en cours de sprint ; l'objectif, lui, doit rester une décision consciente.",
          "Quand un récit est retiré ou ajouté, personne ne revérifie si l'objectif est toujours atteignable.",
          "L'objectif devient un vœu figé au premier jour, jamais réévalué.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Un récit qui portait l'objectif est abandonné en cours de sprint sans discussion sur l'objectif lui-même.",
          "La Rétrospective ne pose jamais la question « avons-nous protégé l'objectif ou seulement la liste ? »",
          "Le Scrum Master ne relance jamais l'objectif quand le périmètre bouge.",
        ],
      },
      {
        heading: "Protéger l'objectif, pas la liste",
        icon: "wrench",
        body: "Quand le périmètre change, poser explicitement la question à l'équipe : l'objectif tient-il encore ? Si non, deux choix honnêtes : réduire l'ambition chiffrée, ou protéger l'objectif en repoussant l'imprévu après la Revue.",
        examples: [
          {
            bad: "Le récit qui portait la mesure de l'objectif est retiré à mi-sprint pour absorber un incident. Personne ne revient sur l'objectif.",
            good: "« Le récit qui portait notre objectif est retiré. On réduit l'ambition chiffrée de l'objectif, ou on protège l'objectif en repoussant l'incident après la Revue. » Décision prise en équipe.",
            note: "L'objectif reste la boussole, même quand le contenu du sprint change.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum Guide 2020, sur l'adaptation du Sprint Backlog en cours de sprint et la protection du Sprint Goal.",
      },
    ],
  },

  {
    id: "sprint.sheet.unnamed-dependency",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "La dépendance non nommée",
    heroPhrase:
      "L'objectif dépend d'une autre équipe ou d'un service externe, mais ce risque n'est jamais dit à voix haute.",
    intro: "",
    practiceCtaLabel: "Va nommer une dépendance avant qu'elle ne casse un objectif",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "L'objectif suppose qu'une autre équipe ou qu'un service externe livre à temps, sans que cela soit vérifié ni nommé au Sprint Planning. Si la dépendance glisse, l'objectif échoue pour une raison jamais discutée, et l'équipe porte seule la responsabilité d'un risque qu'elle ne maîtrisait pas.",
        bullets: [
          "L'objectif suppose une livraison externe sans qu'elle soit vérifiée ni nommée.",
          "Si la dépendance glisse, l'objectif échoue pour une raison jamais discutée au Planning.",
          "L'équipe porte seule la responsabilité d'un risque qu'elle ne maîtrise pas.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "L'objectif contient un verbe d'action sur un système que l'équipe ne possède pas.",
          "Aucune conversation avec l'équipe ou le service dépendant n'a eu lieu avant le Planning.",
          "À la Rétro, l'échec de l'objectif s'explique par « on attendait après l'équipe X ».",
        ],
      },
      {
        heading: "Nommer le risque avant le Planning",
        icon: "wrench",
        body: "Vérifier la dépendance avec l'équipe concernée avant de figer l'objectif, et prévoir un plan de repli dans l'objectif lui-même si elle glisse.",
        examples: [
          {
            bad: "Faire passer le taux de connexion réussie de 80 % à 95 %, en s'appuyant sur la nouvelle API d'authentification de l'équipe Plateforme (date de livraison non confirmée).",
            good: "Vérifié auprès de l'équipe Plateforme : l'API sera livrée mardi. Faire passer le taux de connexion réussie de 80 % à 95 % d'ici la fin du sprint, avec un plan de repli testé si l'API glisse.",
            note: "La dépendance devient un fait vérifié et un risque nommé, pas un espoir silencieux.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "SAFe propose le ROAM (Risks Owned, Accepted, Mitigated) au PI Planning ; la même discipline s'applique à l'échelle d'un sprint dès qu'une dépendance externe existe.",
      },
    ],
  },

  {
    id: "sprint.sheet.hypothesis-as-certainty",
    isNamedPitfall: true,
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "L'hypothèse maquillée en certitude",
    heroPhrase:
      "« On veut voir si… » devient « on va prouver que… ». L'expérimentation perd son droit à l'échec.",
    intro: "",
    practiceCtaLabel: "Va redonner à un objectif le droit d'avoir tort",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Une expérimentation a deux issues légitimes : l'hypothèse tient, ou elle ne tient pas, les deux sont un succès d'apprentissage. Rédigée comme une certitude, seule l'issue positive compte comme réussite, et l'équipe évite ensuite les sujets vraiment incertains pour ne pas « rater » un objectif qu'elle ne maîtrisait pas.",
        bullets: [
          "Une expérimentation a deux issues légitimes ; les deux sont un succès d'apprentissage.",
          "Rédigée comme une certitude, seule l'issue positive compte comme réussite.",
          "L'équipe évite ensuite les sujets incertains pour ne pas « rater » un objectif hasardeux.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Le mot « tester », « explorer » ou « voir si » a disparu entre l'intention initiale et l'objectif écrit.",
          "Aucun critère n'est prévu pour le cas où l'hypothèse est invalidée.",
          "L'équipe qualifie déjà au Planning le résultat attendu comme acquis.",
        ],
      },
      {
        heading: "Garder le droit d'avoir tort",
        icon: "wrench",
        body: "Garder la nature d'hypothèse explicite dans l'objectif et définir à l'avance ce que signifie « apprendre », même si l'hypothèse échoue.",
        examples: [
          {
            bad: "Faire passer l'engagement sur la recherche de 12 % à 20 % grâce à la nouvelle autocomplétion.",
            good: "Tester si la nouvelle autocomplétion améliore l'engagement sur la recherche. Réussite si le taux de clic dépasse 15 % (vs 12 % aujourd'hui) ; en dessous, l'hypothèse est invalidée et documentée pour la suite.",
            note: "Les deux issues sont écrites à l'avance : l'objectif reste falsifiable même quand la réponse est non.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Marty Cagan (Inspired), sur la distinction entre découverte (hypothèses à tester) et livraison (engagements à tenir).",
      },
    ],
  },
];
