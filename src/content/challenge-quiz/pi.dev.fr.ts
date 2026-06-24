/**
 * Corpus Défi QCM — PI × dev × FR.
 *
 * 6 cas. Pattern : contexte train SAFe + métriques observables + objectif PI proposé
 * (mauvais) + 4 reformulations à juger.
 *
 * Chaque cas cible un piège distinct des PI Objectives :
 *  1. Output technique (« Refactorer ») au lieu d'un outcome de valeur métier
 *  2. Activité technique sans mesure de valeur (« Migrer vers… »)
 *  3. « Avec succès » / vœu pieux sans seuil — sur un stretch
 *  4. Mot flou (« significativement ») alors que la cible chiffrée existe
 *  5. Composite (« stabiliser et alléger ») — deux PI Objectives en un
 *  6. Variation floue (« de manière notable ») au lieu de seuil chiffré
 *
 * Spécificités PI évoquées dans le contexte narratif :
 *  - committed vs stretch (calibrage),
 *  - rôle du Business Owner,
 *  - PI Review comme fenêtre de mesure,
 *  - train d'équipes (plusieurs équipes coordonnées).
 *
 * Principes (cohérent Sprint et OKR) : contexte neutre, métriques sans cible imposée,
 * feedback sur la STRUCTURE, pas sur les valeurs (qui relèvent du Business Owner).
 */

import type { ChallengeQuizCase } from "../../domain/challenge-quiz";

export const PI_DEV_CHALLENGE_QUIZ_FR: ChallengeQuizCase[] = [
  // ============================================================
  // Cas 1 — Output technique (« Refactorer ») au lieu d'un outcome
  // ============================================================
  {
    id: "quiz.pi.dev.checkout-train",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Checkout · 4 équipes",
    iconName: "wrench",
    context:
      "Le train regroupe 4 équipes autour du tunnel d'achat. Le Business Owner pousse pour augmenter les conversions mobile. PI Planning dans deux semaines, objectif à figer en committed.",
    metrics: [
      { label: "Taux de conversion tunnel mobile (PI précédent)", value: "2,3 %" },
      { label: "Trafic mobile / mois", value: "1,4 M visites" },
      { label: "Sessions abandonnées au paiement / mois", value: "32 %" },
    ],
    proposedObjective: "Refactorer le tunnel d'achat mobile et améliorer l'UX globale.",
    options: [
      {
        id: "A",
        text: "Refactorer le tunnel d'achat mobile et améliorer l'UX globale.",
        verdict: "bad",
        explanation:
          "« Refactorer » est un output technique. « Améliorer l'UX » est flou. Le Business Owner ne saura pas à la PI Review si l'objectif est atteint ou pas.",
      },
      {
        id: "B",
        text: "Faire passer le taux de conversion du tunnel mobile de 2,3 % à 3,5 % d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Outcome de valeur métier, métrique nommée, point de départ, cible, fenêtre de mesure (PI Review). Le Business Owner peut juger sans ambiguïté.",
      },
      {
        id: "C",
        text: "Augmenter les conversions sur mobile.",
        verdict: "partial",
        explanation:
          "Outcome correct, métrique implicite. Mais aucun seuil chiffré, aucune fenêtre. À renforcer avec « de X à Y » et l'échéance de PI.",
      },
      {
        id: "D",
        text: "Livrer la v2 du tunnel d'achat mobile sur le PI.",
        verdict: "bad",
        explanation:
          "« Livrer la v2 » est une livraison, pas un résultat de valeur. Et si la v2 est livrée mais que la conversion baisse ? La PI Review devra trancher sans critère.",
      },
    ],
  },

  // ============================================================
  // Cas 2 — Activité technique sans mesure de valeur
  // ============================================================
  {
    id: "quiz.pi.dev.sso-enterprise",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Auth · 3 équipes",
    iconName: "target",
    context:
      "Le commercial bloque depuis 6 mois sur l'argument SSO chez les grands comptes. Activation SSO aujourd'hui manuelle, 2 semaines par client. PI Planning impose un committed avec une cible chiffrée.",
    metrics: [
      { label: "Clients entreprise avec SSO activé", value: "8 sur 47" },
      { label: "Temps moyen d'activation SSO par client", value: "12 jours" },
      { label: "Deals bloqués par l'argument SSO (sales)", value: "11" },
    ],
    proposedObjective: "Migrer l'authentification vers OAuth 2.0.",
    options: [
      {
        id: "A",
        text: "Migrer l'authentification vers OAuth 2.0.",
        verdict: "bad",
        explanation:
          "Activité technique pure. Le verrou commercial reste sans réponse mesurable : combien de clients passeront en self-service, en combien de temps ?",
      },
      {
        id: "B",
        text: "Permettre à 80 % des clients entreprise d'activer le SSO en self-service avant la fin du PI (de 8 / 47 à 38 / 47).",
        verdict: "good",
        explanation:
          "Outcome côté client, métrique nommée, point de départ, cible, fenêtre de mesure. La migration OAuth devient un moyen, pas une fin.",
      },
      {
        id: "C",
        text: "Réduire le temps d'activation SSO d'un client entreprise.",
        verdict: "partial",
        explanation:
          "Bonne métrique, mais sans seuil ni point de départ. Préciser : passer de 12 jours à 1 jour, par exemple.",
      },
      {
        id: "D",
        text: "Mettre en place le self-service pour le SSO d'ici la PI Review.",
        verdict: "bad",
        explanation:
          "« Mettre en place » nomme un projet, pas un changement constaté. Si le self-service est en place mais utilisé par 2 clients, est-ce un succès ?",
      },
    ],
  },

  // ============================================================
  // Cas 3 — « Avec succès » / vœu pieux sans seuil — stretch
  // ============================================================
  {
    id: "quiz.pi.dev.marketplace-pilot",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Marketplace · 5 équipes",
    iconName: "okr",
    context:
      "Nouvelle offre marketplace en lancement, le train explore. Le PI Planning impose un objectif **stretch** : ambitieux, confiance 30-60 %. Tout le monde sait que ça peut tomber à 0, mais on vise haut.",
    metrics: [
      { label: "Clients pilotes signés à ce jour", value: "0" },
      { label: "Prospects en discussion", value: "23" },
      { label: "Hypothèse de volume de transactions cible (offre)", value: "non figée" },
    ],
    proposedObjective: "Lancer la marketplace en production avec succès sur ce PI.",
    options: [
      {
        id: "A",
        text: "Lancer la marketplace en production avec succès sur ce PI.",
        verdict: "bad",
        explanation:
          "« Avec succès » est vide. À la PI Review, deux personnes peuvent défendre des verdicts opposés. Sur un stretch, c'est précisément là où la rigueur de mesure compte.",
      },
      {
        id: "B",
        text: "Faire entrer 3 clients pilotes sur la nouvelle offre marketplace avant la PI Review.",
        verdict: "good",
        explanation:
          "Seuil chiffré (3), bénéficiaire (clients pilotes), fenêtre (PI Review). Ambitieux pour un stretch (on est à 0 aujourd'hui), mais falsifiable d'un coup d'œil.",
      },
      {
        id: "C",
        text: "Atteindre 100 transactions sur la marketplace d'ici la fin du PI.",
        verdict: "partial",
        explanation:
          "Métrique observable, cible chiffrée — bonne structure. Mais 100 transactions sans qualifier qui les fait : 100 transactions chez 1 seul gros client ne valide pas l'hypothèse marketplace.",
      },
      {
        id: "D",
        text: "Déployer toutes les fonctionnalités prévues pour la v1 de la marketplace.",
        verdict: "bad",
        explanation:
          "Mesure le travail interne, pas l'adoption. Sur un stretch, l'enjeu est l'apprentissage marché — pas la complétion d'une roadmap.",
      },
    ],
  },

  // ============================================================
  // Cas 4 — Mot flou alors que la cible existe — committed
  // ============================================================
  {
    id: "quiz.pi.dev.onboarding-scale",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Onboarding · 4 équipes",
    iconName: "practice",
    context:
      "Le taux d'activation des nouveaux comptes stagne à 42 % depuis deux trimestres. Le board demande +20 points sur ce PI. Train coordonné acquisition / produit / support. Cible committed, confiance équipe estimée à 85 %.",
    metrics: [
      { label: "Taux d'activation à J+30 (PI précédent)", value: "42 %" },
      { label: "Nouveaux comptes créés / mois", value: "1 200" },
      { label: "Cible board exprimée", value: "62 %" },
    ],
    proposedObjective: "Augmenter significativement l'activation utilisateur.",
    options: [
      {
        id: "A",
        text: "Augmenter significativement l'activation utilisateur.",
        verdict: "bad",
        explanation:
          "« Significativement » est flou alors que la cible est connue (+20 pts, 62 %). Sur un committed, l'absence de seuil chiffré est une faute.",
      },
      {
        id: "B",
        text: "Faire passer le taux d'activation à J+30 de 42 % à 62 % d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ (42 %), cible (62 %), fenêtre (PI Review). Aligné avec la demande du board, mesurable sans débat.",
      },
      {
        id: "C",
        text: "Améliorer le parcours d'inscription et réduire le taux d'abandon.",
        verdict: "bad",
        explanation:
          "« Améliorer » est flou, et c'est composite (deux objectifs). Sur un committed, on attend un cap unique chiffré.",
      },
      {
        id: "D",
        text: "Atteindre 62 % d'activation à J+30 d'ici la fin du PI.",
        verdict: "partial",
        explanation:
          "Cible chiffrée et fenêtre — bonne base. Mais sans point de départ (42 %), on perd la lecture de l'effort fourni par le train.",
      },
    ],
  },

  // ============================================================
  // Cas 5 — Composite (« stabiliser et alléger ») — stretch
  // ============================================================
  {
    id: "quiz.pi.dev.platform-stability",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Plateforme · 6 équipes",
    iconName: "wrench",
    context:
      "La plateforme est victime de son succès. MTTR de 45 min, 8 incidents majeurs ce trimestre. Les équipes feature passent 30 % de leur temps en oncall. Objectif stretch ambitieux pour ce PI.",
    metrics: [
      { label: "MTTR moyen (PI précédent)", value: "45 min" },
      { label: "Incidents majeurs / trimestre", value: "8" },
      { label: "Temps oncall des équipes feature", value: "30 %" },
    ],
    proposedObjective: "Stabiliser la plateforme et alléger la charge oncall des équipes feature.",
    options: [
      {
        id: "A",
        text: "Stabiliser la plateforme et alléger la charge oncall des équipes feature.",
        verdict: "bad",
        explanation:
          "Composite (« et » coordonne deux objectifs distincts) + verbe d'output (« stabiliser ») + flou. Sépare en deux PI Objectives, chacun mesurable.",
      },
      {
        id: "B",
        text: "Diviser par 3 le MTTR moyen de la plateforme (de 45 min à 15 min) d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Un seul résultat, métrique nommée, point de départ, cible, fenêtre. Le sujet « charge oncall » devient un autre PI Objective du même train, séparé.",
      },
      {
        id: "C",
        text: "Réduire la dette technique de la plateforme.",
        verdict: "bad",
        explanation:
          "« Dette technique » est flou. Le Business Owner ne pourra pas juger à la PI Review. Aucun bénéficiaire externe ne ressent directement la dette technique.",
      },
      {
        id: "D",
        text: "Ramener le temps oncall des équipes feature de 30 % à 10 % d'ici la PI Review.",
        verdict: "partial",
        explanation:
          "Bon outcome, bonne mesure, bonne fenêtre — c'est un PI Objective valide. Mais c'est la **deuxième moitié** de l'objectif initial. À porter dans un autre PI Objective du même train, pas en remplacement.",
      },
    ],
  },

  // ============================================================
  // Cas 6 — Variation floue (« de manière notable ») — committed
  // ============================================================
  {
    id: "quiz.pi.dev.churn-premium",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Retention · 3 équipes",
    iconName: "target",
    context:
      "Le churn mensuel des comptes premium est passé de 1,8 % à 4 % sur les derniers trimestres. Le board veut un committed avec cible chiffrée pour ce PI. Confiance équipe estimée à 80 %.",
    metrics: [
      { label: "Churn mensuel comptes premium (actuel)", value: "4 %" },
      { label: "Churn mensuel historique (référence)", value: "1,8 %" },
      { label: "Nombre de comptes premium actifs", value: "2 400" },
    ],
    proposedObjective: "Réduire le churn premium de manière notable d'ici la fin du PI.",
    options: [
      {
        id: "A",
        text: "Réduire le churn premium de manière notable d'ici la fin du PI.",
        verdict: "bad",
        explanation:
          "« De manière notable » est non mesurable. Sur un committed à 80 % de confiance, on attend une cible chiffrée nette — la métrique et la référence historique existent.",
      },
      {
        id: "B",
        text: "Faire passer le churn mensuel des comptes premium de 4 % à 2 % d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ (4 %), cible (2 %, proche de l'historique 1,8 %), fenêtre. Falsifiable, calibré sur la confiance équipe.",
      },
      {
        id: "C",
        text: "Diviser le churn premium par deux d'ici la fin du PI.",
        verdict: "partial",
        explanation:
          "Variation chiffrée, fenêtre — bonne base. Mais formulation relative (« par deux ») qui demande un calcul mental. La forme « de 4 % à 2 % » se vérifie d'un coup d'œil.",
      },
      {
        id: "D",
        text: "Améliorer la rétention des comptes premium.",
        verdict: "bad",
        explanation:
          "Pas de chiffre, pas de seuil, mot flou (« améliorer »). À la PI Review, deux personnes peuvent défendre que c'est atteint sans s'accorder.",
      },
    ],
  },

  // ============================================================
  // Cas 7 — Métrique long terme (LTV) avec fenêtre PI inadaptée
  // ============================================================
  {
    id: "quiz.pi.dev.mobile-ltv-window",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Mobile · 5 équipes",
    iconName: "okr",
    context:
      "Le train mobile prépare une refonte UX importante. Le Business Owner pousse sur la valeur long terme par utilisateur. PI Planning impose un committed avec cible mesurable à la PI Review (8 semaines).",
    metrics: [
      { label: "LTV utilisateurs mobile (cohorte 12 mois)", value: "80 €" },
      { label: "Taux d'engagement à 30 jours (proxy retention)", value: "28 %" },
      { label: "MAU mobile", value: "62 000" },
    ],
    proposedObjective:
      "Faire passer le LTV des utilisateurs mobile de 80 € à 120 € sur le PI.",
    options: [
      {
        id: "A",
        text: "Faire passer le LTV des utilisateurs mobile de 80 € à 120 € sur le PI.",
        verdict: "partial",
        explanation:
          "Forme exemplaire (métrique, avant, après) — mais le LTV se calcule sur 12 mois de comportement. À la PI Review (8 semaines), aucune mesure de LTV ne sera disponible. La cadence de mesure ne tient pas dans la cadence PI.",
      },
      {
        id: "B",
        text: "Faire passer le taux d'engagement à 30 jours des nouveaux utilisateurs mobile de 28 % à 50 % d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Proxy leading du LTV, observable dans la fenêtre PI. Sous influence directe du train (refonte UX). Mesurable et attribuable à la PI Review.",
      },
      {
        id: "C",
        text: "Améliorer significativement la valeur des utilisateurs mobile.",
        verdict: "bad",
        explanation:
          "« Améliorer » + « significativement » : double flou. Pas de métrique nommée, pas de seuil, pas de fenêtre.",
      },
      {
        id: "D",
        text: "Livrer la refonte UX mobile sur ce PI.",
        verdict: "bad",
        explanation:
          "Output. La refonte peut être livrée sans effet sur la valeur produit. Mauvais PI Objective.",
      },
    ],
  },

  // ============================================================
  // Cas 8 — Outcome dépendant d'un autre train (sous-influence floue)
  // ============================================================
  {
    id: "quiz.pi.dev.analytics-cross-team",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Données · 4 équipes",
    iconName: "wrench",
    context:
      "Train Données qui maintient la plateforme analytics interne. Les équipes business sont les clientes. Sur ce PI, le train veut formaliser sa contribution à la prise de décision business.",
    metrics: [
      { label: "Équipes business utilisant la plateforme / mois", value: "9 / 14" },
      { label: "Temps moyen entre question business et réponse via plateforme", value: "3 jours" },
      { label: "Tickets « besoin d'aide analyse » / mois", value: "42" },
    ],
    proposedObjective:
      "Permettre aux équipes business de prendre 80 % de leurs décisions via la plateforme analytics d'ici la PI Review.",
    options: [
      {
        id: "A",
        text: "Permettre aux équipes business de prendre 80 % de leurs décisions via la plateforme analytics d'ici la PI Review.",
        verdict: "partial",
        explanation:
          "Bonne intention, métrique attractive — mais qu'une équipe business « prenne une décision via la plateforme » dépend autant de leur maturité analytique que de la plateforme. Le train n'a pas la main directe : sous-influence partielle. Et la métrique est difficile à instrumenter objectivement.",
      },
      {
        id: "B",
        text: "Faire passer le temps moyen pour répondre à une question business via la plateforme de 3 jours à 2 h d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Métrique directement sous l'influence du train (vitesse de réponse de la plateforme). Mesurable, observable à la PI Review. Crée un appel à utiliser la plateforme — sans dépendre de la maturité des équipes clientes.",
      },
      {
        id: "C",
        text: "Améliorer la plateforme analytics pour les équipes business.",
        verdict: "bad",
        explanation:
          "Flou pur. Aucune métrique, aucun seuil. À la PI Review, personne ne saura trancher.",
      },
      {
        id: "D",
        text: "Mettre en place les 12 nouveaux tableaux de bord demandés par les équipes business sur ce PI.",
        verdict: "bad",
        explanation:
          "Output. Les 12 tableaux peuvent être livrés sans changer le temps de réponse ni l'usage réel. Mesure le travail, pas la valeur.",
      },
    ],
  },

  // ============================================================
  // Cas 9 — Calibrage committed/stretch incohérent
  // ============================================================
  {
    id: "quiz.pi.dev.compliance-miscalibration",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Conformité · 3 équipes",
    iconName: "target",
    context:
      "Échéance réglementaire RGPD dans 18 mois. Le train fait une première vague d'audit. Le DPO veut une cible engageante. Confiance équipe à 45 % de tenir la cible 100 % en un PI.",
    metrics: [
      { label: "Traitements de données client identifiés", value: "184" },
      { label: "Traitements actuellement conformes RGPD", value: "62 / 184" },
      { label: "Confiance équipe d'atteindre 100 % en un PI", value: "45 %" },
    ],
    proposedObjective:
      "Atteindre 100 % de conformité RGPD sur les traitements de données client d'ici la PI Review — classé committed.",
    options: [
      {
        id: "A",
        text: "Atteindre 100 % de conformité RGPD sur les traitements de données client d'ici la PI Review — classé committed.",
        verdict: "bad",
        explanation:
          "Calibrage incohérent. Un committed se vise à 80-100 % de confiance ; ici l'équipe est à 45 %. À la PI Review, l'objectif ratera l'engagement committed — perte de crédibilité pour le train.",
      },
      {
        id: "B",
        text: "Atteindre 100 % de conformité RGPD sur les traitements de données client d'ici la PI Review — classé stretch.",
        verdict: "good",
        explanation:
          "Même cible, classement honnête. Un stretch se vise à 30-60 % de confiance — exactement la situation. À la PI Review, atteindre 80 % sur un stretch est un vrai succès.",
      },
      {
        id: "C",
        text: "Faire passer le nombre de traitements conformes RGPD de 62 à 122 d'ici la PI Review — classé committed.",
        verdict: "partial",
        explanation:
          "Cible chiffrée crédible (≈ doubler), classement committed cohérent avec une confiance probable >80 %. C'est défendable, mais moins ambitieux que ce que veut le DPO. Selon le contexte stratégique, B (stretch à 100 %) ou C (committed à 122) peuvent se défendre — le piège est uniquement A (committed à 100 % avec 45 % de confiance).",
      },
      {
        id: "D",
        text: "Améliorer notre conformité RGPD.",
        verdict: "bad",
        explanation:
          "Pas de chiffre, pas de seuil, pas de fenêtre. Hors-jeu pour un PI Objective.",
      },
    ],
  },

  // ============================================================
  // Cas 10 — Métrique vanity (visiteurs) vs métrique de fin (GMV)
  // ============================================================
  {
    id: "quiz.pi.dev.marketplace-vanity",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Marketplace · 5 équipes",
    iconName: "okr",
    context:
      "La marketplace a 8 mois. Phase scale-up. Le Business Owner pousse pour démontrer la traction commerciale au board, qui décidera de l'investissement sur l'année suivante.",
    metrics: [
      { label: "Visiteurs uniques mensuels marketplace", value: "12 000" },
      { label: "GMV mensuel (Gross Merchandise Value)", value: "50 k€" },
      { label: "Acheteurs uniques mensuels", value: "180" },
    ],
    proposedObjective:
      "Atteindre 50 000 visiteurs uniques mensuels sur la marketplace d'ici la PI Review.",
    options: [
      {
        id: "A",
        text: "Atteindre 50 000 visiteurs uniques mensuels sur la marketplace d'ici la PI Review.",
        verdict: "partial",
        explanation:
          "Métrique nommée, cible, fenêtre. Mais c'est une vanity metric : un visiteur ne dit rien de la traction commerciale. Le board attend du GMV ou des acheteurs, pas du trafic.",
      },
      {
        id: "B",
        text: "Faire passer le GMV mensuel de la marketplace de 50 k€ à 200 k€ d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Métrique de fin (valeur économique), point de départ, cible, fenêtre. Aligné avec ce que le board veut voir, mesurable à la PI Review.",
      },
      {
        id: "C",
        text: "Faire de notre marketplace la plus dynamique de notre secteur.",
        verdict: "bad",
        explanation:
          "C'est un Objective qualitatif inspirant, pas un PI Objective mesurable. Pas de métrique, pas de seuil.",
      },
      {
        id: "D",
        text: "Lancer 5 nouvelles catégories produit sur la marketplace ce PI.",
        verdict: "bad",
        explanation:
          "Output. 5 catégories peuvent être lancées sans traction commerciale. Le PI Objective ne doit pas mesurer le travail interne.",
      },
    ],
  },

  // ============================================================
  // Cas 11 — Effet de bord négatif (qualité d'inscription)
  // ============================================================
  {
    id: "quiz.pi.dev.signup-guardrail",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Acquisition · 4 équipes",
    iconName: "challenge",
    context:
      "Le train Acquisition pousse la croissance via la landing page principale. Le board veut +3x sur les inscriptions. L'équipe Rétention rappelle qu'augmenter le volume sans qualifier dégrade le churn.",
    metrics: [
      { label: "Taux d'inscription depuis la landing page", value: "4 %" },
      { label: "Taux d'activation J+7 des nouveaux inscrits", value: "45 %" },
      { label: "Inscriptions qualifiées (activées J+7) / mois", value: "320" },
    ],
    proposedObjective:
      "Faire passer le taux d'inscription depuis la landing page de 4 % à 12 % d'ici la PI Review.",
    options: [
      {
        id: "A",
        text: "Faire passer le taux d'inscription depuis la landing page de 4 % à 12 % d'ici la PI Review.",
        verdict: "partial",
        explanation:
          "Forme correcte. Mais isolément, on peut tripler le taux d'inscription en attirant n'importe qui — au prix d'un churn massif derrière. Sans métrique guardrail (qualité), le PI Objective peut être atteint en détruisant de la valeur en aval.",
      },
      {
        id: "B",
        text: "Faire passer le taux d'inscription qualifiée (activée J+7) depuis la landing page de 1,8 % à 5 % d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Métrique composée qui intègre la qualité : on ne compte que les inscrits qui ont fait quelque chose. Impossible de l'atteindre en attirant n'importe qui. Outcome aligné avec la valeur, pas avec le volume.",
      },
      {
        id: "C",
        text: "Augmenter le volume d'inscriptions sur la landing page sans dégrader la rétention.",
        verdict: "partial",
        explanation:
          "Intention juste (le guardrail est nommé) mais pas de chiffre, pas de seuil, pas de fenêtre. Pour un PI Objective, il faut quantifier.",
      },
      {
        id: "D",
        text: "Refondre la landing page et améliorer le tunnel d'acquisition.",
        verdict: "bad",
        explanation:
          "Composite (« et »), deux outputs. Aucune métrique. Vœu pieux côté valeur.",
      },
    ],
  },

  // ============================================================
  // Cas 12 — KR de moyen vs KR de fin (couverture vs MTTR)
  // ============================================================
  {
    id: "quiz.pi.dev.platform-means-vs-ends",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Plateforme · 6 équipes",
    iconName: "wrench",
    context:
      "Train Plateforme. PI Objective autour de la fiabilité. Le SRE pousse pour des indicateurs de mécanique interne (couverture, alerting). Le Business Owner veut des indicateurs perçus par les équipes feature consommatrices.",
    metrics: [
      { label: "MTTR moyen des incidents plateforme", value: "45 min" },
      { label: "Couverture de tests d'intégration", value: "62 %" },
      { label: "Temps oncall des équipes feature", value: "30 %" },
    ],
    proposedObjective:
      "Atteindre 90 % de couverture de tests d'intégration sur la plateforme d'ici la PI Review.",
    options: [
      {
        id: "A",
        text: "Atteindre 90 % de couverture de tests d'intégration sur la plateforme d'ici la PI Review.",
        verdict: "partial",
        explanation:
          "Métrique nommée, cible, fenêtre — forme correcte. Mais la couverture est une métrique de moyen, pas de fin. Atteindre 90 % de couverture ne garantit pas que la plateforme est plus fiable côté équipes feature. Le Business Owner attend une métrique de fin.",
      },
      {
        id: "B",
        text: "Faire passer le MTTR moyen des incidents plateforme de 45 min à 15 min d'ici la PI Review.",
        verdict: "good",
        explanation:
          "Métrique de fin (la fiabilité perçue par les équipes feature : moins de temps en panne). La couverture devient un des leviers possibles pour y arriver, parmi d'autres. Aligné avec ce que mesure le Business Owner.",
      },
      {
        id: "C",
        text: "Stabiliser la plateforme et alléger la charge oncall.",
        verdict: "bad",
        explanation:
          "Composite + flou. Deux objectifs (stabilisation + oncall) sans seuils chiffrés.",
      },
      {
        id: "D",
        text: "Mettre en place le nouveau système d'alerting.",
        verdict: "bad",
        explanation:
          "Output. Le système peut être en place sans effet sur la fiabilité ressentie.",
      },
    ],
  },
];
