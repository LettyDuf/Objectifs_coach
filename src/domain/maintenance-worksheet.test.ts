import { describe, it, expect } from "vitest";
import { buildMaintenanceDraftSentence } from "./maintenance-worksheet";

describe("buildMaintenanceDraftSentence", () => {
  it("retourne une chaîne vide si bénéficiaire manque", () => {
    expect(
      buildMaintenanceDraftSentence({ task: "x", beneficiary: "", change: "le support reçoit moins de tickets", measure: "" }),
    ).toBe("");
  });

  it("retourne une chaîne vide si changement manque", () => {
    expect(
      buildMaintenanceDraftSentence({ task: "x", beneficiary: "l'équipe support", change: "", measure: "" }),
    ).toBe("");
  });

  it("assemble bénéficiaire + changement sans mesure", () => {
    expect(
      buildMaintenanceDraftSentence({
        task: "corriger des bugs",
        beneficiary: "l'équipe support",
        change: "reçoit moins de tickets escaladés",
        measure: "",
      }),
    ).toBe("Faire en sorte que l'équipe support reçoit moins de tickets escaladés.");
  });

  it("ajoute la mesure quand elle est renseignée", () => {
    expect(
      buildMaintenanceDraftSentence({
        task: "x",
        beneficiary: "l'équipe support",
        change: "reçoit moins de tickets escaladés",
        measure: "le nombre de tickets escaladés par semaine",
      }),
    ).toBe(
      "Faire en sorte que l'équipe support reçoit moins de tickets escaladés, mesuré par le nombre de tickets escaladés par semaine.",
    );
  });

  it("retire les points finaux avant de recomposer", () => {
    expect(
      buildMaintenanceDraftSentence({
        task: "x",
        beneficiary: "l'équipe support",
        change: "reçoit moins de tickets escaladés.",
        measure: "le nombre de tickets escaladés.",
      }),
    ).toBe(
      "Faire en sorte que l'équipe support reçoit moins de tickets escaladés, mesuré par le nombre de tickets escaladés.",
    );
  });

  it("ignore les espaces superflus", () => {
    expect(
      buildMaintenanceDraftSentence({
        task: "x",
        beneficiary: "  l'équipe support  ",
        change: "  reçoit moins de tickets  ",
        measure: "",
      }),
    ).toBe("Faire en sorte que l'équipe support reçoit moins de tickets.");
  });
});
