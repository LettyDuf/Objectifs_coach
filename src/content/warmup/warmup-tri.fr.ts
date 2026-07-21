import type { WarmupCase } from "../../domain/warmup";

/**
 * Cas de tri de l'échauffement — génériques et validés (2026-07).
 * Trois situations qui parlent à toutes les équipes. Pourront être déclinés
 * par type d'objectif plus tard, après validation de Lætitia (contenu métier).
 */
export const GENERIC_WARMUP_TRI_FR: WarmupCase[] = [
  {
    id: "warmup.tri.migrer",
    prompt: "« Migrer la base de données sur le nouveau serveur. »",
    expected: "output",
    feedbackGood:
      "Oui. Migrer, une fois fait, c'est fait : ça ne peut pas rater. On applique le test, rien ne reste en suspens. C'est un output.",
    feedbackAsk:
      "Pose le test : « migrer, une fois tout le travail fait, ça peut-il encore rater ? » Non. Donc ce n'est pas le résultat visé, c'est le travail lui-même.",
  },
  {
    id: "warmup.tri.commandes",
    prompt: "« Les utilisateurs retrouvent leurs commandes en moins de 2 secondes. »",
    expected: "outcome",
    feedbackGood:
      "Oui. Même la base migrée, ils pourraient toujours attendre 5 secondes : ça peut rater alors que le travail est fait. Et « moins de 2 secondes » se mesure. C'est un outcome.",
    feedbackAsk:
      "Pose le test : après tout le travail, peut-on encore attendre plus de 2 secondes ? Oui. Donc ça peut rater même une fois fait.",
  },
  {
    id: "warmup.tri.securiser",
    prompt: "« Sécuriser les accès. »",
    expected: "complete",
    feedbackGood:
      "Bien vu. Seul, « sécuriser » ne dit ni qui le constaterait, ni à quoi. Ce n'est pas un piège : il manque la mesure.",
    feedbackAsk:
      "« Sécuriser » promet un mieux, mais peux-tu le vérifier là, maintenant, sans mesure ? Non. Alors il est à compléter.",
    completePrompt:
      "Complétons-la. Qui, à part vous, verrait que c'est sécurisé, et à quoi le verrait-il ?",
  },
];
