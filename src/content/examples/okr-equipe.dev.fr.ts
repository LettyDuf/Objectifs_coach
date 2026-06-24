/**
 * Exemples annotés — OKR équipe × Audience "dev" × FR.
 *
 * Validés en V1 par Lætitia (DOMAINE.md §4.6). Servent à la fois de matériel
 * pédagogique (mode Apprendre) et de fixtures pour les tests (D6).
 *
 * Note : un OKR = un Objective + 3 à 5 KR. Pour les mauvais exemples qui ciblent
 * un piège dans un KR, on construit un OKR complet (O acceptable + 1 KR fautif
 * + KR de remplissage) — l'UI met le KR fautif en évidence via le `rationale`.
 */

import type { AnnotatedExample } from "../../domain/ports";

export const OKR_EQUIPE_DEV_EXAMPLES_FR: AnnotatedExample[] = [
  // ============================================================
  // Bons exemples — OKR complets
  // ============================================================
  {
    id: "okr-equipe.good.observability",
    verdict: "good",
    draft: {
      type: "okr-equipe",
      text: "Devenir l'outil de référence des équipes data pour l'observabilité des pipelines.",
      audience: "dev",
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      keyResults: [
        { text: "Atteindre 25 équipes actives mensuelles utilisant notre SDK d'ici fin du trimestre.", confidence: 60 },
        { text: "Faire passer le NPS dev du module pipeline de 28 à 50.", confidence: 55 },
        { text: "Réduire le temps moyen de détection d'un pipeline cassé de 45 min à 10 min.", confidence: 65 },
      ],
    },
    rationale:
      "Objective qualitatif inspirant. 3 KR chiffrés, outcome, calibrés autour de 60 % (fourchette 50-70 %). Mesures observables côté équipe.",
  },
  {
    id: "okr-equipe.good.payment-reliability",
    verdict: "good",
    draft: {
      type: "okr-equipe",
      text: "Faire de notre plateforme de paiement la plus fiable de notre marché.",
      audience: "dev",
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      keyResults: [
        { text: "Faire passer le taux de réussite des paiements de 96,2 % à 99,5 % d'ici fin du trimestre.", confidence: 60 },
        { text: "Diviser par 3 le temps moyen de détection d'un incident paiement (de 15 min à 5 min).", confidence: 65 },
        { text: "Ramener le nombre d'escalades support sur le paiement de 12 à 2 par semaine.", confidence: 55 },
      ],
    },
    rationale:
      "O qualitatif et ambitieux. KR mesurables, chacun avec point de départ et cible. Calibrage stretch cohérent.",
  },
  {
    id: "okr-equipe.good.dev-experience",
    verdict: "good",
    draft: {
      type: "okr-equipe",
      text: "Devenir le partenaire technique préféré des équipes produit.",
      audience: "dev",
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      keyResults: [
        { text: "Faire passer le temps moyen d'onboarding d'une nouvelle équipe sur notre API de 4 h à 1 h.", confidence: 60 },
        { text: "Atteindre 80 % d'équipes consommatrices qui notent notre support 4 sur 5 ou plus (enquête trimestrielle).", confidence: 55 },
        { text: "Réduire de 50 % le nombre de tickets « comment faire » dans notre canal support (de 40 à 20 par semaine).", confidence: 65 },
      ],
    },
    rationale:
      "O qualitatif. KR centrés sur les équipes clientes internes, mesures observables, calibration ambitieuse mais crédible.",
  },

  // ============================================================
  // Mauvais exemples — chaque carte cible un piège différent
  // ============================================================
  {
    id: "okr-equipe.bad.objective-with-number",
    verdict: "bad",
    draft: {
      type: "okr-equipe",
      text: "Améliorer notre observabilité de 30 %.",
      audience: "dev",
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      keyResults: [
        { text: "Atteindre 25 équipes actives mensuelles utilisant notre SDK.", confidence: 60 },
        { text: "Faire passer le NPS dev de 28 à 50.", confidence: 55 },
        { text: "Réduire le temps de détection d'un pipeline cassé de 45 min à 10 min.", confidence: 65 },
      ],
    },
    rationale:
      "L'Objective porte un chiffre (30 %) — c'est le rôle des KR. En plus, « améliorer » est un mot flou. Reformuler en qualitatif : « Devenir l'outil de référence pour l'observabilité ».",
    trapWords: ["améliorer", "30"],
    expectedFailingCriteria: ["outcome", "okr.objectiveQualitative"],
  },
  {
    id: "okr-equipe.bad.kr-project",
    verdict: "bad",
    draft: {
      type: "okr-equipe",
      text: "Devenir l'outil de référence des équipes data pour l'observabilité.",
      audience: "dev",
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      keyResults: [
        { text: "Livrer le nouveau dashboard métriques v2 d'ici fin du trimestre.", confidence: 65 },
        { text: "Atteindre 25 équipes actives mensuelles.", confidence: 60 },
        { text: "Faire passer le NPS de 28 à 50.", confidence: 55 },
      ],
    },
    rationale:
      "Le 1er KR est un KR-projet (« Livrer le dashboard v2 »). Un KR vise un **changement à atteindre**, pas une livraison. Reformuler : qu'est-ce que le dashboard va faire bouger ? Adoption ? Temps gagné ? Incidents évités ?",
    trapWords: ["livrer"],
    expectedFailingCriteria: ["okr.keyResultQuality"],
  },
  {
    id: "okr-equipe.bad.kr-fuzzy",
    verdict: "bad",
    draft: {
      type: "okr-equipe",
      text: "Devenir le partenaire technique préféré des équipes produit.",
      audience: "dev",
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      keyResults: [
        { text: "Améliorer la satisfaction client.", confidence: 60 },
        { text: "Faire passer le temps d'onboarding API de 4 h à 1 h.", confidence: 55 },
        { text: "Réduire de 50 % les tickets « comment faire » (de 40 à 20 par semaine).", confidence: 65 },
      ],
    },
    rationale:
      "Le 1er KR n'a ni chiffre, ni unité, ni seuil. Non falsifiable. Reformuler en nommant la métrique (NPS, CSAT, etc.) avec un point de départ et une cible.",
    trapWords: ["améliorer", "satisfaction"],
    expectedFailingCriteria: ["okr.keyResultQuality"],
  },
  // Note : le piège « health metric » est enseigné dans la fiche « Les 4 pièges du
  // Key Result » §3, mais n'est PAS représenté ici comme `AnnotatedExample`. Raison :
  // par doctrine V1 (DOMAINE.md §4.4), le moteur ne détecte pas automatiquement
  // les health metrics (faux positif coûteux). Sans heuristique, l'exemple scorait
  // 100 → contradictoire avec le verdict "bad" et faisait sauter les tests.
  {
    id: "okr-equipe.bad.composite-objective",
    verdict: "bad",
    draft: {
      type: "okr-equipe",
      text: "Améliorer la performance et la satisfaction utilisateur.",
      audience: "dev",
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      keyResults: [
        { text: "Faire passer le temps de réponse p95 de 800 ms à 200 ms.", confidence: 60 },
        { text: "Faire passer le NPS de 30 à 50.", confidence: 55 },
        { text: "Réduire le taux d'erreur de 2 % à 0,5 %.", confidence: 65 },
      ],
    },
    rationale:
      "L'Objective contient « et » : il y a deux Objectives ici (performance et satisfaction). Sépare en deux OKR distincts, chacun avec son propre lot de KR.",
    trapWords: ["améliorer", "et", "performance", "satisfaction"],
    expectedFailingCriteria: ["outcome", "general.composite"],
  },
];
