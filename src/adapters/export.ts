/**
 * Adaptateur driven — sérialisation d'un objectif évalué vers les formats d'export.
 *
 * Fonctions pures : aucun accès au DOM ni au presse-papier ici (l'effet de bord
 * "copier" est appelé par l'UI, pas par cet adaptateur — séparation propre).
 *
 * Formats V1 : Markdown, JSON. Le presse-papier consomme la sortie Markdown ou JSON.
 */

import type { EvaluationResult, ObjectiveDraft } from "../domain/types";

const TYPE_LABELS: Record<ObjectiveDraft["type"], string> = {
  sprint: "Sprint",
  pi: "Program Increment",
  "okr-equipe": "OKR équipe",
  "okr-entreprise": "OKR entreprise",
};

function statusLabel(status: "good" | "warn" | "bad"): string {
  switch (status) {
    case "good":
      return "Solide";
    case "warn":
      return "À renforcer";
    case "bad":
      return "À reformuler";
  }
}

function statusIcon(status: "good" | "warn" | "bad"): string {
  return status === "good" ? "✓" : status === "warn" ? "⚠" : "✕";
}

/**
 * Sérialise vers du Markdown lisible (presse-papier, doc, mail, ticket).
 * Pas de dépendance à une lib Markdown : on génère du texte simple.
 */
export function toMarkdown(draft: ObjectiveDraft, result: EvaluationResult): string {
  const typeLabel = TYPE_LABELS[draft.type];
  const lines: string[] = [];
  lines.push(`# Objectif ${typeLabel}`);
  lines.push("");
  lines.push(`> ${draft.text || "(vide)"}`);
  lines.push("");
  lines.push(`**Score : ${result.score} / 100 — ${statusLabel(result.overallStatus)}**`);
  lines.push("");

  if (draft.confidence !== undefined) {
    lines.push(`- Confiance estimée : ${draft.confidence} %`);
  }
  if (draft.type === "pi") {
    lines.push(`- Classe : ${draft.piClass === "committed" ? "Committed" : "Stretch"}`);
    if (draft.businessValue !== undefined) {
      lines.push(`- Valeur business : ${draft.businessValue} / 10`);
    }
  }
  lines.push("");
  lines.push("## Diagnostic par critère");
  lines.push("");
  for (const c of result.criteria) {
    lines.push(`- ${statusIcon(c.status)} **${c.label}** — ${c.message}`);
  }
  lines.push("");
  lines.push(`_Généré par Coach Objectifs._`);
  return lines.join("\n");
}

/**
 * Sérialise vers JSON outillable.
 * Contient tout l'état de la session — exploitable par un script ou un import futur.
 */
export function toJson(draft: ObjectiveDraft, result: EvaluationResult): string {
  return JSON.stringify(
    {
      version: 1,
      generatedAt: new Date().toISOString(),
      draft,
      evaluation: result,
    },
    null,
    2,
  );
}
