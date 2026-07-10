/**
 * Quiz d'échauffement output/outcome — domaine.
 *
 * Pédagogie : un cas est soit un *verbe pur* (niveau 1, le verbe seul donne déjà
 * une orientation forte), soit un *mini-objectif* (niveau 2, le contexte tranche
 * et peut renverser ce que le verbe seul suggérerait).
 */

export type WarmupKind = "verb" | "objective";

/**
 * Réponse possible d'un cas de Warmup.
 * - "output" / "outcome" : le classement classique.
 * - "depends" : réservé aux verbes ambigus de niveau 1 (« stabiliser »,
 *   « sécuriser »...) qui promettent un changement sans dire comment on le
 *   constatera. Le verbe seul ne permet pas de trancher : c'est le contexte
 *   qui décide. Au niveau 2 (mini-objectifs), le contexte est donné, la
 *   réponse redevient binaire ; aucun cas de niveau 2 ne doit porter "depends".
 */
export type WarmupAnswer = "output" | "outcome" | "depends";

export interface WarmupCase {
  /** Identifiant stable, utile pour analytics / tests. */
  id: string;
  /** Niveau de difficulté : 1 = verbe pur, 2 = mini-objectif avec contexte. */
  level: 1 | 2;
  /** Type du cas (verbe seul ou phrase). */
  kind: WarmupKind;
  /** Ce qui est présenté à l'utilisateur. */
  prompt: string;
  /** La bonne réponse ("depends" autorisé uniquement si kind === "verb"). */
  expected: WarmupAnswer;
  /** Explication courte qui s'affiche après la réponse, pour mémoriser la règle. */
  explanation: string;
}
