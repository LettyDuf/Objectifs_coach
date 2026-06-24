/**
 * Heuristiques textuelles — détections objectives sur le texte d'un objectif.
 *
 * Aucune intelligence linguistique avancée : on cherche des signaux nets, explicables,
 * traçables. Si un signal déclenche, on peut toujours montrer à l'utilisateur le mot
 * exact qui a posé problème. C'est la promesse pédagogique de l'outil (voir D3).
 */

/** Normalise une chaîne : minuscules, sans accents, espaces compactés. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Découpe en mots (tokens). Ignore la ponctuation.
 * Retourne les tokens normalisés.
 */
export function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[^a-z0-9']+/)
    .filter((t) => t.length > 0);
}

/**
 * Bigrammes qui **annulent** une détection de verbe d'output sur le premier token.
 * Ex : « faire » est dans `outputVerbs` (« Faire la migration » est output), mais
 * « faire passer » / « faire entrer » sont des expressions idiomatiques outcome
 * (« Faire passer le NPS de 30 à 50 », « Faire entrer 3 clients pilotes »).
 *
 * Heuristique simple : si les deux premiers tokens forment un de ces bigrammes,
 * on ne déclenche pas la pénalité output.
 */
const PHRASAL_OUTCOME_ALLOWANCES: ReadonlyArray<[string, string]> = [
  ["faire", "passer"],
  ["faire", "entrer"],
  ["faire", "venir"],
  ["faire", "adopter"],
  ["faire", "de"], // « Faire de [X] la [Y] », tournure inspirante d'Objective OKR
];

/**
 * Détecte si le texte commence par un verbe d'output (premier mot informatif).
 * On prend le tout premier token : c'est la formulation qui pose problème dans
 * les objectifs mal rédigés ("Développer X", "Livrer Y", "Refactorer Z").
 * Exception : les bigrammes de `PHRASAL_OUTCOME_ALLOWANCES` annulent la détection.
 */
export function startsWithOutputVerb(text: string, outputVerbs: string[]): string | null {
  const tokens = tokenize(text);
  if (tokens.length === 0) return null;
  // Garde-fou idiomatique : "faire passer" et cie ne sont pas considérés output.
  if (tokens.length >= 2) {
    const bi: [string, string] = [tokens[0]!, tokens[1]!];
    if (PHRASAL_OUTCOME_ALLOWANCES.some((p) => p[0] === bi[0] && p[1] === bi[1])) {
      return null;
    }
  }
  const normalizedVerbs = outputVerbs.map(normalize);
  // On regarde le premier ou les deux premiers tokens (cas "mettre en place").
  const first = tokens[0]!;
  const firstTwo = tokens.slice(0, 3).join(" ");
  for (const verb of normalizedVerbs) {
    if (verb === first || firstTwo.startsWith(verb + " ") || firstTwo === verb) {
      return verb;
    }
  }
  return null;
}

/** Détecte la présence de mots flous. Retourne la liste des mots flous trouvés. */
export function findFuzzyWords(text: string, fuzzyWords: string[]): string[] {
  const tokens = new Set(tokenize(text));
  const normalizedFuzzy = fuzzyWords.map(normalize);
  return normalizedFuzzy.filter((w) => tokens.has(w));
}

/** Détecte la présence d'au moins un nombre (entier, décimal, pourcentage). */
export function hasNumericThreshold(text: string): boolean {
  return /\d/.test(text);
}

/**
 * Détecte un "et" coordonnant deux résultats (heuristique simple).
 * Règle V1 stricte (voir DOMAINE.md §1.2 et point 7 du journal) : tout "et" entouré
 * d'espaces est considéré comme composite. Cas particuliers (énumérations type
 * "A, B et C" ou expressions figées) ne sont pas traités en V1 — assumé.
 */
export function looksComposite(text: string): boolean {
  const normalized = normalize(text);
  // On cherche " et " entouré d'espaces ; on tolère un "et" en début ou fin de phrase.
  return / et /.test(normalized);
}
