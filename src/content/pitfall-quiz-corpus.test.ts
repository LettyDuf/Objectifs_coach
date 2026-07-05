/**
 * Test d'intégrité du corpus Anti-patterns (isNamedPitfall) sur les 3 modules.
 *
 * Garde-fou après l'étoffement du 2026-07-04 (4/4/5 → 10/10/10, D52) : vérifie
 * que chaque fiche marquée `isNamedPitfall` produit bien un cas de quiz complet
 * (aucun champ vide par erreur de saisie) et que le nombre de cas par module
 * reste celui attendu, pour éviter qu'une régression silencieuse passe
 * inaperçue (cf. mémoire projet : ce type de test a déjà sauvé une régression
 * sur l'équilibrage OKR équipe).
 */

import { describe, it, expect } from "vitest";
import { createContentRepository } from "./repository";
import type { ObjectiveType } from "../domain/types";

const repo = createContentRepository();

const EXPECTED_COUNTS: Record<ObjectiveType, number> = {
  sprint: 10,
  pi: 10,
  "okr-equipe": 10,
  "okr-entreprise": 10,
};

const AUDIENCE_BY_TYPE: Record<ObjectiveType, "dev" | "manager"> = {
  sprint: "dev",
  pi: "dev",
  "okr-equipe": "dev",
  "okr-entreprise": "manager",
};

describe("Corpus Anti-patterns (isNamedPitfall) — Sprint / PI / OKR équipe / OKR entreprise", () => {
  (["sprint", "pi", "okr-equipe", "okr-entreprise"] as const).forEach((type) => {
    describe(type, () => {
      const cases = repo.getPitfallQuizCases(type, AUDIENCE_BY_TYPE[type]);

      it(`compte ${EXPECTED_COUNTS[type]} cas`, () => {
        expect(cases.length).toBe(EXPECTED_COUNTS[type]);
      });

      it("a des identifiants uniques", () => {
        const ids = cases.map((c) => c.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("n'a aucun champ texte vide (fiche mal renseignée)", () => {
        for (const c of cases) {
          expect(c.badExample, `${c.id}: badExample`).not.toBe("");
          expect(c.correctLabel, `${c.id}: correctLabel`).not.toBe("");
          expect(c.explanation, `${c.id}: explanation`).not.toBe("");
          expect(c.categoryRule, `${c.id}: categoryRule`).not.toBe("");
          expect(c.goodExample, `${c.id}: goodExample`).not.toBe("");
        }
      });

      it("a des libellés de piège (correctLabel) tous distincts", () => {
        const labels = cases.map((c) => c.correctLabel);
        expect(new Set(labels).size).toBe(labels.length);
      });
    });
  });
});
