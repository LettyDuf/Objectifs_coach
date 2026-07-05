/**
 * Corpus du puzzle OKR entreprise × manager × FR.
 *
 * Pattern identique à Sprint / PI / OKR équipe (6 catégories, tuile chiffre en
 * catégorie 3). Spécificités OKR entreprise :
 *  - Vocabulaire orienté **outcome annuel à l'échelle entreprise** : NPS, part
 *    de marché, notoriété, marge, rétention client, engagement salarié (vs
 *    métriques d'équipe dev comme le NPS dev ou le temps d'intégration).
 *  - « Maintenir » glissé en **distracteur d'action** : c'est le même piège de
 *    la health metric qu'en OKR équipe (fiche « Le mur invisible » /
 *    « Le bilan financier déguisé en OKR »), transposé à l'échelle CODIR.
 *  - Repères temporels = l'année (fin de l'année, revue annuelle, fin de
 *    l'exercice) plutôt que le trimestre.
 *
 * Pédagogie : on assemble un Résultat clé entreprise solide, pas l'Objective
 * (qui reste qualitatif, posé par le CODIR). La grammaire est universelle,
 * seul le vocabulaire change d'échelle.
 */

import type {
  NumericFieldBlock,
  PuzzleBlock,
  PuzzleCategory,
  PuzzleLevel,
  PuzzleSet,
  TextBlock,
} from "../../domain/puzzle/types";

function text(
  id: string,
  category: PuzzleCategory,
  quality: TextBlock["quality"],
  t: string,
): TextBlock {
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

/* ---------- Catégorie 1 — Action verbale ---------- */
const ACTION_GOOD: TextBlock[] = [
  text("okre-a-good-pass", "action", "good", "Faire passer"),
  text("okre-a-good-reach", "action", "good", "Atteindre"),
  text("okre-a-good-divide", "action", "good", "Diviser"),
  text("okre-a-good-reduce", "action", "good", "Réduire"),
];
const ACTION_NEUTRAL: TextBlock[] = [
  text("okre-a-neu-multiply", "action", "neutral", "Multiplier"),
  text("okre-a-neu-convert", "action", "neutral", "Convertir"),
  text("okre-a-neu-bring", "action", "neutral", "Ramener"),
  text("okre-a-neu-increase", "action", "neutral", "Augmenter"),
];
const ACTION_DISTRACTORS: TextBlock[] = [
  text("okre-a-dis-open", "action", "distractor", "Ouvrir"),
  text("okre-a-dis-keep", "action", "distractor", "Maintenir"), // piège health metric
  text("okre-a-dis-improve", "action", "distractor", "Améliorer"),
  text("okre-a-dis-deploy", "action", "distractor", "Déployer"),
];

/* ---------- Catégorie 2 — Indicateur ---------- */
const INDICATOR_GOOD: TextBlock[] = [
  text("okre-i-good-nps", "indicator", "good", "le NPS entreprise"),
  text("okre-i-good-marge", "indicator", "good", "la marge opérationnelle"),
  text("okre-i-good-renouvellement", "indicator", "good", "le taux de renouvellement des contrats grands comptes"),
  text("okre-i-good-notoriete", "indicator", "good", "le taux de notoriété spontanée de la marque"),
];
const INDICATOR_NEUTRAL: TextBlock[] = [
  text("okre-i-neu-part-marche", "indicator", "neutral", "la part de marché du segment principal"),
  text("okre-i-neu-engagement", "indicator", "neutral", "le score d'engagement des salariés"),
  text("okre-i-neu-adoption", "indicator", "neutral", "le taux d'adoption du nouvel outil interne"),
  text("okre-i-neu-ca-international", "indicator", "neutral", "la part du chiffre d'affaires réalisée à l'international"),
];
const INDICATOR_DISTRACTORS: TextBlock[] = [
  text("okre-i-dis-offre", "indicator", "distractor", "la nouvelle offre commerciale"),
  text("okre-i-dis-satisfaction", "indicator", "distractor", "la satisfaction client en général"),
  text("okre-i-dis-culture", "indicator", "distractor", "la culture d'entreprise"),
  text("okre-i-dis-everything", "indicator", "distractor", "tout ce qui doit être livré cette année"),
];

/* ---------- Catégorie 3 — Variation (tuile chiffre) ---------- */
const VARIATION_GOOD: NumericFieldBlock[] = [
  field("okre-v-good-range", "good", "de [X] à [Y]", 2),
  field("okre-v-good-factor", "good", "par [X]", 1),
  field("okre-v-good-target", "good", "à [X]", 1),
];
const VARIATION_NEUTRAL: NumericFieldBlock[] = [
  field("okre-v-neu-percent", "neutral", "de [X] %", 1),
];
const VARIATION_DISTRACTORS: TextBlock[] = [
  text("okre-v-dis-signif", "variation", "distractor", "significativement"),
  text("okre-v-dis-drastic", "variation", "distractor", "drastiquement"),
  text("okre-v-dis-notable", "variation", "distractor", "de manière notable"),
  text("okre-v-dis-up", "variation", "distractor", "vers le haut"),
];

/* ---------- Catégorie 4 — Contexte / bénéficiaire ---------- */
const CONTEXT_GOOD: PuzzleBlock[] = [
  text("okre-c-good-clients", "context", "good", "pour nos clients grands comptes"),
  text("okre-c-good-salaries", "context", "good", "pour les salariés de l'entreprise"),
  text("okre-c-good-marche-cible", "context", "good", "sur le marché cible"),
  customField("okre-c-good-division-custom", "context", "pour la division [X]", 1),
];
const CONTEXT_NEUTRAL: TextBlock[] = [
  text("okre-c-neu-retail", "context", "neutral", "sur le segment retail"),
  text("okre-c-neu-b2b", "context", "neutral", "sur le segment B2B"),
  text("okre-c-neu-international", "context", "neutral", "à l'international"),
  text("okre-c-neu-none", "context", "neutral", ""), // option phrase compacte
];
const CONTEXT_DISTRACTORS: TextBlock[] = [
  text("okre-c-dis-all", "context", "distractor", "pour tout le monde"),
  text("okre-c-dis-internal", "context", "distractor", "en interne"),
  text("okre-c-dis-global", "context", "distractor", "globalement"),
  text("okre-c-dis-everywhere", "context", "distractor", "partout"),
];

/* ---------- Catégorie 5 — Préposition temporelle ---------- */
const PREPOSITION_GOOD: TextBlock[] = [
  text("okre-p-good-by", "preposition", "good", "d'ici"),
  text("okre-p-good-before", "preposition", "good", "avant"),
];
const PREPOSITION_NEUTRAL: TextBlock[] = [
  text("okre-p-neu-for", "preposition", "neutral", "pour"),
  text("okre-p-neu-at", "preposition", "neutral", "à"),
];
const PREPOSITION_DISTRACTORS: TextBlock[] = [
  text("okre-p-dis-fast", "preposition", "distractor", "rapidement"),
  text("okre-p-dis-asap", "preposition", "distractor", "dès que possible"),
];

/* ---------- Catégorie 6 — Repère temporel ---------- */
const TIMEREF_GOOD: PuzzleBlock[] = [
  text("okre-t-good-year-end", "timeReference", "good", "la fin de l'année"),
  text("okre-t-good-fiscal-year", "timeReference", "good", "la fin de l'exercice"),
  text("okre-t-good-annual-review", "timeReference", "good", "la revue annuelle"),
  text("okre-t-good-q3-milestone", "timeReference", "good", "le jalon du troisième trimestre"),
  customField("okre-t-good-custom-date", "timeReference", "le [X]", 1),
];
const TIMEREF_NEUTRAL: TextBlock[] = [
  text("okre-t-neu-quarterly-checkin", "timeReference", "neutral", "le prochain point trimestriel"),
  text("okre-t-neu-12months", "timeReference", "neutral", "12 mois"),
  text("okre-t-neu-fiscal-close", "timeReference", "neutral", "la clôture de l'exercice"),
  text("okre-t-neu-cycle", "timeReference", "neutral", "la fin du cycle stratégique"),
];
const TIMEREF_DISTRACTORS: TextBlock[] = [
  text("okre-t-dis-soon", "timeReference", "distractor", "bientôt"),
  text("okre-t-dis-someday", "timeReference", "distractor", "un jour"),
  text("okre-t-dis-later", "timeReference", "distractor", "plus tard"),
  text("okre-t-dis-none", "timeReference", "distractor", "(sans repère)"),
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
      action: [
        ...ACTION_GOOD.slice(0, 2),
        ...ACTION_NEUTRAL.slice(0, 2),
        ...ACTION_DISTRACTORS.slice(0, distractorsStandard),
      ],
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

export const OKR_ENTREPRISE_MANAGER_PUZZLE_SETS_FR: Record<PuzzleLevel, PuzzleSet> = {
  easy: setFor("easy", 0, 0),
  medium: setFor("medium", 2, 1),
  hard: setFor("hard", 4, 2),
};
