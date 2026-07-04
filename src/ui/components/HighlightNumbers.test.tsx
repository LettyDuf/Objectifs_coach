/**
 * Tests de HighlightNumbers — vérifie que les valeurs chiffrées sont bien
 * isolées dans un <strong> distinct, sans casser les identifiants type "p95".
 */

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HighlightNumbers } from "./HighlightNumbers";

function strongTexts(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("strong.quiz-feedback__highlight")).map(
    (el) => el.textContent ?? "",
  );
}

describe("HighlightNumbers", () => {
  it("isole un pourcentage et une durée dans des <strong> distincts", () => {
    const { container } = render(
      <HighlightNumbers text="Permettre à 80 % des utilisateurs de finir en moins de 90 secondes." />,
    );
    expect(strongTexts(container)).toEqual(["80 %", "90 secondes"]);
  });

  it("isole un ratio (x / y) en un seul bloc", () => {
    const { container } = render(<HighlightNumbers text="Atteindre un CSAT moyen de 3,2 / 5." />);
    expect(strongTexts(container)).toEqual(["3,2 / 5"]);
  });

  it("ne coupe pas un identifiant technique du type p95", () => {
    const { container } = render(
      <HighlightNumbers text="Faire passer le p95 de 850 ms à 400 ms." />,
    );
    expect(strongTexts(container)).toEqual(["850 ms", "400 ms"]);
    expect(container.textContent).toContain("p95");
  });

  it("ne met rien en évidence quand le texte n'a aucun chiffre", () => {
    const { container } = render(<HighlightNumbers text="Aucune valeur chiffrée ici." />);
    expect(strongTexts(container)).toEqual([]);
    expect(container.textContent).toBe("Aucune valeur chiffrée ici.");
  });
});
