/**
 * Corpus mini-exercice « L'indicateur » Sprint × dev × FR.
 *
 * QCM 1 parmi 3 : repérer l'indicateur opérationnel et univoque face à un
 * concept-parapluie flou. Validé V3 par panel pluridisciplinaire
 * (devs, PO, PM, DevSecOps, data).
 *
 * Répartition des bonnes réponses : a = 4, b = 3, c = 3. Équilibré.
 */

import type { DrillCorpus } from "../../domain/drill";

export const SPRINT_INDICATOR_DRILL_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "Un bon indicateur se mesure avec exactitude : on sait quoi regarder, comment et avec quoi, sans place pour l'interprétation. Un concept-parapluie reste flou : chacun le comprend à sa manière. Repère le bon.",
  cases: [
    {
      id: "ind.1",
      statement: "Améliorer le passage en caisse en ligne",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Taux de paniers payés sur paniers démarrés", isCorrect: true },
        { id: "B", text: "Fluidité du parcours d'achat", isCorrect: false },
        { id: "C", text: "Performance globale du tunnel", isCorrect: false },
      ],
      explanation:
        "Le taux de paniers payés est un ratio chiffré sans ambiguïté. « Fluidité » et « performance » sont des étiquettes qui peuvent désigner dix choses.",
    },
    {
      id: "ind.2",
      statement: "Réduire la charge du support niveau 1",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Nombre de demandes traitées sans escalade vers le niveau 2", isCorrect: true },
        { id: "B", text: "Efficacité du support", isCorrect: false },
        { id: "C", text: "Maîtrise de la pression entrante", isCorrect: false },
      ],
      explanation:
        "Le compte des demandes sans escalade vient directement de l'outil de tickets. Les autres formulations restent à interpréter.",
    },
    {
      id: "ind.3",
      statement: "Fiabiliser la paie mensuelle",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Qualité du processus paie", isCorrect: false },
        { id: "B", text: "Conformité de la chaîne salariale", isCorrect: false },
        { id: "C", text: "Nombre de bulletins corrigés après envoi", isCorrect: true },
      ],
      explanation:
        "Comptage net, vérifiable chaque mois. « Qualité » et « conformité » sont des concepts qui appellent une définition supplémentaire.",
    },
    {
      id: "ind.4",
      statement: "Mieux servir les commerciaux terrain",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Satisfaction des forces de vente", isCorrect: false },
        { id: "B", text: "Délai moyen entre demande de devis et réponse client", isCorrect: true },
        { id: "C", text: "Réactivité commerciale", isCorrect: false },
      ],
      explanation:
        "Durée mesurée, comparable d'un mois à l'autre. La satisfaction se mesure mais demande une enquête à part ; la réactivité est trop vague.",
    },
    {
      id: "ind.5",
      statement: "Stabiliser le site marchand",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Robustesse de la plateforme", isCorrect: false },
        { id: "B", text: "Tenue de charge en heure de pointe", isCorrect: false },
        { id: "C", text: "Taux de disponibilité du site sur le mois", isCorrect: true },
      ],
      explanation:
        "Le taux de disponibilité est l'indicateur opérationnel standard, calculé sans interprétation. « Tenue de charge » est aussi mesurable mais ne couvre pas la stabilité globale.",
    },
    {
      id: "ind.6",
      statement: "Améliorer la qualité des données client",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Hygiène du référentiel", isCorrect: false },
        { id: "B", text: "Pourcentage de fiches client uniques après déduplication", isCorrect: true },
        { id: "C", text: "Propreté des données", isCorrect: false },
      ],
      explanation:
        "Compter les doublons pousse au mauvais comportement (meilleure détection = chiffre plus haut). Le pourcentage de fiches uniques pointe l'effet visé.",
    },
    {
      id: "ind.7",
      statement: "Réduire les retards de facturation fournisseurs",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Pourcentage de factures payées sous 30 jours", isCorrect: true },
        { id: "B", text: "Maîtrise du cycle achats", isCorrect: false },
        { id: "C", text: "Discipline de paiement", isCorrect: false },
      ],
      explanation:
        "Ratio borné, lisible par tous. Les deux autres sont des qualités, pas des mesures.",
    },
    {
      id: "ind.8",
      statement: "Renforcer l'accueil des nouveaux arrivants",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Délai entre l'arrivée et le premier accès aux outils métier", isCorrect: true },
        { id: "B", text: "Vivacité du parcours d'accueil (note interne)", isCorrect: false },
        { id: "C", text: "Qualité de l'intégration", isCorrect: false },
      ],
      explanation:
        "Durée mesurée, indépendante des perceptions. La « vivacité » dépend de qui note ; la « qualité » est un concept-parapluie.",
    },
    {
      id: "ind.9",
      statement: "Améliorer la conversion d'une campagne d'emailing",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Engagement de l'audience", isCorrect: false },
        { id: "B", text: "Taux de clic sur le lien principal", isCorrect: true },
        { id: "C", text: "Performance relationnelle", isCorrect: false },
      ],
      explanation:
        "Le clic reste un signal fiable. Le taux d'ouverture est devenu bruité depuis 2021 (protections de Mail Privacy). « Engagement » et « performance relationnelle » sont des concepts.",
    },
    {
      id: "ind.10",
      statement: "Réduire les incidents en production",
      question: "Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ?",
      options: [
        { id: "A", text: "Solidité des livraisons", isCorrect: false },
        { id: "B", text: "Robustesse des mises en ligne", isCorrect: false },
        { id: "C", text: "Nombre d'incidents de sévérité 1 ou 2 sur 30 jours glissants", isCorrect: true },
      ],
      explanation:
        "La sévérité 1 ou 2 est définie sans ambiguïté dans les politiques d'incident. Dire « critique » sans définition est exactement le piège qu'on veut enseigner à éviter.",
    },
  ],
};
