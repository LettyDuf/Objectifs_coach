/**
 * Corpus Défi QCM — OKR équipe × dev × FR.
 *
 * 6 cas. Pattern : contexte + Objectif trimestriel déjà posé (acceptable) +
 * 1 Résultat clé fautif proposé par l'équipe + 4 reformulations à juger.
 *
 * Chaque cas cible un piège de KR différent :
 *  1. Résultat clé projet (verbe d'output)
 *  2. KR-flou (pas de métrique nommée)
 *  3. KR-health-metric (état à maintenir, pas changement à atteindre)
 *  4. KR-sur-confiance (cible trop facile, c'est une tâche)
 *  5. KR composite (deux résultats coordonnés par « et »)
 *  6. KR sans avant/après (cible absolue sans point de départ)
 *
 * Principes (cohérent avec Sprint) :
 *  - contexte concis et neutre (sans biais cognitif imposé),
 *  - métriques d'usage sans cible obligatoire,
 *  - 4 propositions par cas (1 solide, 1 partiel, 2 mauvais pour raisons différentes),
 *  - feedback sur la STRUCTURE du KR, pas sur la pertinence des chiffres.
 *
 * Source pédagogique : DOMAINE.md §4 (doctrine OKR validée 2026-06-21) +
 * fiche « Les 4 pièges du Résultat clé » (sheets/okr-equipe.dev.fr.ts).
 */

import type { ChallengeQuizCase } from "../../domain/challenge-quiz";

export const OKR_EQUIPE_DEV_CHALLENGE_QUIZ_FR: ChallengeQuizCase[] = [
  // ============================================================
  // Cas 1 — Résultat clé projet (verbe d'output)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.kr-project-tableau de bord",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Observabilité",
    iconName: "okr",
    metrics: [
      { label: "Équipes data actives sur le module pipeline / mois", value: "8" },
      { label: "NPS dev du module pipeline (dernier sondage)", value: "28" },
      { label: "Temps moyen de détection d'un pipeline cassé", value: "45 min" },
    ],
    objectiveContext:
      "Devenir l'outil de référence des équipes data pour l'observabilité des pipelines.",
    proposedObjective: "Livrer le nouveau tableau de bord métriques v2 d'ici fin du trimestre.",
    options: [
      {
        id: "A",
        text: "Livrer, avec les 6 devs de l'équipe, le nouveau tableau de bord métriques v2 d'ici fin du trimestre.",
        verdict: "bad",
        explanation:
          "« Livrer » nomme un projet. Un KR vise un **changement à atteindre**, pas une livraison. Demande-toi : qu'est-ce que le tableau de bord va faire bouger une fois en place ?",
      },
      {
        id: "B",
        text: "Faire passer le NPS dev du module pipeline de 28 à 50 d'ici fin du trimestre.",
        verdict: "good",
        explanation:
          "Métrique nommée (NPS dev), point de départ (28), cible (50), échéance. Outcome qu'un tableau de bord v2 peut effectivement faire bouger.",
      },
      {
        id: "C",
        text: "Améliorer l'adoption du nouveau tableau de bord, aujourd'hui utilisé par 8 équipes data actives par mois, avec un temps de détection moyen de 45 min.",
        verdict: "bad",
        explanation:
          "« Améliorer » est flou. Pas de métrique, pas de chiffre, pas d'échéance. Non falsifiable.",
      },
      {
        id: "D",
        text: "Faire adopter le tableau de bord métriques v2 par les 8 équipes data actives.",
        verdict: "partial",
        explanation:
          "Outcome correct (adoption), bénéficiaire clair, mais aucun avant/après ni cible chiffrée. Précise : passer de combien d'équipes à combien.",
      },
    ],
  },

  // ============================================================
  // Cas 2 — KR-flou (pas de métrique nommée)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.kr-fuzzy-satisfaction",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Plateforme API",
    iconName: "wrench",
    metrics: [
      { label: "Équipes consommatrices internes", value: "12" },
      { label: "CSAT moyen des équipes consommatrices", value: "3,2 / 5" },
      { label: "Tickets « comment faire » / semaine", value: "40" },
    ],
    objectiveContext:
      "Devenir le partenaire technique préféré des équipes produit.",
    proposedObjective: "Améliorer la satisfaction des équipes consommatrices.",
    options: [
      {
        id: "A",
        text: "Améliorer la satisfaction des 12 équipes consommatrices (CSAT actuel 3,2 / 5), qui envoient 40 tickets « comment faire » par semaine.",
        verdict: "bad",
        explanation:
          "« Améliorer » sans chiffre. Pas de métrique nommée, pas de seuil, pas d'échéance. Vœu pieux.",
      },
      {
        id: "B",
        text: "Faire passer le CSAT moyen des équipes consommatrices de 3,2 / 5 à 4,3 / 5 d'ici fin du trimestre.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ, cible, échéance. Falsifiable sans ambiguïté.",
      },
      {
        id: "C",
        text: "Avoir des équipes consommatrices contentes, parmi les 12 équipes qui envoient 40 tickets par semaine, avec un CSAT actuel de 3,2 / 5.",
        verdict: "bad",
        explanation:
          "« Contentes » n'est pas mesurable. Pas de métrique, pas de seuil. Reformulation à éviter complètement.",
      },
      {
        id: "D",
        text: "Atteindre un CSAT moyen de 4 / 5 sur l'enquête trimestrielle.",
        verdict: "partial",
        explanation:
          "Métrique nommée et cible chiffrée — bien. Mais sans le point de départ (3,2), on perd la notion d'effort. Un KR montre l'avant ET l'après.",
      },
    ],
  },

  // ============================================================
  // Cas 3 — KR-health-metric (état à maintenir)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.kr-health-uptime",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Paiement",
    iconName: "target",
    metrics: [
      { label: "Taux de réussite des paiements", value: "96,2 %" },
      { label: "Temps moyen de détection d'un incident", value: "15 min" },
      { label: "Escalades support / semaine", value: "12" },
    ],
    objectiveContext:
      "Faire de notre plateforme de paiement la plus fiable de notre marché.",
    proposedObjective: "Maintenir l'uptime du service paiement au-dessus de 99,9 %.",
    options: [
      {
        id: "A",
        text: "Maintenir l'uptime du service paiement au-dessus de 99,9 %, un système suivi par 8 devs et 1 SRE.",
        verdict: "bad",
        explanation:
          "« Maintenir » décrit un garde-fou, pas un changement à atteindre. Un KR vise une progression — sinon, c'est une norme de service à surveiller ailleurs, pas un Résultat clé.",
      },
      {
        id: "B",
        text: "Faire passer le taux de réussite des paiements de 96,2 % à 99,5 % d'ici fin du trimestre.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ, cible, échéance. Un vrai changement mesurable — c'est ça un KR.",
      },
      {
        id: "C",
        text: "Garantir 99,9 % d'uptime sur la plateforme paiement, qui génère aujourd'hui 12 escalades support par semaine.",
        verdict: "bad",
        explanation:
          "Même piège que A reformulé. « Garantir » est aussi un état à maintenir, pas un outcome à atteindre. C'est une SLO (service level objective), pas un KR.",
      },
      {
        id: "D",
        text: "Diviser par 3 le temps moyen de détection d'un incident paiement (de 15 min à 5 min).",
        verdict: "partial",
        explanation:
          "Bon format de KR (point de départ, cible chiffrée, échéance implicite du cycle). Mais lié à l'observabilité, pas directement à la fiabilité perçue par les clients — l'option B correspond mieux à l'Objectif de fiabilité.",
      },
    ],
  },

  // ============================================================
  // Cas 4 — KR-sur-confiance (trop facile = tâche)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.kr-overconfident-coverage",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Qualité Logicielle",
    iconName: "challenge",
    metrics: [
      { label: "Couverture de tests automatisés (moyenne entreprise)", value: "78 %" },
      { label: "Bugs critiques en prod / trimestre précédent", value: "23" },
      { label: "Délai moyen de revue d'une PR", value: "2,3 jours" },
    ],
    objectiveContext:
      "Donner aux équipes produit la confiance de déployer plusieurs fois par jour.",
    proposedObjective:
      "Faire passer la couverture de tests automatisés de 78 % à 80 % d'ici fin du trimestre.",
    options: [
      {
        id: "A",
        text: "Faire passer la couverture de tests automatisés de 78 % à 80 % d'ici fin du trimestre.",
        verdict: "bad",
        explanation:
          "L'écart est trivial (2 points). Si l'équipe estime ses chances de succès à 95-100 %, ce n'est plus un KR mais une tâche planifiée. L'OKR pousse à l'ambition calibrée (50 à 70 % de confiance).",
      },
      {
        id: "B",
        text: "Faire passer la couverture de tests automatisés de 78 % à 92 % d'ici fin du trimestre.",
        verdict: "good",
        explanation:
          "Écart ambitieux (+14 pts) qui demande un vrai effort. Probablement autour de 60 % de confiance pour l'équipe — dans la fourchette OKR.",
      },
      {
        id: "C",
        text: "Maximiser la couverture de tests automatisés.",
        verdict: "bad",
        explanation:
          "« Maximiser » sans cible chiffrée n'est pas falsifiable. Combien suffit pour dire « c'est fait » ?",
      },
      {
        id: "D",
        text: "Diviser par 3 le nombre de bugs critiques en prod (de 23 à 8 sur le trimestre).",
        verdict: "partial",
        explanation:
          "KR exemplaire dans la forme. Mais il ne parle pas de la couverture de tests — c'est un autre outcome (effet du Tdd vs cause). Peut être un autre KR du même Objectif, plutôt qu'une reformulation de celui-ci.",
      },
    ],
  },

  // ============================================================
  // Cas 5 — KR composite (deux résultats coordonnés par « et »)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.kr-composite-perf",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Performance",
    iconName: "practice",
    metrics: [
      { label: "LCP médian (Largest Contentful Paint)", value: "3,8 s" },
      { label: "INP médian (Interaction to Next Paint)", value: "320 ms" },
      { label: "Taux de bounce sur la home", value: "42 %" },
    ],
    objectiveContext:
      "Rendre l'application aussi rapide que les meilleurs du marché.",
    proposedObjective:
      "Améliorer le temps de chargement et réduire le taux de bounce sur la home.",
    options: [
      {
        id: "A",
        text: "Améliorer le temps de chargement et réduire le taux de bounce sur la home.",
        verdict: "bad",
        explanation:
          "Composite (« et » coordonne deux résultats distincts) + flou (« améliorer »). Sépare en deux KR distincts, chacun mesurable.",
      },
      {
        id: "B",
        text: "Faire passer le LCP médian de 3,8 s à 1,8 s d'ici fin du trimestre.",
        verdict: "good",
        explanation:
          "Un seul résultat, métrique nommée, point de départ, cible, échéance. Le KR sur le bounce est une autre histoire — ce sera un autre KR du même Objectif.",
      },
      {
        id: "C",
        text: "Optimiser la performance perçue de la home.",
        verdict: "bad",
        explanation:
          "« Optimiser » et « performance perçue » sont flous. Aucune métrique nommée, aucun seuil.",
      },
      {
        id: "D",
        text: "Faire passer le LCP médian de 3,8 s à 1,8 s, puis le taux de bounce de 42 % à 30 %, d'ici fin du trimestre.",
        verdict: "partial",
        explanation:
          "Bien chiffré, bien mesuré — mais c'est encore deux KR cachés en un. Sépare-les : un OKR a 3 à 5 KR justement pour porter plusieurs dimensions.",
      },
    ],
  },

  // ============================================================
  // Cas 6 — KR sans avant/après (cible absolue sans point de départ)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.kr-no-baseline-intégration",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Intégration Dev",
    iconName: "learn",
    metrics: [
      { label: "Temps moyen avant 1er appel API réussi (« time to hello world »)", value: "4 h" },
      { label: "Nouveaux développeurs intégrés / trimestre", value: "65" },
      { label: "Taux d'abandon avant 1er appel API", value: "38 %" },
    ],
    objectiveContext:
      "Faire de notre API publique la plus accueillante pour un développeur qui débute.",
    proposedObjective:
      "Atteindre un « time to hello world » de 30 minutes d'ici fin du trimestre.",
    options: [
      {
        id: "A",
        text: "Atteindre, pour les 3 devs de l'équipe, un « time to hello world » de 30 minutes d'ici fin du trimestre.",
        verdict: "partial",
        explanation:
          "Métrique nommée, cible chiffrée, échéance. Mais sans le point de départ (4 h aujourd'hui), on perd la mesure de l'effort. Un KR montre l'avant ET l'après.",
      },
      {
        id: "B",
        text: "Faire passer le temps moyen avant 1er appel API réussi de 4 h à 30 min d'ici fin du trimestre.",
        verdict: "good",
        explanation:
          "Point de départ explicite (4 h), cible (30 min), échéance, métrique nommée. La structure idéale d'un KR.",
      },
      {
        id: "C",
        text: "Rendre l'intégration fluide et rapide, pour les 65 nouveaux développeurs intégrés chaque trimestre, alors que 38 % abandonnent avant leur premier appel API.",
        verdict: "bad",
        explanation:
          "« Fluide » et « rapide » sont flous. Aucune métrique, aucun seuil. Vœu, pas un KR.",
      },
      {
        id: "D",
        text: "Réduire, pour les 65 nouveaux développeurs intégrés chaque trimestre, le « time to hello world » d'au moins 80 % d'ici fin du trimestre.",
        verdict: "partial",
        explanation:
          "Variation chiffrée, échéance, métrique nommée — bonne base. Mais formulation relative (« d'au moins 80 % ») qui demande un calcul mental. La forme « de 4 h à 30 min » se vérifie d'un coup d'œil.",
      },
    ],
  },

  // ============================================================
  // Cas 7 — KR sans valeur de référence (NPS qui démarre où ?)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.mobile-nps-baseline",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe App Mobile",
    iconName: "target",
    context:
      "5 devs mobile, 1 Product Manager. L'équipe construit l'application mobile principale. Cycle OKR trimestriel. L'enquête NPS tourne tous les 3 mois — un cycle complet par trimestre.",
    metrics: [
      { label: "NPS mobile (dernière enquête trimestrielle)", value: "32" },
      { label: "Score moyen App Store / Play Store", value: "4,1 / 5" },
      { label: "Sessions / utilisateur actif / semaine", value: "5,3" },
    ],
    objectiveContext:
      "Faire de notre appli mobile l'une des préférées de nos utilisateurs.",
    proposedObjective:
      "Atteindre un NPS de 60 sur l'appli mobile d'ici la fin du trimestre.",
    options: [
      {
        id: "A",
        text: "Atteindre, pour les 5 devs de l'équipe, un NPS de 60 sur l'appli mobile d'ici la fin du trimestre.",
        verdict: "partial",
        explanation:
          "Cible chiffrée, fenêtre. Mais sans le point de départ (32 aujourd'hui), on perd la lecture de l'effort (+28 pts = ambition forte). Un KR montre l'avant ET l'après.",
      },
      {
        id: "B",
        text: "Faire passer le NPS de l'appli mobile (enquête trimestrielle) de 32 à 60 d'ici la fin du trimestre.",
        verdict: "good",
        explanation:
          "Point de départ explicite, cible, fenêtre cohérente avec la cadence de la métrique. La structure idéale d'un KR.",
      },
      {
        id: "C",
        text: "Améliorer la satisfaction des utilisateurs de l'appli mobile, notée aujourd'hui 4,1 / 5 sur les stores.",
        verdict: "bad",
        explanation:
          "Pas de métrique nommée, pas de chiffre. Non falsifiable.",
      },
      {
        id: "D",
        text: "Livrer, avec les 5 devs de l'équipe, les 8 améliorations UX prévues sur le backlog mobile ce trimestre.",
        verdict: "bad",
        explanation:
          "Output / Résultat clé projet. Les 8 améliorations peuvent être livrées sans bouger le NPS.",
      },
    ],
  },

  // ============================================================
  // Cas 8 — Confusion KR / objectif de Sprint (mauvaise cadence)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.payment-cadence",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Paiement",
    iconName: "challenge",
    context:
      "6 devs, 1 Product Manager. L'équipe maintient le service paiement. Cycle OKR trimestriel. L'équipe court en sprints de 2 semaines.",
    metrics: [
      { label: "Bugs critiques production sur paiement (mois en cours)", value: "12" },
      { label: "Temps moyen de résolution d'un bug critique", value: "4 h" },
      { label: "Réclamations clients / mois liées au paiement", value: "28" },
    ],
    objectiveContext:
      "Faire de notre plateforme de paiement la plus fiable de notre marché.",
    proposedObjective:
      "Réduire le nombre de bugs critiques production sur le paiement de 12 à 3 d'ici la fin du sprint 24.",
    options: [
      {
        id: "A",
        text: "Réduire le nombre de bugs critiques production sur le paiement de 12 à 3 d'ici la fin du sprint 24.",
        verdict: "bad",
        explanation:
          "Fenêtre mal calibrée : un KR trimestriel ne se borne pas par un numéro de sprint (~2 semaines). Confusion avec un objectif de Sprint. L'horizon OKR équipe = 90 jours, pas une itération.",
      },
      {
        id: "B",
        text: "Réduire le nombre de bugs critiques production sur le paiement de 12 à 3 par mois d'ici la fin du trimestre.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ, cible (par mois pour rester comparable), fenêtre trimestrielle cohérente avec le cycle OKR.",
      },
      {
        id: "C",
        text: "Maintenir le nombre de bugs critiques production paiement au-dessus de 5 par mois ce trimestre.",
        verdict: "bad",
        explanation:
          "Health metric (« maintenir au-dessus de ») et formulation à l'envers (un seuil supérieur n'a pas de sens pour un nombre de bugs). Double piège.",
      },
      {
        id: "D",
        text: "Améliorer la fiabilité du paiement d'ici la fin du trimestre.",
        verdict: "bad",
        explanation:
          "Pas de métrique, pas de seuil. Non falsifiable.",
      },
    ],
  },

  // ============================================================
  // Cas 9 — KR qui est en réalité un Objectif déguisé
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.platform-kr-as-objective",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Plateforme API",
    iconName: "wrench",
    metrics: [
      { label: "Taux de réussite des appels API (actuel)", value: "99,2 %" },
      { label: "p95 latence API", value: "180 ms" },
      { label: "Tickets « API instable » des équipes consommatrices / sem", value: "6" },
    ],
    objectiveContext: "Devenir la référence interne pour la fiabilité des services techniques.",
    proposedObjective:
      "Devenir la plateforme de référence pour la fiabilité des appels API ce trimestre.",
    options: [
      {
        id: "A",
        text: "Devenir la plateforme de référence pour la fiabilité des appels API ce trimestre.",
        verdict: "bad",
        explanation:
          "C'est un Objectif (qualitatif, inspirant) reformulé en KR — sans chiffre, sans cible. Un KR doit être mesurable. Ici on a reformulé l'Objectif au lieu de produire un KR distinct.",
      },
      {
        id: "B",
        text: "Faire passer le taux de réussite des appels API plateforme de 99,2 % à 99,9 % d'ici la fin du trimestre.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ, cible (qui demande un vrai effort), fenêtre. Un KR mesurable qui sert l'Objectif sans s'y substituer.",
      },
      {
        id: "C",
        text: "Maintenir le taux de réussite des appels API au-dessus de 99,5 %.",
        verdict: "bad",
        explanation:
          "Health metric. Décrit un état à préserver, pas un changement à atteindre. Si on est déjà à 99,5 %, c'est une norme de service, pas un KR.",
      },
      {
        id: "D",
        text: "Réduire le nombre de tickets « API instable » de 6 à 1 par semaine et faire passer le p95 latence à 100 ms d'ici la fin du trimestre.",
        verdict: "bad",
        explanation:
          "Composite (deux résultats coordonnés par « et »). Sépare en deux KR distincts du même Objectif.",
      },
    ],
  },

  // ============================================================
  // Cas 10 — KR avec proxy vanity (clic en surface)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.adoption-vanity-proxy",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Adoption Fonctionnalité",
    iconName: "okr",
    context:
      "3 devs, 1 Product Manager. L'équipe a livré au PI précédent une nouvelle fonctionnalité « collaboration en temps réel ». Cycle OKR trimestriel pour faire monter l'adoption.",
    metrics: [
      { label: "Utilisateurs ayant cliqué sur le bouton « Collaborer »", value: "42 %" },
      { label: "Utilisateurs ayant complété ≥ 3 sessions collaboratives", value: "8 %" },
      { label: "Utilisateurs actifs (≥ 1 action / sem)", value: "12 400" },
    ],
    objectiveContext:
      "Faire de la collaboration en temps réel un usage quotidien dans nos équipes clientes.",
    proposedObjective:
      "Atteindre 80 % de clic sur le bouton « Collaborer » depuis l'écran d'accueil d'ici la fin du trimestre.",
    options: [
      {
        id: "A",
        text: "Atteindre, pour les 3 devs de l'équipe, 80 % de clic sur le bouton « Collaborer » depuis l'écran d'accueil d'ici la fin du trimestre.",
        verdict: "partial",
        explanation:
          "Métrique observable, cible, fenêtre. Mais le clic en surface ne dit rien de l'usage profond — c'est un proxy vanity. L'Objectif parle d'usage quotidien, le KR ne mesure que la curiosité.",
      },
      {
        id: "B",
        text: "Faire passer le pourcentage d'utilisateurs ayant complété au moins 3 sessions collaboratives de 8 % à 35 % d'ici la fin du trimestre.",
        verdict: "good",
        explanation:
          "Métrique d'usage réel (3 sessions = signal d'adoption), aligné avec l'Objectif. Le clic devient un proxy intermédiaire, le KR mesure l'effet de fin.",
      },
      {
        id: "C",
        text: "Livrer, avec les 3 devs de l'équipe, 5 améliorations majeures sur la fonctionnalité de collaboration ce trimestre.",
        verdict: "bad",
        explanation:
          "Résultat clé projet. 5 améliorations livrées peuvent ne rien changer à l'adoption.",
      },
      {
        id: "D",
        text: "Améliorer l'adoption de la collaboration en temps réel, aujourd'hui utilisée par 12 400 utilisateurs actifs.",
        verdict: "bad",
        explanation:
          "Pas de métrique, pas de chiffre. Vœu pieux.",
      },
    ],
  },

  // ============================================================
  // Cas 11 — Sur-confiance subtile (écart trivial)
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.dx-overconfidence",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Developer Experience",
    iconName: "challenge",
    context:
      "4 devs, 1 Developer Advocate. L'équipe maintient le SDK consommé par les devs externes. Le dernier NPS est à 48. L'équipe estime ses chances à 100 % de gagner 2 points si elle corrige les bugs en attente.",
    metrics: [
      { label: "NPS dev du SDK (actuel)", value: "48" },
      { label: "Bugs en attente sur SDK", value: "23" },
      { label: "Confiance équipe d'atteindre la cible proposée", value: "100 %" },
    ],
    objectiveContext:
      "Faire du SDK une référence dans la communauté dev.",
    proposedObjective:
      "Faire passer le NPS dev du SDK de 48 à 50 d'ici la fin du trimestre.",
    options: [
      {
        id: "A",
        text: "Faire passer le NPS dev du SDK de 48 à 50 d'ici la fin du trimestre.",
        verdict: "bad",
        explanation:
          "L'écart est trivial (+2 pts) et l'équipe estime ses chances à 100 %. À ce niveau, ce n'est plus un KR mais une tâche du backlog. Un KR vise 50-70 % de confiance — l'ambition doit demander un vrai effort.",
      },
      {
        id: "B",
        text: "Faire passer le NPS dev du SDK de 48 à 65 d'ici la fin du trimestre.",
        verdict: "good",
        explanation:
          "Écart ambitieux (+17 pts) qui demande un vrai changement (pas juste corriger les bugs en attente). Probablement autour de 50-60 % de confiance — calibrage OKR correct.",
      },
      {
        id: "C",
        text: "Corriger les 23 bugs en attente sur le SDK ce trimestre.",
        verdict: "bad",
        explanation:
          "Résultat clé projet. Corriger 23 bugs peut être achevé sans bouger le NPS — surtout si les bugs ne sont pas ceux qui frustrent les devs.",
      },
      {
        id: "D",
        text: "Faire de notre SDK le SDK le mieux noté de notre marché.",
        verdict: "bad",
        explanation:
          "C'est un Objectif qualitatif inspirant, pas un KR. Pas de métrique chiffrée.",
      },
    ],
  },

  // ============================================================
  // Cas 12 — KR avec deux métriques cachées dans le même
  // ============================================================
  {
    id: "quiz.okr-equipe.dev.insights-hidden-composite",
    type: "okr-equipe",
    audience: "dev",
    teamLabel: "Équipe Insights & Tableaux de bord",
    iconName: "practice",
    context:
      "5 devs, 1 Product Manager. L'équipe construit les tableaux de bord utilisés par les équipes business. Cycle OKR trimestriel. Le PM veut un KR qui couvre à la fois l'usage et la satisfaction.",
    metrics: [
      { label: "Utilisation hebdomadaire du tableau de bord principal", value: "22 %" },
      { label: "Score de satisfaction des utilisateurs du tableau de bord", value: "3,1 / 5" },
      { label: "Tickets « besoin d'aide tableau de bord » / sem", value: "14" },
    ],
    objectiveContext:
      "Faire des tableaux de bord le réflexe quotidien des équipes business pour piloter.",
    proposedObjective:
      "Faire passer l'utilisation hebdomadaire du tableau de bord de 22 % à 45 % et le score de satisfaction de 3,1 à 4,2 d'ici la fin du trimestre.",
    options: [
      {
        id: "A",
        text: "Faire passer l'utilisation hebdomadaire du tableau de bord de 22 % à 45 % et le score de satisfaction de 3,1 à 4,2 d'ici la fin du trimestre.",
        verdict: "bad",
        explanation:
          "Composite caché : deux métriques dans le même KR. Si l'usage monte mais la satisfaction baisse, le KR est-il atteint ? Un OKR a 3 à 5 KR distincts pour porter plusieurs dimensions — c'est exactement pour ça.",
      },
      {
        id: "B",
        text: "Faire passer l'utilisation hebdomadaire du tableau de bord de 22 % à 45 % d'ici la fin du trimestre.",
        verdict: "good",
        explanation:
          "Un seul outcome mesurable. La satisfaction devient un autre KR du même Objectif, ou une métrique guardrail surveillée à côté. Clarté + falsifiabilité.",
      },
      {
        id: "C",
        text: "Améliorer significativement l'usage et la satisfaction du tableau de bord.",
        verdict: "bad",
        explanation:
          "Composite ET flou (« améliorer », « significativement »). Triple piège.",
      },
      {
        id: "D",
        text: "Livrer la v3 du tableau de bord ce trimestre.",
        verdict: "bad",
        explanation:
          "Résultat clé projet. La v3 livrée ≠ adoption ou satisfaction qui bouge.",
      },
    ],
  },
];
