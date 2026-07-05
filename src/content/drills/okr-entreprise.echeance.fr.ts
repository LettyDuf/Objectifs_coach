/**
 * Corpus mini-exercice « L'échéance » OKR entreprise × manager × FR.
 * Grille à sélection multiple, 8 fragments adaptés à l'échelle annuelle du CODIR.
 * Vocabulaire spécifique OKR entreprise : revue annuelle, fin d'année, jalon
 * trimestriel de suivi. Le distracteur « en continu » raccroche pédagogiquement
 * à la doctrine health metric (un état permanent à surveiller n'est pas un
 * Résultat clé), tout comme « sur le long terme » qui n'a pas de borne.
 */

import type { DrillCorpus } from "../../domain/drill";

export const OKR_ENTREPRISE_MANAGER_ECHEANCE_FR: DrillCorpus = {
  kind: "grid",
  intro:
    "Une échéance OKR entreprise se borne à l'échelle de l'année, avec des jalons trimestriels de suivi : fin d'année, revue annuelle, tel trimestre précis. Un état à maintenir en continu relève d'une health metric, pas d'un Résultat clé.",
  data: {
    consigne: "Coche toutes les échéances bornées valides à l'échelle d'un OKR entreprise.",
    fragments: [
      { id: "okrent.e.1", text: "D'ici la revue annuelle", isCorrect: true, justification: "Cérémonie OKR entreprise datée et identifiable." },
      { id: "okrent.e.2", text: "Sur le long terme", isCorrect: false, justification: "Aucune borne." },
      { id: "okrent.e.3", text: "Au jalon du troisième trimestre", isCorrect: true, justification: "Jalon précis dans l'année, utile pour suivre la trajectoire." },
      { id: "okrent.e.4", text: "Le plus vite possible", isCorrect: false, justification: "Subjectif, non opposable." },
      { id: "okrent.e.5", text: "Avant le 31 décembre de l'exercice", isCorrect: true, justification: "Date calendaire ferme." },
      { id: "okrent.e.6", text: "Sur plusieurs années", isCorrect: false, justification: "Horizon pluriannuel, hors cadre OKR entreprise (échelle annuelle)." },
      { id: "okrent.e.7", text: "D'ici la fin de l'année fiscale", isCorrect: true, justification: "Borne annuelle standard pour un OKR entreprise." },
      { id: "okrent.e.8", text: "En continu", isCorrect: false, justification: "État permanent à surveiller : relève d'une health metric, pas d'un Résultat clé." },
    ],
  },
};
