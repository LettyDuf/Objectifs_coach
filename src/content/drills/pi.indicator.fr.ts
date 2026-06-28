/**
 * Corpus mini-exercice « L'indicateur » PI × dev × FR.
 *
 * QCM 1 parmi 3, 10 cas. Validé V1 panel SAFe (2026-06-28).
 * Question type : « Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ? »
 * Répartition équilibrée a=4 (1,3,6,8), b=3 (2,5,10), c=3 (4,7,9).
 */

import type { DrillCorpus } from "../../domain/drill";

const Q = "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?";

export const PI_INDICATOR_DRILL_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "Un bon indicateur PI se mesure avec exactitude à la revue de PI : on sait quoi regarder, comment et avec quoi. Un concept-parapluie reste flou : chacun le comprend à sa manière. Repère le bon.",
  cases: [
    {
      id: "pi.ind.1",
      statement: "Améliorer la performance du parcours de souscription en ligne (banque)",
      question: Q,
      options: [
        { id: "A", text: "Délai moyen de souscription bout-en-bout en minutes, mesuré à la revue de PI", isCorrect: true },
        { id: "B", text: "Fluidité du parcours", isCorrect: false },
        { id: "C", text: "Satisfaction des conseillers", isCorrect: false },
      ],
      explanation: "Une durée chiffrée se mesure dans les outils ; « fluidité » reste interprétable, « satisfaction des conseillers » mesure autre chose.",
    },
    {
      id: "pi.ind.2",
      statement: "Réduire la dette technique du train paiement",
      question: Q,
      options: [
        { id: "A", text: "Sentiment des équipes sur la qualité du code", isCorrect: false },
        { id: "B", text: "Nombre de composants critiques sortis de la liste de dette, sur 42 identifiés", isCorrect: true },
        { id: "C", text: "Modernisation du socle", isCorrect: false },
      ],
      explanation: "Compte borné sur une liste connue, vérifiable à la revue de PI. Le sentiment varie selon qui répond ; « modernisation » est un concept.",
    },
    {
      id: "pi.ind.3",
      statement: "Fiabiliser les livraisons du train e-commerce",
      question: Q,
      options: [
        { id: "A", text: "Taux d'incidents bloquants en production par mois (cible inférieure à 2)", isCorrect: true },
        { id: "B", text: "Robustesse perçue", isCorrect: false },
        { id: "C", text: "Maturité opérationnelle", isCorrect: false },
      ],
      explanation: "Taux mensuel mesurable dans l'outil d'incident ; les deux autres sont des étiquettes sans définition.",
    },
    {
      id: "pi.ind.4",
      statement: "Préparer le train données à l'arrivée d'un nouveau métier",
      question: Q,
      options: [
        { id: "A", text: "Anticipation du besoin", isCorrect: false },
        { id: "B", text: "Couverture", isCorrect: false },
        { id: "C", text: "Nombre de jeux de données documentés et exposés via le catalogue, cible 25", isCorrect: true },
      ],
      explanation: "Compte observable dans le catalogue. « Anticipation » et « couverture » sans périmètre restent flous.",
    },
    {
      id: "pi.ind.5",
      statement: "Renforcer l'accompagnement des agents en centre de relation client (télécoms)",
      question: Q,
      options: [
        { id: "A", text: "Score de qualité d'écoute", isCorrect: false },
        { id: "B", text: "Temps moyen de prise en charge d'un appel en secondes, valeur de référence 240", isCorrect: true },
        { id: "C", text: "Engagement des agents", isCorrect: false },
      ],
      explanation: "Durée chiffrée auditable dans le téléphonique. « Score d'écoute » non défini ici ; « engagement » est un concept.",
    },
    {
      id: "pi.ind.6",
      statement: "Augmenter l'autonomie des collectivités sur le portail public",
      question: Q,
      options: [
        { id: "A", text: "Part de démarches finalisées sans contact agent, cible 60 %", isCorrect: true },
        { id: "B", text: "Simplicité", isCorrect: false },
        { id: "C", text: "Lisibilité", isCorrect: false },
      ],
      explanation: "Ratio observable sur les démarches du portail. « Simplicité » et « lisibilité » sont des qualités.",
    },
    {
      id: "pi.ind.7",
      statement: "Sécuriser la plateforme de données RH",
      question: Q,
      options: [
        { id: "A", text: "Posture sécurité renforcée", isCorrect: false },
        { id: "B", text: "Conformité accrue", isCorrect: false },
        { id: "C", text: "Nombre de vulnérabilités critiques ouvertes, cible zéro en fin de PI", isCorrect: true },
      ],
      explanation: "Compte de vulnérabilités traçable dans l'outil de scan. « Posture » et « conformité » sont des concepts d'auditeur.",
    },
    {
      id: "pi.ind.8",
      statement: "Accélérer la mise à disposition d'environnements pour les équipes du train plateforme",
      question: Q,
      options: [
        { id: "A", text: "Délai médian de provisionnement d'un environnement, valeur de référence 5 jours, cible 1 jour", isCorrect: true },
        { id: "B", text: "Réactivité du socle", isCorrect: false },
        { id: "C", text: "Modernité de l'outillage", isCorrect: false },
      ],
      explanation: "Durée mesurable par les tickets de provisionnement. Les deux autres sont des étiquettes.",
    },
    {
      id: "pi.ind.9",
      statement: "Améliorer la conversion sur le tunnel d'abonnement e-commerce",
      question: Q,
      options: [
        { id: "A", text: "Attractivité du tunnel", isCorrect: false },
        { id: "B", text: "Engagement visiteurs", isCorrect: false },
        { id: "C", text: "Taux de finalisation du tunnel sur visiteurs entrés, cible 18 %", isCorrect: true },
      ],
      explanation: "Ratio direct dans l'outil analytics. Les autres sont des concepts marketing larges.",
    },
    {
      id: "pi.ind.10",
      statement: "Réduire le délai de clôture comptable mensuelle (finance)",
      question: Q,
      options: [
        { id: "A", text: "Efficience du process", isCorrect: false },
        { id: "B", text: "Délai entre fin de mois et clôture validée, en jours ouvrés, cible 4", isCorrect: true },
        { id: "C", text: "Maîtrise des opérations", isCorrect: false },
      ],
      explanation: "Délai chiffré observable chaque mois pendant le PI. « Efficience » et « maîtrise » sont des concepts.",
    },
  ],
};
