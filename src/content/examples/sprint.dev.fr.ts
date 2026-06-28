/**
 * Exemples annotés — Sprint × Audience "dev" × FR.
 *
 * Validés en V1 par Lætitia (DOMAINE.md §2.3). Servent à la fois de matériel
 * pédagogique (mode Apprendre) et de fixtures pour les tests (D6).
 *
 * Pour ajouter un exemple, créer une nouvelle entrée. Si c'est un mauvais exemple,
 * renseigner `expectedFailingCriteria` avec les IDs des critères qui doivent être en
 * échec ("warn" ou "bad") — c'est l'assertion qui sera vérifiée par les tests.
 */

import type { AnnotatedExample } from "../../domain/ports";

export const SPRINT_DEV_EXAMPLES_FR: AnnotatedExample[] = [
  // ----- Bons exemples -----
  {
    id: "sprint.good.cart-abandon",
    verdict: "good",
    draft: {
      type: "sprint",
      text: "Réduire de 50 % le taux d'abandon au paiement sur mobile d'ici la fin du sprint 24.",
      audience: "dev",
      confidence: 75,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
    },
    rationale:
      "Résultat mesurable, seuil chiffré, échéance précise, équipe en capacité d'agir, ambition crédible.",
  },
  {
    id: "sprint.good.guest-checkout",
    verdict: "good",
    draft: {
      type: "sprint",
      text: "Permettre à un utilisateur invité de finaliser une commande sans créer de compte, mesuré sur 100 sessions, fin de sprint.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
    },
    rationale: "Centré utilisateur, mesure définie (100 sessions), échéance, sous influence équipe.",
  },
  {
    id: "sprint.good.api-latency",
    verdict: "good",
    draft: {
      type: "sprint",
      text: "Diviser par deux le temps moyen de réponse de l'API au 95e percentile avant la fin de l'itération.",
      audience: "dev",
      confidence: 75,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
    },
    rationale: "Métrique technique précise, seuil clair (diviser par deux), échéance, ambition crédible.",
  },

  // ----- Mauvais exemples -----
  {
    id: "sprint.bad.output-develop",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Développer la nouvelle page de paiement.",
      audience: "dev",
      confidence: 90,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale: "Commence par 'développer' (output), aucune mesure, pas d'échéance.",
    expectedFailingCriteria: ["outcome", "falsifiable", "timeBounded"],
    trapWords: ["développer"],
  },
  {
    id: "sprint.bad.composite-fuzzy",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Améliorer la performance et finir la migration auth.",
      audience: "dev",
      confidence: 70,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale: "Composite (« et »), mot flou « améliorer », aucun seuil, pas d'échéance.",
    expectedFailingCriteria: ["falsifiable", "timeBounded", "general.composite"],
    trapWords: ["améliorer", "performance", "et", "finir"],
  },
  {
    id: "sprint.bad.refactor",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Refactorer le module commande.",
      audience: "dev",
      confidence: 85,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale: "Output pur (« refactorer »), aucun résultat externe, pas d'échéance.",
    expectedFailingCriteria: ["outcome", "falsifiable", "timeBounded"],
    trapWords: ["refactorer"],
  },
  {
    id: "sprint.bad.ci-pipeline",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Mettre en place le nouveau pipeline CI.",
      audience: "dev",
      confidence: 85,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale: "Commence par 'mettre en place' (output), aucune mesure de succès, pas d'échéance.",
    expectedFailingCriteria: ["outcome", "falsifiable", "timeBounded"],
    trapWords: ["mettre"],
  },

  // ----- Pathologie "objectif rétrospectif" (DOMAINE §6 bis.1) -----
  {
    id: "sprint.bad.retro.three-deliverables",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Livrer la fonctionnalité de notification, terminer l'API export et corriger les bugs ouverts du module commande.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale:
      "Objectif rétrospectif : énumération de 3 livrables coordonnés par « et ». Tout est output, aucun changement constatable.",
    expectedFailingCriteria: ["outcome", "general.composite", "timeBounded"],
    trapWords: ["livrer", "terminer", "et", "corriger"],
  },
  {
    id: "sprint.bad.retro.advance-récits",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Avancer sur les 8 récits prioritaires du backlog.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale:
      "Objectif rétrospectif déguisé : 'avancer sur N récits' décrit le travail, pas le résultat. Aucun outcome.",
    expectedFailingCriteria: ["outcome", "timeBounded"],
    trapWords: ["avancer"],
  },
  {
    id: "sprint.bad.retro.finish-everything",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Finir tout ce qui était prévu pour ce sprint.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale:
      "Objectif fourre-tout : équivalent à « faire le sprint ». Aucun cap, aucune mesure.",
    expectedFailingCriteria: ["outcome", "falsifiable", "timeBounded"],
    trapWords: ["finir", "tout"],
  },

  // ----- Sprint maintenance bien rédigé (DOMAINE §6 bis.3) -----
  {
    id: "sprint.good.maintenance.incidents",
    verdict: "good",
    draft: {
      type: "sprint",
      text: "Réduire le nombre d'incidents de production sur le module commande de 14 à 5 par semaine d'ici fin de sprint.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
    },
    rationale:
      "Sprint maintenance avec bénéficiaire (utilisateurs / ops), seuil chiffré, échéance — pas un output.",
  },
  {
    id: "sprint.good.maintenance.support",
    verdict: "good",
    draft: {
      type: "sprint",
      text: "Permettre à l'équipe support de résoudre 70 % des tickets module commande sans escalade vers la dev d'ici fin du sprint.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
    },
    rationale: "Bénéficiaire explicite (support), métrique vérifiable, échéance.",
  },
  {
    id: "sprint.good.maintenance.hotfix",
    verdict: "good",
    draft: {
      type: "sprint",
      text: "Diviser par 2 le temps moyen de déploiement d'un hotfix (de 4 h à 2 h) avant la fin du sprint.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
    },
    rationale: "Outcome interne mesurable, échéance, sous influence directe de l'équipe.",
  },
  {
    id: "sprint.good.maintenance.astreinte",
    verdict: "good",
    draft: {
      type: "sprint",
      text: "Atteindre 0 alerte critique non triée durant l'astreinte week-end qui suit ce sprint.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
    },
    rationale: "Bénéficiaire = équipe astreinte, seuil net (zéro), borne temporelle.",
  },

  // ----- Mauvais "maintenance" courants (DOMAINE §6 bis.3) -----
  {
    id: "sprint.bad.maintenance.refactor",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Refactorer le module commande.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale: "Output pur, aucun bénéficiaire nommé, aucune mesure, pas d'échéance.",
    expectedFailingCriteria: ["outcome", "timeBounded"],
    trapWords: ["refactorer"],
  },
  {
    id: "sprint.bad.maintenance.tech-debt",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Réduire la dette technique du back-end.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale:
      "« Dette technique » est flou : aucun bénéficiaire, aucune mesure objective, pas d'échéance.",
    expectedFailingCriteria: ["falsifiable", "timeBounded"],
    trapWords: ["dette"],
  },
  {
    id: "sprint.bad.maintenance.stabilize",
    verdict: "bad",
    draft: {
      type: "sprint",
      text: "Stabiliser la plateforme.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    },
    rationale: "Verbe d'output (« stabiliser »), aucune mesure, pas d'échéance.",
    expectedFailingCriteria: ["outcome", "timeBounded"],
    trapWords: ["stabiliser"],
  },
];
