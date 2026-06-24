/**
 * Tests d'intégration du moteur — consomment les exemples annotés validés comme fixtures.
 *
 * Promesse (DOMAINE.md §1 + D6 DECISIONS.md) :
 *   - tous les bons exemples obtiennent un score "good" (≥80).
 *   - tous les mauvais exemples obtiennent un score "bad" ou "warn" (<80) ET
 *     ont effectivement les critères attendus en faute.
 *
 * Si un test échoue, deux causes possibles :
 *   - une règle métier dérive (corriger le critère).
 *   - un exemple est mal annoté (corriger le contenu et faire revalider par Lætitia).
 */

import { describe, it, expect } from "vitest";
import { buildCoach } from "../composition";
import { createContentRepository } from "../content/repository";

const coach = buildCoach();
const repo = createContentRepository();

describe("Moteur — Sprint × dev (fixtures validées DOMAINE.md §2.3)", () => {
  const examples = repo.getExamples("sprint", "dev");

  it("charge au moins quelques exemples", () => {
    expect(examples.length).toBeGreaterThan(0);
  });

  describe("Bons exemples → statut good et score ≥80", () => {
    const goods = examples.filter((e) => e.verdict === "good");
    for (const ex of goods) {
      it(ex.id, () => {
        const result = coach.evaluate(ex.draft);
        expect(result.overallStatus, ex.rationale).toBe("good");
        expect(result.score, ex.rationale).toBeGreaterThanOrEqual(80);
      });
    }
  });

  describe("Mauvais exemples → score <80 et critères attendus en faute", () => {
    const bads = examples.filter((e) => e.verdict === "bad");
    for (const ex of bads) {
      it(ex.id, () => {
        const result = coach.evaluate(ex.draft);
        expect(result.score, `${ex.id} aurait dû échouer`).toBeLessThan(80);
        if (ex.expectedFailingCriteria) {
          const failing = new Set(
            result.criteria.filter((c) => c.status !== "good").map((c) => c.id),
          );
          for (const expectedId of ex.expectedFailingCriteria) {
            expect(failing, `${ex.id} : critère ${expectedId} aurait dû échouer`).toContain(
              expectedId,
            );
          }
        }
      });
    }
  });
});

describe("Moteur — OKR équipe × dev (fixtures validées DOMAINE.md §4.6)", () => {
  const examples = repo.getExamples("okr-equipe", "dev");

  it("charge les exemples OKR équipe", () => {
    expect(examples.length).toBeGreaterThan(0);
  });

  describe("Bons OKR équipe → statut good et score ≥80", () => {
    const goods = examples.filter((e) => e.verdict === "good");
    for (const ex of goods) {
      it(ex.id, () => {
        const result = coach.evaluate(ex.draft);
        expect(result.overallStatus, ex.rationale).toBe("good");
        expect(result.score, ex.rationale).toBeGreaterThanOrEqual(80);
      });
    }
  });

  describe("Mauvais OKR équipe → score <80 et critères attendus en faute", () => {
    const bads = examples.filter((e) => e.verdict === "bad");
    for (const ex of bads) {
      it(ex.id, () => {
        const result = coach.evaluate(ex.draft);
        expect(result.score, `${ex.id} aurait dû échouer`).toBeLessThan(80);
        if (ex.expectedFailingCriteria) {
          const failing = new Set(
            result.criteria.filter((c) => c.status !== "good").map((c) => c.id),
          );
          for (const expectedId of ex.expectedFailingCriteria) {
            expect(failing, `${ex.id} : critère ${expectedId} aurait dû échouer`).toContain(
              expectedId,
            );
          }
        }
      });
    }
  });
});
