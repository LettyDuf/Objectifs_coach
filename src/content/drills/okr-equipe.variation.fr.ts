/**
 * Corpus mini-exercice « La variation chiffrée » OKR équipe × FR.
 * Grille à sélection multiple, 8 fragments adaptés à l'échelle d'un trimestre OKR.
 * Pédagogie : valeur de référence visible obligatoire pour qu'un Résultat clé soit atteignable.
 */

import type { DrillCorpus } from "../../domain/drill";

export const OKR_EQUIPE_VARIATION_DRILL_FR: DrillCorpus = {
  kind: "grid",
  intro:
    "Une variation chiffrée exploitable comme Résultat clé trimestriel donne une valeur de référence (point de départ) et une cible (point d'arrivée). Sans valeur de référence, l'atteinte ne peut pas être prouvée à la revue trimestrielle.",
  data: {
    consigne: "Coche toutes les variations chiffrées exploitables comme Résultat clé sur un trimestre.",
    fragments: [
      { id: "okre.v.1", text: "Faire passer le taux de rétention à 90 jours de 41 % à 60 %", isCorrect: true, justification: "Valeur de référence 41 %, cible 60 %, écart mesurable." },
      { id: "okre.v.2", text: "Augmenter significativement le nombre de comptes actifs", isCorrect: false, justification: "Pas de valeur de référence, « significativement » non chiffré." },
      { id: "okre.v.3", text: "Réduire le coût d'acquisition client de 180 € à 120 €", isCorrect: true, justification: "Montants précis, variation bornée." },
      { id: "okre.v.4", text: "Booster nos performances commerciales", isCorrect: false, justification: "Aucun chiffre, intention floue." },
      { id: "okre.v.5", text: "Faire monter le taux de prospects qualifiés convertis en opportunités commerciales de 18 % à 28 %", isCorrect: true, justification: "Valeur de référence et cible explicites sur l'étape de conversion." },
      { id: "okre.v.6", text: "Améliorer nettement la qualité de code", isCorrect: false, justification: "Pas mesurable, qualitatif." },
      { id: "okre.v.7", text: "Passer le délai de premier diagnostic patient de 11 j à 5 j", isCorrect: true, justification: "Durée chiffrée, valeur de référence visible." },
      { id: "okre.v.8", text: "Accroître la robustesse de la chaîne logistique", isCorrect: false, justification: "Concept-parapluie, ni valeur de référence ni cible." },
    ],
  },
};
