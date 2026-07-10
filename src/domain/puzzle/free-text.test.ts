import { describe, it, expect } from "vitest";
import { assessFreeVerb } from "./free-text";
import type { HeuristicsConfig } from "../ports";

const CONFIG: HeuristicsConfig = {
  outputVerbs: ["livrer", "refactorer", "mettre en place", "stabiliser"],
  fuzzyWords: ["optimiser", "mieux", "robuste"],
};

describe("assessFreeVerb", () => {
  it("reconnaît un verbe de travail, quelle que soit la casse", () => {
    expect(assessFreeVerb("Livrer", CONFIG)).toBe("output-verb");
    expect(assessFreeVerb("  stabiliser ", CONFIG)).toBe("output-verb");
    expect(assessFreeVerb("Mettre en place", CONFIG)).toBe("output-verb");
  });

  it("reconnaît un verbe de travail suivi d'un complément", () => {
    expect(assessFreeVerb("Livrer la v2", CONFIG)).toBe("output-verb");
  });

  it("reconnaît un mot flou", () => {
    expect(assessFreeVerb("Optimiser", CONFIG)).toBe("fuzzy-word");
    expect(assessFreeVerb("Rendre plus robuste", CONFIG)).toBe("fuzzy-word");
  });

  it("renvoie unknown pour un verbe inconnu ou vide", () => {
    expect(assessFreeVerb("Faire décoller", CONFIG)).toBe("unknown");
    expect(assessFreeVerb("", CONFIG)).toBe("unknown");
  });

  it("ne confond pas un préfixe partiel (livre ≠ livrer)", () => {
    expect(assessFreeVerb("Livre blanc", CONFIG)).toBe("unknown");
  });
});
