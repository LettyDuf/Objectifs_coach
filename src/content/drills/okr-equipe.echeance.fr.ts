/**
 * Corpus mini-exercice « L'échéance trimestrielle » OKR équipe × FR.
 * Grille à sélection multiple, 8 fragments adaptés à l'échelle d'un trimestre.
 * Vocabulaire spécifique OKR : revue trimestrielle, fin de trimestre, mi-trimestre.
 * Le distracteur « en continu » raccroche pédagogiquement à la doctrine
 * health metric (un état permanent à surveiller n'est pas un Résultat clé).
 */

import type { DrillCorpus } from "../../domain/drill";

export const OKR_EQUIPE_ECHEANCE_DRILL_FR: DrillCorpus = {
  kind: "grid",
  intro:
    "Une échéance OKR équipe se borne à l'échelle du trimestre : revue trimestrielle, fin du trimestre, mi-trimestre. Un état à maintenir en continu relève d'une health metric, pas d'un Résultat clé.",
  data: {
    consigne: "Coche toutes les échéances bornées valides à l'échelle d'un trimestre OKR.",
    fragments: [
      { id: "okre.e.1", text: "D'ici la prochaine revue trimestrielle", isCorrect: true, justification: "Cérémonie OKR datée et identifiable." },
      { id: "okre.e.2", text: "Dans la durée", isCorrect: false, justification: "Aucune borne." },
      { id: "okre.e.3", text: "Mi-trimestre, soit semaine 6", isCorrect: true, justification: "Jalon précis dans le trimestre." },
      { id: "okre.e.4", text: "Rapidement", isCorrect: false, justification: "Subjectif, non opposable." },
      { id: "okre.e.5", text: "Avant le 30 juin (fin du trimestre Q2)", isCorrect: true, justification: "Date calendaire ferme." },
      { id: "okre.e.6", text: "Sur l'année", isCorrect: false, justification: "Horizon annuel, hors cadre OKR équipe trimestriel." },
      { id: "okre.e.7", text: "D'ici fin du trimestre", isCorrect: true, justification: "Borne trimestre standard." },
      { id: "okre.e.8", text: "En continu", isCorrect: false, justification: "État permanent à surveiller : relève d'une health metric, pas d'un Résultat clé." },
    ],
  },
};
