/**
 * Corpus mini-exercice « La variation chiffrée » Sprint × dev × FR.
 *
 * Grille à sélection multiple : cocher les fragments qui expriment une
 * variation précise (chiffrée) face à des formulations vagues.
 */

import type { DrillCorpus } from "../../domain/drill";

export const SPRINT_VARIATION_DRILL_FR: DrillCorpus = {
  kind: "grid",
  intro:
    "Une variation précise donne un chiffre : combien, de combien, par rapport à quoi. Une formulation vague laisse le résultat à l'interprétation.",
  data: {
    consigne: "Coche tous les fragments qui expriment une variation chiffrée précise.",
    fragments: [
      { id: "v.1", text: "Diviser par deux le nombre de paniers abandonnés", isCorrect: true, justification: "Division par 2, base claire." },
      { id: "v.2", text: "Améliorer nettement la satisfaction client", isCorrect: false, justification: "« Nettement » n'est pas chiffré." },
      { id: "v.3", text: "Passer de 12 à 6 jours de délai moyen de réponse", isCorrect: true, justification: "Valeurs de départ et d'arrivée données." },
      { id: "v.4", text: "Réduire significativement les incidents de paie", isCorrect: false, justification: "« Significativement » reste à interpréter." },
      { id: "v.5", text: "Faire baisser de 30 % les retards de facturation", isCorrect: true, justification: "Pourcentage explicite." },
      { id: "v.6", text: "Mieux gérer les pics de charge", isCorrect: false, justification: "Aucune mesure ni cible." },
      { id: "v.7", text: "Atteindre 95 % de factures payées sous 30 jours", isCorrect: true, justification: "Cible chiffrée, seuil net." },
      { id: "v.8", text: "Renforcer la qualité du référentiel client", isCorrect: false, justification: "Pas de niveau de départ ni d'arrivée." },
    ],
  },
};
