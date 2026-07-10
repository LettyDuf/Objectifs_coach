/**
 * Corpus d'échauffement output/outcome — Sprint × dev × FR.
 *
 * 10 verbes purs (niveau 1) + 10 mini-objectifs (niveau 2).
 * Le niveau 2 contient volontairement le verbe « améliorer » dans deux cas opposés
 * pour enseigner que c'est le **contexte** qui tranche, pas le verbe seul.
 *
 * L'ordre de présentation est randomisé à chaque lancement (composant Warmup).
 */

import type { WarmupCase } from "../../domain/warmup";

export const SPRINT_DEV_WARMUP_FR: WarmupCase[] = [
  // ============================================================
  // Niveau 1 — verbes purs
  // ============================================================
  {
    id: "warmup.l1.livrer",
    level: 1,
    kind: "verb",
    prompt: "Livrer",
    expected: "output",
    explanation:
      "« Livrer » décrit ce qu'on produit, pas le changement obtenu. Output classique.",
  },
  {
    id: "warmup.l1.reduire",
    level: 1,
    kind: "verb",
    prompt: "Réduire",
    expected: "outcome",
    explanation:
      "« Réduire » appelle un avant et un après mesurables. Le verbe oriente clairement vers un résultat constaté.",
  },
  {
    id: "warmup.l1.refactorer",
    level: 1,
    kind: "verb",
    prompt: "Refactorer",
    expected: "output",
    explanation:
      "« Refactorer » nomme une activité interne à l'équipe. Aucun bénéficiaire externe, aucun changement constaté. Output.",
  },
  {
    id: "warmup.l1.permettre",
    level: 1,
    kind: "verb",
    prompt: "Permettre à",
    expected: "outcome",
    explanation:
      "« Permettre à [bénéficiaire] de [faire X] » place le résultat du côté d'un utilisateur. Outcome.",
  },
  {
    id: "warmup.l1.deployer",
    level: 1,
    kind: "verb",
    prompt: "Déployer",
    expected: "output",
    explanation:
      "Déployer = activité technique. Que la chose déployée serve quelqu'un et soit mesurée reste à dire ailleurs. Output.",
  },
  {
    id: "warmup.l1.atteindre",
    level: 1,
    kind: "verb",
    prompt: "Atteindre",
    expected: "outcome",
    explanation:
      "« Atteindre X » place le résultat sur une cible chiffrée. Verbe outcome qui structure naturellement un objectif de Sprint.",
  },
  {
    id: "warmup.l1.installer",
    level: 1,
    kind: "verb",
    prompt: "Installer",
    expected: "output",
    explanation:
      "« Installer » décrit une action d'équipe sans ambiguïté. Aucun changement constaté côté bénéficiaire n'est nommé. Output.",
  },
  {
    id: "warmup.l1.faire-passer",
    level: 1,
    kind: "verb",
    prompt: "Faire passer",
    expected: "outcome",
    explanation:
      "« Faire passer X de A à B » suppose un avant et un après mesurable sur un indicateur. Outcome immédiatement falsifiable.",
  },
  {
    id: "warmup.l1.construire",
    level: 1,
    kind: "verb",
    prompt: "Construire",
    expected: "output",
    explanation:
      "Construire = produire. Le verbe parle de l'effort de l'équipe, pas du résultat constaté côté utilisateur. Output.",
  },
  {
    id: "warmup.l1.convertir",
    level: 1,
    kind: "verb",
    prompt: "Convertir",
    expected: "outcome",
    explanation:
      "« Convertir » nomme une transformation d'état du bénéficiaire (prospect vers client, visiteur vers utilisateur actif). Outcome typique pour cibler des utilisateurs ou clients.",
  },
  {
    id: "warmup.l1.stabiliser",
    level: 1,
    kind: "verb",
    prompt: "Stabiliser",
    expected: "depends",
    explanation:
      "Il y a bien un avant/après, mais sans mesure, « stable » reste le jugement de ceux qui ont fait le travail. Avec une mesure nommée (incidents par semaine, temps de rétablissement), n'importe qui peut vérifier, même si le bénéficiaire est l'équipe elle-même. Le verbe seul ne permet pas de trancher.",
  },
  {
    id: "warmup.l1.securiser",
    level: 1,
    kind: "verb",
    prompt: "Sécuriser",
    expected: "depends",
    explanation:
      "« Sécuriser le paiement » promet un changement, mais sans mesure personne ne peut dire si c'est fait. Avec un indicateur (alertes critiques, vulnérabilités ouvertes), il porte un outcome.",
  },

  // ============================================================
  // Niveau 2 — mini-objectifs avec contexte
  // ============================================================
  {
    id: "warmup.l2.ameliorer-module",
    level: 2,
    kind: "objective",
    prompt: "Améliorer le module commande.",
    expected: "output",
    explanation:
      "« Améliorer » est un mot flou. Sans bénéficiaire ni seuil, on décrit du travail à faire. Output déguisé.",
  },
  {
    id: "warmup.l2.ameliorer-conversion",
    level: 2,
    kind: "objective",
    prompt: "Améliorer la conversion essai → payant de 12 % à 18 % d'ici fin de sprint.",
    expected: "outcome",
    explanation:
      "Même verbe que ci-dessus, mais ici un seuil chiffré, un avant/après, une échéance. Le contexte rend l'objectif outcome — le verbe seul ne suffit pas à juger.",
  },
  {
    id: "warmup.l2.stabiliser",
    level: 2,
    kind: "objective",
    prompt: "Stabiliser la plateforme.",
    expected: "output",
    explanation:
      "« Stabiliser » est une action technique sans mesure ni bénéficiaire nommé. Output. Pour le rendre outcome il faudrait nommer qui en profite et la mesure (incidents, TMR…).",
  },
  {
    id: "warmup.l2.pilotes-marketplace",
    level: 2,
    kind: "objective",
    prompt: "Faire entrer 3 clients pilotes sur la nouvelle offre marketplace avant la revue de PI.",
    expected: "outcome",
    explanation:
      "Bénéficiaire (clients), seuil (3), borne temporelle (revue de PI). Tous les ingrédients d'un outcome — même si la livraison technique est ailleurs.",
  },
  {
    id: "warmup.l2.migrer-oauth",
    level: 2,
    kind: "objective",
    prompt: "Migrer l'authentification vers OAuth.",
    expected: "output",
    explanation:
      "Migrer = activité technique pure. Aucun changement constaté du point de vue de l'utilisateur n'est nommé. Output.",
  },
  {
    id: "warmup.l2.diviser-chargement",
    level: 2,
    kind: "objective",
    prompt: "Diviser par 2 le temps de chargement de la home (de 4 s à 2 s) avant la fin du sprint.",
    expected: "outcome",
    explanation:
      "Métrique nommée, point de départ, cible, échéance. Le bénéficiaire (utilisateurs de la home) est implicite mais clair.",
  },
  {
    id: "warmup.l2.refactor-panier",
    level: 2,
    kind: "objective",
    prompt: "Refactorer le composant Panier en suivant les nouvelles règles d'architecture.",
    expected: "output",
    explanation:
      "Activité technique interne. Aucun effet nommé côté utilisateur ou système observable. Output classique.",
  },
  {
    id: "warmup.l2.checkout-90s",
    level: 2,
    kind: "objective",
    prompt: "Permettre à un nouvel utilisateur de finaliser une commande en moins de 90 secondes (mesuré sur 50 sessions).",
    expected: "outcome",
    explanation:
      "Bénéficiaire (nouvel utilisateur), action observable (finaliser une commande), seuil chiffré (90 s), méthode de mesure (50 sessions). Outcome rigoureux.",
  },
  {
    id: "warmup.l2.pipeline-ci",
    level: 2,
    kind: "objective",
    prompt: "Mettre en place le nouveau pipeline CI/CD pour l'équipe.",
    expected: "output",
    explanation:
      "Le pipeline mis en place est un livrable. L'effet qu'il produit (durée de build divisée, déploiements plus fiables…) n'est pas nommé.",
  },
  {
    id: "warmup.l2.tests-e2e",
    level: 2,
    kind: "objective",
    prompt: "Faire passer le taux de succès des tests E2E de 78 % à 95 % d'ici la fin du sprint.",
    expected: "outcome",
    explanation:
      "Métrique nommée, avant/après, échéance. Le bénéficiaire (équipes fonctionnalité qui dépendent du système, ops qui déploient) est implicite mais l'outcome est solide.",
  },
];
