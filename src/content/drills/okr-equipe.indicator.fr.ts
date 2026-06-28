/**
 * Corpus mini-exercice « L'indicateur » OKR équipe × FR.
 *
 * QCM 1 parmi 3, 10 cas. Validé V1 panel expert OKR (2026-06-27).
 * Question type : « Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ? »
 * Répartition équilibrée a=4 (5,7,8,10), b=3 (1,3,6), c=3 (2,4,9).
 * Note : cas 2 bonne réponse en C pour préserver l'équilibrage global.
 *
 * Twist OKR équipe : 3 cas (2, 4, 9) opposent un vrai Résultat clé à une
 * health metric déguisée (uptime, taux d'erreur < seuil, latence p95).
 * Apport Lamorte : une health metric est un garde-fou à surveiller en continu,
 * pas un changement à atteindre sur un trimestre.
 */

import type { DrillCorpus } from "../../domain/drill";

const Q = "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?";

export const OKR_EQUIPE_INDICATOR_DRILL_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "Un bon indicateur de Résultat clé se mesure avec exactitude à la prochaine revue trimestrielle. Attention au piège de la health metric : un seuil qu'on surveille en continu (uptime, latence) est un garde-fou, pas un Résultat clé. Un Résultat clé vise un changement à atteindre.",
  cases: [
    {
      id: "okre.ind.1",
      statement: "Améliorer la satisfaction client (SaaS B2B)",
      question: Q,
      options: [
        { id: "A", text: "Améliorer la satisfaction client", isCorrect: false },
        { id: "B", text: "Faire passer le score de satisfaction client de 28 à 50 d'ici fin du trimestre", isCorrect: true },
        { id: "C", text: "Avoir des clients plus engagés", isCorrect: false },
      ],
      explanation: "Score chiffré avec valeur de référence et cible bornés sur le trimestre. Les deux autres restent des intentions.",
    },
    {
      id: "okre.ind.2",
      statement: "Améliorer la performance de la plateforme de données",
      question: Q,
      options: [
        { id: "A", text: "Maintenir l'uptime au-dessus de 99,9 % sur tout le trimestre", isCorrect: false },
        { id: "B", text: "Garantir une plateforme fiable", isCorrect: false },
        { id: "C", text: "Réduire le délai moyen de traitement d'un job de 14 min à 6 min", isCorrect: true },
      ],
      explanation: "Piège health metric : l'uptime maintenu au-dessus d'un seuil est un garde-fou, pas un changement. Le délai qui passe de 14 à 6 minutes est un vrai Résultat clé.",
    },
    {
      id: "okre.ind.3",
      statement: "Mieux servir les usagers (agence publique)",
      question: Q,
      options: [
        { id: "A", text: "Mieux servir les usagers", isCorrect: false },
        { id: "B", text: "Passer le taux de dossiers traités sous 5 jours de 42 % à 75 %", isCorrect: true },
        { id: "C", text: "Améliorer la qualité du service", isCorrect: false },
      ],
      explanation: "Pourcentage objectivable sur les dossiers comptés. Les deux autres formulations restent floues.",
    },
    {
      id: "okre.ind.4",
      statement: "Sécuriser la plateforme paiement (fintech)",
      question: Q,
      options: [
        { id: "A", text: "Conserver un taux d'erreur paiement sous 0,1 % tout le trimestre", isCorrect: false },
        { id: "B", text: "Avoir une plateforme paiement robuste", isCorrect: false },
        { id: "C", text: "Faire passer le taux de conversion sur le tunnel paiement de 61 % à 72 %", isCorrect: true },
      ],
      explanation: "Piège health metric : conserver un taux sous un seuil est un garde-fou. La conversion qui passe de 61 à 72 % est un vrai Résultat clé outcome.",
    },
    {
      id: "okre.ind.5",
      statement: "Gagner en réactivité industrielle (ETI manufacturière)",
      question: Q,
      options: [
        { id: "A", text: "Réduire le délai de mise en production d'une référence de 22 j à 12 j", isCorrect: true },
        { id: "B", text: "Gagner en agilité industrielle", isCorrect: false },
        { id: "C", text: "Optimiser nos flux", isCorrect: false },
      ],
      explanation: "Durée mesurée précisément avec valeur de référence. Les deux autres sont des concepts-parapluie.",
    },
    {
      id: "okre.ind.6",
      statement: "Renforcer la confiance médicale (e-santé)",
      question: Q,
      options: [
        { id: "A", text: "Renforcer la confiance médicale", isCorrect: false },
        { id: "B", text: "Faire monter le taux de complétion du questionnaire patient de 48 % à 80 %", isCorrect: true },
        { id: "C", text: "Améliorer le parcours patient", isCorrect: false },
      ],
      explanation: "Taux observable dans l'outil. Les autres formulations restent subjectives.",
    },
    {
      id: "okre.ind.7",
      statement: "Industrialiser la data stack (scale-up data)",
      question: Q,
      options: [
        { id: "A", text: "Atteindre 90 jobs de traitement de données livrés en production d'ici fin de trimestre", isCorrect: true },
        { id: "B", text: "Industrialiser notre data stack", isCorrect: false },
        { id: "C", text: "Mieux servir les métiers", isCorrect: false },
      ],
      explanation: "Compte vérifiable sans interprétation. Les deux autres sont des intentions.",
    },
    {
      id: "okre.ind.8",
      statement: "Améliorer le support client (SaaS B2B)",
      question: Q,
      options: [
        { id: "A", text: "Réduire le temps de réponse moyen support de 9 h à 3 h", isCorrect: true },
        { id: "B", text: "Faire un support de qualité", isCorrect: false },
        { id: "C", text: "Avoir des clients heureux", isCorrect: false },
      ],
      explanation: "Durée mesurable dans l'outil de ticketing. Les deux autres formulations sont floues.",
    },
    {
      id: "okre.ind.9",
      statement: "Mieux servir les équipes consommatrices internes (plateforme data)",
      question: Q,
      options: [
        { id: "A", text: "Tenir une latence p95 sous 200 ms sur tout le trimestre", isCorrect: false },
        { id: "B", text: "Servir mieux nos consommateurs internes", isCorrect: false },
        { id: "C", text: "Faire passer le taux d'adoption interne de l'entrepôt de données de 35 % à 60 %", isCorrect: true },
      ],
      explanation: "Piège health metric : tenir une latence sous un seuil est un garde-fou. Le taux d'adoption qui change est un Résultat clé.",
    },
    {
      id: "okre.ind.10",
      statement: "Embarquer les équipes sur le nouvel outil (agence publique)",
      question: Q,
      options: [
        { id: "A", text: "Faire monter le taux d'agents formés au nouvel outil de 12 % à 70 % d'ici fin du trimestre", isCorrect: true },
        { id: "B", text: "Embarquer les équipes", isCorrect: false },
        { id: "C", text: "Réussir notre transformation", isCorrect: false },
      ],
      explanation: "Taux chiffré avec valeur de référence. Les deux autres sont des intentions.",
    },
  ],
};
