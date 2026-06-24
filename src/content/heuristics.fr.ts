/**
 * Listes externalisées des heuristiques en français.
 *
 * Validées en V1 par Lætitia (DOMAINE.md §1.3). Enrichissables sans modifier le code.
 * Pour ajouter un verbe ou un mot flou, éditer ce fichier seul, lancer `npm test`.
 */

import type { HeuristicsConfig } from "../domain/ports";

export const HEURISTICS_FR: HeuristicsConfig = {
  outputVerbs: [
    "développer",
    "livrer",
    "implémenter",
    "mettre en place",
    "mettre en œuvre",
    "refactorer",
    "coder",
    "créer",
    "construire",
    "installer",
    "déployer",
    "documenter",
    "rédiger",
    "produire",
    "réaliser",
    "faire",
    "terminer",
    "finaliser",
    "lancer",
    "avancer",
    "boucler",
    "stabiliser",
    "migrer",
    "finir",
    "améliorer", // déclenche aussi mot flou — l'utiliser en tête est doublement pénalisant
  ],
  fuzzyWords: [
    "mieux",
    "optimiser",
    "améliorer",
    "robuste",
    "performant",
    "simple",
    "efficace",
    "qualité",
    "rapide",
    "fiable",
    "stable",
    "propre",
    "bon",
    "meilleur",
    "correct",
    "adéquat",
    "satisfaisant",
    "acceptable",
    "dette",
  ],
};
