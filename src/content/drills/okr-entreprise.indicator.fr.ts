/**
 * Corpus mini-exercice « L'indicateur » OKR entreprise × manager × FR.
 *
 * QCM 1 parmi 3, 10 cas. Réplique le pattern OKR équipe à l'échelle entreprise
 * (CODIR, stratégie annuelle, revue trimestrielle).
 * Question type : « Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ? »
 * Répartition équilibrée a=4 (1,4,7,10), b=3 (2,5,8), c=3 (3,6,9).
 *
 * Twist OKR entreprise : 3 cas (2, 5, 8) opposent un vrai Résultat clé à une
 * health metric déguisée (taux de résiliation grands comptes, marge sous
 * un seuil, taux de conformité réglementaire). Apport Lamorte : une health
 * metric est un garde-fou à surveiller en continu, pas un changement à
 * atteindre sur l'année. Distracteurs porteurs de chiffres décoratifs pour
 * ne jamais rendre la bonne réponse reconnaissable à la seule densité de chiffres.
 */

import type { DrillCorpus } from "../../domain/drill";

const Q = "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?";

export const OKR_ENTREPRISE_MANAGER_INDICATOR_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "Un bon indicateur de Résultat clé entreprise se mesure avec exactitude à la revue trimestrielle ou annuelle. Attention au piège de la health metric : un seuil qu'on surveille en continu (marge, taux de résiliation, conformité) est un garde-fou, pas un Résultat clé. Un Résultat clé vise un changement à atteindre.",
  cases: [
    {
      id: "okrent.ind.1",
      statement: "Réussir le lancement de la nouvelle offre premium",
      question: Q,
      options: [
        { id: "A", text: "Faire passer le taux de clients qui souscrivent à l'offre premium de 0 % à 15 % d'ici fin d'année", isCorrect: true },
        { id: "B", text: "Réussir le lancement de l'offre premium en 3 étapes", isCorrect: false },
        { id: "C", text: "Avoir une offre premium bien reçue par le marché", isCorrect: false },
      ],
      explanation: "Taux de souscription chiffré avec valeur de référence et cible bornée sur l'année. Les deux autres restent des intentions, malgré le « 3 étapes » qui n'est qu'un chiffre décoratif.",
    },
    {
      id: "okrent.ind.2",
      statement: "Renforcer la relation avec les grands comptes",
      question: Q,
      options: [
        { id: "A", text: "Maintenir le taux de résiliation des grands comptes sous 5 % toute l'année", isCorrect: false },
        { id: "B", text: "Faire passer le taux de renouvellement des contrats grands comptes de 68 % à 88 %", isCorrect: true },
        { id: "C", text: "Avoir des grands comptes plus engagés sur nos 12 offres", isCorrect: false },
      ],
      explanation: "Piège health metric : maintenir un taux sous un seuil est un garde-fou. Le taux de renouvellement qui passe de 68 à 88 % est un vrai Résultat clé.",
    },
    {
      id: "okrent.ind.3",
      statement: "S'implanter durablement sur le marché allemand",
      question: Q,
      options: [
        { id: "A", text: "S'implanter durablement en Allemagne", isCorrect: false },
        { id: "B", text: "Devenir une marque reconnue en Allemagne sur nos 4 familles de produits", isCorrect: false },
        { id: "C", text: "Faire passer le chiffre d'affaires réalisé en Allemagne de 1,2 à 6 millions d'euros", isCorrect: true },
      ],
      explanation: "Montant chiffré avec valeur de référence et cible. Les deux autres formulations restent floues, même avec le chiffre « 4 » qui ne mesure rien.",
    },
    {
      id: "okrent.ind.4",
      statement: "Améliorer la satisfaction des clients particuliers",
      question: Q,
      options: [
        { id: "A", text: "Faire monter le score de satisfaction client de 42 à 65 d'ici la revue annuelle", isCorrect: true },
        { id: "B", text: "Offrir une expérience client 5 étoiles sur nos 3 canaux", isCorrect: false },
        { id: "C", text: "Avoir des clients plus satisfaits qu'avant", isCorrect: false },
      ],
      explanation: "Score chiffré, valeur de référence et cible datées. Les deux autres restent des intentions, malgré leurs chiffres décoratifs.",
    },
    {
      id: "okrent.ind.5",
      statement: "Sécuriser la rentabilité pendant la transformation",
      question: Q,
      options: [
        { id: "A", text: "Conserver une marge opérationnelle au-dessus de 18 % toute l'année", isCorrect: false },
        { id: "B", text: "Faire passer la marge opérationnelle de 14 % à 20 % d'ici fin d'année", isCorrect: true },
        { id: "C", text: "Garder une trajectoire financière saine sur nos 5 lignes de produits", isCorrect: false },
      ],
      explanation: "Piège health metric : conserver un taux au-dessus d'un seuil est un garde-fou. La marge qui passe de 14 à 20 % est un vrai Résultat clé outcome.",
    },
    {
      id: "okrent.ind.6",
      statement: "Réussir la transformation culturelle de l'entreprise",
      question: Q,
      options: [
        { id: "A", text: "Réussir notre transformation culturelle en 4 phases", isCorrect: false },
        { id: "B", text: "Avoir une culture d'entreprise plus forte", isCorrect: false },
        { id: "C", text: "Faire passer le score d'engagement des salariés de 55 à 75", isCorrect: true },
      ],
      explanation: "Score d'engagement mesuré par enquête interne, avec valeur de référence. Les deux autres sont des concepts-parapluie, malgré le chiffre « 4 » qui ne mesure aucun changement.",
    },
    {
      id: "okrent.ind.7",
      statement: "Développer la marque à l'international",
      question: Q,
      options: [
        { id: "A", text: "Faire passer le taux de notoriété spontanée de la marque de 10 % à 28 % sur le marché cible", isCorrect: true },
        { id: "B", text: "Développer une marque forte à l'international", isCorrect: false },
        { id: "C", text: "Être reconnu sur nos 6 marchés prioritaires", isCorrect: false },
      ],
      explanation: "Taux de notoriété mesuré par étude de marché, avec valeur de référence et cible. Les deux autres restent des intentions.",
    },
    {
      id: "okrent.ind.8",
      statement: "Garantir la conformité réglementaire pendant l'expansion",
      question: Q,
      options: [
        { id: "A", text: "Rester conforme à la réglementation sur nos 3 marchés", isCorrect: false },
        { id: "B", text: "Faire passer le taux de dossiers clients conformes au nouveau cadre réglementaire de 71 % à 98 %", isCorrect: true },
        { id: "C", text: "Ne jamais être en infraction", isCorrect: false },
      ],
      explanation: "Piège health metric : rester conforme est un garde-fou permanent, pas un changement. Le taux de dossiers conformes qui passe de 71 à 98 % est un vrai Résultat clé.",
    },
    {
      id: "okrent.ind.9",
      statement: "Diversifier les canaux de vente",
      question: Q,
      options: [
        { id: "A", text: "Diversifier nos canaux de vente sur 5 régions", isCorrect: false },
        { id: "B", text: "Avoir des canaux de vente plus performants", isCorrect: false },
        { id: "C", text: "Faire passer la part du chiffre d'affaires réalisée en ligne de 9 % à 25 %", isCorrect: true },
      ],
      explanation: "Part de chiffre d'affaires mesurée précisément, avec valeur de référence et cible. Les deux autres sont des intentions, même avec le chiffre « 5 » qui ne mesure aucun changement.",
    },
    {
      id: "okrent.ind.10",
      statement: "Réussir l'adoption des nouveaux outils numériques par les équipes",
      question: Q,
      options: [
        { id: "A", text: "Faire monter le taux de salariés formés et utilisant activement le nouvel outil de 8 % à 70 %", isCorrect: true },
        { id: "B", text: "Réussir l'adoption numérique en interne", isCorrect: false },
        { id: "C", text: "Digitaliser nos 7 processus prioritaires", isCorrect: false },
      ],
      explanation: "Taux d'usage actif chiffré, avec valeur de référence et cible. Les deux autres restent des intentions ou des plans d'action, malgré le chiffre « 7 » qui ne mesure aucun changement.",
    },
  ],
};
