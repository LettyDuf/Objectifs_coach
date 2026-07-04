/**
 * Quiz « Anti-patterns » — reconnaître, dans un mauvais exemple, à quel piège
 * nommé il correspond (mode Pratique).
 *
 * Contrairement au Défi (ChallengeQuiz), on ne juge pas une reformulation :
 * on identifie l'anti-pattern illustré, parmi ceux déjà enseignés dans les
 * fiches pédagogiques (Théorie). Zéro contenu ré-écrit : les cas sont dérivés
 * des fiches marquées `isNamedPitfall`, chacune contenant exactement un exemple
 * `{ bad, good, note }`. Domaine pur, sans dépendance UI.
 */

import type { PedagogicalSheet } from "./ports";

export interface PitfallQuizCase {
  /** Identifiant stable, dérivé de l'id de la fiche source. */
  id: string;
  /** Le mauvais exemple à faire reconnaître. */
  badExample: string;
  /** Id de la fiche source — sert de clé de réponse correcte. */
  correctPitfallId: string;
  /** Libellé du piège (titre de la fiche), affiché comme option de réponse. */
  correctLabel: string;
  /** Explication pédagogique (le `note` de l'exemple), affichée après réponse. */
  explanation: string;
  /** La bonne reformulation, affichée après réponse pour boucler la boucle. */
  goodExample: string;
}

/**
 * Construit les cas du quiz à partir des fiches d'un module. Ignore silencieusement
 * une fiche marquée `isNamedPitfall` mais sans exemple exploitable (erreur de
 * contenu à corriger en amont, pas une raison de faire planter l'UI).
 */
export function buildPitfallQuizCases(sheets: PedagogicalSheet[]): PitfallQuizCase[] {
  const cases: PitfallQuizCase[] = [];
  for (const sheet of sheets) {
    if (!sheet.isNamedPitfall) continue;
    const example = firstExample(sheet);
    if (!example || !example.good) continue;
    cases.push({
      id: `pitfall-quiz.${sheet.id}`,
      badExample: example.bad,
      correctPitfallId: sheet.id,
      correctLabel: sheet.title,
      explanation: example.note ?? "",
      goodExample: example.good,
    });
  }
  return cases;
}

function firstExample(sheet: PedagogicalSheet) {
  for (const section of sheet.sections) {
    if (section.examples && section.examples.length > 0) {
      return section.examples[0];
    }
  }
  return undefined;
}
