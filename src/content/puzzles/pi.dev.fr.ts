/**
 * Corpus du puzzle PI × dev × FR.
 *
 * Dérivé des bons exemples PI validés (DOMAINE §3.4). Même structure que le puzzle
 * Sprint : 6 catégories, niveau unique (le plus complet, avec tous les distracteurs).
 *
 * Les catégories communes (action verbale, variation, préposition temporelle) réutilisent
 * en grande partie les mêmes blocs que Sprint — les bons verbes outcome et les distracteurs
 * d'output restent les mêmes. Les catégories spécifiques (indicateur, contexte, repère
 * temporel) ont un corpus PI dédié, adapté à l'échelle train / PI.
 *
 * Validation : ce corpus est une **proposition** dérivée des exemples validés. À ajuster
 * selon les retours d'atelier.
 */

import type {
  PuzzleBlock,
  PuzzleCategory,
  PuzzleLevel,
  PuzzleSet,
  TextBlock,
  NumericFieldBlock,
} from "../../domain/puzzle/types";

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

function customField(
  id: string,
  category: PuzzleCategory,
  template: string,
  fieldCount: 1 | 2,
): NumericFieldBlock {
  return { kind: "numericField", id, category, quality: "good", template, fieldCount };
}

/* ---------- Catégorie 1 — Action verbale (mêmes outcomes que Sprint, distracteurs adaptés) ---------- */
const ACTION_GOOD: TextBlock[] = [
  text("pi-a-good-pass", "action", "good", "Faire passer"),
  text("pi-a-good-enable", "action", "good", "Permettre à"),
  text("pi-a-good-reach", "action", "good", "Atteindre"),
  text("pi-a-good-bring-in", "action", "good", "Faire entrer"),
];
const ACTION_NEUTRAL: TextBlock[] = [
  text("pi-a-neu-reduce", "action", "neutral", "Réduire"),
  text("pi-a-neu-increase", "action", "neutral", "Augmenter"),
  text("pi-a-neu-divide", "action", "neutral", "Diviser"),
  text("pi-a-neu-keep", "action", "neutral", "Maintenir"),
];
const ACTION_DISTRACTORS: TextBlock[] = [
  text("pi-a-dis-deliver", "action", "distractor", "Livrer"),
  text("pi-a-dis-refactor", "action", "distractor", "Refactorer"),
  text("pi-a-dis-migrate", "action", "distractor", "Migrer"),
  text("pi-a-dis-improve", "action", "distractor", "Améliorer"),
];

/* ---------- Catégorie 2 — Indicateur (niveau PI : business / produit) ---------- */
const INDICATOR_GOOD: TextBlock[] = [
  text("pi-i-good-sso", "indicator", "good", "le taux d'activation du SSO chez nos clients entreprise"),
  text("pi-i-good-pilots", "indicator", "good", "le nombre de clients pilotes sur la marketplace"),
  text("pi-i-good-churn", "indicator", "good", "le taux de churn mensuel des comptes premium"),
  text("pi-i-good-nps-train", "indicator", "good", "le score NPS du parcours d'intégration"),
];
const INDICATOR_NEUTRAL: TextBlock[] = [
  text("pi-i-neu-mrr", "indicator", "neutral", "le MRR généré par l'offre marketplace"),
  text("pi-i-neu-time-to-value", "indicator", "neutral", "le délai moyen avant première valeur (time-to-value)"),
  text("pi-i-neu-conversion", "indicator", "neutral", "le taux de conversion essai → payant"),
  text("pi-i-neu-self-serve", "indicator", "neutral", "la part de tickets résolus en self-service"),
];
const INDICATOR_DISTRACTORS: TextBlock[] = [
  text("pi-i-dis-platform", "indicator", "distractor", "la nouvelle plateforme"),
  text("pi-i-dis-architecture", "indicator", "distractor", "l'architecture micro-services"),
  text("pi-i-dis-debt", "indicator", "distractor", "la dette technique"),
  text("pi-i-dis-feuille de route", "indicator", "distractor", "tout ce qui est planifié sur le PI"),
];

/* ---------- Catégorie 3 — Variation (identique à Sprint : structures avec tuile chiffre) ---------- */
const VARIATION_GOOD: NumericFieldBlock[] = [
  field("pi-v-good-range", "good", "de [X] à [Y]", 2),
  field("pi-v-good-factor", "good", "par [X]", 1),
  field("pi-v-good-target", "good", "à [X]", 1),
];
const VARIATION_NEUTRAL: NumericFieldBlock[] = [
  field("pi-v-neu-percent", "neutral", "de [X] %", 1),
];
const VARIATION_DISTRACTORS: TextBlock[] = [
  text("pi-v-dis-signif", "variation", "distractor", "significativement"),
  text("pi-v-dis-drastic", "variation", "distractor", "drastiquement"),
  text("pi-v-dis-notable", "variation", "distractor", "de manière notable"),
  text("pi-v-dis-up", "variation", "distractor", "vers le haut"),
];

/* ---------- Catégorie 4 — Contexte / bénéficiaire (niveau PI / business) ---------- */
const CONTEXT_GOOD: PuzzleBlock[] = [
  text("pi-c-good-enterprise", "context", "good", "pour nos clients entreprise"),
  text("pi-c-good-internal-cons", "context", "good", "pour les consommateurs internes"),
  text("pi-c-good-allied-teams", "context", "good", "pour les équipes internes arrimées au sujet"),
  text("pi-c-good-final-clients", "context", "good", "pour les clients finaux"),
  customField("pi-c-good-team-custom", "context", "pour l'équipe [X]", 1),
  text("pi-c-good-marketplace", "context", "good", "sur l'offre marketplace"),
  text("pi-c-good-self-serve", "context", "good", "en self-service"),
  text("pi-c-good-premium", "context", "good", "sur le segment premium"),
];
const CONTEXT_NEUTRAL: TextBlock[] = [
  text("pi-c-neu-intégration", "context", "neutral", "pendant l'intégration"),
  text("pi-c-neu-mobile", "context", "neutral", "sur l'app mobile"),
  text("pi-c-neu-eu", "context", "neutral", "sur le marché européen"),
  text("pi-c-neu-none", "context", "neutral", ""),
];
const CONTEXT_DISTRACTORS: TextBlock[] = [
  text("pi-c-dis-all", "context", "distractor", "pour tout le monde"),
  text("pi-c-dis-internal", "context", "distractor", "en interne"),
  text("pi-c-dis-global", "context", "distractor", "globalement"),
  text("pi-c-dis-everywhere", "context", "distractor", "partout"),
];

/* ---------- Catégorie 5 — Préposition temporelle (identique à Sprint) ---------- */
const PREPOSITION_GOOD: TextBlock[] = [
  text("pi-p-good-by", "preposition", "good", "d'ici"),
  text("pi-p-good-before", "preposition", "good", "avant"),
];
const PREPOSITION_NEUTRAL: TextBlock[] = [
  text("pi-p-neu-for", "preposition", "neutral", "pour"),
  text("pi-p-neu-at", "preposition", "neutral", "à"),
];
const PREPOSITION_DISTRACTORS: TextBlock[] = [
  text("pi-p-dis-fast", "preposition", "distractor", "rapidement"),
  text("pi-p-dis-asap", "preposition", "distractor", "dès que possible"),
];

/* ---------- Catégorie 6 — Repère temporel (échelle PI : 8-12 semaines) ---------- */
const TIMEREF_GOOD: PuzzleBlock[] = [
  text("pi-t-good-pi-review", "timeReference", "good", "la prochaine revue de PI"),
  text("pi-t-good-end-pi", "timeReference", "good", "la fin du PI"),
  text("pi-t-good-last-month", "timeReference", "good", "le dernier mois du PI"),
  text("pi-t-good-pi-planning", "timeReference", "good", "la prochaine PI Planning"),
  customField("pi-t-good-custom-date", "timeReference", "le [X]", 1),
];
const TIMEREF_NEUTRAL: TextBlock[] = [
  text("pi-t-neu-quarter", "timeReference", "neutral", "la fin du trimestre"),
  text("pi-t-neu-next-pi", "timeReference", "neutral", "le PI suivant"),
  text("pi-t-neu-board", "timeReference", "neutral", "le prochain board review"),
  text("pi-t-neu-demo", "timeReference", "neutral", "la System Demo finale"),
];
const TIMEREF_DISTRACTORS: TextBlock[] = [
  text("pi-t-dis-soon", "timeReference", "distractor", "bientôt"),
  text("pi-t-dis-someday", "timeReference", "distractor", "un jour"),
  text("pi-t-dis-later", "timeReference", "distractor", "plus tard"),
  text("pi-t-dis-none", "timeReference", "distractor", "(sans repère)"),
];

/* ---------- Composition du seul niveau exposé (le plus complet) ---------- */

function fullSet(level: PuzzleLevel): PuzzleSet {
  return {
    level,
    blocksByCategory: {
      action: [...ACTION_GOOD.slice(0, 2), ...ACTION_NEUTRAL.slice(0, 2), ...ACTION_DISTRACTORS.slice(0, 4)],
      indicator: [
        ...INDICATOR_GOOD.slice(0, 2),
        ...INDICATOR_NEUTRAL.slice(0, 2),
        ...INDICATOR_DISTRACTORS.slice(0, 4),
      ],
      variation: [
        ...VARIATION_GOOD.slice(0, 2),
        ...VARIATION_NEUTRAL.slice(0, 1),
        ...VARIATION_DISTRACTORS.slice(0, 2),
      ],
      context: [
        ...CONTEXT_GOOD.slice(0, 2),
        ...CONTEXT_NEUTRAL.slice(0, 2),
        ...CONTEXT_DISTRACTORS.slice(0, 4),
      ],
      preposition: [
        ...PREPOSITION_GOOD.slice(0, 2),
        ...PREPOSITION_NEUTRAL.slice(0, 1),
        ...PREPOSITION_DISTRACTORS.slice(0, 2),
      ],
      timeReference: [
        ...TIMEREF_GOOD.slice(0, 2),
        ...TIMEREF_NEUTRAL.slice(0, 2),
        ...TIMEREF_DISTRACTORS.slice(0, 4),
      ],
    } satisfies Record<PuzzleCategory, PuzzleBlock[]>,
  };
}

export const PI_DEV_PUZZLE_SETS_FR: Record<PuzzleLevel, PuzzleSet> = {
  easy: fullSet("easy"),
  medium: fullSet("medium"),
  hard: fullSet("hard"),
};
