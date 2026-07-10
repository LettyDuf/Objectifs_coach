/**
 * Intégrité des corpus Composer (4 modules) après élargissement (D57).
 *
 * Garde-fous :
 *  - chaque pièce action / indicateur / contexte / échéance offre une carte
 *    100 % libre (texte, jamais jugée) ;
 *  - la Variation propose les nouveaux gabarits « de [X] points » et
 *    « d'au moins [X] % » ;
 *  - le set servi au Composer expose bien toutes les bonnes et neutres cartes
 *    (plus de découpage arbitraire à 2 + 2) ;
 *  - identifiants uniques par set.
 */

import { describe, it, expect } from "vitest";
import type { PuzzleBlock, PuzzleSet } from "../../domain/puzzle/types";
import { isFreeTextBlock } from "../../domain/puzzle/types";
import { SPRINT_DEV_PUZZLE_SETS_FR } from "./sprint.dev.fr";
import { PI_DEV_PUZZLE_SETS_FR } from "./pi.dev.fr";
import { OKR_EQUIPE_DEV_PUZZLE_SETS_FR } from "./okr-equipe.dev.fr";
import { OKR_ENTREPRISE_MANAGER_PUZZLE_SETS_FR } from "./okr-entreprise.manager.fr";

const SETS: [string, PuzzleSet][] = [
  ["sprint", SPRINT_DEV_PUZZLE_SETS_FR.hard],
  ["pi", PI_DEV_PUZZLE_SETS_FR.hard],
  ["okr-equipe", OKR_EQUIPE_DEV_PUZZLE_SETS_FR.hard],
  ["okr-entreprise", OKR_ENTREPRISE_MANAGER_PUZZLE_SETS_FR.hard],
];

const FREE_CATEGORIES = ["action", "indicator", "context", "timeReference"] as const;

function allBlocks(set: PuzzleSet): PuzzleBlock[] {
  return Object.values(set.blocksByCategory).flat();
}

describe.each(SETS)("corpus Composer %s", (_name, set) => {
  it("offre une carte libre sur les 4 pièces textuelles", () => {
    for (const cat of FREE_CATEGORIES) {
      const free = set.blocksByCategory[cat].filter(isFreeTextBlock);
      expect(free.length, `carte libre manquante : ${cat}`).toBeGreaterThanOrEqual(1);
    }
  });

  it("propose les nouveaux gabarits de variation", () => {
    const templates = set.blocksByCategory.variation
      .filter((b) => b.kind === "numericField")
      .map((b) => (b.kind === "numericField" ? b.template : ""));
    expect(templates).toContain("de [X] points");
    expect(templates).toContain("d'au moins [X] %");
  });

  it("expose un choix élargi (au moins 6 cartes non-pièges par pièce standard)", () => {
    for (const cat of ["action", "indicator", "context", "timeReference"] as const) {
      const visible = set.blocksByCategory[cat].filter(
        (b) => b.quality !== "distractor",
      );
      expect(visible.length, `pièce trop pauvre : ${cat}`).toBeGreaterThanOrEqual(6);
    }
  });

  it("a des identifiants uniques", () => {
    const ids = allBlocks(set).map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
