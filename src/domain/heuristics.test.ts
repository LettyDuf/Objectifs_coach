import { describe, it, expect } from "vitest";
import {
  findFuzzyWords,
  hasNumericThreshold,
  looksComposite,
  normalize,
  startsWithOutputVerb,
  tokenize,
} from "./heuristics";

describe("normalize", () => {
  it("met en minuscules, retire les accents et compacte les espaces", () => {
    expect(normalize("  Améliorer  Çà-là  ")).toBe("ameliorer ca-la");
  });
});

describe("tokenize", () => {
  it("découpe en mots et ignore la ponctuation", () => {
    expect(tokenize("Réduire de 50 % le taux !")).toEqual(["reduire", "de", "50", "le", "taux"]);
  });
});

describe("startsWithOutputVerb", () => {
  const verbs = ["développer", "mettre en place", "refactorer"];

  it("détecte un verbe d'output simple en tête", () => {
    expect(startsWithOutputVerb("Développer la page de paiement", verbs)).toBe("developper");
  });

  it("détecte un verbe d'output composé en tête", () => {
    expect(startsWithOutputVerb("Mettre en place le pipeline CI", verbs)).toBe("mettre en place");
  });

  it("ne déclenche pas si le verbe est absent", () => {
    expect(startsWithOutputVerb("Réduire le taux d'abandon", verbs)).toBeNull();
  });

  it("ne déclenche pas si le verbe d'output est ailleurs dans la phrase", () => {
    // "développer" est en milieu de phrase, donc pas en tête → null.
    expect(
      startsWithOutputVerb("Faire en sorte que développer soit plus simple", ["développer"]),
    ).toBeNull();
  });
});

describe("findFuzzyWords", () => {
  const fuzzy = ["mieux", "améliorer", "robuste"];

  it("trouve les mots flous présents", () => {
    expect(findFuzzyWords("Améliorer la performance et faire mieux", fuzzy)).toEqual([
      "mieux",
      "ameliorer",
    ]);
  });

  it("retourne vide si aucun", () => {
    expect(findFuzzyWords("Réduire de 50 % le taux d'abandon", fuzzy)).toEqual([]);
  });
});

describe("hasNumericThreshold", () => {
  it("détecte un nombre", () => {
    expect(hasNumericThreshold("Réduire de 50 % le taux")).toBe(true);
    expect(hasNumericThreshold("Atteindre 500 utilisateurs")).toBe(true);
  });

  it("retourne faux si aucun chiffre", () => {
    expect(hasNumericThreshold("Améliorer la performance")).toBe(false);
  });
});

describe("looksComposite", () => {
  it("détecte un « et » coordonnant", () => {
    expect(looksComposite("Améliorer la performance et finir la migration")).toBe(true);
  });

  it("ne déclenche pas sans « et »", () => {
    expect(looksComposite("Réduire le temps de réponse")).toBe(false);
  });
});
