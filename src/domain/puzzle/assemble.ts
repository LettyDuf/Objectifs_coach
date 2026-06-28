/**
 * Assemblage d'une phrase à partir des blocs placés.
 *
 * Logique pure, testable seule. Pas de React, pas de UI.
 */

import type { PlacedBlock } from "./types";
import { REQUIRED_SLOTS, SLOT_ORDER } from "./types";

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
 * Minimum de catégories distinctes pour qu'une phrase soit jugée évaluable
 * (mode de compatibilité, quand les blocs ne sont pas dans un plateau).
 */
export const MIN_DISTINCT_CATEGORIES = 4;

/**
 * Indique si la phrase est prête à être évaluée. Conditions :
 *   1. tous les champs numériques sont remplis ;
 *   2a. mode plateau (D25) : les 4 zones obligatoires (intention / mesure /
 *       cible / horizon) sont remplies ;
 *   2b. mode legacy : au moins MIN_DISTINCT_CATEGORIES catégories distinctes
 *       sont posées (sinon le score moteur sur une phrase d'un seul bloc
 *       serait faussement positif).
 */
export function isComplete(placed: PlacedBlock[]): boolean {
  if (placed.length === 0) return false;
  const allFieldsFilled = placed.every((p) => {
    if (p.block.kind === "text") return true;
    return p.values
      .slice(0, p.block.fieldCount)
      .every((v) => v !== undefined && v.trim().length > 0);
  });
  if (!allFieldsFilled) return false;
  // Mode plateau : tous les blocs portent un slotKey
  const allSlotted = placed.every((p) => p.slotKey !== undefined);
  if (allSlotted) {
    const slotsPresent = new Set(placed.map((p) => p.slotKey!));
    return REQUIRED_SLOTS.every((slot) => slotsPresent.has(slot));
  }
  // Mode legacy : catégories distinctes
  const distinctCategories = new Set(placed.map((p) => p.block.category)).size;
  return distinctCategories >= MIN_DISTINCT_CATEGORIES;
}

/**
 * Construit la phrase finale : concatène les blocs, ajoute un point final.
 * Les espaces multiples sont compactés.
 *
 * Mode plateau (D25) : si tous les blocs portent un slotKey, on ordonne selon
 * SLOT_ORDER (lecture grammaticale canonique). Sinon, ordre d'insertion.
 */
export function assembleSentence(placed: PlacedBlock[]): string {
  if (placed.length === 0) return "";
  const allSlotted = placed.every((p) => p.slotKey !== undefined);
  const ordered = allSlotted
    ? [...placed].sort(
        (a, b) =>
          SLOT_ORDER.indexOf(a.slotKey!) - SLOT_ORDER.indexOf(b.slotKey!),
      )
    : placed;
  const text = ordered
    .map(blockToString)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length === 0) return "";
  const capitalized = text[0]!.toUpperCase() + text.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : capitalized + ".";
}

/** Identifiant d'instance unique. */
let counter = 0;
export function newInstanceId(): string {
  counter += 1;
  return `inst-${counter}`;
}
