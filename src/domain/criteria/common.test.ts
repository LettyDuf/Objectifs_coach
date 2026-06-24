import { describe, it, expect } from "vitest";
import {
  COMMON_WEIGHTS,
  evaluateCrediblyAmbitious,
  evaluateFalsifiable,
  evaluateOutcome,
  evaluateTimeBounded,
  evaluateUnderInfluence,
} from "./common";
import type { ObjectiveDraft } from "../types";
import { HEURISTICS_FR } from "../../content/heuristics.fr";

function sprintDraft(overrides: Partial<ObjectiveDraft> = {}): ObjectiveDraft {
  return {
    type: "sprint",
    text: "",
    audience: "dev",
    ...overrides,
  } as ObjectiveDraft;
}

describe("COMMON_WEIGHTS", () => {
  it("somme à 1", () => {
    const sum = Object.values(COMMON_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });
});

describe("evaluateOutcome", () => {
  it("bad quand le texte commence par un verbe d'output", () => {
    const r = evaluateOutcome(
      sprintDraft({ text: "Développer la page de paiement" }),
      HEURISTICS_FR,
    );
    expect(r.status).toBe("bad");
    expect(r.contribution).toBe(0);
  });

  it("good sinon", () => {
    const r = evaluateOutcome(
      sprintDraft({ text: "Réduire de 50 % le taux d'abandon d'ici fin de sprint" }),
      HEURISTICS_FR,
    );
    expect(r.status).toBe("good");
    expect(r.contribution).toBeGreaterThan(0);
  });
});

describe("evaluateFalsifiable", () => {
  it("good : seuil chiffré, pas de mot flou", () => {
    const r = evaluateFalsifiable(
      sprintDraft({ text: "Atteindre 500 utilisateurs actifs" }),
      HEURISTICS_FR,
    );
    expect(r.status).toBe("good");
  });

  it("warn : seuil chiffré + mot flou", () => {
    const r = evaluateFalsifiable(
      sprintDraft({ text: "Améliorer de 50 % la performance" }),
      HEURISTICS_FR,
    );
    expect(r.status).toBe("warn");
  });

  it("warn : pas de seuil, pas de mot flou", () => {
    const r = evaluateFalsifiable(
      sprintDraft({ text: "Permettre aux invités de finaliser une commande" }),
      HEURISTICS_FR,
    );
    expect(r.status).toBe("warn");
  });

  it("bad : pas de seuil et mot flou", () => {
    const r = evaluateFalsifiable(
      sprintDraft({ text: "Améliorer la performance" }),
      HEURISTICS_FR,
    );
    expect(r.status).toBe("bad");
  });
});

describe("evaluateTimeBounded", () => {
  it("good si case explicite cochée", () => {
    const r = evaluateTimeBounded(
      sprintDraft({ text: "Faire X", hasExplicitDeadline: true }),
    );
    expect(r.status).toBe("good");
  });

  it("good si mention textuelle de borne", () => {
    const r = evaluateTimeBounded(sprintDraft({ text: "Faire X d'ici fin de sprint 24" }));
    expect(r.status).toBe("good");
  });

  it("bad sinon", () => {
    const r = evaluateTimeBounded(sprintDraft({ text: "Faire X" }));
    expect(r.status).toBe("bad");
  });
});

describe("evaluateUnderInfluence", () => {
  it("good quand la case est cochée", () => {
    const r = evaluateUnderInfluence(sprintDraft({ isUnderTeamInfluence: true }));
    expect(r.status).toBe("good");
  });

  it("bad sinon", () => {
    const r = evaluateUnderInfluence(sprintDraft({}));
    expect(r.status).toBe("bad");
  });
});

describe("evaluateCrediblyAmbitious", () => {
  const sprintRange = { min: 70, max: 100 };

  it("warn quand la confiance n'est pas renseignée", () => {
    const r = evaluateCrediblyAmbitious(sprintDraft({}), sprintRange);
    expect(r.status).toBe("warn");
  });

  it("good quand la confiance est dans la fourchette", () => {
    const r = evaluateCrediblyAmbitious(sprintDraft({ confidence: 80 }), sprintRange);
    expect(r.status).toBe("good");
  });

  it("bad quand trop basse (sprint)", () => {
    const r = evaluateCrediblyAmbitious(sprintDraft({ confidence: 40 }), sprintRange);
    expect(r.status).toBe("bad");
  });

  it("bad quand trop haute pour un stretch PI", () => {
    const r = evaluateCrediblyAmbitious(sprintDraft({ confidence: 95 }), { min: 30, max: 60 });
    expect(r.status).toBe("bad");
  });
});
