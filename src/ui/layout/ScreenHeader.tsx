/**
 * En-tête d'écran sticky — eyebrow + titre + lede + actions secondaires.
 * Voir D17 (audit UI structurelle).
 */

import type { ReactNode } from "react";

interface Props {
  eyebrow?: ReactNode;
  title: string;
  lede?: string;
  actions?: ReactNode;
}

export function ScreenHeader({ eyebrow, title, lede, actions }: Props) {
  return (
    <header className="screen-header">
      <div className="screen-header__main">
        {eyebrow && <div className="screen-header__eyebrow">{eyebrow}</div>}
        <h2 className="screen-header__title">{title}</h2>
        {lede && <p className="screen-header__lede">{lede}</p>}
      </div>
      {actions && <div className="screen-header__actions">{actions}</div>}
    </header>
  );
}
