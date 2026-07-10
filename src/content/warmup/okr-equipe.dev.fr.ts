/**
 * Corpus d'échauffement output/outcome — OKR équipe × dev × FR.
 *
 * 10 verbes purs (niveau 1) + 10 mini-KR à classer (niveau 2).
 * L'enjeu pédagogique pour OKR équipe : distinguer un Résultat clé (changement
 * mesurable à atteindre) d'un projet/livrable déguisé, et reconnaître le piège
 * de la health metric (« maintenir au-dessus de… »).
 *
 * L'ordre de présentation est randomisé à chaque lancement (composant Warmup).
 */

import type { WarmupCase } from "../../domain/warmup";

export const OKR_EQUIPE_DEV_WARMUP_FR: WarmupCase[] = [
  // ============================================================
  // Niveau 1 — verbes purs
  // ============================================================
  {
    id: "warmup.okr.l1.atteindre",
    level: 1,
    kind: "verb",
    prompt: "Atteindre",
    expected: "outcome",
    explanation:
      "« Atteindre » appelle une cible chiffrée à dépasser. Verbe outcome typique des KR.",
  },
  {
    id: "warmup.okr.l1.livrer",
    level: 1,
    kind: "verb",
    prompt: "Livrer",
    expected: "output",
    explanation:
      "« Livrer » décrit ce qu'on produit, pas le changement obtenu. Si un KR commence par « Livrer », c'est un Résultat clé projet.",
  },
  {
    id: "warmup.okr.l1.faire-passer",
    level: 1,
    kind: "verb",
    prompt: "Faire passer",
    expected: "outcome",
    explanation:
      "« Faire passer de X à Y » est la signature d'un KR : un avant, un après, un écart à creuser.",
  },
  {
    id: "warmup.okr.l1.implementer",
    level: 1,
    kind: "verb",
    prompt: "Implémenter",
    expected: "output",
    explanation:
      "« Implémenter » = activité technique pure. Aucun bénéficiaire, aucun changement mesurable. Output.",
  },
  {
    id: "warmup.okr.l1.reduire",
    level: 1,
    kind: "verb",
    prompt: "Réduire",
    expected: "outcome",
    explanation:
      "« Réduire » appelle un avant et un après. Verbe outcome qui structure bien un KR.",
  },
  {
    id: "warmup.okr.l1.convertir",
    level: 1,
    kind: "verb",
    prompt: "Convertir",
    expected: "outcome",
    explanation:
      "« Convertir N % de [population] en [état] » formule un KR de conversion : métrique nette, segment, état cible. Outcome.",
  },
  {
    id: "warmup.okr.l1.maintenir",
    level: 1,
    kind: "verb",
    prompt: "Maintenir",
    expected: "output",
    explanation:
      "Piège classique en OKR : « maintenir au-dessus de N » décrit un état à préserver, pas un changement à atteindre. C'est une health metric — pas un Résultat clé.",
  },
  {
    id: "warmup.okr.l1.installer",
    level: 1,
    kind: "verb",
    prompt: "Installer",
    expected: "output",
    explanation:
      "Décrit l'installation d'un dispositif. Le dispositif est un moyen pour faire bouger une métrique — c'est cette dernière qui est un KR.",
  },
  {
    id: "warmup.okr.l1.multiplier",
    level: 1,
    kind: "verb",
    prompt: "Multiplier",
    expected: "outcome",
    explanation:
      "« Multiplier par N » force à nommer la métrique et le facteur. Verbe outcome qui structure un KR ambitieux.",
  },
  {
    id: "warmup.okr.l1.documenter",
    level: 1,
    kind: "verb",
    prompt: "Documenter",
    expected: "output",
    explanation:
      "Documenter est une activité de production. Le KR serait l'effet attendu : équipes autonomes, tickets « comment faire » divisés, time-to-onboard raccourci…",
  },
  {
    id: "warmup.okr.l1.simplifier",
    level: 1,
    kind: "verb",
    prompt: "Simplifier",
    expected: "depends",
    explanation:
      "« Simplifier l'intégration » décrit une qualité promise, pas un changement constaté. Avec une mesure (temps jusqu'au premier appel API réussi), il devient un Résultat clé.",
  },
  {
    id: "warmup.okr.l1.accelerer",
    level: 1,
    kind: "verb",
    prompt: "Accélérer",
    expected: "depends",
    explanation:
      "« Accélérer » va dans le bon sens, mais de combien, mesuré comment ? Sans chiffre avant/après, c'est un vœu. Avec, c'est un Résultat clé.",
  },

  // ============================================================
  // Niveau 2 — mini-KR à classer
  // ============================================================
  {
    id: "warmup.okr.l2.migrer-k8s",
    level: 2,
    kind: "objective",
    prompt: "Migrer 100 % des services vers Kubernetes.",
    expected: "output",
    explanation:
      "Une migration est un projet, pas un Résultat clé. Reformuler en outcome : qu'est-ce que cette migration va changer ? (temps de déploiement, fiabilité, coût…)",
  },
  {
    id: "warmup.okr.l2.nps",
    level: 2,
    kind: "objective",
    prompt: "Faire passer le NPS de 32 à 50.",
    expected: "outcome",
    explanation:
      "Métrique nommée, point de départ, cible. Format de KR exemplaire.",
  },
  {
    id: "warmup.okr.l2.pipeline",
    level: 2,
    kind: "objective",
    prompt: "Construire le nouveau pipeline de déploiement.",
    expected: "output",
    explanation:
      "Construire = projet, pas un changement mesuré. Le pipeline construit, et ensuite ? Outcome : « Diviser par 3 le temps moyen de déploiement (de 30 min à 10 min) ».",
  },
  {
    id: "warmup.okr.l2.adoption-api",
    level: 2,
    kind: "objective",
    prompt: "Atteindre 80 % d'adoption de l'API par les équipes consommatrices.",
    expected: "outcome",
    explanation:
      "Cible chiffrée, bénéficiaire identifié (équipes consommatrices), unité claire (% d'adoption). KR valide.",
  },
  {
    id: "warmup.okr.l2.ux-floue",
    level: 2,
    kind: "objective",
    prompt: "Améliorer l'expérience utilisateur.",
    expected: "output",
    explanation:
      "Ni mesurable, ni un changement nommé. C'est une intention, pas un KR. Pour le rendre KR : « Faire passer le score SUS de l'app de 65 à 80 ».",
  },
  {
    id: "warmup.okr.l2.uptime-maintain",
    level: 2,
    kind: "objective",
    prompt: "Maintenir l'uptime du service paiement au-dessus de 99,9 %.",
    expected: "output",
    explanation:
      "Health metric déguisée en KR. « Maintenir au-dessus de » décrit un seuil de service à préserver, pas un changement à atteindre. Pour en faire un KR : nommer un avant et un après (« passer de 98,5 % à 99,9 % »).",
  },
  {
    id: "warmup.okr.l2.retention-m3",
    level: 2,
    kind: "objective",
    prompt: "Faire passer la rétention M3 des nouveaux comptes de 28 % à 50 % d'ici la fin du trimestre.",
    expected: "outcome",
    explanation:
      "Métrique nommée (rétention M3), segment (nouveaux comptes), avant/après chiffré, échéance trimestre. KR exemplaire.",
  },
  {
    id: "warmup.okr.l2.refactor-db",
    level: 2,
    kind: "objective",
    prompt: "Refactorer l'architecture de la base de données.",
    expected: "output",
    explanation:
      "Activité technique pure. Aucun changement constaté pour un bénéficiaire externe. Pour en faire un KR, nommer l'effet attendu (latence p95 divisée par 2, incidents de prod réduits, etc.).",
  },
  {
    id: "warmup.okr.l2.integration-time",
    level: 2,
    kind: "objective",
    prompt: "Diviser par 4 le délai moyen de première intégration d'une équipe consommatrice (de 4 h à 1 h).",
    expected: "outcome",
    explanation:
      "Métrique opérationnelle (délai d'intégration), bénéficiaire (équipes consommatrices), avant/après chiffré. KR clair et falsifiable.",
  },
  {
    id: "warmup.okr.l2.documenter-api",
    level: 2,
    kind: "objective",
    prompt: "Documenter complètement notre API publique d'ici la fin du trimestre.",
    expected: "output",
    explanation:
      "Activité de production. « Complètement » n'est pas mesurable côté changement constaté. Le vrai KR est l'effet attendu : développeurs autonomes, tickets divisés, temps d'intégration raccourci.",
  },
];
