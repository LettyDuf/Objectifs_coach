/**
 * Exemples annotés — PI × Audience "dev" × FR.
 *
 * Validés dans DOMAINE.md §3.4 (journal du 2026-06-20). Servent de matériel pédagogique
 * pour le mode Apprendre. Pas encore utilisés comme fixtures de test (le moteur PI ne fait
 * pas d'évaluation spécifique en V1 du PI au-delà du tronc commun + calibrage).
 */

import type { AnnotatedExample } from "../../domain/ports";

export const PI_DEV_EXAMPLES_FR: AnnotatedExample[] = [
  // ----- Bons exemples -----
  {
    id: "pi.good.sso-committed",
    verdict: "good",
    draft: {
      type: "pi",
      text: "Permettre à 80 % de nos clients entreprise d'activer le SSO en self-service, mesuré sur le dernier mois du PI.",
      audience: "dev",
      confidence: 85,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      piClass: "committed",
      businessValue: 8,
    },
    rationale:
      "Committed bien calibré : valeur métier explicite, seuil chiffré, échéance PI, confiance >80 % cohérente avec un engagement.",
  },
  {
    id: "pi.good.marketplace-stretch",
    verdict: "good",
    draft: {
      type: "pi",
      text: "Faire entrer 3 clients pilotes sur la nouvelle offre marketplace avant la PI Review.",
      audience: "dev",
      confidence: 50,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      piClass: "stretch",
      businessValue: 7,
    },
    rationale:
      "Stretch bien calibré : ambition élevée (3 pilotes en un PI), confiance 50 % cohérente avec la classe stretch.",
  },

  // ----- Mauvais exemples -----
  {
    id: "pi.bad.deliver-billing",
    verdict: "bad",
    draft: {
      type: "pi",
      text: "Livrer le module facturation v2.",
      audience: "dev",
      confidence: 90,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
      piClass: "committed",
      businessValue: 6,
    },
    rationale:
      "Output pur (« livrer ») : aucune valeur métier mesurée, pas de bénéficiaire, pas de seuil.",
    expectedFailingCriteria: ["outcome", "falsifiable", "timeBounded"],
    trapWords: ["livrer"],
  },
  {
    id: "pi.bad.stability-debt",
    verdict: "bad",
    draft: {
      type: "pi",
      text: "Améliorer la stabilité de la plateforme et réduire la dette technique.",
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
      piClass: "committed",
      businessValue: 5,
    },
    rationale: "Composite (« et »), deux mots flous (« améliorer », « dette »), aucun seuil, pas d'échéance.",
    expectedFailingCriteria: ["outcome", "falsifiable", "timeBounded", "general.composite"],
    trapWords: ["améliorer", "stabilité", "et", "dette"],
  },
  {
    id: "pi.bad.committed-low-confidence",
    verdict: "bad",
    draft: {
      type: "pi",
      text: "Permettre à 80 % de nos clients entreprise d'activer le SSO en self-service, mesuré sur le dernier mois du PI.",
      audience: "dev",
      confidence: 40,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
      piClass: "committed",
      businessValue: 8,
    },
    rationale:
      "Mauvais calibrage : un committed estimé à 40 % de confiance est en réalité un stretch mal nommé. Soit reclasser, soit revoir l'ambition.",
    expectedFailingCriteria: ["crediblyAmbitious"],
    // Pas de trapWords ici : le piège n'est pas dans les mots mais dans la
    // métadonnée de classe/confiance. Le quiz « trouve le piège » s'effacera.
  },
];
