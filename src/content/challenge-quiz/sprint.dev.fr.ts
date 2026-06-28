/**
 * Corpus Défi QCM — Sprint × dev × FR.
 *
 * 6 cas validés en bloc avec Lætitia 2026-06-21. Principes :
 *  - contexte concis et neutre (équipe, produit, situation observable),
 *  - métriques d'usage présentées sans cible imposée,
 *  - 4 propositions par cas (1 solide, 1 partiel, 2 mauvais pour raisons différentes),
 *  - feedback sur la STRUCTURE de la reformulation, pas sur la pertinence des chiffres.
 */

import type { ChallengeQuizCase } from "../../domain/challenge-quiz";

export const SPRINT_DEV_CHALLENGE_QUIZ_FR: ChallengeQuizCase[] = [
  {
    id: "quiz.sprint.dev.checkout-maintenance",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Checkout",
    iconName: "wrench",
    context:
      "5 devs, 1 Product Owner. L'équipe travaille sur le module de paiement d'une plateforme SaaS B2B. Sprint dédié à la maintenance après une vague d'incidents en production.",
    metrics: [
      { label: "Incidents production / semaine (module commande)", value: "14" },
      { label: "Tickets support escaladés vers la dev / semaine", value: "8" },
      { label: "Temps moyen de résolution d'un incident", value: "3 h" },
    ],
    proposedObjective: "Refactorer le module commande et nettoyer la dette technique.",
    options: [
      {
        id: "A",
        text: "Refactorer le module commande en suivant les règles d'architecture définies.",
        verdict: "bad",
        explanation:
          "« Refactorer » reste un output technique. Aucun bénéficiaire nommé, aucune mesure observable du changement.",
      },
      {
        id: "B",
        text: "Diminuer le nombre d'incidents sur le module commande.",
        verdict: "partial",
        explanation:
          "Outcome correct mais sans avant/après chiffré ni échéance. Reste un vœu.",
      },
      {
        id: "C",
        text: "Faire passer le nombre d'incidents production du module commande de 14 à 5 par semaine d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Outcome mesurable, indicateur précis, avant/après chiffré, échéance dans le sprint. La structure est solide — les chiffres exacts restent à convenir avec le PO.",
      },
      {
        id: "D",
        text: "Améliorer la stabilité du module commande et réduire la dette technique.",
        verdict: "bad",
        explanation:
          "Composite (« et »), deux formulations floues (« améliorer », « dette technique »), aucun seuil ni échéance.",
      },
    ],
  },

  {
    id: "quiz.sprint.dev.intégration-scale",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Intégration",
    iconName: "practice",
    context:
      "7 devs, 1 Product Owner. L'équipe travaille sur le parcours d'inscription d'une plateforme B2C en croissance. Sprint fonctionnalité.",
    metrics: [
      { label: "Taux d'activation des nouveaux comptes à J+30", value: "42 %" },
      { label: "Temps moyen pour compléter l'inscription", value: "9 min" },
      { label: "Comptes créés / semaine", value: "1 200" },
    ],
    proposedObjective: "Améliorer significativement l'expérience utilisateur du parcours d'inscription.",
    options: [
      {
        id: "A",
        text: "Améliorer significativement l'expérience utilisateur du parcours d'inscription.",
        verdict: "bad",
        explanation:
          "« Améliorer » et « significativement » sont flous. Aucun seuil mesurable, aucune échéance.",
      },
      {
        id: "B",
        text: "Faire passer le taux d'activation des nouveaux comptes à J+30 de 42 % à 60 % d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Outcome chiffré sur un indicateur métier nommé, avec échéance précise. La structure tient.",
      },
      {
        id: "C",
        text: "Livrer un nouveau parcours d'inscription plus fluide.",
        verdict: "bad",
        explanation:
          "« Livrer » est un output. « Plus fluide » est subjectif et non mesurable.",
      },
      {
        id: "D",
        text: "Augmenter le taux d'activation à J+30.",
        verdict: "partial",
        explanation:
          "Indicateur correct mais ni avant/après ni échéance. La structure est incomplète.",
      },
    ],
  },

  {
    id: "quiz.sprint.dev.plateforme-archi",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Plateforme",
    iconName: "puzzle",
    context:
      "8 devs, 1 Tech Lead. L'équipe maintient l'infrastructure consommée par 6 autres équipes fonctionnalité. Migration en cours vers une architecture micro-services.",
    metrics: [
      { label: "Temps moyen de déploiement d'un hotfix", value: "4 h" },
      { label: "Releases / mois (toutes équipes)", value: "12" },
      { label: "Incidents d'infra / mois", value: "5" },
    ],
    proposedObjective: "Mettre en place la nouvelle architecture micro-services.",
    options: [
      {
        id: "A",
        text: "Mettre en place la nouvelle architecture micro-services sur le périmètre prévu.",
        verdict: "bad",
        explanation:
          "« Mettre en place » est un output. Aucune mesure du bénéfice côté équipes consommatrices ni côté ops.",
      },
      {
        id: "B",
        text: "Faire passer le temps moyen de déploiement d'un hotfix de 4 h à 1 h d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Indicateur ops observable, avant/après chiffré, échéance. Bénéficiaires implicites mais clairs (équipes fonctionnalité, astreinte).",
      },
      {
        id: "C",
        text: "Permettre aux équipes fonctionnalité de déployer plus rapidement leurs hotfixs.",
        verdict: "partial",
        explanation:
          "Bénéficiaire nommé, outcome correct, mais ni seuil ni échéance. Reste qualitatif.",
      },
      {
        id: "D",
        text: "Refactorer le module de déploiement et finaliser l'orchestrateur.",
        verdict: "bad",
        explanation:
          "Composite (« et »), deux outputs techniques juxtaposés, aucune mesure côté bénéficiaire.",
      },
    ],
  },

  {
    id: "quiz.sprint.dev.mobile-backlog",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Mobile",
    iconName: "sprint",
    context:
      "6 devs, 1 Product Owner. L'équipe travaille sur l'app mobile d'une plateforme de réservation de salles de sport. 80 000 utilisateurs actifs mensuels.\nLe PO a sélectionné en avance 12 récits qui « rentrent dans la vélocité » (28 points sur 30 de capacité). Pendant le sprint planning, l'équipe a essayé de fabriquer un objectif APRÈS la sélection.",
    metrics: [
      { label: "Taux de conversion réservation (mobile)", value: "11 %" },
      { label: "Taux d'abandon panier (mobile)", value: "47 %" },
      { label: "Note App Store", value: "3,8 / 5" },
    ],
    proposedObjective: "Avancer sur les 12 récits prioritaires du backlog.",
    options: [
      {
        id: "A",
        text: "Livrer les 12 récits du sprint en respectant la qualité attendue.",
        verdict: "bad",
        explanation:
          "« Livrer » est un output. La qualité mentionnée n'a pas de mesure.",
      },
      {
        id: "B",
        text: "Augmenter la conversion mobile.",
        verdict: "partial",
        explanation:
          "Outcome correct mais sans seuil ni échéance. Reste un vœu.",
      },
      {
        id: "C",
        text: "Faire passer la conversion mobile de 11 % à 18 % d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Outcome mesuré (conversion), avant/après chiffré, échéance précise. La structure est juste — les chiffres exacts restent à convenir avec le PO.",
      },
      {
        id: "D",
        text: "Améliorer le tunnel de réservation et finir les 4 récits prioritaires.",
        verdict: "bad",
        explanation:
          "Composite (« et »), « améliorer » est flou, retour à du travail sur les récits.",
      },
    ],
  },

  {
    id: "quiz.sprint.dev.search-startup",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Search",
    iconName: "okr",
    context:
      "3 devs, 1 Tech Lead. L'équipe travaille sur la recherche d'une plateforme en phase product/market fit. L'équipe veut tester un nouveau pattern d'autocomplete pour voir s'il améliore l'engagement.",
    metrics: [
      { label: "Taux de clic sur les résultats de recherche", value: "12 %" },
      { label: "Recherches sans clic / jour", value: "3 400" },
      { label: "Recherches totales / jour", value: "9 500" },
    ],
    proposedObjective: "Livrer la v2 de la recherche en autocomplete.",
    options: [
      {
        id: "A",
        text: "Livrer la v2 de la recherche en autocomplete avant la démo.",
        verdict: "bad",
        explanation:
          "« Livrer » est un output. L'autocomplete livré n'a aucune mesure de succès — il pourrait n'être pas utilisé.",
      },
      {
        id: "B",
        text: "Améliorer l'expérience de recherche.",
        verdict: "bad",
        explanation:
          "« Améliorer » et « expérience » sont flous. Aucun bénéficiaire mesurable, aucun seuil.",
      },
      {
        id: "C",
        text: "Faire passer le taux de clic sur les résultats de recherche de 12 % à 20 % d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Outcome utilisateur mesurable, avant/après chiffré, échéance. L'autocomplete devient un moyen, pas le but.",
      },
      {
        id: "D",
        text: "Permettre aux utilisateurs de trouver plus rapidement ce qu'ils cherchent.",
        verdict: "partial",
        explanation:
          "Bénéficiaire et direction corrects mais aucune mesure (que veut dire « plus rapidement » ?) ni échéance.",
      },
    ],
  },

  {
    id: "quiz.sprint.dev.data-ops",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Data",
    iconName: "wrench",
    context:
      "4 devs, 1 SRE. L'équipe maintient les pipelines ETL nocturnes qui alimentent les tableaux de bord de l'équipe Business. Une astreinte hebdomadaire est tenue par les devs à tour de rôle.",
    metrics: [
      { label: "Pipelines qui tombent / semaine", value: "2 à 3" },
      { label: "Bugs ouverts sur les pipelines", value: "11" },
      { label: "Temps passé en astreinte / semaine", value: "6 h" },
    ],
    proposedObjective: "Stabiliser les pipelines ETL et corriger les bugs ouverts.",
    options: [
      {
        id: "A",
        text: "Stabiliser les pipelines ETL et corriger les 11 bugs ouverts.",
        verdict: "bad",
        explanation:
          "Composite (« et »), « stabiliser » est un output, les bugs corrigés ne mesurent pas le bénéfice côté Business ou astreinte.",
      },
      {
        id: "B",
        text: "Réduire le nombre de pipelines qui tombent.",
        verdict: "partial",
        explanation:
          "Outcome correct mais sans seuil ni échéance.",
      },
      {
        id: "C",
        text: "Faire passer le nombre de pipelines qui tombent de 2-3 à 0 par semaine d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Outcome mesurable, indicateur précis, échéance, bénéficiaires implicites clairs (Business, astreinte).",
      },
      {
        id: "D",
        text: "Refactorer les pipelines les plus fragiles.",
        verdict: "bad",
        explanation:
          "Output technique pur. Aucun lien explicite avec le bénéfice attendu (moins de chutes, moins d'astreinte).",
      },
    ],
  },

  // ============================================================
  // Cas 7 — Métrique hors fenêtre temporelle (piège subtil)
  // ============================================================
  {
    id: "quiz.sprint.dev.search-window",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Search",
    iconName: "practice",
    context:
      "5 devs, 1 Product Owner. L'équipe travaille sur la recherche d'un site e-commerce. Sprint dédié à la refonte de l'algorithme de tri des résultats.",
    metrics: [
      { label: "CTR sur les résultats de recherche", value: "18 %" },
      { label: "Sessions avec recherche / jour", value: "4 500" },
      { label: "Taux de retour M+1 des utilisateurs ayant cherché", value: "32 %" },
    ],
    proposedObjective:
      "Augmenter le taux de retour mensuel des utilisateurs du module search.",
    options: [
      {
        id: "A",
        text: "Augmenter le taux de retour mensuel des utilisateurs du module search.",
        verdict: "bad",
        explanation:
          "Pas de seuil, pas de point de départ, pas d'échéance. Et le « taux de retour mensuel » ne peut pas être observé dans un sprint de 2-4 semaines : la fenêtre de mesure ne tient pas dans la fenêtre de l'objectif.",
      },
      {
        id: "B",
        text: "Faire passer le CTR sur les résultats de recherche de 18 % à 28 % d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Métrique observable dans la fenêtre du sprint, point de départ, cible, échéance. C'est un indicateur leading qu'un meilleur tri peut réellement bouger sur cette période.",
      },
      {
        id: "C",
        text: "Faire passer le taux de retour M+1 des utilisateurs search de 32 % à 45 % d'ici la fin du sprint.",
        verdict: "partial",
        explanation:
          "Forme exemplaire (métrique nommée, avant, après, échéance) — mais le taux M+1 se mesure à 1 mois minimum après une session. En fin de sprint, on ne pourra pas dire si l'objectif est atteint. Piège : la fenêtre temporelle de la métrique dépasse la fenêtre du sprint.",
      },
      {
        id: "D",
        text: "Améliorer la pertinence des résultats de recherche.",
        verdict: "bad",
        explanation:
          "« Améliorer » et « pertinence » sont flous. Aucune métrique, aucun seuil, aucune échéance.",
      },
    ],
  },

  // ============================================================
  // Cas 8 — Vanity metric vs métrique d'usage
  // ============================================================
  {
    id: "quiz.sprint.dev.mobile-vanity",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Mobile",
    iconName: "okr",
    context:
      "6 devs, 1 Product Owner. L'équipe construit l'application mobile. Sprint sur la refonte du parcours d'intégration pour les nouveaux utilisateurs.",
    metrics: [
      { label: "Téléchargements / semaine", value: "2 200" },
      { label: "Taux d'activation (1ʳᵉ action clé) des nouveaux utilisateurs", value: "38 %" },
      { label: "Utilisateurs actifs mensuels (MAU)", value: "14 200" },
    ],
    proposedObjective: "Augmenter le nombre de téléchargements de l'app.",
    options: [
      {
        id: "A",
        text: "Faire passer le nombre de téléchargements de 2 200 à 3 500 par semaine d'ici la fin du sprint.",
        verdict: "partial",
        explanation:
          "Forme correcte (métrique, avant, après, échéance) mais c'est une vanity metric : un téléchargement ne dit rien de l'usage réel. L'objectif du sprint étant l'intégration, la métrique pertinente est l'activation.",
      },
      {
        id: "B",
        text: "Faire passer le taux d'activation des nouveaux utilisateurs (1ʳᵉ action clé) de 38 % à 55 % d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Métrique d'usage qui mesure l'effet réel de l'intégration — pas un téléchargement orphelin. Aligné avec le travail effectif de l'équipe.",
      },
      {
        id: "C",
        text: "Livrer la nouvelle page d'intégration mobile.",
        verdict: "bad",
        explanation:
          "Output pur. La page peut être livrée sans changer le moindre comportement utilisateur.",
      },
      {
        id: "D",
        text: "Optimiser le parcours d'intégration mobile.",
        verdict: "bad",
        explanation:
          "« Optimiser » est flou. Aucun chiffre, aucune cible, aucune fenêtre.",
      },
    ],
  },

  // ============================================================
  // Cas 9 — Cible irréaliste pour la fenêtre du sprint
  // ============================================================
  {
    id: "quiz.sprint.dev.api-ambition",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Plateforme API",
    iconName: "wrench",
    context:
      "4 devs, 1 SRE, 1 Tech Lead. L'équipe maintient les APIs internes utilisées par les équipes produit. Sprint perf pour préparer une montée en charge prévue dans deux mois.",
    metrics: [
      { label: "Temps de réponse p95 de l'API (actuel)", value: "850 ms" },
      { label: "Charge max supportée sans dégradation", value: "1 200 req/s" },
      { label: "Incidents perf signalés par les consommateurs / semaine", value: "4" },
    ],
    proposedObjective:
      "Diviser par 10 le temps de réponse p95 de l'API d'ici la fin du sprint.",
    options: [
      {
        id: "A",
        text: "Diviser par 10 le temps de réponse p95 de l'API d'ici la fin du sprint.",
        verdict: "bad",
        explanation:
          "Passer de 850 ms à 85 ms en 2-4 semaines est très peu crédible — c'est un vœu pieux, pas un objectif. objectif de Sprint mal calibré : ambition incohérente avec la fenêtre. Mieux vaut viser ambitieux mais crédible.",
      },
      {
        id: "B",
        text: "Faire passer le temps de réponse p95 de l'API de 850 ms à 400 ms d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Ambition crédible (~50 % de réduction), métrique nommée, avant, après, échéance. L'équipe peut s'engager honnêtement et juger à la fin du sprint.",
      },
      {
        id: "C",
        text: "Diviser par 2 le temps de réponse p95 de l'API.",
        verdict: "partial",
        explanation:
          "Métrique nommée, facteur de variation correct (par 2 = crédible). Mais sans point de départ explicite ni échéance, on perd la lecture immédiate de l'effort. Préférer la forme « de A à B d'ici X ».",
      },
      {
        id: "D",
        text: "Optimiser les performances de l'API.",
        verdict: "bad",
        explanation:
          "Pas de métrique, pas de cible, pas d'échéance. « Optimiser » seul ne crée aucun engagement vérifiable.",
      },
    ],
  },

  // ============================================================
  // Cas 10 — Indicateur leading sous influence vs lagging dépendant de tiers
  // ============================================================
  {
    id: "quiz.sprint.dev.upgrade-leading",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Upgrade",
    iconName: "target",
    context:
      "4 devs, 1 Product Owner. L'équipe travaille sur le tunnel de passage essai → payant. Sprint de redesign de l'écran de fin d'essai. Le pricing et le commercial sont gérés ailleurs.",
    metrics: [
      { label: "Taux de conversion essai → payant (PI précédent)", value: "12 %" },
      { label: "Sessions essai arrivant en fin de période / semaine", value: "1 800" },
      { label: "Taux de clic sur le bouton « souscrire » depuis l'écran de fin", value: "22 %" },
    ],
    proposedObjective:
      "Faire passer le taux de conversion essai → payant de 12 % à 18 % d'ici la fin du sprint.",
    options: [
      {
        id: "A",
        text: "Faire passer le taux de conversion essai → payant de 12 % à 18 % d'ici la fin du sprint.",
        verdict: "partial",
        explanation:
          "Forme exemplaire — mais la conversion finale dépend aussi du pricing, du commercial, du temps de réflexion utilisateur. L'équipe n'a pas la main directe sur tous ces leviers. Pour un sprint, mieux vaut viser un indicateur leading sous influence directe.",
      },
      {
        id: "B",
        text: "Faire passer le taux de clic sur « souscrire » depuis l'écran de fin d'essai de 22 % à 35 % d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Métrique directement sous l'influence du redesign que l'équipe livre. Observable immédiatement en fin de sprint. Indicateur leading qui contribue à la conversion (suivie en aval, par l'équipe Upgrade au PI).",
      },
      {
        id: "C",
        text: "Améliorer le tunnel premium.",
        verdict: "bad",
        explanation:
          "Pas de métrique, pas de cible. Reformulation vide pour un sprint qui demande un cap clair.",
      },
      {
        id: "D",
        text: "Livrer la nouvelle landing page premium d'ici la fin du sprint.",
        verdict: "bad",
        explanation:
          "Output. La page peut être livrée sans effet sur la conversion.",
      },
    ],
  },

  // ============================================================
  // Cas 11 — Composite caché (par « pour » causal)
  // ============================================================
  {
    id: "quiz.sprint.dev.oauth-implicit-composite",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Auth",
    iconName: "target",
    context:
      "5 devs, 1 Product Owner. L'équipe travaille sur l'authentification du site marchand. Sprint sur l'ouverture de la connexion OAuth pour réduire la friction au paiement.",
    metrics: [
      { label: "Tentatives OAuth / jour", value: "480" },
      { label: "Sessions OAuth réussies / jour", value: "12" },
      { label: "Taux d'abandon sur la page de login", value: "28 %" },
    ],
    proposedObjective:
      "Permettre aux utilisateurs invités de se connecter via OAuth pour réduire les abandons de paiement.",
    options: [
      {
        id: "A",
        text: "Permettre aux utilisateurs invités de se connecter via OAuth pour réduire les abandons de paiement.",
        verdict: "bad",
        explanation:
          "Composite caché par le « pour » causal. Deux objectifs liés : ouvrir OAuth ET faire baisser l'abandon. Si OAuth marche mais l'abandon ne baisse pas, l'objectif est-il atteint ? Le « pour » fait passer un implicite pour une certitude.",
      },
      {
        id: "B",
        text: "Faire passer le taux d'abandon sur la page de login de 28 % à 12 % d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Un seul outcome mesurable. OAuth devient un moyen, l'objectif est ce qu'on cherche à constater chez l'utilisateur.",
      },
      {
        id: "C",
        text: "Mettre en place OAuth pour les utilisateurs invités d'ici la fin du sprint.",
        verdict: "bad",
        explanation:
          "Output. La fonctionnalité peut être en place sans effet observable côté abandon. Mauvais objectif de Sprint.",
      },
      {
        id: "D",
        text: "Améliorer l'expérience de connexion sur la page de paiement.",
        verdict: "bad",
        explanation:
          "« Améliorer » + « expérience » : flou pur. Pas de métrique, pas de seuil.",
      },
    ],
  },

  // ============================================================
  // Cas 12 — Bonne forme mais métrique hors cycle (NPS sur 2 sem)
  // ============================================================
  {
    id: "quiz.sprint.dev.search-front-nps",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Frontend Search",
    iconName: "practice",
    context:
      "4 devs front, 1 Product Owner. L'équipe maintient l'affichage des résultats de recherche. Sprint d'optimisation du rendu (composant ResultsList).",
    metrics: [
      { label: "Temps de rendu front p95 des résultats", value: "320 ms" },
      { label: "NPS de la fonctionnalité recherche (enquête trimestrielle)", value: "42" },
      { label: "Taux de clic sur les résultats", value: "18 %" },
    ],
    proposedObjective:
      "Faire passer le NPS de la fonctionnalité recherche de 42 à 60 d'ici la fin du sprint.",
    options: [
      {
        id: "A",
        text: "Faire passer le NPS de la fonctionnalité recherche de 42 à 60 d'ici la fin du sprint.",
        verdict: "partial",
        explanation:
          "Forme exemplaire — mais le NPS se mesure via une enquête trimestrielle. En fin de sprint, aucune mesure ne sera disponible. Piège classique : bonne grammaire, mauvaise cadence de mesure.",
      },
      {
        id: "B",
        text: "Diviser par 2 le temps de rendu front des résultats de recherche (de 320 ms à 160 ms) d'ici la fin du sprint.",
        verdict: "good",
        explanation:
          "Métrique technique observable en continu, sous influence directe de l'équipe, mesurable en fin de sprint. Cadence cohérente.",
      },
      {
        id: "C",
        text: "Optimiser le rendu des résultats de recherche.",
        verdict: "bad",
        explanation:
          "« Optimiser » est flou. Pas de seuil ni d'échéance.",
      },
      {
        id: "D",
        text: "Refactorer le composant ResultsList en suivant les nouvelles règles d'architecture.",
        verdict: "bad",
        explanation:
          "Output technique. Aucun effet nommé côté rendu, utilisateur ou métrique observable.",
      },
    ],
  },
];
