import { describe, it, expect } from "vitest";
import {
  assembleTrame,
  buildRecap,
  emptyBricks,
  ETAYAGE_LABELS,
  ETAYAGE_DESCRIPTIONS,
  ETAYAGE_ORDER,
  type BuildBricks,
} from "./build-objective";

const full: BuildBricks = {
  besoin: "le support et les clients",
  verbe: "Ramener",
  quoi: "les incidents",
  observable: "le nombre d'incidents production",
  from: "14",
  to: "5",
  baseline: "moyenne des 4 dernières semaines",
  echeance: "la fin du sprint",
  chances: "plutôt confiants",
  decoupe: "",
};

describe("assembleTrame", () => {
  it("compose la phrase à partir des briques remplies", () => {
    expect(assembleTrame(full)).toBe(
      "Ramener le nombre d'incidents production de 14 à 5, pour le support et les clients, d'ici la fin du sprint.",
    );
  });

  it("préfère l'observable au « quoi » comme indicateur", () => {
    expect(assembleTrame({ ...full, observable: "", quoi: "les incidents" })).toContain(
      "Ramener les incidents de 14 à 5",
    );
  });

  it("insère des marqueurs [à préciser] pour les briques vides", () => {
    const t = assembleTrame(emptyBricks());
    expect(t).toContain("[verbe de variation]");
    expect(t).toContain("[l'indicateur]");
    expect(t).toContain("[départ]");
    expect(t).toContain("[échéance]");
  });
});

describe("buildRecap", () => {
  it("produit 5 lignes avec les bons libellés", () => {
    const r = buildRecap(full);
    expect(r.map((i) => i.label)).toEqual([
      "Pour qui / besoin",
      "Changement",
      "Observable",
      "Cible",
      "Échéance",
    ]);
  });

  it("intègre le repère de baseline dans la cible", () => {
    const cible = buildRecap(full).find((i) => i.label === "Cible");
    expect(cible?.value).toContain("de 14 à 5");
    expect(cible?.value).toContain("repère : moyenne des 4 dernières semaines");
  });

  it("intègre les chances et le découpage dans l'échéance quand ils sont là", () => {
    const withDecoupe = buildRecap({ ...full, decoupe: "livrer d'abord le module A" });
    const ech = withDecoupe.find((i) => i.label === "Échéance");
    expect(ech?.value).toContain("chances : plutôt confiants");
    expect(ech?.value).toContain("1er morceau : livrer d'abord le module A");
  });

  it("n'ajoute pas de repère quand la baseline est vide", () => {
    const cible = buildRecap({ ...full, baseline: "" }).find((i) => i.label === "Cible");
    expect(cible?.value).not.toContain("repère");
  });
});

describe("niveaux d'étayage", () => {
  it("expose trois niveaux ordonnés avec libellé et description", () => {
    expect(ETAYAGE_ORDER).toEqual(["guide", "semi", "auto"]);
    for (const lvl of ETAYAGE_ORDER) {
      expect(ETAYAGE_LABELS[lvl].length).toBeGreaterThan(0);
      expect(ETAYAGE_DESCRIPTIONS[lvl].length).toBeGreaterThan(0);
    }
  });
});
