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
    feedbackGood: "Migrer, une fois fait, c'est fait : ça ne peut pas rater. C'est le travail lui-même, donc un output.",
    feedbackAsk: "Le test : une fois la migration faite, peut-elle encore rater ? Non. C'est donc le travail, pas le résultat visé.",
  },
  {
    id: "warmup.tri.livrer-page",
    prompt: "« Livrer la nouvelle page de connexion. »",
    expected: "output",
    feedbackGood: "Livrer, c'est fait dès que la page est en ligne : ça ne peut pas rater. Output. Le résultat, ce serait ce que ça change pour les utilisateurs.",
    feedbackAsk: "Une fois la page livrée, ça peut-il rater ? Non. C'est un output ; l'outcome serait l'effet sur les utilisateurs.",
  },
  {
    id: "warmup.tri.former",
    prompt: "« Former les équipes au nouvel outil. »",
    expected: "output",
    feedbackGood: "Former, c'est fait dès que la formation a eu lieu. Que les gens sachent ensuite s'en servir, c'est l'outcome. Ici, output.",
    feedbackAsk: "La formation donnée est donnée. Garantit-elle que les gens savent faire ? Non. « Former » est le geste : un output.",
  },
  {
    id: "warmup.tri.deployer-secu",
    prompt: "« Déployer la mise à jour de sécurité. »",
    expected: "output",
    feedbackGood: "Déployer, c'est fait dès que c'est en production : ça ne peut pas rater. Output.",
    feedbackAsk: "Une fois déployée, la mise à jour est déployée. Le résultat, moins d'incidents, est autre chose. Ici, output.",
  },
  {
    id: "warmup.tri.commandes",
    prompt: "« Les utilisateurs retrouvent leurs commandes en moins de 2 secondes. »",
    expected: "outcome",
    feedbackGood: "Même le travail fait, ils pourraient attendre 5 secondes : ça peut rater. Et « moins de 2 secondes » se mesure. Outcome.",
    feedbackAsk: "Après tout le travail, peut-on encore attendre plus de 2 secondes ? Oui. Ça peut rater : c'est un outcome.",
  },
  {
    id: "warmup.tri.abandon-panier",
    prompt: "« Faire passer le taux d'abandon du panier de 40 % à 25 %. »",
    expected: "outcome",
    feedbackGood: "On peut tout faire et le taux ne pas bouger : ça peut rater. Et c'est chiffré, pour le client. Outcome.",
    feedbackAsk: "Le travail fait, le taux peut-il rester à 40 % ? Oui. Donc ça peut rater : outcome.",
  },
  {
    id: "warmup.tri.appels-support",
    prompt: "« Diviser par deux les appels au support sur le module paiement. »",
    expected: "outcome",
    feedbackGood: "On peut livrer et les appels ne pas baisser : ça peut rater. Et ça se compte, pour le support. Outcome.",
    feedbackAsk: "Après le travail, les appels peuvent-ils rester au même niveau ? Oui. C'est un outcome.",
  },
  {
    id: "warmup.tri.autonomes",
    prompt: "« Les nouveaux arrivants sont autonomes sur l'outil dès la première semaine. »",
    expected: "outcome",
    feedbackGood: "On peut tout mettre en place et qu'ils ne soient pas autonomes : ça peut rater. Et c'est perceptible, pour eux. Outcome.",
    feedbackAsk: "Le dispositif en place, sont-ils forcément autonomes ? Pas sûr. Ça peut rater : outcome.",
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
