/**
 * Corpus mini-exercice « L'échéance » Sprint × dev × FR.
 *
 * Grille à sélection multiple : cocher les fragments qui posent une échéance
 * précise (date, sprint nommé, événement Scrum), distinguer des formulations
 * qui laissent l'horizon flotter.
 */

import type { DrillCorpus } from "../../domain/drill";

export const SPRINT_ECHEANCE_DRILL_FR: DrillCorpus = {
  kind: "grid",
  intro:
    "Une échéance précise pose une date, un sprint nommé, un événement repérable. Les formulations vagues n'engagent personne.",
  data: {
    consigne: "Coche tous les fragments qui posent une échéance précise.",
    fragments: [
      { id: "e.1", text: "D'ici la fin du sprint 14", isCorrect: true, justification: "Sprint nommé, fin identifiable." },
      { id: "e.2", text: "Dans les meilleurs délais", isCorrect: false, justification: "Formule vide." },
      { id: "e.3", text: "Avant le 30 septembre", isCorrect: true, justification: "Date calendaire précise." },
      { id: "e.4", text: "Rapidement après la mise en production", isCorrect: false, justification: "« Rapidement » n'est pas une borne." },
      { id: "e.5", text: "À la clôture du trimestre en cours", isCorrect: true, justification: "Fin de période identifiée." },
      { id: "e.6", text: "Sur les prochaines semaines", isCorrect: false, justification: "Combien de semaines, à partir de quand." },
      { id: "e.7", text: "Au plus tard le vendredi de la revue de sprint", isCorrect: true, justification: "Jour et événement précis." },
      { id: "e.8", text: "Dans la durée", isCorrect: false, justification: "Aucun horizon." },
    ],
  },
};
