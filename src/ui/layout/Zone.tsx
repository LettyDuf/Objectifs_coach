/**
 * Zone d'écran — primary / context / result.
 * Voir D17 (audit UI structurelle).
 */

import type { ElementType, ReactNode } from "react";

type Variant = "primary" | "context" | "result";

interface Props {
  variant: Variant;
  as?: ElementType;
  title?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  "aria-label"?: string;
}

export function Zone({
  variant,
  as: Component = variant === "context" ? "aside" : "section",
  title,
  meta,
  actions,
  children,
  "aria-label": ariaLabel,
}: Props) {
  const cls = `zone zone--${variant}`;
  return (
    <Component className={cls} aria-label={ariaLabel}>
      {(title || meta || actions) && (
        <div className="zone__header">
          {title && <h3 className="zone__title">{title}</h3>}
          {meta && <span className="zone__meta">{meta}</span>}
          {actions}
        </div>
      )}
      {children}
    </Component>
  );
}
