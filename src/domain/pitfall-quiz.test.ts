import { describe, it, expect } from "vitest";
import { buildPitfallQuizCases } from "./pitfall-quiz";
import type { PedagogicalSheet } from "./ports";

function sheet(overrides: Partial<PedagogicalSheet>): PedagogicalSheet {
  return {
    id: "s.default",
    title: "Titre",
    intro: "",
    sections: [],
    ...overrides,
  };
}

describe("buildPitfallQuizCases", () => {
  it("ignore les fiches non marquées isNamedPitfall", () => {
    const sheets = [
      sheet({
        id: "s.a",
        isNamedPitfall: false,
        sections: [{ heading: "h", body: "b", examples: [{ bad: "x", good: "y" }] }],
      }),
    ];
    expect(buildPitfallQuizCases(sheets)).toEqual([]);
  });

  it("ignore une fiche marquée mais sans exemple exploitable", () => {
    const sheets = [
      sheet({ id: "s.b", isNamedPitfall: true, sections: [{ heading: "h", body: "b" }] }),
    ];
    expect(buildPitfallQuizCases(sheets)).toEqual([]);
  });

  it("ignore une fiche marquée dont l'exemple n'a pas de bonne reformulation", () => {
    const sheets = [
      sheet({
        id: "s.c",
        isNamedPitfall: true,
        sections: [{ heading: "h", body: "b", examples: [{ bad: "x" }] }],
      }),
    ];
    expect(buildPitfallQuizCases(sheets)).toEqual([]);
  });

  it("construit un cas depuis l'unique exemple d'une fiche marquée", () => {
    const sheets = [
      sheet({
        id: "s.d",
        title: "Le vanity goal",
        isNamedPitfall: true,
        sections: [
          {
            heading: "h",
            body: "b",
            examples: [{ bad: "Augmenter les téléchargements.", good: "Augmenter l'activation à J7.", note: "Le téléchargement n'est pas l'usage." }],
          },
        ],
      }),
    ];
    expect(buildPitfallQuizCases(sheets)).toEqual([
      {
        id: "pitfall-quiz.s.d",
        badExample: "Augmenter les téléchargements.",
        correctPitfallId: "s.d",
        correctLabel: "Le vanity goal",
        explanation: "Le téléchargement n'est pas l'usage.",
        goodExample: "Augmenter l'activation à J7.",
      },
    ]);
  });

  it("prend le premier exemple trouvé si une fiche marquée a plusieurs sections avec exemples", () => {
    const sheets = [
      sheet({
        id: "s.e",
        isNamedPitfall: true,
        sections: [
          { heading: "h1", body: "b1" },
          { heading: "h2", body: "b2", examples: [{ bad: "premier", good: "bon" }] },
          { heading: "h3", body: "b3", examples: [{ bad: "second", good: "bon2" }] },
        ],
      }),
    ];
    const cases = buildPitfallQuizCases(sheets);
    expect(cases).toHaveLength(1);
    expect(cases[0]?.badExample).toBe("premier");
  });

  it("gère une entrée plusieurs fiches, mélange marquées et non marquées", () => {
    const sheets = [
      sheet({ id: "s.f", isNamedPitfall: false, sections: [] }),
      sheet({
        id: "s.g",
        title: "Le sandbagging",
        isNamedPitfall: true,
        sections: [{ heading: "h", body: "b", examples: [{ bad: "bad g", good: "good g", note: "note g" }] }],
      }),
    ];
    const cases = buildPitfallQuizCases(sheets);
    expect(cases.map((c) => c.correctPitfallId)).toEqual(["s.g"]);
  });
});
