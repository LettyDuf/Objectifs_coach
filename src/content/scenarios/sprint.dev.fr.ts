/**
 * Corpus initial de cartes contexte — Sprint × Audience « dev ».
 *
 * Chaque carte propose un cadre réaliste (équipe + contexte) et un mauvais objectif
 * à reformuler. Les rationales soulignent le piège principal.
 * À enrichir au fil des retours d'atelier.
 */

import type { ScenarioCard } from "../../domain/scenario";

export const SPRINT_DEV_SCENARIOS_FR: ScenarioCard[] = [
  {
    id: "scn.sprint.dev.checkout-maintenance",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Checkout · SaaS B2B",
    iconName: "wrench",
    situation:
      "5 devs senior. Sprint maintenance imposé après 3 incidents prod ce mois-ci. L'équipe support remonte 14 tickets par semaine sur le module commande.",
    proposedObjective: "Refactorer le module commande et nettoyer la dette technique.",
    rationale: "Output pur, composite, aucun bénéficiaire nommé alors que support et utilisateurs souffrent visiblement.",
    expectedBeneficiary: "équipe support / utilisateurs en production",
  },
  {
    id: "scn.sprint.dev.onboarding-scale",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Onboarding · scale-up B2C",
    iconName: "practice",
    situation:
      "7 devs. Le board pousse pour booster l'activation des nouveaux comptes (taux à 42 % à 30 jours, cible 60 %). Sprint feature.",
    proposedObjective: "Améliorer significativement l'expérience utilisateur du parcours d'inscription.",
    rationale: "Mot flou (« améliorer »), adverbe non quantifié, aucun seuil. La cible 60 % existe pourtant et pourrait être nommée.",
    expectedBeneficiary: "nouveaux utilisateurs",
  },
  {
    id: "scn.sprint.dev.plateforme-archi",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Plateforme · 8 devs",
    iconName: "puzzle",
    situation:
      "Migration en cours vers une architecture micro-services. Cycle de release manuel, 4 h par hotfix. Les autres équipes attendent que ça aille plus vite.",
    proposedObjective: "Mettre en place la nouvelle architecture micro-services.",
    rationale: "Verbe d'output, projet de plusieurs sprints réduit à un sprint, aucune mesure observable côté équipes consommatrices.",
    expectedBeneficiary: "équipes dev consommatrices / ops",
  },
  {
    id: "scn.sprint.dev.mobile-backlog",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Mobile · app grand public",
    iconName: "sprint",
    situation:
      "6 devs. Sprint planning à l'envers : l'équipe a sélectionné 12 stories qui rentrent dans la vélocité, sans cap commun.",
    proposedObjective: "Avancer sur les 12 stories prioritaires du backlog.",
    rationale: "Objectif rétrospectif déguisé : décrit le travail, pas le résultat. Aucun outcome partagé.",
    expectedBeneficiary: "utilisateurs / parties prenantes — à identifier",
  },
  {
    id: "scn.sprint.dev.search-startup",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Search · start-up product/market fit",
    iconName: "okr",
    situation:
      "3 devs + 1 lead. La recherche actuelle convertit mal (taux clic 12 %). On veut tester l'autocomplete pour voir si ça monte.",
    proposedObjective: "Livrer la v2 de la recherche en autocomplete.",
    rationale: "Verbe « livrer », pas de bénéficiaire mesuré. La métrique conversion existe et peut être l'objet de l'outcome.",
    expectedBeneficiary: "utilisateurs qui cherchent",
  },
  {
    id: "scn.sprint.dev.data-ops",
    type: "sprint",
    audience: "dev",
    teamLabel: "Équipe Data · 4 devs + 1 SRE",
    iconName: "wrench",
    situation:
      "Pipelines ETL nocturnes qui tombent 2-3 nuits par semaine. L'équipe Business commence chaque jour avec des dashboards à demi vides. Astreinte usée.",
    proposedObjective: "Stabiliser les pipelines ETL et corriger les bugs ouverts.",
    rationale: "Verbe d'output (« stabiliser »), composite (« et »), aucun seuil. Le ressenti business et oncall pourrait être chiffré.",
    expectedBeneficiary: "équipe oncall / équipe Business",
  },
];
