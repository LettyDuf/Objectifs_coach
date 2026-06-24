/**
 * Boutons d'export — Markdown, JSON, copie dans le presse-papier.
 *
 * L'effet de bord "copier" est ici (UI) et non dans l'adaptateur (qui reste pur).
 * Téléchargement de fichier déclenché via un Blob temporaire.
 */

import { useState } from "react";
import type { EvaluationResult, ObjectiveDraft } from "../../domain/types";
import { toJson, toMarkdown } from "../../adapters/export";

interface Props {
  draft: ObjectiveDraft;
  result: EvaluationResult;
}

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function ExportPanel({ draft, result }: Props) {
  const [feedback, setFeedback] = useState<string | null>(null);

  function flash(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2500);
  }

  function handleCopy() {
    const text = toMarkdown(draft, result);
    navigator.clipboard
      .writeText(text)
      .then(() => flash("Copié dans le presse-papier (format Markdown)."))
      .catch(() => flash("Impossible d'accéder au presse-papier — utilise un export à la place."));
  }

  function handleMarkdown() {
    const text = toMarkdown(draft, result);
    downloadFile("objectif.md", text, "text/markdown;charset=utf-8");
    flash("Fichier .md téléchargé.");
  }

  function handleJson() {
    const text = toJson(draft, result);
    downloadFile("objectif.json", text, "application/json;charset=utf-8");
    flash("Fichier .json téléchargé.");
  }

  return (
    <div>
      <div className="export-panel" role="group" aria-label="Options d'export">
        <button className="btn" onClick={handleCopy}>
          Copier (Markdown)
        </button>
        <button className="btn" onClick={handleMarkdown}>
          Télécharger .md
        </button>
        <button className="btn" onClick={handleJson}>
          Télécharger .json
        </button>
      </div>
      {/* Live region persistante (S6 audit a11y) : toujours dans le DOM,
          seul le contenu textuel change pour que les lecteurs d'écran l'annoncent. */}
      <p className="export-panel__feedback" role="status" aria-live="polite" aria-atomic="true">
        {feedback ?? ""}
      </p>
    </div>
  );
}
