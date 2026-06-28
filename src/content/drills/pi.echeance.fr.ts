/**
 * Corpus mini-exercice « L'échéance PI » × dev × FR.
 * Grille à sélection multiple, 8 fragments adaptés à l'échelle d'un PI (8-12 sem).
 */

import type { DrillCorpus } from "../../domain/drill";

export const PI_ECHEANCE_DRILL_FR: DrillCorpus = {
  kind: "grid",
  intro:
    "Une échéance à l'échelle du PI est bornée par un événement SAFe identifiable (revue de PI, fin de PI, PI Planning suivant, mi-PI, date calendaire).",
  data: {
    consigne: "Coche toutes les échéances bornées valides à l'échelle d'un PI.",
    fragments: [
      { id: "pi.e.1", text: "Démontré à la revue de PI du 28 mars", isCorrect: true, justification: "Événement et date précis." },
      { id: "pi.e.2", text: "Sur la durée du programme", isCorrect: false, justification: "Aucun horizon défini." },
      { id: "pi.e.3", text: "Avant le PI Planning N+1", isCorrect: true, justification: "Événement SAFe identifiable." },
      { id: "pi.e.4", text: "Dès que possible", isCorrect: false, justification: "Formule sans engagement." },
      { id: "pi.e.5", text: "Mesuré en fin de PI sur les données de la dernière itération", isCorrect: true, justification: "Borne PI + source de mesure précisée." },
      { id: "pi.e.6", text: "Dans les prochains PI", isCorrect: false, justification: "Combien de PI, à partir de quand." },
      { id: "pi.e.7", text: "Atteint au plus tard mi-PI, soit semaine 6", isCorrect: true, justification: "Repère mi-PI converti en semaine." },
      { id: "pi.e.8", text: "Rapidement après le démarrage", isCorrect: false, justification: "« Rapidement » non borné." },
    ],
  },
};
