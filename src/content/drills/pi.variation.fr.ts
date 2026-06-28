/**
 * Corpus mini-exercice « La variation chiffrée » PI × dev × FR.
 * Grille à sélection multiple, 8 fragments adaptés à l'échelle PI.
 */

import type { DrillCorpus } from "../../domain/drill";

export const PI_VARIATION_DRILL_FR: DrillCorpus = {
  kind: "grid",
  intro:
    "Une variation précise à l'échelle PI donne un chiffre : valeur de référence, cible, écart. Une formulation vague laisse à l'interprétation à la revue de PI.",
  data: {
    consigne: "Coche toutes les variations chiffrées exploitables sur un PI.",
    fragments: [
      { id: "pi.v.1", text: "Passer de 240 à 180 secondes sur le temps moyen de prise en charge d'appel", isCorrect: true, justification: "Valeurs de départ et d'arrivée explicites." },
      { id: "pi.v.2", text: "Améliorer sensiblement la satisfaction des grands comptes", isCorrect: false, justification: "« Sensiblement » n'est pas chiffré." },
      { id: "pi.v.3", text: "Diviser par 2 le nombre d'incidents bloquants en production, valeur de référence 8 par mois", isCorrect: true, justification: "Facteur et valeur de référence donnés." },
      { id: "pi.v.4", text: "Renforcer la robustesse de la plateforme de paiement", isCorrect: false, justification: "Aucune mesure ni cible." },
      { id: "pi.v.5", text: "Atteindre 60 % de démarches publiques finalisées sans contact agent, valeur de référence 42 %", isCorrect: true, justification: "Cible et valeur de référence chiffrées." },
      { id: "pi.v.6", text: "Faire progresser l'autonomie des équipes métiers", isCorrect: false, justification: "Aucun seuil ni valeur de référence." },
      { id: "pi.v.7", text: "Faire baisser le délai de clôture comptable de 7 à 4 jours ouvrés", isCorrect: true, justification: "Valeurs avant et après explicites." },
      { id: "pi.v.8", text: "Avoir un impact significatif sur la dette technique", isCorrect: false, justification: "Formulation vide de cible." },
    ],
  },
};
