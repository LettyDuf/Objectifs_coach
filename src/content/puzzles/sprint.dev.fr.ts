/**
 * Corpus du puzzle Sprint × dev × FR.
 *
 * Validé en bloc par Lætitia (DOMAINE.md §6 ter.3, journal §7 du 2026-06-20).
 * 6 catégories ; la catégorie "variation" contient des blocs à tuile chiffre.
 *
 * Composition des niveaux :
 *   - Facile : 2 bons + 2 neutres (cat. 1, 2, 4, 6) / 2 bons + 1 neutre (cat. 3, 5)
 *   - Moyen : + 2 distracteurs (cat. 1, 2, 4, 6) / + 1 distracteur (cat. 3, 5)
 *   - Difficile : + 4 distracteurs (cat. 1, 2, 4, 6) / + 2 distracteurs (cat. 3, 5)
 */

import type {
  PuzzleBlock,
  PuzzleCategory,
  PuzzleLevel,
  PuzzleSet,
  TextBlock,
  NumericFieldBlock,
} from "../../domain/puzzle/types";

/* ---------- Helpers de fabrication ---------- */

function text(id: string, category: PuzzleCategory, quality: TextBlock["quality"], t: string): TextBlock {
  return { kind: "text", id, category, quality, text: t };
}

function field(
  id: string,
  quality: NumericFieldBlock["quality"],
  template: string,
  fieldCount: 1 | 2,
): NumericFieldBlock {
  return { kind: "numericField", id, category: "variation", quality, template, fieldCount };
}

/** Bloc à champ libre dans une catégorie autre que "variation" : carte
 * personnalisable qui ouvre un input texte dans la zone d'assemblage. */
function customField(
  id: string,
  category: PuzzleCategory,
  template: string,
  fieldCount: 1 | 2,
): NumericFieldBlock {
  return { kind: "numericField", id, category, quality: "good", template, fieldCount };
}

/* ---------- Catégorie 1 — Action verbale ---------- */
const ACTION_GOOD: TextBlock[] = [
  text("a-good-reduce", "action", "good", "Réduire"),
  text("a-good-divide", "action", "good", "Diviser"),
  text("a-good-pass", "action", "good", "Faire passer"),
  text("a-good-enable", "action", "good", "Permettre à"),
];
const ACTION_NEUTRAL: TextBlock[] = [
  text("a-neu-increase", "action", "neutral", "Augmenter"),
  text("a-neu-reach", "action", "neutral", "Atteindre"),
  text("a-neu-bring", "action", "neutral", "Ramener"),
  text("a-neu-keep", "action", "neutral", "Maintenir"),
];
const ACTION_DISTRACTORS: TextBlock[] = [
  text("a-dis-deliver", "action", "distractor", "Livrer"),
  text("a-dis-refactor", "action", "distractor", "Refactorer"),
  text("a-dis-setup", "action", "distractor", "Mettre en place"),
  text("a-dis-improve", "action", "distractor", "Améliorer"),
];

/* ---------- Catégorie 2 — Indicateur ---------- */
const INDICATOR_GOOD: TextBlock[] = [
  text("i-good-cart", "indicator", "good", "le taux d'abandon au paiement"),
  text("i-good-latency", "indicator", "good", "le temps moyen de réponse de l'API"),
  text("i-good-incidents", "indicator", "good", "le nombre d'incidents de production"),
  text("i-good-hotfix", "indicator", "good", "le délai de déploiement d'un hotfix"),
];
const INDICATOR_NEUTRAL: TextBlock[] = [
  text("i-neu-ticket", "indicator", "neutral", "le temps de résolution d'un ticket support"),
  text("i-neu-nps", "indicator", "neutral", "le score NPS"),
  text("i-neu-5xx", "indicator", "neutral", "le taux d'erreur 5xx"),
  text("i-neu-coverage", "indicator", "neutral", "la couverture des tests automatisés"),
];
const INDICATOR_DISTRACTORS: TextBlock[] = [
  text("i-dis-page", "indicator", "distractor", "la nouvelle page de paiement"),
  text("i-dis-perf", "indicator", "distractor", "la performance"),
  text("i-dis-debt", "indicator", "distractor", "la dette technique"),
  text("i-dis-all", "indicator", "distractor", "tout ce qui était prévu pour ce sprint"),
];

/* ---------- Catégorie 3 — Variation (tuile chiffre) ---------- */
const VARIATION_GOOD: NumericFieldBlock[] = [
  field("v-good-range", "good", "de [X] à [Y]", 2),
  field("v-good-factor", "good", "par [X]", 1),
  field("v-good-target", "good", "à [X]", 1),
];
const VARIATION_NEUTRAL: NumericFieldBlock[] = [
  field("v-neu-percent", "neutral", "de [X] %", 1),
];
// Les distracteurs n'ont pas de champ chiffre : ce sont des formulations floues.
const VARIATION_DISTRACTORS: TextBlock[] = [
  text("v-dis-signif", "variation", "distractor", "significativement"),
  text("v-dis-drastic", "variation", "distractor", "drastiquement"),
  text("v-dis-notable", "variation", "distractor", "de manière notable"),
  text("v-dis-up", "variation", "distractor", "vers le haut"),
];

/* ---------- Catégorie 4 — Contexte / bénéficiaire ---------- */
const CONTEXT_GOOD: PuzzleBlock[] = [
  text("c-good-mobile", "context", "good", "sur mobile"),
  text("c-good-guest", "context", "good", "pour les utilisateurs invités"),
  text("c-good-support", "context", "good", "pour l'équipe support"),
  text("c-good-prod", "context", "good", "en production"),
  text("c-good-internal-cons", "context", "good", "pour les consommateurs internes"),
  text("c-good-allied-teams", "context", "good", "pour les équipes internes arrimées au sujet"),
  text("c-good-final-clients", "context", "good", "pour les clients finaux"),
  customField("c-good-team-custom", "context", "pour l'équipe [X]", 1),
];
const CONTEXT_NEUTRAL: TextBlock[] = [
  text("c-neu-astreinte", "context", "neutral", "pour l'équipe astreinte"),
  text("c-neu-order", "context", "neutral", "sur le module commande"),
  text("c-neu-new", "context", "neutral", "pour les nouveaux comptes"),
  text("c-neu-none", "context", "neutral", ""), // option "phrase compacte"
];
const CONTEXT_DISTRACTORS: TextBlock[] = [
  text("c-dis-all", "context", "distractor", "pour tout le monde"),
  text("c-dis-internal", "context", "distractor", "en interne"),
  text("c-dis-global", "context", "distractor", "globalement"),
  text("c-dis-everywhere", "context", "distractor", "partout"),
];

/* ---------- Catégorie 5 — Préposition temporelle ---------- */
const PREPOSITION_GOOD: TextBlock[] = [
  text("p-good-by", "preposition", "good", "d'ici"),
  text("p-good-before", "preposition", "good", "avant"),
];
const PREPOSITION_NEUTRAL: TextBlock[] = [
  text("p-neu-for", "preposition", "neutral", "pour"),
  text("p-neu-at", "preposition", "neutral", "à"),
];
const PREPOSITION_DISTRACTORS: TextBlock[] = [
  text("p-dis-fast", "preposition", "distractor", "rapidement"),
  text("p-dis-asap", "preposition", "distractor", "dès que possible"),
];

/* ---------- Catégorie 6 — Repère temporel ---------- */
const TIMEREF_GOOD: PuzzleBlock[] = [
  text("t-good-sprint", "timeReference", "good", "la fin du sprint"),
  text("t-good-pi", "timeReference", "good", "la prochaine revue de PI"),
  text("t-good-s24", "timeReference", "good", "le sprint 24"),
  text("t-good-month", "timeReference", "good", "la fin du mois"),
  customField("t-good-custom-date", "timeReference", "le [X]", 1),
];
const TIMEREF_NEUTRAL: TextBlock[] = [
  text("t-neu-retro", "timeReference", "neutral", "la prochaine rétrospective"),
  text("t-neu-demo", "timeReference", "neutral", "la démo"),
  text("t-neu-next", "timeReference", "neutral", "le mois suivant"),
  text("t-neu-plan", "timeReference", "neutral", "la prochaine PI Planning"),
];
const TIMEREF_DISTRACTORS: TextBlock[] = [
  text("t-dis-soon", "timeReference", "distractor", "bientôt"),
  text("t-dis-someday", "timeReference", "distractor", "un jour"),
  text("t-dis-later", "timeReference", "distractor", "plus tard"),
  text("t-dis-none", "timeReference", "distractor", "(sans repère)"),
];

/* ---------- Composition des niveaux ---------- */

function setFor(
  level: PuzzleLevel,
  distractorsStandard: number,
  distractorsRestricted: number,
): PuzzleSet {
  return {
    level,
    blocksByCategory: {
      action: [...ACTION_GOOD.slice(0, 2), ...ACTION_NEUTRAL.slice(0, 2), ...ACTION_DISTRACTORS.slice(0, distractorsStandard)],
      indicator: [
        ...INDICATOR_GOOD.slice(0, 2),
        ...INDICATOR_NEUTRAL.slice(0, 2),
        ...INDICATOR_DISTRACTORS.slice(0, distractorsStandard),
      ],
      variation: [
        ...VARIATION_GOOD.slice(0, 2),
        ...VARIATION_NEUTRAL.slice(0, 1),
        ...VARIATION_DISTRACTORS.slice(0, distractorsRestricted),
      ],
      context: [
        ...CONTEXT_GOOD.slice(0, 2),
        ...CONTEXT_NEUTRAL.slice(0, 2),
        ...CONTEXT_DISTRACTORS.slice(0, distractorsStandard),
      ],
      preposition: [
        ...PREPOSITION_GOOD.slice(0, 2),
        ...PREPOSITION_NEUTRAL.slice(0, 1),
        ...PREPOSITION_DISTRACTORS.slice(0, distractorsRestricted),
      ],
      timeReference: [
        ...TIMEREF_GOOD.slice(0, 2),
        ...TIMEREF_NEUTRAL.slice(0, 2),
        ...TIMEREF_DISTRACTORS.slice(0, distractorsStandard),
      ],
    } satisfies Record<PuzzleCategory, PuzzleBlock[]>,
  };
}

export const SPRINT_DEV_PUZZLE_SETS_FR: Record<PuzzleLevel, PuzzleSet> = {
  easy: setFor("easy", 0, 0),
  medium: setFor("medium", 2, 1),
  hard: setFor("hard", 4, 2),
};
