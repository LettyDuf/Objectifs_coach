/**
 * Adaptateur driven — implémente le port ContentRepository en lisant les fichiers
 * statiques de `src/content/`. Aucun appel réseau, aucun fichier externe : tout est
 * embarqué dans le bundle.
 *
 * Pour ajouter une nouvelle audience ou un nouveau type, créer le fichier
 * `examples/<type>.<audience>.<langue>.ts` et l'enregistrer dans `EXAMPLES_INDEX`.
 */

import type { Audience, ObjectiveType } from "../domain/types";
import type {
  AnnotatedExample,
  ContentRepository,
  HeuristicsConfig,
  PedagogicalSheet,
  ThemeWithSheets,
} from "../domain/ports";
import { DEFAULT_THEME, THEMES_INDEX } from "./themes.fr";
import type { PuzzleLevel, PuzzleSet } from "../domain/puzzle/types";
import { HEURISTICS_FR } from "./heuristics.fr";
import { SPRINT_DEV_EXAMPLES_FR } from "./examples/sprint.dev.fr";
import { SPRINT_DEV_SHEETS_FR } from "./sheets/sprint.dev.fr";
import { SPRINT_DEV_PUZZLE_SETS_FR } from "./puzzles/sprint.dev.fr";
import { PI_DEV_EXAMPLES_FR } from "./examples/pi.dev.fr";
import { PI_DEV_SHEETS_FR } from "./sheets/pi.dev.fr";
import { PI_DEV_PUZZLE_SETS_FR } from "./puzzles/pi.dev.fr";
import { OKR_EQUIPE_DEV_PUZZLE_SETS_FR } from "./puzzles/okr-equipe.dev.fr";
import { OKR_ENTREPRISE_MANAGER_PUZZLE_SETS_FR } from "./puzzles/okr-entreprise.manager.fr";
import { SPRINT_DEV_SCENARIOS_FR } from "./scenarios/sprint.dev.fr";
import { PI_DEV_SCENARIOS_FR } from "./scenarios/pi.dev.fr";
import type { ScenarioCard } from "../domain/scenario";
import { SPRINT_DEV_WARMUP_FR } from "./warmup/sprint.dev.fr";
import { PI_DEV_WARMUP_FR } from "./warmup/pi.dev.fr";
import { OKR_EQUIPE_DEV_WARMUP_FR } from "./warmup/okr-equipe.dev.fr";
import type { WarmupCase } from "../domain/warmup";
import { SPRINT_DEV_CHALLENGE_QUIZ_FR } from "./challenge-quiz/sprint.dev.fr";
import { PI_DEV_CHALLENGE_QUIZ_FR } from "./challenge-quiz/pi.dev.fr";
import { OKR_EQUIPE_DEV_CHALLENGE_QUIZ_FR } from "./challenge-quiz/okr-equipe.dev.fr";
import { OKR_ENTREPRISE_MANAGER_CHALLENGE_QUIZ_FR } from "./challenge-quiz/okr-entreprise.manager.fr";
import type { ChallengeQuizCase } from "../domain/challenge-quiz";
import { buildPitfallQuizCases, type PitfallQuizCase } from "../domain/pitfall-quiz";
import { OKR_EQUIPE_DEV_EXAMPLES_FR } from "./examples/okr-equipe.dev.fr";
import { OKR_EQUIPE_DEV_SHEETS_FR } from "./sheets/okr-equipe.dev.fr";
import { POSTURE_VALEURS_SHEETS_FR } from "./sheets/posture-valeurs.shared.fr";
import { OKR_ENTREPRISE_MANAGER_SHEETS_FR } from "./sheets/okr-entreprise.manager.fr";
import { OKR_ENTREPRISE_MANAGER_WARMUP_FR } from "./warmup/okr-entreprise.manager.fr";

type ExamplesIndex = Partial<Record<ObjectiveType, Partial<Record<Audience, AnnotatedExample[]>>>>;
type SheetsIndex = Partial<Record<ObjectiveType, Partial<Record<Audience, PedagogicalSheet[]>>>>;
type PuzzleIndex = Partial<
  Record<ObjectiveType, Partial<Record<Audience, Record<PuzzleLevel, PuzzleSet>>>>
>;
type ScenarioIndex = Partial<Record<ObjectiveType, Partial<Record<Audience, ScenarioCard[]>>>>;
type WarmupIndex = Partial<Record<ObjectiveType, Partial<Record<Audience, WarmupCase[]>>>>;
type ChallengeQuizIndex = Partial<Record<ObjectiveType, Partial<Record<Audience, ChallengeQuizCase[]>>>>;

const EXAMPLES_INDEX: ExamplesIndex = {
  sprint: {
    dev: SPRINT_DEV_EXAMPLES_FR,
  },
  pi: {
    dev: PI_DEV_EXAMPLES_FR,
  },
  "okr-equipe": {
    dev: OKR_EQUIPE_DEV_EXAMPLES_FR,
  },
};

// Injection du thème transverse « Posture et valeurs » dans chaque module.
// Les 6 fiches partagées sont préfixées dans la liste de chaque module pour
// apparaître en première position de l'onglet Théorie (validé Lætitia 2026-06-22).
const SHEETS_INDEX: SheetsIndex = {
  sprint: {
    dev: [...POSTURE_VALEURS_SHEETS_FR, ...SPRINT_DEV_SHEETS_FR],
  },
  pi: {
    dev: [...POSTURE_VALEURS_SHEETS_FR, ...PI_DEV_SHEETS_FR],
  },
  "okr-equipe": {
    dev: [...POSTURE_VALEURS_SHEETS_FR, ...OKR_EQUIPE_DEV_SHEETS_FR],
  },
  "okr-entreprise": {
    manager: [...POSTURE_VALEURS_SHEETS_FR, ...OKR_ENTREPRISE_MANAGER_SHEETS_FR],
  },
};

const PUZZLE_INDEX: PuzzleIndex = {
  sprint: {
    dev: SPRINT_DEV_PUZZLE_SETS_FR,
  },
  pi: {
    dev: PI_DEV_PUZZLE_SETS_FR,
  },
  "okr-equipe": {
    dev: OKR_EQUIPE_DEV_PUZZLE_SETS_FR,
  },
  "okr-entreprise": {
    manager: OKR_ENTREPRISE_MANAGER_PUZZLE_SETS_FR,
  },
};

const SCENARIO_INDEX: ScenarioIndex = {
  sprint: {
    dev: SPRINT_DEV_SCENARIOS_FR,
  },
  pi: {
    dev: PI_DEV_SCENARIOS_FR,
  },
};

const WARMUP_INDEX: WarmupIndex = {
  sprint: {
    dev: SPRINT_DEV_WARMUP_FR,
  },
  pi: {
    dev: PI_DEV_WARMUP_FR,
  },
  "okr-equipe": {
    dev: OKR_EQUIPE_DEV_WARMUP_FR,
  },
  "okr-entreprise": {
    manager: OKR_ENTREPRISE_MANAGER_WARMUP_FR,
  },
};

const CHALLENGE_QUIZ_INDEX: ChallengeQuizIndex = {
  sprint: {
    dev: SPRINT_DEV_CHALLENGE_QUIZ_FR,
  },
  pi: {
    dev: PI_DEV_CHALLENGE_QUIZ_FR,
  },
  "okr-equipe": {
    dev: OKR_EQUIPE_DEV_CHALLENGE_QUIZ_FR,
  },
  "okr-entreprise": {
    manager: OKR_ENTREPRISE_MANAGER_CHALLENGE_QUIZ_FR,
  },
};

export function createContentRepository(): ContentRepository {
  return {
    getHeuristicsConfig(): HeuristicsConfig {
      return HEURISTICS_FR;
    },
    getExamples(type: ObjectiveType, audience: Audience): AnnotatedExample[] {
      return EXAMPLES_INDEX[type]?.[audience] ?? [];
    },
    getSheets(type: ObjectiveType, audience: Audience): PedagogicalSheet[] {
      return SHEETS_INDEX[type]?.[audience] ?? [];
    },
    getThemes(type: ObjectiveType, audience: Audience): ThemeWithSheets[] {
      const sheets = SHEETS_INDEX[type]?.[audience] ?? [];
      const themes = THEMES_INDEX[type]?.[audience] ?? [];
      // Si aucun thème déclaré, on regroupe toutes les fiches sous le thème par défaut.
      if (themes.length === 0) {
        return sheets.length > 0 ? [{ theme: DEFAULT_THEME, sheets }] : [];
      }
      const grouped: ThemeWithSheets[] = themes.map((theme) => ({
        theme,
        sheets: sheets.filter((s) => s.themeId === theme.id),
      }));
      // Les fiches sans `themeId` (ou avec un themeId inconnu) sont rattachées au thème par défaut.
      const knownIds = new Set(themes.map((t) => t.id));
      const orphans = sheets.filter((s) => !s.themeId || !knownIds.has(s.themeId));
      if (orphans.length > 0) {
        grouped.push({ theme: DEFAULT_THEME, sheets: orphans });
      }
      // On retire les thèmes vides pour ne pas afficher de cards creuses.
      return grouped.filter((g) => g.sheets.length > 0);
    },
    getPuzzleSet(
      type: ObjectiveType,
      audience: Audience,
      level: PuzzleLevel,
    ): PuzzleSet | null {
      return PUZZLE_INDEX[type]?.[audience]?.[level] ?? null;
    },
    getScenarioCards(type: ObjectiveType, audience: Audience): ScenarioCard[] {
      return SCENARIO_INDEX[type]?.[audience] ?? [];
    },
    getWarmupCases(type: ObjectiveType, audience: Audience): WarmupCase[] {
      return WARMUP_INDEX[type]?.[audience] ?? [];
    },
    getChallengeQuizCases(type: ObjectiveType, audience: Audience): ChallengeQuizCase[] {
      return CHALLENGE_QUIZ_INDEX[type]?.[audience] ?? [];
    },
    getPitfallQuizCases(type: ObjectiveType, audience: Audience): PitfallQuizCase[] {
      const sheets = SHEETS_INDEX[type]?.[audience] ?? [];
      return buildPitfallQuizCases(sheets);
    },
  };
}
