/**
 * Fiches pédagogiques — Sprint × Audience "dev" × FR.
 * Contenu dérivé de DOMAINE.md §1, §6 bis.
 */

import type { PedagogicalSheet } from "../../domain/ports";

export const SPRINT_DEV_SHEETS_FR: PedagogicalSheet[] = [
  {
    id: "sprint.sheet.single-goal",
    themeId: "sprint.fondamentaux",
    icon: "target",
    title: "Un seul Sprint Goal",
    heroPhrase: "Un seul objectif par sprint. Pas deux. Pas une liste.",
    intro: "",
    practiceCtaLabel: "Va corriger un objectif mal posé",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "",
        bullets: [
          "Focus : un seul objectif force l'arbitrage des stories.",
          "Mémorisable : récitable sans lire l'écran.",
          "Trie le backlog : « cette story contribue-t-elle à l'objectif ? »",
          "Bilan clair en fin de sprint : atteint / pas atteint.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        body: "",
        bullets: [
          "Le tableau affiche « Objectif 1 / Objectif 2 / Objectif 3 ».",
          "L'objectif est rédigé après la sélection des stories.",
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
        body: "Co-construit en Sprint Planning par l'équipe Scrum entière : le PO propose un cap dérivé du Product Goal, les Devs challengent au regard de leur capacité et de leur connaissance technique, le Scrum Master facilite la convergence. Pas un acte solo du PO. Le Sprint Goal défini, les stories du backlog deviennent des hypothèses de ce qui aidera à l'atteindre.",
        bullets: [
          "Product Goal (le cap moyen terme du produit, l'amont)",
          "État du Product Backlog (ce qui est prioritaire et prêt)",
          "Vélocité historique de l'équipe (capacité réaliste sur l'itération)",
          "Retour de la dernière rétrospective (ce qu'on change ou garde)",
          "Retour de la dernière Sprint Review (ce qui a bougé côté utilisateur)",
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum Guide 2020 : « The Sprint Goal is the single objective for the Sprint » et « The Developers… define a Sprint Goal that communicates why the Sprint is valuable to stakeholders. » Convergent avec Kniberg, Cohn. SAFe : pluralité au niveau PI uniquement.",
      },
    ],
  },

  {
    id: "sprint.sheet.anatomy",
    themeId: "sprint.fondamentaux",
    icon: "target",
    title: "L'anatomie d'un Sprint Goal",
    heroPhrase:
      "Verbe d'outcome, indicateur, variation chiffrée, contexte, échéance. Cinq briques. Une phrase.",
    intro: "",
    practiceCtaLabel: "Va assembler ton premier Sprint Goal",
    sections: [
      {
        heading: "Les cinq briques",
        icon: "target",
        kind: "bricks",
        body: "Un Sprint Goal solide tient en une phrase et porte cinq briques. Chacune répond à une question. Si l'une manque, le goal est ambigu : quelqu'un finira par défendre un verdict qu'un autre contestera.",
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
        body: "Lire son goal à voix haute et compter. Si une brique manque, l'identifier explicitement avant de figer.",
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
    id: "sprint.sheet.product-goal-link",
    themeId: "sprint.fondamentaux",
    icon: "learn",
    title: "Le Sprint Goal et le Product Goal",
    heroPhrase:
      "Le Product Goal donne le cap. Le Sprint Goal est l'étape qui sert ce cap, dans la fenêtre du sprint.",
    intro: "",
    practiceCtaLabel: "Va écrire un Sprint Goal aligné",
    sections: [
      {
        heading: "Pourquoi cette relation compte",
        icon: "target",
        body: "Le Scrum Guide 2020 introduit explicitement le **Product Goal** : un cap moyen terme du produit, formulé en outcome. Chaque Sprint Goal est une étape vers ce cap. Cette chaîne d'alignement rend chaque sprint signifiant. L'équipe sait pourquoi elle fait ce qu'elle fait.",
        bullets: [
          "Le Product Goal vit à l'année / au trimestre, le Sprint Goal à l'itération.",
          "Sans Product Goal, le Sprint Goal flotte (le PO décide chaque fois sans cap stable).",
          "Sans Sprint Goal, le Product Goal devient une plaque décorative sans traduction opérationnelle.",
        ],
      },
      {
        heading: "Comment dériver l'un de l'autre",
        icon: "wrench",
        body: "Le Sprint Goal n'est pas un Product Goal en miniature. Il en est une étape concrète, formulée avec les cinq briques d'un Sprint Goal, dans la fenêtre du sprint.",
        examples: [
          {
            bad: "Product Goal : « Devenir l'outil de paiement le plus simple du marché ». Sprint Goal : « Devenir l'outil de paiement le plus simple du marché ».",
            good: "Product Goal : « Devenir l'outil de paiement le plus simple du marché ». Sprint Goal : « Faire passer le temps moyen pour finaliser un paiement de 45 s à 30 s d'ici la fin du sprint 24 ».",
            note: "Le Sprint Goal traduit le cap en mesure observable sur l'itération.",
          },
        ],
      },
      {
        heading: "Le test d'alignement",
        icon: "good",
        body: "À chaque Sprint Planning, poser la question : « notre Sprint Goal contribue-t-il directement à notre Product Goal en cours ? » Si l'équipe ne sait pas répondre clairement, soit le Product Goal n'est pas vraiment partagé, soit le Sprint Goal s'éparpille.",
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum Guide 2020 (révision Schwaber/Sutherland) : ajout du Product Goal aux Scrum artifacts. Voir aussi Roman Pichler sur la cascade vision → Product Goal → Sprint Goal.",
      },
    ],
  },

  {
    id: "sprint.sheet.goal-is-met",
    themeId: "sprint.fondamentaux",
    icon: "good",
    title: "Comment savoir que le Sprint Goal est atteint",
    heroPhrase:
      "La définition de succès se pose en Sprint Planning, pas à la Sprint Review. Tu écris le goal et son critère d'atteinte ensemble.",
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
        body: "Tu peux formaliser trois verdicts en fin de sprint, mais le goal doit fonctionner même avec un binaire atteint/raté. Les nuances servent en rétro, pas à l'affichage du résultat.",
        bullets: [
          "**Atteint** : le critère mesurable est rempli ou dépassé.",
          "**Partiel** : on n'a pas atteint la cible mais on a appris quelque chose qui change le sprint suivant.",
          "**Raté** : ni la cible ni l'apprentissage. À examiner sérieusement en rétro.",
        ],
      },
      {
        heading: "Le test de la phrase « Comment saurons-nous »",
        icon: "wrench",
        body: "À la fin du Sprint Planning, demander : « comment saurons-nous, en fin de sprint, si nous l'avons atteint ? » Si l'équipe ne sait pas répondre en moins de 30 secondes, le goal est mal posé. Reformuler avant de démarrer.",
        examples: [
          {
            bad: "Sprint Goal : « Rendre le module commande plus fiable. » Critère d'atteinte : non posé.",
            good: "Sprint Goal : « Réduire le nombre d'incidents production du module commande de 14 à 5 par semaine d'ici la fin du sprint. » Critère : nombre d'incidents mesuré la dernière semaine du sprint, comparé à la moyenne hebdomadaire précédente.",
            note: "Le critère d'atteinte est implicite dans le goal bien rédigé, mais le formuler explicitement protège contre les divergences d'interprétation.",
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
          "Équipe ops / oncall : déploiements plus rapides, astreintes plus calmes.",
          "Équipe dev : vélocité retrouvée, moins de temps sur les bugs hérités.",
        ],
      },
    ],
  },

  // ============================================================
  // Thème : Les pièges classiques (4 fiches)
  // ============================================================
  {
    id: "sprint.sheet.not-a-story-list",
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "Le Sprint Goal n'est pas la liste des stories",
    heroPhrase:
      "L'équipe s'engage sur un résultat. Les stories sont une hypothèse de ce qui aidera à l'atteindre.",
    intro: "",
    practiceCtaLabel: "Va corriger un objectif mal posé",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "Le Scrum Guide est clair : la sélection de Product Backlog Items est une **hypothèse** de ce qui aidera à atteindre le Sprint Goal, pas l'engagement en soi. Si l'équipe s'engage sur les stories au lieu du goal, le sprint devient une course à la complétion, pas une recherche de valeur.",
        bullets: [
          "L'engagement porte sur le résultat, pas sur la livraison.",
          "Si la moitié des stories suffisent à atteindre le goal, on s'arrête.",
          "Si les stories ne suffisent pas, on ajuste les stories, pas le goal.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        body: "",
        bullets: [
          "« On a fini toutes les stories » devient la fierté de fin de sprint, indépendamment du résultat constaté.",
          "Le Sprint Goal est rédigé après la sélection des stories pour les résumer.",
          "À la rétro, l'équipe parle de stories livrées, pas de bénéficiaires touchés.",
        ],
      },
      {
        heading: "Comment recadrer",
        icon: "wrench",
        body: "Reformuler le goal en outcome avant de finaliser la sélection. Demander : « quelles stories nous permettent vraiment d'atteindre ce goal ? » et laisser tomber le reste.",
        examples: [
          {
            bad: "Livrer les 12 stories de l'epic onboarding.",
            good: "Permettre à 80 % des nouveaux utilisateurs de compléter l'inscription en moins de 90 secondes, fin de sprint.",
            note: "Les stories deviennent un moyen mesuré contre l'outcome, pas une fin en soi.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum Guide 2020 : « The selected Product Backlog items are a hypothesis of what is needed to achieve the Sprint Goal. » Voir aussi Scrum.org, Sprint Backlog Antipatterns.",
      },
    ],
  },

  {
    id: "sprint.sheet.vanity-goal",
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "Le vanity goal",
    heroPhrase:
      "Un goal qui sonne bien mais n'engage personne. Il rassure les parties prenantes sans rien promettre.",
    intro: "",
    practiceCtaLabel: "Va corriger un vanity goal",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le vanity goal coche la case « on a un Sprint Goal » sans accepter le coût d'un engagement vérifiable. Personne ne saura à la fin du sprint si l'objectif est atteint ou pas, donc tout le monde déclare la victoire.",
        bullets: [
          "Aucune mesure ne tranche en fin de sprint.",
          "Le goal est compatible avec n'importe quel résultat.",
          "Il rassure les parties prenantes mais ne change pas le comportement de l'équipe.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
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
        body: "Repérer le mot flou, demander « tu veux dire quoi, concrètement, mesurable comment ? » et écrire la réponse comme nouveau goal.",
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
        body: "Scrum.org, Sprint Anti-Patterns. Convergent avec le test pédagogique de Mike Cohn : « can two people defending opposite verdicts both be right ? » Si oui, le goal est creux.",
      },
    ],
  },

  {
    id: "sprint.sheet.pet-project-goal",
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "Le goal de confort",
    heroPhrase:
      "Un goal qui sert un seul interlocuteur ou une obsession interne. Aucun bénéficiaire externe ne ressent l'effet.",
    intro: "",
    practiceCtaLabel: "Va recentrer un goal mal aligné",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "Le goal de confort est techniquement bien rédigé mais sert un public minoritaire ou interne : demande d'un manager isolé, refactor que seule l'équipe verra, fonctionnalité réclamée par un seul client. La vélocité est dépensée sans contrepartie utilisateur.",
        bullets: [
          "Aucun bénéficiaire externe n'est nommé, ou un seul.",
          "L'effet attendu reste dans l'équipe (vélocité, propreté du code).",
          "Le retour sur effort est défendable mais sur un public marginal.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        body: "",
        bullets: [
          "Le bénéficiaire nommé est un membre de l'équipe ou un manager.",
          "L'effet attendu n'est observable qu'en interne.",
          "Le sprint d'avant avait déjà un goal sur le même sous-sujet.",
        ],
      },
      {
        heading: "Le test « qui en profite hors de l'équipe ? »",
        icon: "wrench",
        body: "Avant de figer le goal, nommer 3 bénéficiaires hors équipe et l'effet observable sur chacun. Si la liste est vide, le goal est un goal de confort.",
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
    themeId: "sprint.pieges-classiques",
    icon: "warn",
    title: "Renouveler le goal, pas le copier-coller",
    heroPhrase:
      "Le même goal sprint après sprint signale soit qu'on n'apprend rien, soit qu'on ne mesure jamais.",
    intro: "",
    practiceCtaLabel: "Va écrire un nouveau goal",
    sections: [
      {
        heading: "Pourquoi le renouveler",
        icon: "target",
        body: "Si le goal du sprint N est identique à celui du sprint N-1 (et N-2), trois lectures possibles : (1) le goal n'est pas atteint, donc il faut le revoir ou changer d'approche ; (2) il est atteint mais on ne le mesure pas ; (3) c'est un faux goal qui ne sert que d'étiquette. Aucune n'est saine.",
        bullets: [
          "Un goal porte une intention bornée : quand l'intention est servie, le goal passe à autre chose.",
          "Répéter sans mesurer transforme le goal en formule magique.",
          "L'apprentissage d'un sprint doit modifier le suivant : nouveau goal ou approche modifiée.",
        ],
      },
      {
        heading: "Signaux d'alerte",
        icon: "warn",
        body: "",
        bullets: [
          "Trois sprints consécutifs avec le même goal (ou variantes mineures).",
          "Personne ne sait dire si le goal précédent a été atteint.",
          "La rétro ne parle pas du goal, seulement des stories.",
        ],
      },
      {
        heading: "Comment renouveler",
        icon: "wrench",
        body: "À la fin de chaque sprint, statuer sur le goal : atteint, partiel, raté. Si atteint, passer à l'enjeu suivant. Si partiel ou raté, soit relever le seuil de la prochaine étape, soit changer d'approche (le goal ne se reproduit pas à l'identique).",
        examples: [
          {
            bad: "Améliorer la conversion du tunnel de paiement (sprint après sprint).",
            good: "Sprint 24 : faire passer la conversion de 12 % à 18 %. Sprint 25 (si atteint) : faire passer le taux d'abandon mobile de 35 % à 22 %. Sprint 25 (si raté) : reformuler l'hypothèse, peut-être que le problème n'est pas la conversion mais le ré-engagement.",
            note: "Le sprint suivant porte un goal **différent**, soit qu'on monte d'un cran, soit qu'on change d'angle.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Henrik Kniberg sur l'apprentissage d'un sprint à l'autre. Et Scrum.org : « The Sprint Goal is a single objective for the Sprint, not a recurring theme. »",
      },
    ],
  },

  // ============================================================
  // Thème : Cas particuliers (3 nouvelles fiches)
  // ============================================================
  {
    id: "sprint.sheet.discovery-spike",
    themeId: "sprint.cas-particuliers",
    icon: "learn",
    title: "Sprint d'exploration (ou spike)",
    heroPhrase:
      "Tu n'as pas une livraison à faire, tu as une question à trancher. Le Sprint Goal vise une preuve, pas un livrable.",
    intro: "",
    practiceCtaLabel: "Va écrire un Sprint Goal d'exploration",
    sections: [
      {
        heading: "La logique de l'exploration",
        icon: "target",
        body: "Un sprint d'exploration sert à trancher une incertitude (technique, produit, marché) avant de s'engager sur du développement. Le Sprint Goal n'est donc pas « livrer X » mais « répondre à la question Y avec une preuve observable ». Le piège : confondre le sprint d'exploration avec un sprint sans goal.",
        bullets: [
          "L'incertitude à lever est nommée explicitement (la question).",
          "Le critère de réponse est observable : un prototype, un test utilisateur, une mesure de performance, une preuve de concept chiffrée.",
          "L'équipe accepte un verdict : « la réponse est non, on n'y va pas » est un succès de l'exploration.",
        ],
      },
      {
        heading: "Reformuler en outcome",
        icon: "wrench",
        body: "Le Sprint Goal d'exploration prend la forme « répondre à [question] avec [preuve] d'ici fin de sprint ». La preuve est ce qui rend le goal mesurable.",
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
        body: "Marty Cagan (Inspired) sur la discovery produit. Mike Cohn pour les spikes techniques en Scrum. Convergent : un spike a une question, un budget temps et un verdict.",
      },
    ],
  },

  {
    id: "sprint.sheet.event-prep",
    themeId: "sprint.cas-particuliers",
    icon: "challenge",
    title: "Sprint préparatoire à un événement",
    heroPhrase:
      "Une release, une démo, une conférence. Le goal ne dit pas « tout préparer » mais ce qui changera chez le public visé.",
    intro: "",
    practiceCtaLabel: "Va écrire le goal d'un sprint d'événement",
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
        body: "Le Sprint Goal vise le changement chez le public, pas la complétion du contenu.",
        examples: [
          {
            bad: "Préparer la conférence client annuelle prévue fin de sprint.",
            good: "Obtenir au moins 10 demandes de RDV commercial qualifiées de la part des participants de la conférence client annuelle, d'ici 48 h après l'événement.",
            note: "Le contenu de la conférence devient un moyen pour atteindre ce résultat, pas une fin en soi. L'équipe arbitre ce qu'elle prépare en fonction de ça.",
          },
        ],
      },
      {
        heading: "Le piège de la deadline floue",
        icon: "warn",
        body: "L'événement crée une échéance forte (la date), ce qui peut faire croire que l'échéance suffit comme borne. Mais une échéance n'est pas un goal : le goal dit ce qu'on cherche à obtenir avant ou après cette échéance. Sans cet ajout, la date devient le seul critère et tout le travail s'aligne dessus, même s'il rate l'effet.",
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
      "Tu ne contrôles pas tout. Le goal dit ce que tu peux honnêtement engager, avec un plan B explicite.",
    intro: "",
    practiceCtaLabel: "Va écrire un goal honnête face aux blocages",
    sections: [
      {
        heading: "La situation",
        icon: "target",
        body: "L'équipe attend une API externe, une validation légale, un accès production, une décision d'un autre département. Sans cette entrée, une partie du goal est inatteignable. Deux mauvais réflexes : (1) prétendre que le blocage va se lever et s'engager comme si de rien n'était ; (2) renoncer au goal et faire un sprint « au mieux » sans cap.",
        bullets: [
          "Le blocage est nommé en début de sprint, pas découvert à mi-parcours.",
          "Le goal porte sur ce que l'équipe peut vraiment engager (donc parfois sur une étape antérieure au blocage).",
          "Un plan B explicite est posé pour les ressources non bloquées.",
        ],
      },
      {
        heading: "Trois formulations honnêtes",
        icon: "wrench",
        body: "Selon la nature du blocage, le Sprint Goal s'adapte.",
        bullets: [
          "**Si le blocage est probable à se lever** : « Faire passer X de A à B **conditionnellement à la réception de Y avant le jour J du sprint**. À défaut, livrer la version isolée prête à intégrer dès réception. »",
          "**Si le blocage est durable** : « Réduire de 30 % le temps de traitement des cas sans dépendance Y, en isolant l'intégration Y pour livraison dès qu'elle est disponible. »",
          "**Si le blocage est inconnu** : « Lever en première semaine la dépendance Y (sous responsabilité du Product Owner) puis exécuter sur le reste du sprint ». Le goal devient en partie l'engagement à débloquer.",
        ],
      },
      {
        heading: "Le piège du « on fera au mieux »",
        icon: "warn",
        body: "« On fera de notre mieux » n'est pas un Sprint Goal. C'est une posture, pas un cap. Si tu ne peux pas chiffrer ce que tu engages, demande-toi si ce sprint a vraiment un sens, ou s'il faut le repousser et utiliser la fenêtre pour autre chose (exploration, technique, refonte).",
      },
      {
        heading: "Source",
        kind: "source",
        body: "Henrik Kniberg sur la gestion des dépendances en Scrum at Scale. SAFe propose le ROAM (Risks Owned, Accepted, Mitigated) au PI Planning ; appliqué à l'échelle sprint, la même logique s'applique.",
      },
    ],
  },
];
