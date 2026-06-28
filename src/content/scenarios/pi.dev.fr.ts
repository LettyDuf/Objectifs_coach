/**
 * Corpus de cartes contexte — PI × dev × FR.
 *
 * Dérivé du puzzle PI déjà validé (DOMAINE §3.4 et §6 ter). Chaque carte pose un cadre
 * réaliste à l'échelle d'un train SAFe ou d'une équipe stratégique, et propose un
 * mauvais objectif à reformuler.
 */

import type { ScenarioCard } from "../../domain/scenario";

export const PI_DEV_SCENARIOS_FR: ScenarioCard[] = [
  {
    id: "scn.pi.dev.checkout-train",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Checkout · 4 équipes",
    iconName: "wrench",
    situation:
      "Le train regroupe 4 équipes autour du tunnel d'achat. Le Business Owner pousse pour augmenter les conversions sur mobile. PI Planning dans deux semaines, objectif à figer.",
    proposedObjective: "Refactorer le tunnel mobile et améliorer l'UX globale.",
    rationale: "Output + mot flou « améliorer ». Le Business Owner attend une métrique de conversion, pas une promesse de chantier technique.",
    expectedBeneficiary: "clients sur mobile / Business Owner",
  },
  {
    id: "scn.pi.dev.sso-enterprise",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Auth · 3 équipes",
    iconName: "target",
    situation:
      "Le commercial bloque sur l'argument SSO chez les grands comptes. Aujourd'hui activation manuelle, 2 semaines par client. Objectif PI : enlever ce verrou commercial.",
    proposedObjective: "Migrer l'authentification vers OAuth.",
    rationale: "Activité technique pure. Le verrou commercial reste sans mesure : combien de clients vont passer en self-service, en combien de temps ?",
    expectedBeneficiary: "clients entreprise / équipe commerciale",
  },
  {
    id: "scn.pi.dev.marketplace-pilot",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Marketplace · 5 équipes",
    iconName: "okr",
    situation:
      "Nouvelle offre marketplace en lancement. Stretch — on ne sait pas si les clients vont s'engager. PI Planning impose un objectif ambitieux mais réaliste.",
    proposedObjective: "Lancer la marketplace en production avec succès.",
    rationale: "« Avec succès » est vide de sens — qu'est-ce qu'un succès pour cette première PI ? 1 client ? 10 ? Un volume de transactions ?",
    expectedBeneficiary: "premiers clients pilotes",
  },
  {
    id: "scn.pi.dev.onboarding-scale",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Intégration nouveaux clients · 4 équipes",
    iconName: "practice",
    situation:
      "Taux d'activation des nouveaux comptes stagne à 42 % depuis deux trimestres. Le board demande +20 points sur ce PI. Plusieurs équipes (acquisition, produit, support) à coordonner.",
    proposedObjective: "Augmenter significativement l'activation utilisateur.",
    rationale: "Mot flou « significativement » alors qu'on a une cible claire. L'objectif de PI doit nommer la métrique (62 %) et la fenêtre (sur le dernier mois du PI).",
    expectedBeneficiary: "nouveaux utilisateurs / board",
  },
  {
    id: "scn.pi.dev.platform-stability",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Plateforme · 6 équipes",
    iconName: "wrench",
    situation:
      "Plateforme victime de son succès : TMR de 45 min, 8 incidents majeurs ce trimestre. Les équipes fonctionnalité passent 30 % de leur temps en astreinte. Stretch ambitieux sur ce PI.",
    proposedObjective: "Stabiliser la plateforme et alléger la charge astreinte.",
    rationale: "Composite (« et »), verbe d'output (« stabiliser »), pas de seuil. Les deux métriques existent (TMR, % temps astreinte) — il faut les nommer.",
    expectedBeneficiary: "équipes fonctionnalité / astreinte",
  },
  {
    id: "scn.pi.dev.churn-premium",
    type: "pi",
    audience: "dev",
    teamLabel: "Train Retention · 3 équipes",
    iconName: "target",
    situation:
      "Churn mensuel des comptes premium à 4 %, alors qu'historique <2 %. Le board veut un engagé avec une cible chiffrée pour ce PI. Confiance équipe à 75 %.",
    proposedObjective: "Réduire le churn premium de manière notable.",
    rationale: "« De manière notable » est non mesurable. La cible chiffrée existe (revenir à <2 %), il faut juste la nommer dans l'objectif.",
    expectedBeneficiary: "comptes premium / board",
  },
];
