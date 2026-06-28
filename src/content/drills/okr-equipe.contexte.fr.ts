/**
 * Corpus mini-exercice « Le contexte » OKR équipe × FR.
 * QCM 1 parmi 4, 8 cas. Promesse : identifier le vrai bénéficiaire d'un Résultat clé.
 *
 * Spécificités OKR équipe :
 * - 2 cas (2, 6) avec bénéficiaire interne arrimé (autre équipe consommatrice)
 * - 1 cas (3) avec bénéficiaire = équipe elle-même (Résultat clé auto-centré
 *   acceptable en doctrine Lamorte si l'Objectif parent est tourné vers
 *   l'extérieur ; voir DOMAINE.md §4.4)
 */

import type { DrillCorpus } from "../../domain/drill";

const Q = "Qui est le vrai bénéficiaire de ce Résultat clé ?";

export const OKR_EQUIPE_CONTEXTE_DRILL_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "Un Résultat clé a un bénéficiaire identifiable : utilisateur final, équipe consommatrice interne, partie prenante externe. L'équipe porteuse n'est pas forcément le bénéficiaire. Parfois, une équipe pose un Résultat clé sur son propre fonctionnement (auto-centré).",
  cases: [
    {
      id: "okre.ctx.1",
      statement: "Faire passer le score de satisfaction client produit de 28 à 50 d'ici fin du trimestre (SaaS B2B)",
      question: Q,
      options: [
        { id: "A", text: "Les utilisateurs finaux du produit", isCorrect: true },
        { id: "B", text: "L'équipe marketing", isCorrect: false },
        { id: "C", text: "Les actionnaires", isCorrect: false },
        { id: "D", text: "Les développeurs", isCorrect: false },
      ],
      explanation: "Le score de satisfaction reflète la perception des clients utilisateurs ; les autres sont impactés indirectement.",
    },
    {
      id: "okre.ctx.2",
      statement: "Réduire la latence moyenne de l'interface interne de données de 450 ms à 180 ms (plateforme data)",
      question: Q,
      options: [
        { id: "A", text: "La direction informatique", isCorrect: false },
        { id: "B", text: "Les équipes internes qui consomment l'interface", isCorrect: true },
        { id: "C", text: "Les fournisseurs cloud", isCorrect: false },
        { id: "D", text: "Le comité de direction", isCorrect: false },
      ],
      explanation: "Bénéficiaire interne arrimé : les équipes qui consomment l'interface gagnent en réactivité ; la direction est sponsor, pas usager direct.",
    },
    {
      id: "okre.ctx.3",
      statement: "Passer le délai de cycle interne de l'équipe de 11 j à 6 j (scale-up)",
      question: Q,
      options: [
        { id: "A", text: "Les clients finaux", isCorrect: false },
        { id: "B", text: "Les commerciaux", isCorrect: false },
        { id: "C", text: "L'équipe elle-même", isCorrect: true },
        { id: "D", text: "Le service juridique", isCorrect: false },
      ],
      explanation: "Résultat clé auto-centré : l'équipe pose une cible sur son propre fonctionnement. Pratique acceptable si elle alimente un Objectif tourné vers l'extérieur (livrer plus de demandes aux clients).",
    },
    {
      id: "okre.ctx.4",
      statement: "Faire monter le taux d'agents publics formés au nouvel outil de 12 % à 70 % (agence publique)",
      question: Q,
      options: [
        { id: "A", text: "Le ministère de tutelle", isCorrect: false },
        { id: "B", text: "Les agents utilisateurs en première ligne", isCorrect: true },
        { id: "C", text: "L'éditeur du logiciel", isCorrect: false },
        { id: "D", text: "L'équipe des ressources humaines", isCorrect: false },
      ],
      explanation: "Les agents formés sont les bénéficiaires directs ; la tutelle est sponsor.",
    },
    {
      id: "okre.ctx.5",
      statement: "Réduire le taux d'erreur de vérification d'identité de 7 % à 2 % (fintech)",
      question: Q,
      options: [
        { id: "A", text: "Les nouveaux clients en cours d'ouverture de compte", isCorrect: true },
        { id: "B", text: "Le régulateur", isCorrect: false },
        { id: "C", text: "Les investisseurs", isCorrect: false },
        { id: "D", text: "L'équipe marketing", isCorrect: false },
      ],
      explanation: "Les clients subissent les erreurs et bénéficient directement de la baisse ; le régulateur est partie prenante, pas bénéficiaire.",
    },
    {
      id: "okre.ctx.6",
      statement: "Faire passer le taux de réutilisation des composants du design system de 30 % à 65 % (SaaS B2B)",
      question: Q,
      options: [
        { id: "A", text: "Les utilisateurs finaux", isCorrect: false },
        { id: "B", text: "Les autres équipes produit consommatrices du design system", isCorrect: true },
        { id: "C", text: "Les designers seniors", isCorrect: false },
        { id: "D", text: "Les recruteurs", isCorrect: false },
      ],
      explanation: "Bénéficiaire interne arrimé : les équipes produit qui consomment le design system gagnent du temps et de la cohérence.",
    },
    {
      id: "okre.ctx.7",
      statement: "Augmenter le taux de complétion du dossier patient en téléconsultation de 48 % à 80 % (e-santé)",
      question: Q,
      options: [
        { id: "A", text: "Les médecins prescripteurs", isCorrect: false },
        { id: "B", text: "L'agence régionale de santé", isCorrect: false },
        { id: "C", text: "Les patients en téléconsultation", isCorrect: true },
        { id: "D", text: "L'éditeur tiers", isCorrect: false },
      ],
      explanation: "Le patient remplit le dossier et bénéficie d'un suivi mieux documenté ; le médecin en profite en aval.",
    },
    {
      id: "okre.ctx.8",
      statement: "Réduire le délai de mise en production d'une référence produit de 22 j à 12 j (ETI industrielle)",
      question: Q,
      options: [
        { id: "A", text: "Le directeur industriel", isCorrect: false },
        { id: "B", text: "Les clients distributeurs qui attendent les références", isCorrect: true },
        { id: "C", text: "Les fournisseurs amont", isCorrect: false },
        { id: "D", text: "Le contrôle qualité", isCorrect: false },
      ],
      explanation: "Bénéficiaire externe arrimé en aval : les distributeurs reçoivent plus vite les nouvelles références.",
    },
  ],
};
