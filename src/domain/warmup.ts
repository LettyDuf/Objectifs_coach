/**
 * Quiz d'échauffement output/outcome — domaine.
 *
 * Pédagogie : un cas est soit un *verbe pur* (niveau 1, le verbe seul donne déjà
 * une orientation forte), soit un *mini-objectif* (niveau 2, le contexte tranche
 * et peut renverser ce que le verbe seul suggérerait).
 */

export type WarmupKind = "verb" | "objective";
export type WarmupAnswer = "output" | "outcome";

export interface WarmupCase {
  /** Identifiant stable, utile pour analytics / tests. */
  id: string;
  /** Niveau de difficulté : 1 = verbe pur, 2 = mini-objectif avec contexte. */
  level: 1 | 2;
  /** Type du cas (verbe seul ou phrase). */
  kind: WarmupKind;
  /** Ce qui est présenté à l'utilisateur. */
  prompt: string;
  /** La bonne réponse. */
  expected: WarmupAnswer;
  /** Explication courte qui s'affiche après la réponse, pour mémoriser la règle. */
  explanation: string;
}
