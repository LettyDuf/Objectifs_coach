import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Warmup } from "./Warmup";
import type { WarmupCase } from "../../domain/warmup";

const CASES: WarmupCase[] = [
  {
    id: "t.out",
    prompt: "« Migrer la base. »",
    expected: "output",
    feedbackGood: "GOOD_OUT",
    feedbackAsk: "ASK_OUT",
  },
  {
    id: "t.oc",
    prompt: "« Réponse en 2 secondes. »",
    expected: "outcome",
    feedbackGood: "GOOD_OC",
    feedbackAsk: "ASK_OC",
  },
  {
    id: "t.cp",
    prompt: "« Sécuriser. »",
    expected: "complete",
    feedbackGood: "GOOD_CP",
    feedbackAsk: "ASK_CP",
    completePrompt: "QUESTION_COMPLETE",
  },
];

function item(id: string) {
  return within(screen.getByTestId("warmup-item-" + id));
}

describe("Warmup (refonte)", () => {
  it("montre le déclic : les deux mots traduits", () => {
    render(<Warmup cases={CASES} />);
    expect(screen.getByText("ce que ça donne")).toBeInTheDocument();
    expect(screen.getByText(/déplacer son regard/i)).toBeInTheDocument();
    expect(screen.getByText(/le résultat visé peut-il quand même/i)).toBeInTheDocument();
  });

  it("montre les phrases à trier", () => {
    render(<Warmup cases={CASES} />);
    expect(screen.getByText(/Migrer la base/)).toBeInTheDocument();
    expect(screen.getByText(/Sécuriser/)).toBeInTheDocument();
  });

  it("montre la bonne rétroaction quand on trie juste", async () => {
    const user = userEvent.setup();
    render(<Warmup cases={CASES} />);
    await user.click(item("t.out").getByRole("button", { name: /^Output/ }));
    expect(screen.getByText("GOOD_OUT")).toBeInTheDocument();
  });

  it("montre une question, sans score, quand on se trompe", async () => {
    const user = userEvent.setup();
    render(<Warmup cases={CASES} />);
    await user.click(item("t.out").getByRole("button", { name: /^Outcome/ }));
    expect(screen.getByText("ASK_OUT")).toBeInTheDocument();
    expect(screen.queryByText(/\d+\s*\/\s*\d+/)).not.toBeInTheDocument();
  });

  it("le bac « À compléter » ouvre le champ de mesure", async () => {
    const user = userEvent.setup();
    render(<Warmup cases={CASES} />);
    await user.click(item("t.cp").getByRole("button", { name: /À compléter/ }));
    expect(screen.getByText("QUESTION_COMPLETE")).toBeInTheDocument();
    expect(item("t.cp").getByRole("textbox")).toBeInTheDocument();
  });

  it("rend le endSlot", () => {
    render(<Warmup cases={CASES} endSlot={<div data-testid="end-slot" />} />);
    expect(screen.getByTestId("end-slot")).toBeInTheDocument();
  });
});
