/**
 * Garde-fou anti-confond de surface pour le Défi QCM.
 *
 * Contexte : à l'origine, 42 des 48 bonnes réponses commençaient par le même
 * gabarit « Faire passer ... de X à Y d'ici ... ». Les équipes avaient appris
 * à cliquer le verbe au lieu de raisonner sur la structure (outcome +
 * indicateur + avant/après + échéance). Correction 2026-07 (panel
 * neuroscientifique + pédagogue) : varier les verbes des bonnes réponses pour
 * qu'aucun trait de surface ne prédise le verdict.
 *
 * Ce test échoue si le confond réapparaît, aujourd'hui ou dans six mois.
 */

import { describe, it, expect } from "vitest";
import type { ChallengeQuizCase } from "../../domain/challenge-quiz";
import { SPRINT_DEV_CHALLENGE_QUIZ_FR } from "./sprint.dev.fr";
import { PI_DEV_CHALLENGE_QUIZ_FR } from "./pi.dev.fr";
import { OKR_EQUIPE_DEV_CHALLENGE_QUIZ_FR } from "./okr-equipe.dev.fr";
import { OKR_ENTREPRISE_MANAGER_CHALLENGE_QUIZ_FR } from "./okr-entreprise.manager.fr";

const ALL: ChallengeQuizCase[] = [
  ...SPRINT_DEV_CHALLENGE_QUIZ_FR,
  ...PI_DEV_CHALLENGE_QUIZ_FR,
  ...OKR_EQUIPE_DEV_CHALLENGE_QUIZ_FR,
  ...OKR_ENTREPRISE_MANAGER_CHALLENGE_QUIZ_FR,
];

/**
 * Verbe d'ouverture normalisé d'une option. Les locutions « Faire passer /
 * entrer / croître » comptent comme deux mots (sinon tous les « Faire ... »
 * seraient confondus).
 */
function openingVerb(text: string): string {
  const words = text
    .trim()
    .replace(/^[«"'\s]+/, "")
    .split(/\s+/);
  let verb = (words[0] ?? "").toLowerCase();
  if (verb === "faire" && words[1]) verb += " " + words[1].toLowerCase();
  return verb;
}

const goodTexts = ALL.flatMap((c) =>
  c.options.filter((o) => o.verdict === "good").map((o) => o.text),
);
const nonGoodTexts = ALL.flatMap((c) =>
  c.options.filter((o) => o.verdict !== "good").map((o) => o.text),
);

describe("Défi QCM — garde-fou anti-confond de surface", () => {
  it("il y a bien une bonne réponse par cas", () => {
    expect(goodTexts.length).toBe(ALL.length);
  });

  it("les bonnes réponses emploient au moins 6 verbes d'ouverture distincts", () => {
    const distinct = new Set(goodTexts.map(openingVerb));
    expect(distinct.size, [...distinct].join(", ")).toBeGreaterThanOrEqual(6);
  });

  it("aucun verbe d'ouverture ne domine les bonnes réponses (<= 35 %)", () => {
    const counts = new Map<string, number>();
    for (const t of goodTexts) {
      const v = openingVerb(t);
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    const [topVerb, topN] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]!;
    expect(
      topN / goodTexts.length,
      `verbe dominant : « ${topVerb} » (${topN}/${goodTexts.length})`,
    ).toBeLessThanOrEqual(0.35);
  });

  it("« faire passer » n'est plus le marqueur des bonnes réponses (< 35 %)", () => {
    const n = goodTexts.filter((t) => openingVerb(t) === "faire passer").length;
    expect(
      n / goodTexts.length,
      `${n}/${goodTexts.length} bonnes réponses en « faire passer »`,
    ).toBeLessThan(0.35);
  });

  it("« faire passer » apparaît aussi sur des options fausses (décorrélation)", () => {
    const n = nonGoodTexts.filter((t) => openingVerb(t) === "faire passer").length;
    expect(
      n,
      "aucune option fausse en « faire passer » : le verbe redeviendrait un signal",
    ).toBeGreaterThanOrEqual(1);
  });
});
