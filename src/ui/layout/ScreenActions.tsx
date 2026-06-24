/**
 * Barre d'actions sticky bas — tertiaire gauche / statut centre / primaire droite.
 * Voir D17 (audit UI structurelle).
 *
 * Convention :
 *   - gauche : actions tertiaires (« Quitter », « Vider »).
 *   - centre : statut compact (score, compteur). Peut rester vide.
 *   - droite : actions primaires (« Suivant », « Exporter »). Le CTA principal va ici.
 */

import type { ReactNode } from "react";

interface Props {
  left?: ReactNode;
  status?: ReactNode;
  right?: ReactNode;
}

export function ScreenActions({ left, status, right }: Props) {
  return (
    <div className="screen-actions" role="toolbar" aria-label="Actions de l'écran">
      <div className="screen-actions__left">{left}</div>
      <div className="screen-actions__center">{status}</div>
      <div className="screen-actions__right">{right}</div>
    </div>
  );
}
