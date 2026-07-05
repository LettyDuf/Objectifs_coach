/**
 * Écran « Analyser un objectif » — diagnostic textuel honnête.
 *
 * Refonte 2026-06-27 : l'analyse n'utilise plus coach.evaluate avec des valeurs
 * par défaut factices (confidence=80, hasExplicitDeadline=true, etc.) qui
 * produisaient des faux positifs ridicules sur des objectifs sans échéance.
 *
 * Le diagnostic n'évalue désormais QUE ce qui est détectable dans le texte :
 *   - le verbe d'attaque est-il un verbe d'output ?
 *   - le texte contient-il au moins un chiffre (seuil mesurable) ?
 *   - le texte contient-il une échéance bornée ?
 *   - le texte contient-il des mots flous ?
 *
 * Pas de score global, pas de « verdict » normatif sur des dimensions non
 * évaluables sans interaction (ambition crédible, sous influence de l'équipe).
 */

import { useMemo, useState } from "react";

import type { ObjectiveType } from "../../domain/types";
import { audienceForType, relatedTypesFor } from "../../domain/types";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { HEURISTICS_FR } from "../../content/heuristics.fr";
import { createContentRepository } from "../../content/repository";

interface Props {
  initialType: ObjectiveType;
  onTypeChange: (type: ObjectiveType) => void;
  onExit: () => void;
}

const TYPE_LABELS: Record<ObjectiveType, string> = {
  sprint: "Sprint",
  pi: "Program Increment",
  "okr-equipe": "OKR équipe",
  "okr-entreprise": "OKR entreprise",
};



const PLACEHOLDER: Record<ObjectiveType, string> = {
  sprint:
    "Ex. Réduire de 50 % le taux d'abandon au paiement sur mobile d'ici la fin du sprint 24.",
  pi: "Ex. Faire passer le NPS clients entreprise de 28 à 50 d'ici la revue de PI.",
  "okr-equipe":
    "Colle un Résultat clé mesurable. Ex. Faire passer le taux d'activation SSO de 40 à 80 % d'ici fin Q3.",
  "okr-entreprise":
    "Colle un Résultat clé entreprise mesurable. Ex. Faire passer le NPS entreprise de 18 à 40 d'ici la fin de l'année.",
};

const repo = createContentRepository();

/** Patterns d'échéance bornée que l'on sait reconnaître dans le texte. */
const TIME_BOUNDED_PATTERNS: RegExp[] = [
  /\bd['']ici\b/i,
  /\bavant\b/i,
  /\bfin\s+d[ue]s?\b/i,
  /\bsprint\s+\d+/i,
  /\b(p|P)I\s+(R|r)eview\b/i,
  /\bla\s+r[ée]tro(spective)?\b/i,
  /\bla\s+(prochaine\s+)?d[ée]mo\b/i,
  /\b(Q|T)[1-4]\b/,
  /\bfin\s+du\s+(mois|trimestre|sprint|PI|cycle)\b/i,
  /\bdans\s+\d+\s+(jours?|semaines?|mois)\b/i,
  /\bd['']ici\s+\d+/i,
  /\b\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\b/i,
];

/** Patterns d'échéance floue à signaler explicitement. */
const TIME_FUZZY_PATTERNS: RegExp[] = [
  /\bbient[ôo]t\b/i,
  /\bd[èe]s\s+que\s+possible\b/i,
  /\bun\s+jour\b/i,
  /\bplus\s+tard\b/i,
  /\b[àa]\s+terme\b/i,
  /\bdans\s+l['']avenir\b/i,
  /\brapidement\b/i,
];

/** Analyse textuelle pure — pas de coach.evaluate, pas de défauts factices. */
export interface TextDiagnostic {
  text: string;
  trimmed: string;
  /** Verbe d'attaque détecté comme un output (livraison) ? */
  outputVerbDetected: string | null;
  /** Présence d'au moins un nombre dans le texte. */
  hasNumber: boolean;
  /** Une échéance bornée a été reconnue. */
  hasBoundedTime: boolean;
  /** Une échéance floue a été détectée (ex. « bientôt »). */
  fuzzyTimeDetected: string | null;
  /** Liste des mots flous présents dans le texte. */
  fuzzyWords: string[];
  /** Bénéficiaire détecté (« pour les … ») ou null si absent. */
  beneficiaryDetected: string | null;
  /** Abréviations professionnelles familières détectées (prod, dev, perf…). */
  jargonDetected: string[];
}

export function analyseText(raw: string): TextDiagnostic {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();

  // Verbe d'attaque : on regarde si le texte commence par un output verb connu.
  let outputVerbDetected: string | null = null;
  for (const verb of HEURISTICS_FR.outputVerbs) {
    const re = new RegExp("^" + verb.replace(/'/g, "['']"), "i");
    if (re.test(trimmed)) {
      outputVerbDetected = verb;
      break;
    }
  }

  // Nombre quelconque (entier, décimal, pourcentage, heure)
  const hasNumber = /\d/.test(trimmed);

  // Échéance bornée
  const hasBoundedTime = TIME_BOUNDED_PATTERNS.some((p) => p.test(trimmed));

  // Échéance floue
  let fuzzyTimeDetected: string | null = null;
  for (const p of TIME_FUZZY_PATTERNS) {
    const m = trimmed.match(p);
    if (m) {
      fuzzyTimeDetected = m[0];
      break;
    }
  }

  // Mots flous (hors « améliorer » qui est aussi un output verb — on ne le compte pas deux fois).
  // Le \b de JS ne couvre pas les caractères accentués (qualité, échec, etc.) ;
  // on encadre donc par lookaround : début/fin de chaîne ou séparateur non-alphanumérique.
  const fuzzyWords = HEURISTICS_FR.fuzzyWords.filter((w) => {
    const re = new RegExp("(?:^|[^a-zàâäéèêëïîôöùûüç])" + w + "(?=$|[^a-zàâäéèêëïîôöùûüç])", "i");
    return re.test(lower);
  });

  // Bénéficiaire : on cherche "pour" + déterminant + un mot/nom (clients, équipe, utilisateurs…).
  // Liste non exhaustive : c'est un signal, pas une preuve absolue de bénéficiaire.
  const benefMatch = trimmed.match(
    /\bpour\s+(les?|la|l['']|des|nos|notre|tous?\s+les?|chaque)\s+([a-zàâäéèêëïîôöùûüç\-]+(?:\s+[a-zàâäéèêëïîôöùûüç\-]+){0,3})/i
  );
  const beneficiaryDetected = benefMatch ? `pour ${benefMatch[1]} ${benefMatch[2]}` : null;

  // Abréviations professionnelles familières qui mériteraient d'être explicitées en atelier
  const jargonList = ["prod", "dev", "preprod", "recette", "perf", "ci", "cd", "qa", "ux", "ui", "ops", "po", "rte"];
  const jargonDetected = jargonList.filter((w) => {
    const re = new RegExp("\\b" + w + "\\b", "i");
    return re.test(trimmed);
  });

  return {
    text: raw,
    trimmed,
    outputVerbDetected,
    hasNumber,
    hasBoundedTime,
    fuzzyTimeDetected,
    fuzzyWords,
    beneficiaryDetected,
    jargonDetected,
  };
}

export function Analyse({ initialType, onTypeChange, onExit }: Props) {
  const [type, setType] = useState<ObjectiveType>(initialType);
  const availableTypes = useMemo(() => relatedTypesFor(initialType), [initialType]);
  const [text, setText] = useState<string>("");
  const [analyzed, setAnalyzed] = useState<boolean>(false);

  function changeType(next: ObjectiveType) {
    setType(next);
    setAnalyzed(false);
    onTypeChange(next);
  }

  function reset() {
    setText("");
    setAnalyzed(false);
  }

  const diag: TextDiagnostic | null = useMemo(() => {
    if (!analyzed || text.trim().length === 0) return null;
    return analyseText(text);
  }, [analyzed, text]);

  /** Pistes de réécriture par catégorie, puisées dans le corpus puzzle. */
  const pistes = useMemo(() => buildPistes(type), [type]);

  const canAnalyze = text.trim().length > 0;

  return (
    <Screen
      header={{
        eyebrow: <span>{TYPE_LABELS[type]} · Analyser</span>,
        title: "Analyser un objectif",
        lede:
          "Colle un objectif déjà rédigé. L'outil te dit ce qu'il sait détecter dans le texte. Il ne juge pas ce qu'il ne peut pas voir.",
        actions:
          availableTypes.length > 1 ? (
            <fieldset className="analyse-type-toggle">
              <legend className="sr-only">Type d'objectif</legend>
              {availableTypes.map((t) => (
                <label key={t} className="field__check" style={{ marginBottom: 0 }}>
                  <input
                    type="radio"
                    name="analyse-type"
                    checked={type === t}
                    onChange={() => changeType(t)}
                  />
                  <span>{TYPE_LABELS[t]}</span>
                </label>
              ))}
            </fieldset>
          ) : undefined,
      }}
      body={{
        variant: "single",
        primary: (
          <Zone variant="primary">
            <div className="analyse-input">
              <label htmlFor="analyse-textarea" className="analyse-input__label">
                Ton objectif <span className="analyse-input__hint">Appuie sur Entrée pour analyser (Maj+Entrée pour une nouvelle ligne)</span>
              </label>
              <textarea
                id="analyse-textarea"
                className="analyse-input__textarea"
                placeholder={PLACEHOLDER[type]}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (analyzed) setAnalyzed(false);
                }}
                onKeyDown={(e) => {
                  // Entrée = lance l'analyse. Maj+Entrée = nouvelle ligne.
                  if (e.key === "Enter" && !e.shiftKey && text.trim().length > 0) {
                    e.preventDefault();
                    setAnalyzed(true);
                  }
                }}
                rows={4}
              />
            </div>

            {diag && <DiagnosticReport diag={diag} pistes={pistes} />}
          </Zone>
        ),
      }}
      actions={{
        left: (
          <button className="btn" onClick={onExit}>
            Quitter
          </button>
        ),
        status: (
          <span className="composer-status">
            {!canAnalyze
              ? "Colle un objectif pour lancer l'analyse."
              : !analyzed
                ? "Prêt à analyser."
                : "Analyse à jour."}
          </span>
        ),
        right: (
          <div className="composer-actions">
            <button
              type="button"
              className="btn"
              onClick={reset}
              disabled={text.length === 0}
            >
              Effacer
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setAnalyzed(true)}
              disabled={!canAnalyze}
            >
              Analyser
            </button>
          </div>
        ),
      }}
    />
  );
}

// ============================================================
// Rendu du diagnostic textuel
// ============================================================

interface CheckItem {
  status: "ok" | "warn" | "bad";
  label: string;
  message: string;
  pistesKey?: keyof typeof PISTES_LABELS;
}

const PISTES_LABELS = {
  verbe: "Verbes d'effet",
  echeance: "Échéances bornées",
} as const;

function buildChecks(diag: TextDiagnostic): CheckItem[] {
  const checks: CheckItem[] = [];

  // 1) Verbe d'attaque
  if (diag.outputVerbDetected) {
    checks.push({
      status: "bad",
      label: "Verbe d'effet (outcome)",
      message: `Ton objectif commence par « ${diag.outputVerbDetected} » : c'est un verbe de livraison (output). Reformule en décrivant l'effet qui aura changé après.`,
      pistesKey: "verbe",
    });
  } else {
    checks.push({
      status: "ok",
      label: "Verbe d'effet (outcome)",
      message: "Le verbe d'attaque n'est pas un verbe de livraison reconnu. Bon départ.",
    });
  }

  // 2) Seuil chiffré
  if (diag.hasNumber) {
    checks.push({
      status: "ok",
      label: "Seuil chiffré",
      message: "Le texte contient au moins un chiffre — un seuil est posé.",
    });
  } else {
    checks.push({
      status: "bad",
      label: "Seuil chiffré",
      message: "Aucun chiffre dans le texte. Sans seuil, on ne peut pas dire objectivement si l'objectif est atteint.",
    });
  }

  // 3) Échéance
  if (diag.fuzzyTimeDetected) {
    checks.push({
      status: "bad",
      label: "Échéance bornée",
      message: `Le texte contient « ${diag.fuzzyTimeDetected} » : c'est une échéance floue. Remplace par une date, un sprint nommé, ou un événement Scrum/SAFe.`,
      pistesKey: "echeance",
    });
  } else if (diag.hasBoundedTime) {
    checks.push({
      status: "ok",
      label: "Échéance bornée",
      message: "Une échéance reconnaissable est précisée.",
    });
  } else {
    checks.push({
      status: "warn",
      label: "Échéance bornée",
      message: "Aucune échéance reconnue dans le texte. Si tu en as une en tête, ajoute-la (« d'ici la fin du sprint », « avant le 30 avril »).",
      pistesKey: "echeance",
    });
  }

  // 4) Mots flous
  if (diag.fuzzyWords.length > 0) {
    checks.push({
      status: "warn",
      label: "Mots flous détectés",
      message: `Le texte contient des mots vagues (${diag.fuzzyWords.map((w) => `« ${w} »`).join(", ")}). Préfère un terme précis et mesurable.`,
    });
  }

  // 5) Bénéficiaire détectable
  if (diag.beneficiaryDetected) {
    checks.push({
      status: "ok",
      label: "Bénéficiaire identifié",
      message: `Un bénéficiaire est mentionné dans le texte (${diag.beneficiaryDetected}).`,
    });
  } else {
    checks.push({
      status: "warn",
      label: "Bénéficiaire absent",
      message: "Aucun bénéficiaire n'est nommé. Pour qui cet objectif aura-t-il un effet ? Ajoute « pour les clients X », « pour l'équipe Y ».",
    });
  }

  // 6) Abréviations / langage familier
  if (diag.jargonDetected.length > 0) {
    checks.push({
      status: "warn",
      label: "Abréviations à expliciter",
      message: `Le texte contient des raccourcis du jargon métier (${diag.jargonDetected.map((w) => `« ${w} »`).join(", ")}). En atelier, mieux vaut écrire en clair pour que tout le monde comprenne (« production », « développement »…).`,
    });
  }

  return checks;
}

function DiagnosticReport({
  diag,
  pistes,
}: {
  diag: TextDiagnostic;
  pistes: Record<keyof typeof PISTES_LABELS, string[]>;
}) {
  const checks = buildChecks(diag);
  const failing = checks.filter((c) => c.status !== "ok");
  const passing = checks.filter((c) => c.status === "ok");

  return (
    <section className="analyse-diagnostic" aria-live="polite">
      <div className="analyse-honesty">
        <span className="analyse-honesty__label">Note</span>
        <p className="analyse-honesty__text">
          Cette analyse ne porte que sur ce qui est <strong>écrit dans le texte</strong>. Elle ne juge pas l'ambition, le calibrage,
          ni si le résultat est vraiment sous l'influence de ton équipe — ce sont des dimensions qui ne se voient pas dans la formulation seule.
        </p>
      </div>

      {failing.length > 0 && (
        <section>
          <h3 className="analyse-section-title">
            {failing.length === 1 ? "1 chose à corriger" : `${failing.length} choses à corriger`}
          </h3>
          <ul className="analyse-criteria">
            {failing.map((c, i) => {
              const list = c.pistesKey ? pistes[c.pistesKey] : null;
              return (
                <li
                  key={i}
                  className={`analyse-criterion analyse-criterion--${c.status}`}
                >
                  <div className="analyse-criterion__head">
                    <span className="analyse-criterion__num">{i + 1}</span>
                    <span className="analyse-criterion__label">{c.label}</span>
                  </div>
                  <p className="analyse-criterion__message">{c.message}</p>
                  {list && list.length > 0 && (
                    <p className="analyse-criterion__pistes">
                      <span className="analyse-criterion__pistes-label">Pistes :</span>{" "}
                      {list.slice(0, 4).join(", ")}.
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {passing.length > 0 && (
        <section>
          <h3 className="analyse-section-title">
            {passing.length === 1 ? "1 chose qui tient" : `${passing.length} choses qui tiennent`}
          </h3>
          <ul className="analyse-criteria analyse-criteria--passing">
            {passing.map((c, i) => (
              <li key={i} className="analyse-criterion analyse-criterion--good">
                <div className="analyse-criterion__head">
                  <span className="analyse-criterion__check" aria-hidden="true">✓</span>
                  <span className="analyse-criterion__label">{c.label}</span>
                </div>
                <p className="analyse-criterion__message">{c.message}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}

function buildPistes(type: ObjectiveType): Record<keyof typeof PISTES_LABELS, string[]> {
  const set = repo.getPuzzleSet(type, audienceForType(type), "hard");
  if (!set) return { verbe: [], echeance: [] };
  const goods = (cat: "action" | "timeReference") =>
    set.blocksByCategory[cat]
      .filter((b) => b.quality === "good")
      .map((b) => (b.kind === "text" ? b.text : b.template))
      .filter((s) => s.length > 0);
  return {
    verbe: goods("action").slice(0, 4),
    echeance: goods("timeReference").slice(0, 4),
  };
}
