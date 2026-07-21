/**
 * Échauffement output / outcome — domaine (refonte 2026-07).
 *
 * On n'apprend plus à classer un verbe seul (indécidable), mais à sentir une
 * seule idée : « fini n'est pas atteint ». Le domaine reste sans logique : ce
 * sont des types et du contenu structuré. La comparaison choix / attendu vit
 * dans l'adaptateur UI.
 */

/** Les deux vraies catégories, plus un bac de côté quand la mesure manque. */
export type WarmupAnswer = "output" | "outcome" | "complete";

/** Un cas de tri : une phrase, sa bonne case, et une rétroaction par situation. */
export interface WarmupCase {
  /** Identifiant stable (analytics / tests). */
  id: string;
  /** La phrase à trier. */
  prompt: string;
  /** La bonne case. */
  expected: WarmupAnswer;
  /** Rétroaction quand la personne trouve : on rejoue le test, jamais de score. */
  feedbackGood: string;
  /** Rétroaction quand elle se trompe : une question qui la remet sur la piste. */
  feedbackAsk: string;
  /** Pour un cas "complete" : la question qui fait produire la mesure manquante. */
  completePrompt?: string;
}

/** Un des deux mots du déclic, traduit en clair, avec sa posture. */
export interface WarmupDeclicTerm {
  term: string;
  gloss: string;
  def: string;
  posture: string;
}

/** Une paire d'exemples : la même situation en output puis en outcome. */
export interface WarmupDeclicExample {
  output: string;
  outcome: string;
  note?: string;
}

/** Contenu générique du déclic (définitions, posture, exemples, test). Défini une fois. */
export interface WarmupDeclic {
  output: WarmupDeclicTerm;
  outcome: WarmupDeclicTerm;
  bridge: string;
  examplesLabel: string;
  examples: WarmupDeclicExample[];
  examplesPunch: string;
  test: string;
}
