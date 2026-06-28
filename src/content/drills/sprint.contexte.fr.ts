/**
 * Corpus mini-exercice « Le contexte » Sprint × dev × FR.
 *
 * QCM 1 parmi 4 : identifier le vrai bénéficiaire de l'objectif (celui dont
 * la vie change quand l'objectif est atteint, pas l'équipe qui livre).
 */

import type { DrillCorpus } from "../../domain/drill";

export const SPRINT_CONTEXTE_DRILL_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "Derrière un objectif, le vrai bénéficiaire est celui dont la vie change quand l'objectif est atteint. Pas l'équipe qui livre, ni la direction qui suit.",
  cases: [
    {
      id: "ctx.1",
      statement: "Réduire de 12 à 6 jours le délai de réponse aux demandes de devis d'ici fin du trimestre",
      question: "Qui est le vrai bénéficiaire ?",
      options: [
        { id: "A", text: "Direction commerciale", isCorrect: false },
        { id: "B", text: "Clients prospects en attente", isCorrect: true },
        { id: "C", text: "Équipe avant-vente", isCorrect: false },
        { id: "D", text: "Service marketing", isCorrect: false },
      ],
      explanation: "Ce sont les prospects qui attendent et qui décident pendant ce délai.",
    },
    {
      id: "ctx.2",
      statement: "Passer le taux de bulletins de paie corrigés après envoi sous 1 % d'ici décembre",
      question: "Qui est le vrai bénéficiaire ?",
      options: [
        { id: "A", text: "Équipe paie", isCorrect: false },
        { id: "B", text: "Direction des ressources humaines", isCorrect: false },
        { id: "C", text: "Salariés de l'entreprise", isCorrect: true },
        { id: "D", text: "Cabinet comptable externe", isCorrect: false },
      ],
      explanation: "Ils reçoivent un bulletin juste du premier coup.",
    },
    {
      id: "ctx.3",
      statement: "Faire passer le pourcentage de fiches client uniques de 92 % à 99 % d'ici fin du semestre",
      question: "Qui est le vrai bénéficiaire ?",
      options: [
        { id: "A", text: "Équipe données", isCorrect: false },
        { id: "B", text: "Conseillers qui consultent le dossier client en rendez-vous", isCorrect: true },
        { id: "C", text: "Direction informatique", isCorrect: false },
        { id: "D", text: "Auditeurs internes", isCorrect: false },
      ],
      explanation: "Ils utilisent ces fiches en situation de rendez-vous. La qualité du référentiel se ressent à ce moment précis.",
    },
    {
      id: "ctx.4",
      statement: "Faire passer le taux de factures fournisseurs payées sous 30 jours de 70 % à 90 % d'ici la fin de l'année",
      question: "Qui est le vrai bénéficiaire ?",
      options: [
        { id: "A", text: "Service comptabilité", isCorrect: false },
        { id: "B", text: "Direction financière", isCorrect: false },
        { id: "C", text: "Fournisseurs de l'entreprise", isCorrect: true },
        { id: "D", text: "Acheteurs internes", isCorrect: false },
      ],
      explanation: "Ils touchent leur argent à temps.",
    },
    {
      id: "ctx.5",
      statement: "Diviser par deux le nombre de minutes d'indisponibilité du site marchand sur le mois",
      question: "Qui est le vrai bénéficiaire ?",
      options: [
        { id: "A", text: "Équipe technique", isCorrect: false },
        { id: "B", text: "Clients en train d'acheter", isCorrect: true },
        { id: "C", text: "Direction du numérique", isCorrect: false },
        { id: "D", text: "Prestataire d'hébergement", isCorrect: false },
      ],
      explanation: "Un site disponible leur permet de finir leur achat.",
    },
    {
      id: "ctx.6",
      statement: "Réduire de 8 à 3 jours le délai entre l'arrivée d'un nouvel embauché et son premier accès aux outils métier",
      question: "Qui est le vrai bénéficiaire ?",
      options: [
        { id: "A", text: "Service informatique interne", isCorrect: false },
        { id: "B", text: "Équipe ressources humaines", isCorrect: false },
        { id: "C", text: "Nouveaux embauchés", isCorrect: true },
        { id: "D", text: "Managers d'équipe", isCorrect: false },
      ],
      explanation: "Ils peuvent enfin travailler dès le début.",
    },
    {
      id: "ctx.7",
      statement: "Atteindre 95 % de demandes au support résolues sans escalade vers le niveau 2 d'ici fin du sprint 18",
      question: "Qui est le vrai bénéficiaire ?",
      options: [
        { id: "A", text: "Équipe support niveau 2", isCorrect: false },
        { id: "B", text: "Personnes qui ouvrent une demande au support", isCorrect: true },
        { id: "C", text: "Responsable du support", isCorrect: false },
        { id: "D", text: "Équipe formation interne", isCorrect: false },
      ],
      explanation: "Elles obtiennent une réponse plus vite, en un seul passage.",
    },
    {
      id: "ctx.8",
      statement: "Faire passer le taux de clic sur le lien principal de la lettre d'information de 4 % à 8 % d'ici trois envois",
      question: "Qui est le vrai bénéficiaire ?",
      options: [
        { id: "A", text: "Équipe marketing", isCorrect: false },
        { id: "B", text: "Direction de la communication", isCorrect: false },
        { id: "C", text: "Abonnés de la lettre d'information", isCorrect: true },
        { id: "D", text: "Prestataire d'envoi", isCorrect: false },
      ],
      explanation: "Ils reçoivent enfin un contenu qui les fait agir.",
    },
  ],
};
