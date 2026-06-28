/**
 * Corpus mini-exercice « Le contexte PI » × dev × FR.
 * QCM 1 parmi 4, 8 cas. Spécificité SAFe : 5 cas sur 8 avec bénéficiaire interne
 * arrimé (autre train, équipe partenaire) pour ancrer la doctrine porteur ≠ bénéficiaire.
 */

import type { DrillCorpus } from "../../domain/drill";

const Q = "Qui est le vrai bénéficiaire de cet objectif PI ?";

export const PI_CONTEXTE_DRILL_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "À l'échelle d'un PI SAFe, le bénéficiaire peut être un client final, un autre train arrimé, une équipe partenaire interne. Toujours distinguer le porteur (qui livre) du bénéficiaire (qui en profite).",
  cases: [
    {
      id: "pi.ctx.1",
      statement: "Le train paiement expose une nouvelle interface de règlement instantané pour que le train e-commerce l'intègre dans le tunnel",
      question: Q,
      options: [
        { id: "A", text: "Clients finaux du e-commerce", isCorrect: false },
        { id: "B", text: "Train e-commerce qui consomme l'interface", isCorrect: true },
        { id: "C", text: "Équipe paiement qui produit", isCorrect: false },
        { id: "D", text: "Direction financière", isCorrect: false },
      ],
      explanation: "À la livraison du PI, c'est le train e-commerce qui peut avancer ; les clients n'en profitent qu'après son intégration.",
    },
    {
      id: "pi.ctx.2",
      statement: "Le train données livre un catalogue exposé permettant aux équipes marketing d'auto-servir leurs segments",
      question: Q,
      options: [
        { id: "A", text: "Équipes marketing utilisatrices du catalogue", isCorrect: true },
        { id: "B", text: "Équipe données productrice", isCorrect: false },
        { id: "C", text: "Clients ciblés par les campagnes", isCorrect: false },
        { id: "D", text: "Direction data", isCorrect: false },
      ],
      explanation: "Le bénéfice direct au terme du PI est l'autonomie des équipes marketing ; le reste est aval.",
    },
    {
      id: "pi.ctx.3",
      statement: "Le train plateforme réduit à 1 jour le délai de provisionnement d'environnements pour les huit trains clients",
      question: Q,
      options: [
        { id: "A", text: "Équipes du train plateforme", isCorrect: false },
        { id: "B", text: "Direction technique", isCorrect: false },
        { id: "C", text: "Trains applicatifs clients du provisionnement", isCorrect: true },
        { id: "D", text: "Clients finaux", isCorrect: false },
      ],
      explanation: "Les bénéficiaires sont les trains applicatifs qui gagnent du temps de livraison ; la plateforme est le porteur.",
    },
    {
      id: "pi.ctx.4",
      statement: "Le train libre-service public ouvre la démarche de changement d'adresse en ligne sans passage en mairie",
      question: Q,
      options: [
        { id: "A", text: "Usagers du service public", isCorrect: true },
        { id: "B", text: "Agents d'accueil", isCorrect: false },
        { id: "C", text: "Direction des services numériques", isCorrect: false },
        { id: "D", text: "Équipe portail", isCorrect: false },
      ],
      explanation: "Le service rendu sort à la revue de PI et bénéficie aux usagers ; les agents sont impactés mais pas la cible.",
    },
    {
      id: "pi.ctx.5",
      statement: "Le train outillage livre un pipeline de déploiement standardisé aux équipes du train banque en ligne",
      question: Q,
      options: [
        { id: "A", text: "Direction informatique", isCorrect: false },
        { id: "B", text: "Train banque en ligne consommateur du pipeline", isCorrect: true },
        { id: "C", text: "Clients de la banque", isCorrect: false },
        { id: "D", text: "Équipe outillage", isCorrect: false },
      ],
      explanation: "Le bénéficiaire intermédiaire au terme du PI est le train consommateur ; les clients n'en sentiront l'effet qu'après.",
    },
    {
      id: "pi.ctx.6",
      statement: "Le train relation client télécoms réduit le temps moyen de prise en charge d'appel de 240 à 180 secondes",
      question: Q,
      options: [
        { id: "A", text: "Abonnés appelants", isCorrect: true },
        { id: "B", text: "Conseillers du centre", isCorrect: false },
        { id: "C", text: "Direction service client", isCorrect: false },
        { id: "D", text: "Équipe outils conseillers", isCorrect: false },
      ],
      explanation: "Le bénéfice perçu à la revue de PI est sur le client appelant ; le conseiller est l'acteur, pas le bénéficiaire visé.",
    },
    {
      id: "pi.ctx.7",
      statement: "Le train conformité RH livre un module de gestion des consentements utilisé par les autres trains traitant des données salariés",
      question: Q,
      options: [
        { id: "A", text: "Salariés concernés par les données", isCorrect: false },
        { id: "B", text: "Autres trains qui consomment le module de consentements", isCorrect: true },
        { id: "C", text: "Direction juridique", isCorrect: false },
        { id: "D", text: "Équipe conformité", isCorrect: false },
      ],
      explanation: "Au terme du PI, ce sont les autres trains qui peuvent traiter les données conformément ; les salariés en bénéficient en aval.",
    },
    {
      id: "pi.ctx.8",
      statement: "Le train e-commerce porte un objectif de hausse du taux de finalisation du tunnel d'abonnement à 18 %",
      question: Q,
      options: [
        { id: "A", text: "Équipe tunnel", isCorrect: false },
        { id: "B", text: "Direction marketing", isCorrect: false },
        { id: "C", text: "Visiteurs qui s'abonnent plus facilement", isCorrect: true },
        { id: "D", text: "Service client", isCorrect: false },
      ],
      explanation: "L'effet observable du PI est ressenti par les visiteurs convertis ; les autres sont porteurs ou observateurs.",
    },
  ],
};
