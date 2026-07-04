/**
 * Worksheet « Maintenance : trouver la valeur » — guide l'utilisatrice à
 * travers les 3 questions de la fiche Théorie (`sprint.sheet.maintenance-value`)
 * sur SON propre travail de maintenance, en texte libre. Aucun jugement, aucun
 * score : le domaine assemble juste un brouillon de phrase à partir des
 * réponses, cohérent avec la doctrine Composer (D26) — pédagogie de
 * l'émergence, pas de l'erreur.
 */

export interface MaintenanceWorksheetAnswers {
  /** Description libre de la tâche de départ (non exploitée dans l'assemblage, sert de point d'ancrage). */
  task: string;
  beneficiary: string;
  change: string;
  measure: string;
}

/** Retire un ou plusieurs points finaux avant de recomposer une phrase. */
function stripTrailingDot(s: string): string {
  return s.replace(/\.+\s*$/, "");
}

/**
 * Assemble un brouillon de phrase à partir des réponses. Retourne une chaîne
 * vide tant que bénéficiaire et changement ne sont pas tous les deux
 * renseignés (le brouillon n'a pas de sens sans ce socle).
 */
export function buildMaintenanceDraftSentence(answers: MaintenanceWorksheetAnswers): string {
  const beneficiary = answers.beneficiary.trim();
  const change = answers.change.trim();
  const measure = answers.measure.trim();

  if (!beneficiary || !change) return "";

  let sentence = `Faire en sorte que ${beneficiary} ${stripTrailingDot(change)}`;
  if (measure) {
    sentence += `, mesuré par ${stripTrailingDot(measure)}`;
  }
  return sentence + ".";
}
