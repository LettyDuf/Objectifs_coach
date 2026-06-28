/**
 * Tests comportementaux du Warmup (binaire output/outcome).
 *
 * Couvre les invariants clés :
 *   - skipIntro saute l'écran d'introduction et démarre directement le 1er cas
 *   - sélection révèle l'explication
 *   - endSlot apparaît bien après le bilan
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Warmup } from "./Warmup";
import type { WarmupCase } from "../../domain/warmup";

const CASES: WarmupCase[] = [
  {
    id: "t.1",
    level: 1,
    kind: "verb",
    prompt: "Livrer",
    expected: "output",
    explanation: "Livrer décrit ce qu'on produit. Output.",
  },
  {
    id: "t.2",
    level: 1,
    kind: "verb",
    prompt: "Réduire",
    expected: "outcome",
    explanation: "Réduire suppose un avant/après mesurable. Outcome.",
  },
];

describe("Warmup", () => {
  it("affiche l'écran intro par défaut (sans skipIntro)", () => {
    render(<Warmup cases={CASES} />);
    expect(screen.getByText(/Lancer l'échauffement/)).toBeInTheDocument();
  });

  it("skipIntro démarre directement en mode playing", () => {
    render(<Warmup cases={CASES} skipIntro />);
    // Pas d'écran intro, pas de bouton "Lancer"
    expect(screen.queryByText(/Lancer l'échauffement/)).not.toBeInTheDocument();
    // Boutons output / outcome présents
    expect(screen.getByText(/output/i)).toBeInTheDocument();
    expect(screen.getByText(/outcome/i)).toBeInTheDocument();
  });

  it("révèle l'explication après la sélection", async () => {
    const user = userEvent.setup();
    render(<Warmup cases={CASES} skipIntro />);
    // Cliquer le 1er bouton output ou outcome
    const choices = screen.getAllByRole("button");
    await user.click(choices[0]!);
    // Une des explications doit apparaître
    const expl = await screen.findByText(/décrit|suppose/i);
    expect(expl).toBeInTheDocument();
  });

  it("affiche le endSlot après avoir tout joué", async () => {
    const user = userEvent.setup();
    render(
      <Warmup
        cases={CASES}
        skipIntro
        endSlot={<div data-testid="end-slot">Suite</div>}
      />,
    );
    // Jouer les 2 cas
    for (let i = 0; i < 2; i++) {
      const allButtons = screen.getAllByRole("button");
      await user.click(allButtons[0]!);
      const next = await screen.findByText(/Suivant|Voir|terminé/i);
      // Pour le dernier, c'est "Voir le bilan" ; sinon "Suivant"
      if (next.textContent && /Voir|Suivant/.test(next.textContent)) {
        await user.click(next);
      }
    }
    expect(await screen.findByTestId("end-slot")).toBeInTheDocument();
  });
});
