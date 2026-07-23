import type { WarmupCase } from "../../domain/warmup";

/**
 * Cas de tri de l'échauffement — génériques, proposés à Lætitia (2026-07).
 * Onze situations variées (technique, client, support, intégration, sécurité),
 * équilibrées entre output, outcome et « à compléter ». Contenu métier : à
 * faire évoluer avec elle ; pourront être déclinés par type d'objectif.
 */
export const GENERIC_WARMUP_TRI_FR: WarmupCase[] = [
  {
    id: "warmup.tri.migrer",
    prompt: "« Migrer la base de données sur le nouveau serveur. »",
    expected: "output",
    feedbackGood: "Migrer, ça se joue entièrement dans ton travail : rien d'extérieur à attendre. C'est le travail lui-même, donc un output.",
    feedbackAsk: "Le test : est-ce que « migrer » se joue dans ton travail, ou dans la réaction de quelqu'un ? Dans ton travail. C'est le travail, pas le résultat visé.",
  },
  {
    id: "warmup.tri.livrer-page",
    prompt: "« Livrer la nouvelle page de connexion. »",
    expected: "output",
    feedbackGood: "Livrer, ça se joue dans ton travail : dès que la page est en ligne, c'est fait. Output. Le résultat, ce serait ce que ça change pour les utilisateurs.",
    feedbackAsk: "« Livrer », est-ce que ça se joue dans ton travail ou dans la réaction de quelqu'un ? Dans ton travail : un output. L'outcome serait l'effet sur les utilisateurs.",
  },
  {
    id: "warmup.tri.former",
    prompt: "« Former les équipes au nouvel outil. »",
    expected: "output",
    feedbackGood: "Former, ça se joue dans ton travail : la formation a lieu, c'est fait. Qu'ils sachent ensuite s'en servir, ça se joue chez eux : c'est l'outcome. Ici, output.",
    feedbackAsk: "La formation, ça se joue dans ton travail ; qu'ils sachent faire ensuite, ça se joue chez eux. « Former » est donc un output.",
  },
  {
    id: "warmup.tri.deployer-secu",
    prompt: "« Déployer la mise à jour de sécurité. »",
    expected: "output",
    feedbackGood: "Déployer, ça se joue dans ton travail : en production, c'est fait. Output. « Moins d'incidents » se jouerait ailleurs : ce serait l'outcome.",
    feedbackAsk: "« Déployer » se joue dans ton travail ; « moins d'incidents » se joue dans le réel. Ici, output.",
  },
  {
    id: "warmup.tri.commandes",
    prompt: "« Les utilisateurs retrouvent leurs commandes en moins de 2 secondes. »",
    expected: "outcome",
    feedbackGood: "Ça ne se joue pas que dans ton travail : il faut que, côté utilisateur, ce soit vraiment sous 2 secondes. Ça se joue dans le réel, et ça se mesure. Outcome.",
    feedbackAsk: "Est-ce que ça se joue dans ton seul travail, ou côté utilisateur ? Côté utilisateur. C'est donc un outcome.",
  },
  {
    id: "warmup.tri.abandon-panier",
    prompt: "« Faire passer le taux d'abandon du panier de 40 % à 25 %. »",
    expected: "outcome",
    feedbackGood: "Le taux, ça se joue dans le comportement des clients, pas seulement dans ton travail. Et c'est chiffré, pour eux. Outcome.",
    feedbackAsk: "Le taux dépend-il de ton seul travail, ou de la réaction des clients ? De leur réaction. Outcome.",
  },
  {
    id: "warmup.tri.appels-support",
    prompt: "« Diviser par deux les appels au support sur le module paiement. »",
    expected: "outcome",
    feedbackGood: "Le nombre d'appels, ça se joue chez les utilisateurs et le support, pas dans ton seul travail. Et ça se compte. Outcome.",
    feedbackAsk: "Est-ce que ça se joue dans ton travail, ou dans ce que font les utilisateurs ensuite ? Chez eux. C'est un outcome.",
  },
  {
    id: "warmup.tri.autonomes",
    prompt: "« Les nouveaux arrivants sont autonomes sur l'outil dès la première semaine. »",
    expected: "outcome",
    feedbackGood: "Être autonome, ça se joue chez les nouveaux arrivants, pas seulement dans le dispositif que tu mets en place. Et c'est perceptible, pour eux. Outcome.",
    feedbackAsk: "Le dispositif, tu le maîtrises ; leur autonomie se joue chez eux. C'est donc un outcome.",
  },
  {
    id: "warmup.tri.securiser",
    prompt: "« Sécuriser les accès. »",
    expected: "complete",
    feedbackGood: "Seul, « sécuriser » ne dit ni qui le constaterait, ni à quoi. Il manque la mesure.",
    feedbackAsk: "« Sécuriser », peux-tu le vérifier maintenant, sans mesure ? Non. Il est à compléter.",
    completePrompt: "Qui, à part vous, verrait que c'est sécurisé, et à quoi le verrait-il ?",
  },
  {
    id: "warmup.tri.ameliorer-ux",
    prompt: "« Améliorer l'expérience utilisateur. »",
    expected: "complete",
    feedbackGood: "« Améliorer », c'est « rendre meilleur » : un jugement de valeur, meilleur selon qui ? Sans mesure, on ne peut pas trancher. À compléter.",
    feedbackAsk: "« Améliorer l'expérience », qui le constate et comment ? Tant que ce n'est pas dit, il manque la mesure.",
    completePrompt: "Qu'est-ce qui aurait changé concrètement pour l'utilisateur, et comment le mesurer ?",
  },
  {
    id: "warmup.tri.fiabiliser",
    prompt: "« Fiabiliser le service de paiement. »",
    expected: "complete",
    feedbackGood: "« Fiabiliser » promet un mieux sans dire à quoi on le verra. Il manque la mesure.",
    feedbackAsk: "« Fiable » selon qui, mesuré comment ? Sans ça, à compléter.",
    completePrompt: "À quoi verra-t-on que le paiement est plus fiable ? (taux d'échec, incidents...)",
  },
];
