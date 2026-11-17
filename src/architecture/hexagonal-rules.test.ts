// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  findArchitectureViolations,
  isProductionSource,
  type ArchitectureConfig,
  type SourceFile,
} from "./hexagonal-rules";

/**
 * Tests du vérificateur d'architecture lui-même, sur des fichiers fictifs.
 * Ils prouvent que le filet attrape bien les infractions avant qu'on lui confie le vrai code.
 */
const CONFIG: ArchitectureConfig = {
  sourceRoot: "src",
  aliases: { "@domain": "src/domain", "@ui": "src/ui" },
  rules: [
    {
      layer: "domain",
      mayDependOn: ["domain"],
      allowedPackages: [],
      forbiddenGlobals: ["window", "document", "localStorage"],
    },
    { layer: "content", mayDependOn: ["domain", "content"], allowedPackages: ["zod"] },
  ],
};

const file = (path: string, text: string): SourceFile => ({ path, text });
const check = (...files: SourceFile[]) => findArchitectureViolations(files, CONFIG);

describe("findArchitectureViolations : dépendances entre couches", () => {
  it("accepte que le domaine importe le domaine", () => {
    expect(check(file("src/domain/engine.ts", 'import { a } from "./types";'))).toEqual([]);
  });

  it("signale le domaine qui importe l'interface par un chemin relatif", () => {
    const violations = check(file("src/domain/engine.ts", 'import { App } from "../ui/App";'));
    expect(violations).toHaveLength(1);
    expect(violations[0]?.file).toBe("src/domain/engine.ts");
    expect(violations[0]?.detail).toContain("../ui/App");
  });

  it("signale le domaine qui importe l'interface par un alias", () => {
    expect(check(file("src/domain/engine.ts", 'import { App } from "@ui/App";'))).toHaveLength(1);
  });

  it("signale une bibliothèque non autorisée dans la couche (React dans le domaine)", () => {
    expect(check(file("src/domain/engine.ts", "import { useState } from 'react';"))).toHaveLength(1);
  });

  it("accepte une bibliothèque autorisée dans la couche (zod dans le contenu)", () => {
    expect(check(file("src/content/schema.ts", 'import { z } from "zod";'))).toEqual([]);
  });

  it("signale un import qui sort du dossier source", () => {
    expect(check(file("src/domain/engine.ts", 'import cfg from "../../vite.config";'))).toHaveLength(1);
  });

  it("laisse libre une couche sans règle (l'interface peut tout importer)", () => {
    expect(check(file("src/ui/App.tsx", 'import { x } from "../content/data";\nimport React from "react";'))).toEqual([]);
  });

  it("repère toutes les formes d'import : type, réexport, import dynamique, import sans nom", () => {
    const text = [
      'import type { A } from "../ui/a";',
      'export * from "../ui/b";',
      'export { c } from "../ui/c";',
      'const d = await import("../ui/d");',
      'import "../ui/e.css";',
    ].join("\n");
    expect(check(file("src/domain/engine.ts", text))).toHaveLength(5);
  });

  it("repère un import écrit sur plusieurs lignes", () => {
    const text = 'import {\n  A,\n  B,\n} from "../ui/a";';
    expect(check(file("src/domain/engine.ts", text))).toHaveLength(1);
  });

  it("ignore les imports cités dans les commentaires", () => {
    const text = '// import { App } from "../ui/App";\n/* import x from "react"; */\nexport const n = 1;';
    expect(check(file("src/domain/engine.ts", text))).toEqual([]);
  });

  it("ne confond pas une adresse web dans une chaîne avec un commentaire", () => {
    const text = 'const url = "https://exemple.fr"; import { App } from "../ui/App";';
    expect(check(file("src/domain/engine.ts", text))).toHaveLength(1);
  });
});

describe("findArchitectureViolations : objets du navigateur interdits", () => {
  it("signale l'usage de localStorage dans le domaine", () => {
    expect(check(file("src/domain/store.ts", 'localStorage.setItem("k", "v");'))).toHaveLength(1);
  });

  it("ignore ces mots dans un commentaire ou un texte", () => {
    const text = '// window\nconst label = "le document de référence";\nexport const x = label;';
    expect(check(file("src/domain/store.ts", text))).toEqual([]);
  });

  it("ignore ces mots quand ils font partie d'un nom plus long", () => {
    expect(check(file("src/domain/store.ts", "const documentKind = 1; const myWindow = 2;"))).toEqual([]);
  });

  it("ne vérifie les objets du navigateur que dans les couches qui l'interdisent", () => {
    expect(check(file("src/content/a.ts", "window.alert;"))).toEqual([]);
  });
});

describe("isProductionSource", () => {
  it("retient les fichiers TypeScript du code livré", () => {
    expect(isProductionSource("src/domain/engine.ts")).toBe(true);
    expect(isProductionSource("src/ui/App.tsx")).toBe(true);
  });

  it("écarte les tests, les déclarations et les autres fichiers", () => {
    expect(isProductionSource("src/domain/engine.test.ts")).toBe(false);
    expect(isProductionSource("src/ui/App.test.tsx")).toBe(false);
    expect(isProductionSource("src/build-stamp.d.ts")).toBe(false);
    expect(isProductionSource("src/ui/styles/index.css")).toBe(false);
  });
});
