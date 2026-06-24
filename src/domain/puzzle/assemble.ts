/**
 * Assemblage d'une phrase à partir des blocs placés.
 *
 * Logique pure, testable seule. Pas de React, pas de UI.
 */

import type { PlacedBlock } from "./types";

/**
 * Convertit un bloc placé en chaîne, en substituant les valeurs saisies dans
 * le template des blocs numériques. Un champ vide est rendu comme `[?]` pour
 * que le moteur d'évaluation ne reçoive pas un texte incohérent silencieux.
 */
export function blockToString(placed: PlacedBlock): string {
  const { block, values } = placed;
  if (block.kind === "text") {
    return block.text;
  }
  // numericField : on remplace [X] puis [Y] (V1 : au plus 2 champs).
  let result = block.template;
  const placeholders: Array<"[X]" | "[Y]"> = ["[X]", "[Y]"];
  for (let i = 0; i < block.fieldCount; i++) {
    const value = (values[i] ?? "").trim();
    result = result.replace(placeholders[i]!, value.length > 0 ? value : "[?]");
  }
  return result;
}

/**
 * Indique si la phrase est prête à être évaluée : tous les champs numériques
 * sont remplis. Permet à l'UI de désactiver l'évaluation tant que c'est faux.
 */
export function isComplete(placed: PlacedBlock[]): boolean {
  return placed.every((p) => {
    if (p.block.kind === "text") return true;
    return p.values
      .slice(0, p.block.fieldCount)
      .every((v) => v !== undefined && v.trim().length > 0);
  });
}

/**
 * Construit la phrase finale : concatène les blocs, ajoute un point final.
 * Les espaces multiples sont compactés.
 */
export function assembleSentence(placed: PlacedBlock[]): string {
  if (placed.length === 0) return "";
  const text = placed
    .map(blockToString)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length === 0) return "";
  // Capitalise la première lettre si elle ne l'est pas.
  const capitalized = text[0]!.toUpperCase() + text.slice(1);
  // Ajoute un point final si absent.
  return /[.!?]$/.test(capitalized) ? capitalized : capitalized + ".";
}

/** Identifiant d'instance unique. */
let counter = 0;
export function newInstanceId(): string {
  counter += 1;
  return `inst-${counter}`;
}
