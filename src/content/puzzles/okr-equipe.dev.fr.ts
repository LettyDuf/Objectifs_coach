/**
 * Corpus du puzzle OKR équipe × dev × FR.
 *
 * Pattern identique à Sprint / PI (6 catégories, tuile chiffre en catégorie 3).
 * Spécificités OKR équipe :
 *  - Vocabulaire orienté **outcome trimestriel** : NPS, CSAT, adoption, churn,
 *    rétention, MRR, conversion (vs incidents/latence d'un Sprint).
 *  - « Maintenir » glissé en **distracteur d'action** : c'est le piège de la
 *    health metric (DOMAINE.md §4.4, fiche « Les 4 pièges du KR »).
 *  - Repères temporels = trimestre (fin du trimestre, fin Q3, prochaine revue).
 *
 * Pédagogie : on assemble un Résultat clé solide, pas un Objectif (qui est
 * qualitatif). La grammaire est universelle, le vocabulaire fait la différence
 * entre les types — c'est ce qu'on veut faire ressortir par contraste avec
 * Sprint et PI.
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
  text("a-good-pass", "action", "good", "Faire passer"),
  text("a-good-reach", "action", "good", "Atteindre"),
  text("a-good-divide", "action", "good", "Diviser"),
  text("a-good-reduce", "action", "good", "Réduire"),
];
const ACTION_NEUTRAL: TextBlock[] = [
  text("a-neu-multiply", "action", "neutral", "Multiplier"),
  text("a-neu-convert", "action", "neutral", "Convertir"),
  text("a-neu-bring", "action", "neutral", "Ramener"),
  text("a-neu-increase", "action", "neutral", "Augmenter"),
];
const ACTION_DISTRACTORS: TextBlock[] = [
  text("a-dis-deliver", "action", "distractor", "Livrer"),
  text("a-dis-keep", "action", "distractor", "Maintenir"), // piège health metric
  text("a-dis-improve", "action", "distractor", "Améliorer"),
  text("a-dis-implement", "action", "distractor", "Implémenter"),
];

/* ---------- Catégorie 2 — Indicateur ---------- */
const INDICATOR_GOOD: TextBlock[] = [
  text("i-good-nps", "indicator", "good", "le NPS dev du module"),
  text("i-good-adoption", "indicator", "good", "le taux d'adoption de l'API"),
  text("i-good-intégration", "indicator", "good", "le temps moyen d'intégration d'une équipe"),
  text("i-good-csat", "indicator", "good", "le CSAT des équipes consommatrices"),
];
const INDICATOR_NEUTRAL: TextBlock[] = [
  text("i-neu-active", "indicator", "neutral", "le nombre d'équipes actives mensuelles"),
  text("i-neu-detect", "indicator", "neutral", "le temps moyen de détection d'un incident"),
  text("i-neu-escalation", "indicator", "neutral", "le nombre d'escalades support / semaine"),
  text("i-neu-retention", "indicator", "neutral", "le taux de rétention des nouveaux utilisateurs"),
];
const INDICATOR_DISTRACTORS: TextBlock[] = [
  text("i-dis-tableau de bord", "indicator", "distractor", "le nouveau tableau de bord métriques"),
  text("i-dis-satisfaction", "indicator", "distractor", "la satisfaction client"),
  text("i-dis-quality", "indicator", "distractor", "la qualité du service"),
  text("i-dis-everything", "indicator", "distractor", "tout ce qui doit être livré"),
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
const VARIATION_DISTRACTORS: TextBlock[] = [
  text("v-dis-signif", "variation", "distractor", "significativement"),
  text("v-dis-drastic", "variation", "distractor", "drastiquement"),
  text("v-dis-notable", "variation", "distractor", "de manière notable"),
  text("v-dis-up", "variation", "distractor", "vers le haut"),
];

/* ---------- Catégorie 4 — Contexte / bénéficiaire ---------- */
const CONTEXT_GOOD: PuzzleBlock[] = [
  text("c-good-consumers", "context", "good", "pour les équipes consommatrices"),
  text("c-good-data", "context", "good", "pour les équipes data"),
  text("c-good-new", "context", "good", "pour les nouveaux développeurs intégrés"),
  text("c-good-prod", "context", "good", "en production"),  text("okr-c-good-internal-cons", "context", "good", "pour les consommateurs internes"),
  text("okr-c-good-allied-teams", "context", "good", "pour les équipes internes arrimées au sujet"),
  text("okr-c-good-final-clients", "context", "good", "pour les clients finaux"),
  customField("okr-c-good-team-custom", "context", "pour l'équipe [X]", 1),

];
const CONTEXT_NEUTRAL: TextBlock[] = [
  text("c-neu-segment", "context", "neutral", "sur le segment entreprise"),
  text("c-neu-pipeline", "context", "neutral", "sur le module pipeline"),
  text("c-neu-payment", "context", "neutral", "sur le service paiement"),
  text("c-neu-none", "context", "neutral", ""), // option phrase compacte
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
  text("t-good-quarter", "timeReference", "good", "la fin du trimestre"),
  text("t-good-q3", "timeReference", "good", "la fin de Q3"),
  text("t-good-q4", "timeReference", "good", "la fin de Q4"),
  text("t-good-review", "timeReference", "good", "la prochaine revue trimestrielle"),  customField("okr-t-good-custom-date", "timeReference", "le [X]", 1),

];
const TIMEREF_NEUTRAL: TextBlock[] = [
  text("t-neu-checkin", "timeReference", "neutral", "le prochain check-in trimestriel"),
  text("t-neu-month3", "timeReference", "neutral", "trois mois"),
  text("t-neu-90days", "timeReference", "neutral", "90 jours"),
  text("t-neu-cycle", "timeReference", "neutral", "la fin du cycle OKR"),
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

export const OKR_EQUIPE_DEV_PUZZLE_SETS_FR: Record<PuzzleLevel, PuzzleSet> = {
  easy: setFor("easy", 0, 0),
  medium: setFor("medium", 2, 1),
  hard: setFor("hard", 4, 2),
};
