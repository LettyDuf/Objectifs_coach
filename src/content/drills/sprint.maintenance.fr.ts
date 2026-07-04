/**
 * Corpus mini-exercice « Maintenance : trouver la valeur » Sprint × dev × FR.
 *
 * QCM 1 parmi 4 : face à une tâche de maintenance décrite en output, choisir
 * la reformulation qui porte la vraie valeur (outcome mesurable), parmi des
 * distracteurs qui reproduisent des pièges déjà enseignés ailleurs (output
 * pur, concept-parapluie, mesure de moyen plutôt que d'effet perçu).
 *
 * Les 4 cas couvrent les 4 familles classiques de maintenance logicielle
 * (ISO/IEC 14764) : corrective, adaptative, perfective, préventive — validés
 * avec Lætitia le 2026-07-04, en écho à la fiche Théorie « Sprint de
 * maintenance : trouver la valeur ».
 */

import type { DrillCorpus } from "../../domain/drill";

export const SPRINT_MAINTENANCE_DRILL_FR: DrillCorpus = {
  kind: "qcm",
  intro:
    "Un travail de maintenance a toujours un bénéficiaire et un effet mesurable — même quand il ressemble à une simple tâche à cocher. Repère la reformulation qui porte la vraie valeur.",
  cases: [
    {
      id: "maint.1",
      statement: "Corriger les bugs du backlog support avant la fin du sprint.",
      question: "Quelle reformulation reflète la vraie valeur de ce travail (maintenance corrective) ?",
      options: [
        {
          id: "A",
          text: "Faire passer le nombre de tickets support ouverts depuis plus de 30 jours de 27 à 10, d'ici fin de sprint.",
          isCorrect: true,
        },
        { id: "B", text: "Traiter 15 tickets du backlog support d'ici fin de sprint.", isCorrect: false },
        { id: "C", text: "Améliorer la réactivité du support.", isCorrect: false },
        { id: "D", text: "Réduire le nombre de bugs ouverts en base de données.", isCorrect: false },
      ],
      explanation:
        "Traiter des tickets est un output : rien ne dit que la charge du support baisse vraiment. Le nombre de tickets anciens non résolus montre l'effet réel côté équipe support.",
    },
    {
      id: "maint.2",
      statement: "Migrer les services vers la version supportée de Node.js.",
      question: "Quelle reformulation reflète la vraie valeur de ce travail (maintenance adaptative) ?",
      options: [
        {
          id: "A",
          text: "Migrer les 6 services critiques vers Node 20 d'ici fin de sprint.",
          isCorrect: false,
        },
        { id: "B", text: "Sécuriser notre stack technique.", isCorrect: false },
        {
          id: "C",
          text: "Éliminer les 8 vulnérabilités critiques liées aux dépendances obsolètes, sans régression sur les 3 parcours critiques testés, d'ici fin de sprint.",
          isCorrect: true,
        },
        { id: "D", text: "Passer 100 % des tests automatisés.", isCorrect: false },
      ],
      explanation:
        "Migrer est un output technique. Ce qui compte, c'est la réduction du risque de sécurité réel — mesurée en vulnérabilités éliminées, pas en version installée.",
    },
    {
      id: "maint.3",
      statement: "Refactorer le module de recherche pour améliorer les performances.",
      question: "Quelle reformulation reflète la vraie valeur de ce travail (maintenance perfective) ?",
      options: [
        { id: "A", text: "Refactorer les 3 composants les plus lents du moteur de recherche.", isCorrect: false },
        {
          id: "B",
          text: "Faire passer le temps de réponse p95 de la recherche de 1,2 s à 400 ms, d'ici fin de sprint.",
          isCorrect: true,
        },
        { id: "C", text: "Améliorer la performance de la recherche.", isCorrect: false },
        { id: "D", text: "Réduire la complexité cyclomatique du code de recherche de 30 %.", isCorrect: false },
      ],
      explanation:
        "La complexité du code est un moyen. Ce que l'utilisateur perçoit, c'est la vitesse de réponse — c'est elle qui doit être chiffrée.",
    },
    {
      id: "maint.4",
      statement: "Préparer et exécuter le test de reprise annuel en staging.",
      question: "Quelle reformulation reflète la vraie valeur de ce travail (maintenance préventive) ?",
      options: [
        { id: "A", text: "Exécuter le test de bascule complet en staging d'ici fin de sprint.", isCorrect: false },
        { id: "B", text: "Vérifier que notre plan de reprise fonctionne.", isCorrect: false },
        {
          id: "C",
          text: "Réaliser le test de reprise avant l'audit de sécurité du mois prochain.",
          isCorrect: false,
        },
        {
          id: "D",
          text: "Faire passer le nombre d'écarts critiques de reprise non résolus de 4 à 0, avec preuve : test de bascule complet exécuté en staging (RTO et RPO mesurés), d'ici fin de sprint.",
          isCorrect: true,
        },
      ],
      explanation:
        "Faire le test est un output. La preuve d'écarts résolus (ou du contraire) est ce qui donne une vraie valeur au sprint — sinon le test devient un rituel qu'on coche.",
    },
  ],
};
