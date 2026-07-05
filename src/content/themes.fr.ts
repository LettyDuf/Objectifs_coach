/**
 * Thèmes d'apprentissage par module (D21).
 *
 * Chaque thème porte un titre éditorial, une accroche courte (sans redondance
 * avec le titre, sans tiret cadratin), et un picto. Les fiches sont rattachées
 * via leur champ `themeId`.
 *
 * V1 : 2 thèmes par module pour démarrer (1 fiche actuelle par thème). L'étoffement
 * suit le plan défini avec Lætitia (12 fiches candidates issues de la recherche
 * anti-patterns à intégrer ensuite).
 */

import type { Audience, ObjectiveType } from "../domain/types";
import type { LearningTheme } from "../domain/ports";

/** Thème par défaut si une fiche n'a pas de `themeId`. */
export const DEFAULT_THEME: LearningTheme = {
  id: "all",
  label: "Toutes les fiches",
  tagline: "L'ensemble des fiches du module.",
  icon: "learn",
};

type ThemesIndex = Partial<Record<ObjectiveType, Partial<Record<Audience, LearningTheme[]>>>>;

/**
 * Thème transverse partagé entre les 3 modules (Sprint, PI, OKR équipe).
 * Inscrit en première position de chaque liste : la posture pose le cadre avant
 * le technique (validé Lætitia 2026-06-22).
 */
const VALEURS_THEME: LearningTheme = {
  id: "valeurs.posture",
  label: "Posture et valeurs",
  tagline: "Ce qui rend la rédaction d'objectifs honnête.",
  icon: "good",
};

const SPRINT_DEV_THEMES_FR: LearningTheme[] = [
  VALEURS_THEME,
  {
    id: "sprint.fondamentaux",
    label: "Les fondamentaux",
    tagline: "Par où commencer.",
    icon: "target",
    recommendedFirst: true,
  },
  {
    id: "sprint.pieges-classiques",
    label: "Les pièges classiques",
    tagline: "Les erreurs qu'on voit en atelier.",
    icon: "warn",
  },
  {
    id: "sprint.cas-particuliers",
    label: "Cas particuliers",
    tagline: "Quand la situation sort du cadre standard.",
    icon: "wrench",
  },
];

const PI_DEV_THEMES_FR: LearningTheme[] = [
  VALEURS_THEME,
  {
    id: "pi.fondamentaux",
    label: "Les fondamentaux",
    tagline: "Par où commencer.",
    icon: "target",
    recommendedFirst: true,
  },
  {
    id: "pi.engagement",
    label: "Engagement et calibrage",
    tagline: "Engagé, stretch, et où mettre la barre.",
    icon: "challenge",
  },
  {
    id: "pi.valeur-business",
    label: "Valeur business",
    tagline: "Le dialogue avec le Business Owner.",
    icon: "okr",
  },
  {
    id: "pi.pieges-classiques",
    label: "Les pièges classiques",
    tagline: "Les erreurs qu'on voit en PI Planning.",
    icon: "warn",
  },
];

const OKR_EQUIPE_DEV_THEMES_FR: LearningTheme[] = [
  VALEURS_THEME,
  {
    id: "okr.fondamentaux",
    label: "Les fondamentaux",
    tagline: "Par où commencer.",
    icon: "okr",
    recommendedFirst: true,
  },
  {
    id: "okr.pieges-kr",
    label: "Les pièges du Résultat clé",
    tagline: "Les erreurs qu'on voit tous les jours en atelier.",
    icon: "warn",
  },
];

const OKR_ENTREPRISE_MANAGER_THEMES_FR: LearningTheme[] = [
  VALEURS_THEME,
  {
    id: "okr-entreprise.fondamentaux",
    label: "Les fondamentaux",
    tagline: "Par où commencer.",
    icon: "okr",
    recommendedFirst: true,
  },
  {
    id: "okr-entreprise.pieges",
    label: "Les pièges du CODIR",
    tagline: "Les erreurs qu'on voit au niveau entreprise.",
    icon: "warn",
  },
];

export const THEMES_INDEX: ThemesIndex = {
  sprint: { dev: SPRINT_DEV_THEMES_FR },
  pi: { dev: PI_DEV_THEMES_FR },
  "okr-equipe": { dev: OKR_EQUIPE_DEV_THEMES_FR },
  "okr-entreprise": { manager: OKR_ENTREPRISE_MANAGER_THEMES_FR },
};
