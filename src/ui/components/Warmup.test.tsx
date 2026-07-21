import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Warmup } from "./Warmup";
import type { WarmupCase } from "../../domain/warmup";

const OUT: WarmupCase = { id: "o", prompt: "« PROMPT_OUT »", expected: "output", feedbackGood: "GOOD_OUT", feedbackAsk: "ASK_OUT" };
const OC: WarmupCase = { id: "c", prompt: "« PROMPT_OC »", expected: "outcome", feedbackGood: "GOOD_OC", feedbackAsk: "ASK_OC" };
const CP: WarmupCase = { id: "p", prompt: "« PROMPT_CP »", expected: "complete", feedbackGood: "GOOD_CP", feedbackAsk: "ASK_CP", completePrompt: "QUESTION_CP" };

describe("Warmup (refonte, une phrase à la fois)", () => {
  it("montre le déclic : les deux mots traduits", () => {
    render(<Warmup cases={[OUT]} />);
    expect(screen.getByText("ce que ça donne")).toBeInTheDocument();
    expect(screen.getByText(/déplacer son regard/i)).toBeInTheDocument();
    expect(screen.getByText(/le résultat visé peut-il quand même/i)).toBeInTheDocument();
  });

  it("montre une phrase et trois choix", () => {
    render(<Warmup cases={[OUT]} />);
    expect(screen.getByText("« PROMPT_OUT »")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Output/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Outcome/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /À compléter/ })).toBeInTheDocument();
  });

  it("bonne réponse : rétroaction positive, sans score", async () => {
    const user = userEvent.setup();
    render(<Warmup cases={[OUT]} />);
    await user.click(screen.getByRole("button", { name: /Output/ }));
    expect(screen.getByText("GOOD_OUT")).toBeInTheDocument();
    expect(screen.queryByText(/\d+\s*\/\s*\d+/)).not.toBeInTheDocument();
  });

  it("mauvaise réponse : une question, pas un verdict", async () => {
    const user = userEvent.setup();
    render(<Warmup cases={[OUT]} />);
    await user.click(screen.getByRole("button", { name: /Outcome/ }));
    expect(screen.getByText("ASK_OUT")).toBeInTheDocument();
  });

  it("« À compléter » ouvre le champ de mesure", async () => {
    const user = userEvent.setup();
    render(<Warmup cases={[CP]} />);
    await user.click(screen.getByRole("button", { name: /À compléter/ }));
    expect(screen.getByText("QUESTION_CP")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("« Phrase suivante » passe à une autre phrase", async () => {
    const user = userEvent.setup();
    render(<Warmup cases={[OUT, OC]} />);
    await user.click(screen.getByRole("button", { name: /Output/ }));
    await user.click(screen.getByRole("button", { name: /Phrase suivante/ }));
    expect(screen.queryByRole("button", { name: /Phrase suivante/ })).not.toBeInTheDocument();
  });

  it("rend le endSlot", () => {
    render(<Warmup cases={[OUT]} endSlot={<div data-testid="end-slot" />} />);
    expect(screen.getByTestId("end-slot")).toBeInTheDocument();
  });
});
