/**
 * Façade Screen — compose ScreenHeader + ScreenBody + ScreenActions dans un Frame.
 * Voir D17 (audit UI structurelle).
 *
 * Pour les écrans simples : passer header + body. Pour les écrans avec toolbar :
 * passer aussi actions.
 */

import type { ReactNode } from "react";
import { ScreenHeader } from "./ScreenHeader";
import { ScreenBody } from "./ScreenBody";
import { ScreenActions } from "./ScreenActions";

interface ScreenProps {
  header: {
    eyebrow?: ReactNode;
    title: string;
    lede?: string;
    actions?: ReactNode;
  };
  body: {
    variant?: "single" | "rail" | "wide-rail" | "source-aside";
    primary: ReactNode;
    context?: ReactNode;
  };
  actions?: {
    left?: ReactNode;
    status?: ReactNode;
    right?: ReactNode;
  };
}

export function Screen({ header, body, actions }: ScreenProps) {
  return (
    <div className="screen-frame">
      <ScreenHeader {...header} />
      <ScreenBody {...body} />
      {actions && <ScreenActions {...actions} />}
    </div>
  );
}
