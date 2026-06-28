import { describe, it, expect } from "vitest";
import { assembleSentence, blockToString, isComplete, MIN_DISTINCT_CATEGORIES } from "./assemble";
import type { PlacedBlock, PuzzleCategory, SlotKey } from "./types";

function slotted(p: PlacedBlock, slotKey: SlotKey): PlacedBlock {
  return { ...p, slotKey };
}

function txt(id: string, text: string, category: PuzzleCategory = "action"): PlacedBlock {
  return {
    instanceId: id,
    block: { kind: "text", id, category, quality: "good", text },
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
  it("vrai quand tous les blocs sont prêts et qu'au moins 4 catégories distinctes sont couvertes", () => {
    expect(
      isComplete([
        txt("a", "Réduire", "action"),
        txt("b", "le taux d'abandon", "indicator"),
        num("c", "de [X] à [Y]", 2, ["50 %", "25 %"]),
        txt("d", "d'ici la fin du sprint", "timeReference"),
      ])
    ).toBe(true);
  });

  it("faux si un champ numérique est vide", () => {
    expect(isComplete([num("b", "par [X]", 1, [""])])).toBe(false);
  });

  it("faux pour une phrase d'un seul bloc (1 catégorie)", () => {
    expect(isComplete([txt("a", "Permettre à", "action")])).toBe(false);
  });

  it("faux pour 3 catégories distinctes (en dessous du minimum)", () => {
    expect(
      isComplete([
        txt("a", "Réduire", "action"),
        txt("b", "le taux d'abandon", "indicator"),
        num("c", "de [X] à [Y]", 2, ["50 %", "25 %"]),
      ])
    ).toBe(false);
  });

  it("vrai pour une liste vide (cas dégénéré, l'UI gère séparément)", () => {
    // Note : placed.length === 0 est filtré côté UI via `ready = placed.length > 0 && isComplete`
    // mais la fonction reste cohérente : 0 catégorie distincte < 4 → false.
    expect(isComplete([])).toBe(false);
  });

  it("expose le seuil minimum pour usage UI", () => {
    expect(MIN_DISTINCT_CATEGORIES).toBe(4);
  });
});

describe("isComplete — mode plateau (slotKey défini)", () => {
  it("vrai quand les 4 zones obligatoires sont remplies", () => {
    expect(
      isComplete([
        slotted(txt("a", "Augmenter", "action"), "intention"),
        slotted(txt("b", "le NPS", "indicator"), "mesure"),
        slotted(num("c", "de [X] pts", 1, ["12"]), "cible"),
        slotted(txt("d", "d'ici fin Q3", "timeReference"), "horizon"),
      ])
    ).toBe(true);
  });

  it("faux quand l'une des 4 zones obligatoires manque (ex. horizon vide)", () => {
    expect(
      isComplete([
        slotted(txt("a", "Augmenter", "action"), "intention"),
        slotted(txt("b", "le NPS", "indicator"), "mesure"),
        slotted(num("c", "de [X] pts", 1, ["12"]), "cible"),
        // pas d'horizon
      ])
    ).toBe(false);
  });

  it("vrai même avec un slot bonus rempli en plus", () => {
    expect(
      isComplete([
        slotted(txt("a", "Augmenter", "action"), "intention"),
        slotted(txt("b", "le NPS", "indicator"), "mesure"),
        slotted(num("c", "de [X] pts", 1, ["12"]), "cible"),
        slotted(txt("d", "d'ici fin Q3", "timeReference"), "horizon"),
        slotted(txt("e", "pour les clients premium", "context"), "contexte"),
      ])
    ).toBe(true);
  });

  it("faux si un champ chiffré reste vide même en mode plateau", () => {
    expect(
      isComplete([
        slotted(txt("a", "Augmenter", "action"), "intention"),
        slotted(txt("b", "le NPS", "indicator"), "mesure"),
        slotted(num("c", "de [X] pts", 1, [""]), "cible"),
        slotted(txt("d", "d'ici fin Q3", "timeReference"), "horizon"),
      ])
    ).toBe(false);
  });
});

describe("assembleSentence — mode plateau (ordre canonique)", () => {
  it("réordonne les blocs selon SLOT_ORDER même si insérés dans le désordre", () => {
    // Insertion : horizon, mesure, intention, cible
    const phrase = assembleSentence([
      slotted(txt("d", "d'ici fin Q3", "timeReference"), "horizon"),
      slotted(txt("b", "le NPS", "indicator"), "mesure"),
      slotted(txt("a", "Augmenter", "action"), "intention"),
      slotted(num("c", "de [X] pts", 1, ["12"]), "cible"),
    ]);
    expect(phrase).toBe("Augmenter le NPS de 12 pts d'ici fin Q3.");
  });

  it("intercale le contexte entre cible et horizon", () => {
    const phrase = assembleSentence([
      slotted(txt("a", "Augmenter", "action"), "intention"),
      slotted(txt("b", "le NPS", "indicator"), "mesure"),
      slotted(num("c", "de [X] pts", 1, ["12"]), "cible"),
      slotted(txt("e", "pour les clients premium", "context"), "contexte"),
      slotted(txt("d", "d'ici fin Q3", "timeReference"), "horizon"),
    ]);
    expect(phrase).toBe(
      "Augmenter le NPS de 12 pts pour les clients premium d'ici fin Q3.",
    );
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
