/**
 * Échauffement output / outcome — domaine (refonte 2026-07).
 *
 * Une seule idée : « fini n'est pas atteint ». Le domaine porte les types et
 * une petite fonction pure d'ordonnancement (testable, sans framework). La
 * comparaison choix / attendu vit dans l'adaptateur UI.
 */

/** Les deux vraies catégories, plus un bac de côté quand la mesure manque. */
export type WarmupAnswer = "output" | "outcome" | "complete";

/** Un cas de tri : une phrase, sa bonne case, et une rétroaction par situation. */
export interface WarmupCase {
  id: string;
  prompt: string;
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
}

/** Contenu générique du déclic (définitions, posture, exemples, test). Défini une fois. */
export interface WarmupDeclic {
  output: WarmupDeclicTerm;
  outcome: WarmupDeclicTerm;
  bridge: string;
  examplesLabel: string;
  examples: WarmupDeclicExample[];
  test: string;
}

/**
 * Ordonne les cas pour que deux réponses identiques ne se suivent JAMAIS.
 * Sinon l'équipe devine par le rythme au lieu de raisonner. Fonction pure :
 * on peut injecter un générateur aléatoire pour la tester.
 */
export function orderVaried<T extends { expected: WarmupAnswer }>(
  cases: T[],
  rnd: () => number = Math.random,
): T[] {
  if (cases.length <= 1) return [...cases];

  const shuffle = (arr: readonly T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j]!, a[i]!];
    }
    return a;
  };
  const hasAdjacentDup = (a: T[]): boolean => {
    for (let i = 1; i < a.length; i++) {
      if (a[i]!.expected === a[i - 1]!.expected) return true;
    }
    return false;
  };

  // Échantillonnage par rejet : on tire un ordre ALÉATOIRE et on le garde s'il n'a
  // jamais deux réponses identiques de suite. D'une session à l'autre, la séquence
  // des réponses varie vraiment (pas un cycle figé output -> outcome -> à compléter),
  // tout en garantissant qu'on ne répète jamais la même réponse deux fois de suite.
  let candidate = shuffle(cases);
  for (let attempt = 0; attempt < 200 && hasAdjacentDup(candidate); attempt++) {
    candidate = shuffle(cases);
  }
  if (!hasAdjacentDup(candidate)) return candidate;

  // Repli déterministe (corpus quasi infaisable, ex. une catégorie ultra-majoritaire) :
  // glouton par catégorie la plus nombreuse différente de la précédente. Garantit
  // l'absence d'adjacence chaque fois qu'un tel ordre existe.
  const byType = new Map<WarmupAnswer, T[]>();
  for (const c of shuffle(cases)) {
    const arr = byType.get(c.expected) ?? [];
    arr.push(c);
    byType.set(c.expected, arr);
  }
  const res: T[] = [];
  let last: WarmupAnswer | null = null;
  for (let n = 0; n < cases.length; n++) {
    let best: WarmupAnswer | null = null;
    let bestLen = -1;
    for (const [t, arr] of byType) {
      if (t === last) continue;
      if (arr.length > bestLen) {
        best = t;
        bestLen = arr.length;
      }
    }
    if (best === null || bestLen <= 0) {
      for (const [t, arr] of byType) {
        if (arr.length) {
          best = t;
          break;
        }
      }
    }
    const arr = byType.get(best!)!;
    res.push(arr.pop()!);
    last = best;
  }
  return res;
}
