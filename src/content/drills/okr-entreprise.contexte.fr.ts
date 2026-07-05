/**
 * Corpus mini-exercice « Le contexte » OKR entreprise × manager × FR.
 * QCM 1 parmi 4, 8 cas. Promesse : identifier le vrai bénéficiaire d'un
 * Résultat clé à l'échelle entreprise (CODIR, stratégie annuelle).
 *
 * Spécificités OKR entreprise :
 * - 2 cas (2, 6) avec bénéficiaire interne (salariés, autre direction)
 * - 1 cas (3) avec bénéficiaire = l'entreprise elle-même (Résultat clé
 *   auto-centré acceptable en doctrine Lamorte si l'Objective parent est
 *   tourné vers l'extérieur, ex. financer une expansion qui profite aux
 *   clients et aux marchés visés)
 */

import type { DrillCorpus } from "../../domain/drill";

const Q = "Qui est le vrai bénéficiaire de ce Résultat clé ?";

export const OKR_ENTREPRISE_MANAGER_CONTEXTE_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "Un Résultat clé entreprise a un bénéficiaire identifiable : client final, marché visé, salarié, partie prenante externe. Le CODIR qui porte l'OKR n'est pas forcément le bénéficiaire. Parfois, l'entreprise pose un Résultat clé sur son propre fonctionnement (auto-centré).",
  cases: [
    {
      id: "okrent.ctx.1",
      statement: "Faire passer le score de satisfaction client de 42 à 65 d'ici la revue annuelle (entreprise de services)",
      question: Q,
      options: [
        { id: "A", text: "Les clients finaux", isCorrect: true },
        { id: "B", text: "Les actionnaires", isCorrect: false },
        { id: "C", text: "Le comité de direction", isCorrect: false },
        { id: "D", text: "Les partenaires fournisseurs", isCorrect: false },
      ],
      explanation: "Le score de satisfaction reflète la perception des clients ; les autres sont impactés indirectement.",
    },
    {
      id: "okrent.ctx.2",
      statement: "Faire passer le score d'engagement des salariés de 55 à 75 (entreprise industrielle)",
      question: Q,
      options: [
        { id: "A", text: "Les clients finaux", isCorrect: false },
        { id: "B", text: "Les salariés de l'entreprise", isCorrect: true },
        { id: "C", text: "Les investisseurs", isCorrect: false },
        { id: "D", text: "Le board", isCorrect: false },
      ],
      explanation: "Bénéficiaire interne : ce sont les salariés qui vivent le climat de travail mesuré ; le board est sponsor, pas concerné directement.",
    },
    {
      id: "okrent.ctx.3",
      statement: "Faire passer la marge opérationnelle de 14 % à 20 % pour financer l'expansion internationale (scale-up)",
      question: Q,
      options: [
        { id: "A", text: "Les clients finaux", isCorrect: false },
        { id: "B", text: "Les fournisseurs", isCorrect: false },
        { id: "C", text: "L'entreprise elle-même", isCorrect: true },
        { id: "D", text: "Le service juridique", isCorrect: false },
      ],
      explanation: "Résultat clé auto-centré : l'entreprise pose une cible sur sa propre santé financière. Pratique acceptable si elle alimente un Objective tourné vers l'extérieur (financer l'expansion qui, elle, sert de nouveaux clients).",
    },
    {
      id: "okrent.ctx.4",
      statement: "Faire monter le taux de notoriété spontanée de la marque de 10 % à 28 % sur le marché cible (entreprise grand public)",
      question: Q,
      options: [
        { id: "A", text: "Le comité de direction", isCorrect: false },
        { id: "B", text: "Les prospects et clients du marché cible", isCorrect: true },
        { id: "C", text: "L'agence de communication", isCorrect: false },
        { id: "D", text: "Les actionnaires", isCorrect: false },
      ],
      explanation: "Les prospects et clients du marché cible sont ceux qui reconnaissent (ou non) la marque ; la direction est sponsor.",
    },
    {
      id: "okrent.ctx.5",
      statement: "Réduire le taux d'erreur de traitement des dossiers clients de 9 % à 2 % (entreprise de services financiers)",
      question: Q,
      options: [
        { id: "A", text: "Les clients dont le dossier est traité", isCorrect: true },
        { id: "B", text: "Le régulateur", isCorrect: false },
        { id: "C", text: "Les investisseurs", isCorrect: false },
        { id: "D", text: "L'équipe marketing", isCorrect: false },
      ],
      explanation: "Les clients subissent les erreurs et bénéficient directement de la baisse ; le régulateur est partie prenante, pas bénéficiaire direct.",
    },
    {
      id: "okrent.ctx.6",
      statement: "Faire passer le taux d'adoption du nouvel outil commercial par les équipes de vente de 12 % à 80 % (entreprise B2B)",
      question: Q,
      options: [
        { id: "A", text: "Les clients finaux", isCorrect: false },
        { id: "B", text: "Les équipes commerciales internes", isCorrect: true },
        { id: "C", text: "Les développeurs de l'outil", isCorrect: false },
        { id: "D", text: "Les recruteurs", isCorrect: false },
      ],
      explanation: "Bénéficiaire interne : les équipes commerciales gagnent en efficacité au quotidien grâce au nouvel outil.",
    },
    {
      id: "okrent.ctx.7",
      statement: "Faire passer le taux de clients recommandant l'entreprise (NPS) de 15 à 40 (entreprise de services)",
      question: Q,
      options: [
        { id: "A", text: "Les analystes financiers", isCorrect: false },
        { id: "B", text: "Le conseil d'administration", isCorrect: false },
        { id: "C", text: "Les clients de l'entreprise", isCorrect: true },
        { id: "D", text: "Les fournisseurs", isCorrect: false },
      ],
      explanation: "Le client qui recommande l'entreprise est le bénéficiaire direct de l'expérience mesurée ; les autres profitent des retombées en aval.",
    },
    {
      id: "okrent.ctx.8",
      statement: "Faire passer le taux de dossiers clients conformes au nouveau cadre réglementaire de 71 % à 98 % (secteur régulé)",
      question: Q,
      options: [
        { id: "A", text: "Le directeur financier", isCorrect: false },
        { id: "B", text: "Les clients dont les dossiers sont sécurisés par la mise en conformité", isCorrect: true },
        { id: "C", text: "Les concurrents", isCorrect: false },
        { id: "D", text: "Le contrôle interne", isCorrect: false },
      ],
      explanation: "Bénéficiaire externe : le client est protégé par un dossier conforme ; le contrôle interne est acteur du contrôle, pas bénéficiaire.",
    },
  ],
};
