/**
 * Domaine - activité « Construire l'objectif ».
 *
 * Deuxième activité du Défi, à côté du QCM de reconnaissance. Là où le QCM fait
 * RECONNAÎTRE une bonne formulation parmi quatre, celle-ci fait GÉNÉRER la sienne,
 * brique par brique, puis la confronter aux mêmes quatre formulations en miroir.
 * Elle réutilise le corpus du QCM (métriques, demande, formulations) : pas de
 * contenu dupliqué.
 *
 * Pédagogie (validée avec Lætitia via les panels) : partir de la valeur (pour
 * qui), bannir les mots-jugement (« améliorer »), séparer l'observable de la
 * cible chiffrée, et traiter le niveau d'étayage comme un réglage de la
 * facilitatrice, pas un désétayage automatique.
 *
 * Aucune dépendance framework : fonctions pures, testables.
 */

/** Niveau d'étayage choisi par la facilitatrice selon la maturité de l'équipe. */
export type EtayageLevel = "guide" | "semi" | "auto";

/**
 * Réponses de l'utilisateur aux briques de construction. Tous les champs sont
 * optionnels : la trame se remplit au fur et à mesure, les cases vides étant
 * signalées par des marqueurs [à préciser].
 */
export interface BuildBricks {
  /** Pour qui, et ce que ça lui coûte aujourd'hui. */
  besoin: string;
  /** Verbe de variation choisi (Réduire, Ramener, Porter...). */
  verbe: string;
  /** L'état ou le résultat visé. */
  quoi: string;
  /** À quoi on le verra, sans demander à ceux qui ont fait le travail. */
  observable: string;
  /** Valeur de départ. */
  from: string;
  /** Valeur cible. */
  to: string;
  /** D'où sort le chiffre de départ. */
  baseline: string;
  /** Label d'échéance choisi. */
  echeance: string;
  /** Honnêtement, nos chances d'y arriver à cette date. */
  chances: string;
  /** Si l'échéance dépasse la fenêtre : premier morceau plus petit à livrer. */
  decoupe: string;
}

/** Briques vides - état initial d'une session de construction. */
export function emptyBricks(): BuildBricks {
  return {
    besoin: "",
    verbe: "",
    quoi: "",
    observable: "",
    from: "",
    to: "",
    baseline: "",
    echeance: "",
    chances: "",
    decoupe: "",
  };
}

/** Marqueur lisible pour une brique non remplie. */
function slot(value: string, placeholder: string): string {
  const v = value.trim();
  return v.length > 0 ? v : `[${placeholder}]`;
}

/**
 * Assemble la trame de départ à partir des briques. C'est une AMORCE remplie
 * avec les mots de l'équipe (niveau Guidé), pas la réponse : l'équipe reste
 * libre de la réécrire. Forme : « (Verbe) (indicateur) de (départ) à (cible),
 * pour (bénéficiaire), d'ici (échéance). »
 */
export function assembleTrame(b: BuildBricks): string {
  const indicateur = b.observable.trim() || b.quoi.trim() || "[l'indicateur]";
  const verbe = b.verbe.trim() || "[verbe de variation]";
  return (
    `${verbe} ${indicateur} de ${slot(b.from, "départ")} à ${slot(b.to, "cible")}, ` +
    `pour ${slot(b.besoin, "qui et besoin")}, d'ici ${slot(b.echeance, "échéance")}.`
  );
}

/** Une ligne du récapitulatif des briques (étape Assembler). */
export interface RecapItem {
  label: string;
  value: string;
}

/** Regroupe les briques en lignes de récapitulatif lisibles. */
export function buildRecap(b: BuildBricks): RecapItem[] {
  const cible =
    `de ${slot(b.from, "?")} à ${slot(b.to, "?")}` +
    (b.baseline.trim() ? ` ; repère : ${b.baseline.trim()}` : "");
  const echeance =
    slot(b.echeance, "à préciser") +
    (b.chances.trim() ? ` ; chances : ${b.chances.trim()}` : "") +
    (b.decoupe.trim() ? ` ; 1er morceau : ${b.decoupe.trim()}` : "");
  return [
    { label: "Pour qui / besoin", value: slot(b.besoin, "à préciser") },
    { label: "Changement", value: `${slot(b.verbe, "verbe")} ${slot(b.quoi, "quoi")}` },
    { label: "Observable", value: slot(b.observable, "à préciser") },
    { label: "Cible", value: cible },
    { label: "Échéance", value: echeance },
  ];
}

/** Libellé court de chaque niveau d'étayage. */
export const ETAYAGE_LABELS: Record<EtayageLevel, string> = {
  guide: "Guidé",
  semi: "Semi-autonome",
  auto: "Autonome",
};

/** Description du comportement de chaque niveau à l'étape Assembler. */
export const ETAYAGE_DESCRIPTIONS: Record<EtayageLevel, string> = {
  guide:
    "À l'étape Assembler, la trame se remplit avec leurs mots. Pour une équipe qui découvre.",
  semi:
    "Les briques restent affichées, mais sans trame. L'équipe assemble seule. Pour une équipe qui progresse.",
  auto:
    "Page blanche à l'assemblage ; les questions ne servent que de vérification. Le vrai test du transfert.",
};

/** Ordre d'affichage des niveaux d'étayage. */
export const ETAYAGE_ORDER: EtayageLevel[] = ["guide", "semi", "auto"];
