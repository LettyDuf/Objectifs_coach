import { describe, it, expect } from "vitest";
import { assembleSentence, blockToString, isComplete } from "./assemble";
import type { PlacedBlock } from "./types";

function txt(id: string, text: string): PlacedBlock {
  return {
    instanceId: id,
    block: { kind: "text", id, category: "action", quality: "good", text },
    values: [],
  };
}

function num(id: string, template: string, fieldCount: 1 | 2, values: string[]): PlacedBlock {
  return {
    instanceId: id,
    block: { kind: "numericField", id, category: "variation", quality: "good", template, fieldCount },
    values,
  };
}

describe("blockToString", () => {
  it("rend un TextBlock tel quel", () => {
    expect(blockToString(txt("a", "Réduire"))).toBe("Réduire");
  });

  it("substitue les valeurs dans un NumericFieldBlock à 2 champs", () => {
    expect(blockToString(num("a", "de [X] à [Y]", 2, ["50 %", "25 %"]))).toBe("de 50 % à 25 %");
  });

  it("substitue la valeur d'un NumericFieldBlock à 1 champ", () => {
    expect(blockToString(num("a", "par [X]", 1, ["2"]))).toBe("par 2");
  });

  it("rend [?] quand un champ est vide", () => {
    expect(blockToString(num("a", "de [X] à [Y]", 2, ["50", ""]))).toBe("de 50 à [?]");
  });
});

describe("isComplete", () => {
  it("vrai quand tous les blocs sont prêts", () => {
    expect(isComplete([txt("a", "Réduire"), num("b", "par [X]", 1, ["2"])])).toBe(true);
  });

  it("faux si un champ numérique est vide", () => {
    expect(isComplete([num("b", "par [X]", 1, [""])])).toBe(false);
  });

  it("vrai pour une liste vide", () => {
    expect(isComplete([])).toBe(true);
  });
});

describe("assembleSentence", () => {
  it("concatène, capitalise et ajoute un point", () => {
    const phrase = assembleSentence([
      txt("a", "réduire"),
      txt("b", "le taux d'abandon"),
      num("c", "de [X] à [Y]", 2, ["50 %", "25 %"]),
      txt("d", "d'ici la fin du sprint"),
    ]);
    expect(phrase).toBe("Réduire le taux d'abandon de 50 % à 25 % d'ici la fin du sprint.");
  });

  it("renvoie une chaîne vide si aucun bloc", () => {
    expect(assembleSentence([])).toBe("");
  });

  it("ne double pas le point final si déjà présent", () => {
    expect(assembleSentence([txt("a", "Bonjour.")])).toBe("Bonjour.");
  });
});
