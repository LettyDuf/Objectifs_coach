import type { WarmupDeclic } from "../../domain/warmup";

/**
 * Déclic de l'échauffement — contenu générique validé avec Lætitia (2026-07).
 * On traduit d'abord les deux mots, on montre le déplacement du regard (du travail vers l'effet),
 * on illustre par deux exemples à égalité, puis un test pour trancher. Revu par le panel UX-UI/graphiste : exemples à égalité,
 * sans couleur de valeur, en-têtes traités comme étiquettes.
 */
export const WARMUP_DECLIC_FR: WarmupDeclic = {
  output: {
    term: "Output",
    gloss: "ce que je fais",
    def: "Une action précise de la part d'un membre de l'équipe. Le regard est sur le travail.",
  },
  outcome: {
    term: "Outcome",
    gloss: "ce que ça donne",
    def: "Un changement utile et perceptible pour une partie prenante : un comportement qui bouge, un chiffre qui bouge. Le regard est sur l'effet, pour quelqu'un.",
  },
  bridge:
    "Passer de l'un à l'autre, c'est déplacer son regard : de ce que je fais, vers ce que ça change pour quelqu'un.",
  examplesLabel: "La même situation, deux façons de la raconter",
  examples: [
    { output: "« J'ai préparé un bon repas. »", outcome: "« Mes invités se sont régalés. »" },
    { output: "« J'ai déployé le nouvel outil. »", outcome: "« Le support reçoit deux fois moins d'appels. »" },
  ],
  test:
    "Est-ce que ça se joue dans mon travail, ou dans la réaction de quelqu'un ? Dans mon travail → un output. Dans la réaction de quelqu'un → un outcome.",
};
