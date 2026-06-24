/**
 * Corps d'écran — 4 variantes de grille.
 * Voir D17 (audit UI structurelle).
 */

import type { ReactNode } from "react";

type Variant = "single" | "rail" | "wide-rail" | "source-aside";

interface Props {
  variant?: Variant;
  primary: ReactNode;
  context?: ReactNode;
}

export function ScreenBody({ variant = "rail", primary, context }: Props) {
  const cls = `screen-body screen-body--${variant}`;
  return (
    <div className={cls}>
      {primary}
      {context}
    </div>
  );
}
