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
  /** Explication pédagogique sur CET exemple précis (le `note` de l'exemple). */
  explanation: string;
  /** La bonne reformulation, affichée après réponse pour boucler la boucle. */
  goodExample: string;
  /**
   * La règle qui définit ce piège en général (le `heroPhrase` de la fiche) —
   * répond à « pourquoi ça appartient à CETTE famille de piège », pas
   * seulement « pourquoi cet exemple précis est raté ».
   */
  categoryRule: string;
  /**
   * Signal concret pour repérer ce piège la prochaine fois, en dehors de cet
   * exemple précis — dérivé de la section marquée `kind: "signals"` de la
   * fiche. Vide si la fiche n'a pas (encore) une telle section.
   */
  detectionSignal: string;
  /** Thème de la fiche source — sert à construire le lien « Voir la fiche ». */
  themeId: string | undefined;
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
      categoryRule: sheet.heroPhrase ?? "",
      detectionSignal: signalsBullets(sheet),
      themeId: sheet.themeId,
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

/** Concatène les bullets de la section marquée `kind: "signals"`, s'il y en a une. */
function signalsBullets(sheet: PedagogicalSheet): string {
  const section = sheet.sections.find((s) => s.kind === "signals");
  if (!section || !section.bullets || section.bullets.length === 0) return "";
  return section.bullets.join(" ");
}
