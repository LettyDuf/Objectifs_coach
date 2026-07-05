/**
 * Corpus Défi QCM — OKR entreprise × manager × FR.
 *
 * 12 cas. Pattern : contexte (facultatif) + Objective annuel/strategique deja
 * pose par le CODIR (qualitatif, acceptable) + 1 Resultat cle fautif propose
 * par le CODIR + 4 reformulations a juger.
 *
 * Echelle ENTREPRISE (CODIR, strategie annuelle) - pas une equipe de dev.
 * `teamLabel` porte le nom de l'entreprise ou de la division concernee.
 *
 * 2 cas par piege, repris des 6 pieges structurels de l'OKR equipe :
 *  1. Resultat cle projet (verbe d'output : lancer, deployer, ouvrir...)
 *  2. KR-flou (pas de metrique nommee)
 *  3. KR-health-metric (etat a maintenir, pas changement a atteindre)
 *  4. KR-sur-confiance (cible trop facile, c'est une tache presque faite)
 *  5. KR composite (deux resultats coordonnes par « et »)
 *  6. KR sans avant/apres (cible absolue sans valeur de reference)
 *
 * Principes (coherents avec okr-equipe.dev.fr.ts et sprint.dev.fr.ts) :
 *  - contexte ajoute seulement quand il apporte une info utile a la decision
 *    (sinon le champ `context` est omis - audit du 2026-07-04, cf.
 *    commentaire dans domain/challenge-quiz.ts),
 *  - metriques d'usage sans cible obligatoire,
 *  - 4 propositions par cas (1 solide, 1 partiel, 2 mauvais pour raisons differentes),
 *  - feedback sur la STRUCTURE du KR, pas sur la pertinence des chiffres,
 *  - regle D35 : les options mauvaises/partielles portent des chiffres
 *    decoratifs comparables a l'option bonne, pour ne jamais trahir la
 *    reponse par la seule densite numerique.
 *
 * Source pedagogique : DOMAINE.md §4 (doctrine OKR validee 2026-06-21).
 */

import type { ChallengeQuizCase } from "../../domain/challenge-quiz";

export const OKR_ENTREPRISE_MANAGER_CHALLENGE_QUIZ_FR: ChallengeQuizCase[] = [
  // ============================================================
  // Cas 1 : Résultat clé projet (verbe d'output)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-project-marketplace",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Entreprise Néria",
    iconName: "okr",
    metrics: [
      { label: "Clients actifs sur la marketplace actuelle / mois", value: "3 400" },
      { label: "NPS clients grands comptes (dernier baromètre)", value: "24" },
      { label: "Part du chiffre d'affaires issue du digital", value: "18 %" },
    ],
    objectiveContext:
      "Devenir le partenaire numérique de référence de nos clients grands comptes.",
    proposedObjective: "Ouvrir la nouvelle marketplace B2B d'ici la fin de l'année.",
    options: [
      {
        id: "A",
        text: "Ouvrir, avec les 3 divisions concernées, la nouvelle marketplace B2B d'ici la fin de l'année.",
        verdict: "bad",
        explanation:
          "« Ouvrir » nomme un projet. Un Résultat clé vise un **changement à atteindre**, pas une mise en ligne. Demande-toi : qu'est-ce que la marketplace va faire bouger, une fois ouverte ?",
      },
      {
        id: "B",
        text: "Faire passer le NPS des clients grands comptes de 24 à 45 d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Métrique nommée (NPS grands comptes), point de départ (24), cible (45), échéance. Un outcome qu'une marketplace peut effectivement faire bouger.",
      },
      {
        id: "C",
        text: "Améliorer la relation avec nos clients grands comptes, qui pèsent aujourd'hui 18 % du chiffre d'affaires digital sur 3 400 clients actifs par mois.",
        verdict: "bad",
        explanation:
          "« Améliorer » est flou. Pas de métrique, pas de chiffre cible, pas d'échéance. Non falsifiable.",
      },
      {
        id: "D",
        text: "Faire adopter la marketplace B2B par nos clients grands comptes, actifs à hauteur de 3 400 par mois.",
        verdict: "partial",
        explanation:
          "Outcome correct (adoption), bénéficiaire clair, mais aucun avant/après ni cible chiffrée. Précise : passer de combien de clients actifs à combien.",
      },
    ],
  },

  // ============================================================
  // Cas 2 : Résultat clé projet (verbe d'output)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-project-siege-social",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Division Retail",
    iconName: "wrench",
    context:
      "180 magasins en France. Le CODIR veut renforcer l'attractivité employeur de la division, dans un marché du recrutement retail tendu.",
    metrics: [
      { label: "Taux de turnover annuel des équipes en magasin", value: "34 %" },
      { label: "Postes vacants en magasin (moyenne sur l'année)", value: "210" },
      { label: "Score marque employeur (baromètre externe)", value: "3,1 / 5" },
    ],
    objectiveContext:
      "Faire de la division Retail l'employeur préféré du secteur.",
    proposedObjective: "Déployer le nouveau programme de formation managers d'ici la fin de l'année.",
    options: [
      {
        id: "A",
        text: "Déployer, dans nos 180 magasins, le nouveau programme de formation managers d'ici la fin de l'année.",
        verdict: "bad",
        explanation:
          "« Déployer » nomme un projet. Le programme peut être déployé partout sans que le turnover ou la marque employeur ne bougent d'un point.",
      },
      {
        id: "B",
        text: "Faire passer le taux de turnover annuel des équipes en magasin de 34 % à 22 % d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ (34 %), cible (22 %), échéance. Un vrai changement mesurable que la formation managers peut contribuer à produire.",
      },
      {
        id: "C",
        text: "Renforcer l'attractivité employeur, alors que 210 postes restent vacants en moyenne dans nos 180 magasins.",
        verdict: "bad",
        explanation:
          "« Renforcer » sans chiffre cible n'est pas falsifiable. Combien de postes vacants en moins pour dire « c'est fait » ?",
      },
      {
        id: "D",
        text: "Améliorer le score marque employeur, actuellement mesuré dans nos 180 magasins.",
        verdict: "partial",
        explanation:
          "Métrique nommée (bonne piste), mais « améliorer » reste sans cible ni point de départ chiffré dans l'option elle-même. Précise le score de départ et la cible visée.",
      },
    ],
  },

  // ============================================================
  // Cas 3 : KR-flou (pas de métrique nommée)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-fuzzy-satisfaction-client",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Entreprise Néria",
    iconName: "target",
    metrics: [
      { label: "Clients actifs sur nos 4 marchés", value: "62 000" },
      { label: "CSAT moyen (dernier trimestre)", value: "3,4 / 5" },
      { label: "Réclamations clients / mois", value: "520" },
    ],
    objectiveContext:
      "Devenir la référence de la satisfaction client dans notre secteur.",
    proposedObjective: "Améliorer la satisfaction de nos clients.",
    options: [
      {
        id: "A",
        text: "Améliorer la satisfaction de nos 62 000 clients actifs, répartis sur nos 4 marchés, qui envoient 520 réclamations par mois.",
        verdict: "bad",
        explanation:
          "« Améliorer » sans chiffre cible. Pas de métrique nommée, pas de seuil, pas d'échéance. Vœu pieux.",
      },
      {
        id: "B",
        text: "Faire passer le CSAT moyen de 3,4 / 5 à 4,3 / 5 d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ, cible, échéance. Falsifiable sans ambiguïté.",
      },
      {
        id: "C",
        text: "Avoir des clients satisfaits, parmi nos 62 000 clients actifs sur 4 marchés, qui envoient aujourd'hui 520 réclamations par mois.",
        verdict: "bad",
        explanation:
          "« Satisfaits » n'est pas mesurable. Pas de métrique, pas de seuil. Reformulation à éviter complètement.",
      },
      {
        id: "D",
        text: "Atteindre un CSAT moyen de 4 / 5 sur l'enquête annuelle.",
        verdict: "partial",
        explanation:
          "Métrique nommée et cible chiffrée, bien. Mais sans le point de départ (3,4), on perd la notion d'effort. Un Résultat clé montre l'avant ET l'après.",
      },
    ],
  },

  // ============================================================
  // Cas 4 : KR-flou (pas de métrique nommée)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-fuzzy-notoriete",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Division Retail",
    iconName: "wrench",
    context:
      "Le CODIR lance une campagne de marque nationale pour repositionner l'enseigne face à 3 concurrents directs.",
    metrics: [
      { label: "Notoriété assistée (baromètre national)", value: "41 %" },
      { label: "Part de marché sur le segment principal", value: "12 %" },
      { label: "Budget marque alloué à l'année", value: "4,2 M€" },
    ],
    objectiveContext: "Redevenir la marque retail préférée des Français dans notre segment.",
    proposedObjective: "Renforcer la notoriété de notre marque.",
    options: [
      {
        id: "A",
        text: "Renforcer la notoriété de notre marque, avec un budget marque de 4,2 M€ face à nos 3 concurrents directs.",
        verdict: "bad",
        explanation:
          "« Renforcer » sans chiffre. Pas de métrique nommée, pas de seuil, pas d'échéance. Le budget engagé n'est pas un résultat.",
      },
      {
        id: "B",
        text: "Faire passer la notoriété assistée de 41 % à 55 % d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Métrique nommée (baromètre national), point de départ, cible, échéance. Falsifiable sans ambiguïté.",
      },
      {
        id: "C",
        text: "Être davantage reconnus par le public, sur un segment où nous détenons 12 % de part de marché face à 3 concurrents directs.",
        verdict: "bad",
        explanation:
          "« Davantage reconnus » n'est pas mesurable. Pas de métrique, pas de seuil. À éviter complètement.",
      },
      {
        id: "D",
        text: "Progresser sur la part de marché du segment principal (12 % actuellement) grâce au budget marque de 4,2 M€.",
        verdict: "partial",
        explanation:
          "Métrique nommée et point de départ présents, bonne piste. Mais aucune cible chiffrée : progresser jusqu'à combien ?",
      },
    ],
  },

  // ============================================================
  // Cas 5 : KR-health-metric (état à maintenir)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-health-disponibilite",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Entreprise Néria",
    iconName: "target",
    metrics: [
      { label: "Taux de disponibilité de la plateforme (SLA contractuel)", value: "99,5 %" },
      { label: "Incidents majeurs signalés par des clients / trimestre", value: "6" },
      { label: "Clients grands comptes couverts par un SLA", value: "48" },
    ],
    objectiveContext:
      "Faire de la fiabilité de notre plateforme un avantage concurrentiel reconnu par le marché.",
    proposedObjective: "Maintenir la disponibilité de la plateforme au-dessus de 99,5 %.",
    options: [
      {
        id: "A",
        text: "Maintenir la disponibilité de la plateforme au-dessus de 99,5 %, un engagement couvrant nos 48 clients grands comptes sous SLA.",
        verdict: "bad",
        explanation:
          "« Maintenir » décrit un garde-fou, pas un changement à atteindre. Un Résultat clé vise une progression, sinon c'est une norme de service à surveiller ailleurs, pas un KR.",
      },
      {
        id: "B",
        text: "Faire passer le nombre d'incidents majeurs signalés par des clients de 6 à 1 par trimestre d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ, cible, échéance. Un vrai changement mesurable, c'est ça un Résultat clé.",
      },
      {
        id: "C",
        text: "Garantir 99,9 % de disponibilité sur la plateforme, engagement contractuel couvrant nos 48 clients grands comptes.",
        verdict: "bad",
        explanation:
          "Même piège reformulé. « Garantir » est aussi un état à maintenir, pas un outcome à atteindre. C'est un SLA (engagement de service), pas un Résultat clé.",
      },
      {
        id: "D",
        text: "Réduire de 3 points le taux d'incidents majeurs affectant nos 48 clients grands comptes sous SLA.",
        verdict: "partial",
        explanation:
          "Bon format (variation, bénéficiaires nommés). Mais sans avant/après en valeur absolue ni échéance précise, l'effort reste difficile à vérifier d'un coup d'œil.",
      },
    ],
  },

  // ============================================================
  // Cas 6 : KR-health-metric (état à maintenir)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-health-solvabilite",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Entreprise Néria",
    iconName: "challenge",
    context:
      "Le CODIR prépare une levée de fonds série C. Les investisseurs surveillent de près la trésorerie et l'endettement.",
    metrics: [
      { label: "Ratio d'endettement net / EBITDA", value: "2,1x" },
      { label: "Trésorerie disponible (runway)", value: "14 mois" },
      { label: "Marge brute annuelle", value: "58 %" },
    ],
    objectiveContext: "Sécuriser une structure financière saine pour aborder la levée de fonds en position de force.",
    proposedObjective: "Maintenir le ratio d'endettement net / EBITDA sous 2,5x.",
    options: [
      {
        id: "A",
        text: "Maintenir le ratio d'endettement net / EBITDA sous 2,5x, avec une marge brute de 58 % sur l'année.",
        verdict: "bad",
        explanation:
          "« Maintenir sous » décrit un plafond à ne pas dépasser, pas un changement à atteindre. C'est un garde-fou financier, pas un Résultat clé.",
      },
      {
        id: "B",
        text: "Faire passer la trésorerie disponible (runway) de 14 à 20 mois d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Métrique nommée, point de départ, cible, échéance. Un vrai changement qui renforce concrètement la position de négociation avant la levée.",
      },
      {
        id: "C",
        text: "Garder une marge brute annuelle au-dessus de 55 %, sur un ratio d'endettement actuel de 2,1x.",
        verdict: "bad",
        explanation:
          "Même piège que A. « Garder au-dessus de » est un seuil de sécurité à préserver, pas un objectif de progression.",
      },
      {
        id: "D",
        text: "Améliorer le ratio d'endettement net / EBITDA (2,1x actuellement) pour rassurer les investisseurs de la série C.",
        verdict: "partial",
        explanation:
          "Point de départ présent, direction claire. Mais « améliorer » reste sans cible chiffrée : viser combien de x exactement ?",
      },
    ],
  },

  // ============================================================
  // Cas 7 : KR-sur-confiance (écart trivial)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-overconfident-part-marche",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Division Retail",
    iconName: "practice",
    context:
      "Le CODIR de la division estime ses chances de succès à plus de 90 % sur la cible proposée, sans effort particulier au-delà du plan déjà engagé.",
    metrics: [
      { label: "Part de marché sur le segment principal", value: "12,4 %" },
      { label: "Nombre de nouveaux magasins ouverts cette année", value: "6" },
      { label: "Confiance CODIR d'atteindre la cible proposée", value: "90 %" },
    ],
    objectiveContext: "Devenir le leader incontesté de notre segment sur le marché national.",
    proposedObjective: "Faire passer la part de marché du segment principal de 12,4 % à 12,9 % d'ici la fin de l'année.",
    options: [
      {
        id: "A",
        text: "Faire passer la part de marché du segment principal de 12,4 % à 12,9 % d'ici la fin de l'année.",
        verdict: "bad",
        explanation:
          "L'écart est trivial (0,5 point) et le CODIR estime ses chances à 90 %. À ce niveau, ce n'est plus un Résultat clé mais une trajectoire déjà engagée. L'OKR pousse à l'ambition calibrée (50 à 70 % de confiance).",
      },
      {
        id: "B",
        text: "Faire passer la part de marché du segment principal de 12,4 % à 18 % d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Écart ambitieux (+5,6 pts) qui demande un vrai effort au-delà du plan déjà engagé. Probablement autour de 50-60 % de confiance pour le CODIR, dans la fourchette OKR.",
      },
      {
        id: "C",
        text: "Maximiser la part de marché sur le segment principal.",
        verdict: "bad",
        explanation:
          "« Maximiser » sans cible chiffrée n'est pas falsifiable. Combien suffit pour dire « c'est fait » ?",
      },
      {
        id: "D",
        text: "Ouvrir 6 nouveaux magasins sur le segment principal cette année.",
        verdict: "partial",
        explanation:
          "Résultat clé exemplaire dans la forme (chiffré, daté). Mais c'est un output (ouverture de magasins), pas la part de marché elle-même : les 6 ouvertures peuvent ne rien changer à la position concurrentielle.",
      },
    ],
  },

  // ============================================================
  // Cas 8 : KR-sur-confiance (écart trivial)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-overconfident-recrutement",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Entreprise Néria",
    iconName: "challenge",
    context:
      "Le plan de recrutement de l'année est déjà à 96 % validé avec les 3 cabinets partenaires ; il ne reste qu'à signer les contrats en attente.",
    metrics: [
      { label: "Effectif total (actuel)", value: "1 240" },
      { label: "Postes en cours de recrutement", value: "35" },
      { label: "Confiance RH d'atteindre la cible proposée", value: "95 %" },
    ],
    objectiveContext: "Doubler notre capacité d'innovation grâce à une accélération forte du recrutement tech.",
    proposedObjective: "Faire passer l'effectif tech de 1 240 à 1 275 collaborateurs d'ici la fin de l'année.",
    options: [
      {
        id: "A",
        text: "Faire passer l'effectif tech de 1 240 à 1 275 collaborateurs d'ici la fin de l'année.",
        verdict: "bad",
        explanation:
          "L'écart est trivial (+35, déjà quasi bouclé avec les 3 cabinets partenaires) et la confiance RH est à 95 %. À ce niveau, ce n'est plus un Résultat clé mais un suivi de contrats déjà signés.",
      },
      {
        id: "B",
        text: "Faire passer l'effectif tech de 1 240 à 1 500 collaborateurs d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Écart ambitieux (+260) qui dépasse largement le plan déjà validé et demande un vrai effort de sourcing. Calibrage cohérent avec l'ambition OKR (50-70 % de confiance).",
      },
      {
        id: "C",
        text: "Recruter massivement pour doubler notre capacité d'innovation.",
        verdict: "bad",
        explanation:
          "« Massivement » sans cible chiffrée n'est pas falsifiable. Combien de recrutements suffisent pour dire « c'est fait » ?",
      },
      {
        id: "D",
        text: "Signer les contrats des 35 postes en cours de recrutement avec nos 3 cabinets partenaires.",
        verdict: "partial",
        explanation:
          "Résultat clé formé correctement (chiffré, borné). Mais c'est un output administratif (signatures), pas un changement de capacité d'innovation mesurable en soi.",
      },
    ],
  },

  // ============================================================
  // Cas 9 : KR composite (deux résultats coordonnés par « et »)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-composite-international",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Entreprise Néria",
    iconName: "puzzle",
    metrics: [
      { label: "Chiffre d'affaires réalisé à l'international", value: "22 M€" },
      { label: "Marchés actifs à l'international", value: "5" },
      { label: "Taux de marge sur les ventes internationales", value: "31 %" },
    ],
    objectiveContext: "Faire de l'international un moteur de croissance aussi fort que le marché domestique.",
    proposedObjective:
      "Augmenter le chiffre d'affaires international et améliorer la marge sur nos 5 marchés.",
    options: [
      {
        id: "A",
        text: "Augmenter le chiffre d'affaires international et améliorer la marge sur nos 5 marchés.",
        verdict: "bad",
        explanation:
          "Composite (« et » coordonne deux résultats distincts) et flou (« augmenter », « améliorer » sans chiffre). Sépare en deux Résultats clés distincts, chacun mesurable.",
      },
      {
        id: "B",
        text: "Faire passer le chiffre d'affaires international de 22 M€ à 34 M€ d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Un seul résultat, métrique nommée, point de départ, cible, échéance. Le Résultat clé sur la marge est une autre histoire, ce sera un autre KR du même Objective.",
      },
      {
        id: "C",
        text: "Optimiser la performance de nos 5 marchés internationaux.",
        verdict: "bad",
        explanation:
          "« Optimiser » et « performance » sont flous. Aucune métrique nommée, aucun seuil.",
      },
      {
        id: "D",
        text: "Faire passer le chiffre d'affaires international de 22 M€ à 34 M€, puis la marge de 31 % à 38 %, d'ici la fin de l'année.",
        verdict: "partial",
        explanation:
          "Bien chiffré, bien mesuré, mais c'est encore deux Résultats clés cachés en un. Sépare-les : un Objective a 3 à 5 KR justement pour porter plusieurs dimensions.",
      },
    ],
  },

  // ============================================================
  // Cas 10 : KR composite (deux résultats coordonnés par « et »)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-composite-produit-phare",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Division Retail",
    iconName: "puzzle",
    context:
      "Le produit phare de la division représente déjà 40 % du chiffre d'affaires. Le CODIR veut à la fois faire croître les ventes et réduire les retours produits.",
    metrics: [
      { label: "Ventes du produit phare (unités / an)", value: "180 000" },
      { label: "Taux de retour produit", value: "9 %" },
      { label: "Note moyenne produit (avis clients)", value: "3,6 / 5" },
    ],
    objectiveContext: "Faire du produit phare une référence incontournable du marché.",
    proposedObjective:
      "Augmenter les ventes du produit phare et réduire son taux de retour.",
    options: [
      {
        id: "A",
        text: "Augmenter les ventes du produit phare et réduire son taux de retour, sur une base de 180 000 unités vendues par an.",
        verdict: "bad",
        explanation:
          "Composite : « et » coordonne deux résultats distincts (ventes, retours). Si les ventes montent mais les retours aussi, le Résultat clé est-il atteint ? Sépare en deux KR.",
      },
      {
        id: "B",
        text: "Faire passer les ventes du produit phare de 180 000 à 230 000 unités par an d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Un seul outcome mesurable. Le taux de retour devient un autre Résultat clé du même Objective, ou une métrique guardrail surveillée à côté.",
      },
      {
        id: "C",
        text: "Renforcer la position du produit phare, noté aujourd'hui 3,6 / 5 par les clients sur nos 180 000 ventes annuelles.",
        verdict: "bad",
        explanation:
          "« Renforcer » est flou. Aucune métrique nommée, aucun seuil, aucune échéance.",
      },
      {
        id: "D",
        text: "Faire passer les ventes de 180 000 à 230 000 unités et le taux de retour de 9 % à 4 % d'ici la fin de l'année.",
        verdict: "partial",
        explanation:
          "Bien chiffré des deux côtés, mais ce sont deux Résultats clés cachés en un seul énoncé. Un Objective a 3 à 5 KR distincts pour porter plusieurs dimensions, exactement pour ce cas.",
      },
    ],
  },

  // ============================================================
  // Cas 11 : KR sans avant/après (cible absolue sans point de départ)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-no-baseline-nps",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Entreprise Néria",
    iconName: "learn",
    metrics: [
      { label: "NPS entreprise (baromètre annuel)", value: "18" },
      { label: "Clients actifs sur nos 4 marchés", value: "62 000" },
      { label: "Taux de recommandation spontanée", value: "22 %" },
    ],
    objectiveContext: "Faire de la recommandation client notre principal moteur d'acquisition.",
    proposedObjective: "Atteindre un NPS entreprise de 40 d'ici la fin de l'année.",
    options: [
      {
        id: "A",
        text: "Atteindre, sur nos 4 marchés, un NPS entreprise de 40 d'ici la fin de l'année.",
        verdict: "partial",
        explanation:
          "Métrique nommée, cible chiffrée, échéance. Mais sans le point de départ (18 aujourd'hui), on perd la mesure de l'effort. Un Résultat clé montre l'avant ET l'après.",
      },
      {
        id: "B",
        text: "Faire passer le NPS entreprise de 18 à 40 d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Point de départ explicite (18), cible (40), échéance, métrique nommée. La structure idéale d'un Résultat clé.",
      },
      {
        id: "C",
        text: "Rendre nos clients plus prescripteurs, parmi nos 62 000 clients actifs sur 4 marchés, avec un taux de recommandation spontanée de 22 %.",
        verdict: "bad",
        explanation:
          "« Plus prescripteurs » est flou. Aucune métrique nommée, aucun seuil. Vœu, pas un Résultat clé.",
      },
      {
        id: "D",
        text: "Améliorer le NPS entreprise d'au moins 20 points sur nos 4 marchés d'ici la fin de l'année.",
        verdict: "partial",
        explanation:
          "Variation chiffrée, échéance, métrique nommée, bonne base. Mais la formulation relative (« d'au moins 20 points ») demande un calcul mental. La forme « de 18 à 40 » se vérifie d'un coup d'œil.",
      },
    ],
  },

  // ============================================================
  // Cas 12 : KR sans avant/après (cible absolue sans point de départ)
  // ============================================================
  {
    id: "quiz.okr-entreprise.manager.kr-no-baseline-empreinte-carbone",
    type: "okr-entreprise",
    audience: "manager",
    teamLabel: "Division Retail",
    iconName: "target",
    context:
      "180 magasins en France. La direction RSE prépare le rapport annuel attendu par les investisseurs et les grands clients B2B.",
    metrics: [
      { label: "Émissions carbone scope 1+2 (tonnes CO2 / an)", value: "14 200" },
      { label: "Magasins engagés dans la démarche bas-carbone", value: "60" },
      { label: "Score RSE externe (agence de notation)", value: "B-" },
    ],
    objectiveContext: "Faire de la division Retail une référence de la transition bas-carbone du secteur.",
    proposedObjective: "Atteindre 9 000 tonnes de CO2 émises sur l'année (scope 1+2).",
    options: [
      {
        id: "A",
        text: "Atteindre, sur nos 180 magasins, 9 000 tonnes de CO2 émises sur l'année (scope 1+2).",
        verdict: "partial",
        explanation:
          "Métrique nommée, cible chiffrée, échéance. Mais sans le point de départ (14 200 tonnes aujourd'hui), on perd la mesure de l'effort demandé. Un Résultat clé montre l'avant ET l'après.",
      },
      {
        id: "B",
        text: "Faire passer les émissions carbone scope 1+2 de 14 200 à 9 000 tonnes de CO2 par an d'ici la fin de l'année.",
        verdict: "good",
        explanation:
          "Point de départ explicite (14 200), cible (9 000), échéance, métrique nommée. La structure idéale d'un Résultat clé.",
      },
      {
        id: "C",
        text: "Réduire fortement notre empreinte carbone, sur nos 180 magasins notés B- par l'agence de notation RSE.",
        verdict: "bad",
        explanation:
          "« Fortement » est flou. Aucune métrique chiffrée, aucun seuil. Vœu, pas un Résultat clé.",
      },
      {
        id: "D",
        text: "Réduire les émissions carbone scope 1+2 d'au moins 35 % sur les 180 magasins, d'ici la fin de l'année.",
        verdict: "partial",
        explanation:
          "Variation chiffrée, échéance, métrique nommée, bonne base. Mais la formulation relative (« d'au moins 35 % ») demande un calcul mental. La forme « de 14 200 à 9 000 tonnes » se vérifie d'un coup d'œil.",
      },
    ],
  },
];
