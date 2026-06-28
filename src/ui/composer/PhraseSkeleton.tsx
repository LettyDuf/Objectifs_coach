/**
 * Squelette de phrase à trous du Composer (D25).
 *
 * Chaque "Bond" est une pill inline soulignée d'un trait coloré 3 px de la
 * couleur de catégorie. Vides en italique muted, remplies en couleur. Pattern
 * aligné sur `.bricks__phrase--skeleton` des fiches théoriques.
 *
 * Extrait de Puzzle.tsx le 2026-06-27 (P2 modularisation).
 */

import type { PlacedBlock, SlotKey } from "../../domain/puzzle/types";
import { SLOT_LABELS } from "../../domain/puzzle/types";
import { renderTemplateWithInputs } from "./templateField";

/** Libellés courts affichés dans les pills vides (italique muted dans la phrase). */
const SLOT_INLINE_HINTS: Record<SlotKey, string> = {
  intention: "verbe",
  mesure: "indicateur",
  cible: "écart",
  horizon: "échéance",
  contexte: "contexte",
  liaison: "liaison",
};

export function PhraseSkeleton({
  placedBySlot,
  onRemove,
  onUpdateField,
}: {
  placedBySlot: Map<SlotKey, PlacedBlock>;
  onRemove: (slot: SlotKey) => void;
  onUpdateField: (slot: SlotKey, fieldIndex: number, value: string) => void;
}) {
  const liaisonOrphan =
    placedBySlot.has("liaison") && !placedBySlot.has("horizon");
  // Ordre d'affichage : suit l'ordre canonique de lecture (SLOT_ORDER).
  const orderedSlots: SlotKey[] = [
    "intention",
    "mesure",
    "cible",
    "contexte",
    "liaison",
    "horizon",
  ];
  return (
    <>
      {orderedSlots.map((slot) => {
        const placed = placedBySlot.get(slot) ?? null;
        const isBonus = slot === "contexte" || slot === "liaison";
        const isOrphan = slot === "liaison" && liaisonOrphan;
        return (
          <PhraseBond
            key={slot}
            slot={slot}
            placed={placed}
            bonus={isBonus}
            orphan={isOrphan}
            onRemove={() => onRemove(slot)}
            onUpdateField={(idx, val) => onUpdateField(slot, idx, val)}
          />
        );
      })}
    </>
  );
}

function PhraseBond({
  slot,
  placed,
  bonus,
  orphan,
  onRemove,
  onUpdateField,
}: {
  slot: SlotKey;
  placed: PlacedBlock | null;
  bonus: boolean;
  orphan: boolean;
  onRemove: () => void;
  onUpdateField: (fieldIndex: number, value: string) => void;
}) {
  const cls = [
    "puzzle-bond",
    `puzzle-bond--${slot}`,
    placed ? "is-filled" : "is-empty",
    bonus ? "puzzle-bond--bonus" : "",
    placed && placed.block.quality === "distractor" ? "is-trap" : "",
    orphan ? "is-orphan" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!placed) {
    return (
      <span className={cls} aria-label={`Zone à remplir : ${SLOT_LABELS[slot]}`}>
        <span className="puzzle-bond__placeholder">
          {SLOT_INLINE_HINTS[slot]}
          {bonus ? " (optionnel)" : ""}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cls}
      aria-label={`${SLOT_LABELS[slot]} : ${placed.block.kind === "text" ? placed.block.text : placed.block.template}`}
      title={orphan ? "Cette liaison attend une échéance à droite." : undefined}
    >
      {placed.block.quality === "distractor" && (
        <span className="puzzle-bond__trap" aria-label="Carte à risque" title="Cette carte est probablement un piège pédagogique.">
          !
        </span>
      )}
      <span className="puzzle-bond__text">
        {placed.block.kind === "text"
          ? placed.block.text
          : renderTemplateWithInputs(
              placed.block.template,
              placed.block.fieldCount,
              placed.values,
              onUpdateField,
            )}
      </span>
      <button
        type="button"
        className="puzzle-bond__remove"
        aria-label={`Retirer la carte de la zone ${SLOT_LABELS[slot]}`}
        onClick={onRemove}
      >
        ✕
      </button>
    </span>
  );
}
