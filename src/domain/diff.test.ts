import { describe, it, expect } from "vitest";
import { diffEvaluations } from "./diff";
import type { EvaluationResult } from "./types";

function mkResult(score: number, criteria: Array<{ id: string; status: "good" | "warn" | "bad"; contribution: number }>): EvaluationResult {
  return {
    score,
    overallStatus: score >= 80 ? "good" : score >= 50 ? "warn" : "bad",
    criteria: criteria.map((c) => ({
      id: c.id as never,
      label: c.id,
      status: c.status,
      message: "",
      weight: 0.2,
      contribution: c.contribution,
    })),
  };
}

describe("diffEvaluations", () => {
  it("calcule le delta de score global", () => {
    const prev = mkResult(60, []);
    const curr = mkResult(80, []);
    const d = diffEvaluations(prev, curr);
    expect(d.scoreDelta).toBe(20);
    expect(d.scoreDirection).toBe("up");
  });

  it("marque chaque critère avec sa direction", () => {
    const prev = mkResult(50, [
      { id: "outcome", status: "bad", contribution: 0 },
      { id: "falsifiable", status: "warn", contribution: 12.5 },
    ]);
    const curr = mkResult(85, [
      { id: "outcome", status: "good", contribution: 30 },
      { id: "falsifiable", status: "good", contribution: 25 },
    ]);
    const d = diffEvaluations(prev, curr);
    const byId = new Map(d.criteriaDeltas.map((c) => [c.id, c]));
    expect(byId.get("outcome")?.direction).toBe("up");
    expect(byId.get("outcome")?.delta).toBe(30);
    expect(byId.get("falsifiable")?.direction).toBe("up");
    expect(byId.get("falsifiable")?.delta).toBe(12.5);
  });

  it("repère les critères inchangés", () => {
    const prev = mkResult(75, [{ id: "outcome", status: "good", contribution: 30 }]);
    const curr = mkResult(75, [{ id: "outcome", status: "good", contribution: 30 }]);
    const d = diffEvaluations(prev, curr);
    expect(d.criteriaDeltas[0]!.direction).toBe("same");
  });

  it("traite un critère absent dans le précédent comme 0", () => {
    const prev = mkResult(50, []);
    const curr = mkResult(80, [{ id: "outcome", status: "good", contribution: 30 }]);
    const d = diffEvaluations(prev, curr);
    expect(d.criteriaDeltas[0]?.prevStatus).toBe("absent");
    expect(d.criteriaDeltas[0]?.delta).toBe(30);
  });

  it("repère un critère présent avant et disparu après (ex. pénalité levée)", () => {
    const prev = mkResult(60, [{ id: "general.composite", status: "bad", contribution: -20 }]);
    const curr = mkResult(80, []);
    const d = diffEvaluations(prev, curr);
    expect(d.criteriaDeltas[0]?.currStatus).toBe("absent");
    expect(d.criteriaDeltas[0]?.direction).toBe("up"); // -(-20) = +20
  });
});
