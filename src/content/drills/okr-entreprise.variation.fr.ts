/**
 * Corpus mini-exercice « La variation chiffrée » OKR entreprise × manager × FR.
 * Grille à sélection multiple, 8 fragments adaptés à l'échelle entreprise (CODIR,
 * stratégie annuelle : nouveau marché, refonte de l'offre, fidélisation,
 * transformation culturelle, expansion internationale, marque).
 * Pédagogie : valeur de référence visible obligatoire pour qu'un Résultat clé
 * soit atteignable et vérifiable en revue.
 */

import type { DrillCorpus } from "../../domain/drill";

export const OKR_ENTREPRISE_MANAGER_VARIATION_FR: DrillCorpus = {
  kind: "grid",
  intro:
    "Une variation chiffrée exploitable comme Résultat clé entreprise donne une valeur de référence (point de départ) et une cible (point d'arrivée). Sans valeur de référence, l'atteinte ne peut pas être prouvée en revue, même à l'échelle de toute l'entreprise.",
  data: {
    consigne: "Coche toutes les variations chiffrées exploitables comme Résultat clé entreprise.",
    fragments: [
      { id: "okrent.v.1", text: "Faire passer la part du chiffre d'affaires à l'international de 8 % à 25 %", isCorrect: true, justification: "Valeur de référence 8 %, cible 25 %, écart mesurable." },
      { id: "okrent.v.2", text: "Développer significativement notre présence à l'étranger", isCorrect: false, justification: "Pas de valeur de référence, « significativement » non chiffré." },
      { id: "okrent.v.3", text: "Réduire le coût d'acquisition d'un nouveau client de 340 € à 220 €", isCorrect: true, justification: "Montants précis, variation bornée." },
      { id: "okrent.v.4", text: "Renforcer nettement notre position concurrentielle", isCorrect: false, justification: "Aucun chiffre, intention floue." },
      { id: "okrent.v.5", text: "Faire monter le taux de clients grands comptes renouvelant leur contrat de 68 % à 88 %", isCorrect: true, justification: "Valeur de référence et cible explicites sur le taux de renouvellement." },
      { id: "okrent.v.6", text: "Améliorer sensiblement notre image de marque", isCorrect: false, justification: "Pas mesurable, qualitatif." },
      { id: "okrent.v.7", text: "Passer le score d'engagement des salariés de 55 à 75", isCorrect: true, justification: "Score chiffré, valeur de référence visible." },
      { id: "okrent.v.8", text: "Accroître la solidité de notre modèle économique", isCorrect: false, justification: "Concept-parapluie, ni valeur de référence ni cible." },
    ],
  },
};
