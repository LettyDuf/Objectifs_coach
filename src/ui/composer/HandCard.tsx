/**
 * Carte de la main du Composer (D25/D26).
 *
 * Bouton cliquable qui pose la carte dans la zone correspondante du plateau.
 * Liseré coloré par catégorie. Picto risque visible sur les cartes-distracteur
 * (toutefois filtrées hors de la main depuis D26, présent ici par sécurité).
 *
 * Extrait de Puzzle.tsx le 2026-06-27 (P2 modularisation).
 */

import type { PuzzleBlock } from "../../domain/puzzle/types";

export function HandCard({
  block,
  onPlay,
}: {
  block: PuzzleBlock;
  onPlay: () => void;
}) {
  const label =
    block.kind === "text"
      ? block.text || "(vide)"
      : (block.handLabel ?? block.template);
  const isTrap = block.quality === "distractor";
  const isWrite = block.kind === "numericField" && block.fieldKind === "text";
  return (
    <button
      type="button"
      className={`puzzle-card puzzle-card--${block.category}${isTrap ? " puzzle-card--trap" : ""}${isWrite ? " puzzle-card--write" : ""}`}
      onClick={onPlay}
      aria-label={`Jouer la carte « ${label} »${isTrap ? " (carte à risque)" : ""}${isWrite ? " (tu écriras le texte toi-même)" : ""}`}
      title={
        isTrap
          ? "Carte à risque : pose-la si tu veux, l'outil signalera le piège."
          : isWrite
            ? "Tu écriras le texte toi-même, directement dans la phrase."
            : undefined
      }
    >
      {isTrap && (
        <span className="puzzle-card__trap" aria-hidden="true">
          !
        </span>
      )}
      {isWrite && (
        <span className="puzzle-card__write" aria-hidden="true">
          ✎
        </span>
      )}
      <span className="puzzle-card__text">{label}</span>
    </button>
  );
}
