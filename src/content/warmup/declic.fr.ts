import type { WarmupDeclic } from "../../domain/warmup";

/**
 * Déclic de l'échauffement — contenu générique validé avec Lætitia (2026-07).
 * On traduit d'abord les deux mots, on montre le déplacement du regard, puis
 * le test unique. Rien n'est codé en dur dans l'UI : tout vit ici.
 */
export const WARMUP_DECLIC_FR: WarmupDeclic = {
  output: {
    term: "Output",
    gloss: "ce que je fais",
    def: "Une action précise de ma part. Une fois qu'elle est faite, elle est faite : elle ne dépend que de moi, elle ne peut pas rater.",
    posture: "Mon regard est sur moi, sur mon geste",
  },
  outcome: {
    term: "Outcome",
    gloss: "ce que ça donne",
    def: "Un changement utile et perceptible pour une partie prenante : un comportement qui change, un chiffre qui bouge. Ça peut ne pas arriver, même quand j'ai fait tout le travail.",
    posture: "Mon regard est sur l'effet, pour quelqu'un",
  },
  bridge:
    "Passer de l'un à l'autre, c'est déplacer son regard : de ce que je fais, vers ce que ça change pour quelqu'un.",
  examplesLabel: "La même situation, racontée de deux façons",
  examples: [
    {
      output: "« J'ai préparé un bon repas. »",
      outcome: "« Mes invités se sont régalés. »",
      note: "J'ai pu tout bien cuisiner et qu'ils n'aiment pas.",
    },
    {
      output: "« J'ai déployé le nouvel outil. »",
      outcome: "« Le support reçoit deux fois moins d'appels. »",
      note: "Ça se voit, ça se compte, et pour quelqu'un d'autre.",
    },
  ],
  examplesPunch:
    "À gauche, je parle de moi. À droite, de ce que ça change pour quelqu'un, et ça peut ne pas arriver même si j'ai tout fait.",
  test:
    "Si je fais tout le travail parfaitement, le résultat visé peut-il quand même ne pas venir ? Oui, c'est un outcome. Non, c'est un output.",
};
