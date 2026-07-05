/**
 * Corpus d'échauffement output/outcome — OKR entreprise × manager × FR.
 *
 * 10 verbes purs (niveau 1) + 10 mini-KR à classer (niveau 2).
 * Réplique le pattern OKR équipe (voir okr-equipe.dev.fr.ts) à l'échelle
 * entreprise : les scénarios sont ceux d'un CODIR (nouveau marché, refonte
 * de l'offre, transformation culturelle, fidélisation, international,
 * repositionnement de marque), jamais une tâche d'équipe de dev.
 *
 * L'enjeu pédagogique est identique : distinguer un Résultat clé (un
 * changement mesurable pour l'entreprise) d'un plan d'action ou d'un
 * livrable déguisé, et reconnaître le piège de la health metric
 * (« maintenir au-dessus de… ») à l'échelle entreprise.
 *
 * L'ordre de présentation est randomisé à chaque lancement (composant Warmup).
 */

import type { WarmupCase } from "../../domain/warmup";

export const OKR_ENTREPRISE_MANAGER_WARMUP_FR: WarmupCase[] = [
  // ============================================================
  // Niveau 1 — verbes purs
  // ============================================================
  {
    id: "warmup.okre.l1.atteindre",
    level: 1,
    kind: "verb",
    prompt: "Atteindre",
    expected: "outcome",
    explanation:
      "« Atteindre » appelle une cible chiffrée à dépasser. Verbe outcome typique d'un Résultat clé entreprise.",
  },
  {
    id: "warmup.okre.l1.lancer",
    level: 1,
    kind: "verb",
    prompt: "Lancer",
    expected: "output",
    explanation:
      "« Lancer » décrit une action à mener (un marché, une offre), pas le changement qu'elle produit. C'est un plan d'action déguisé en Résultat clé.",
  },
  {
    id: "warmup.okre.l1.faire-passer",
    level: 1,
    kind: "verb",
    prompt: "Faire passer",
    expected: "outcome",
    explanation:
      "« Faire passer de X à Y » est la signature d'un Résultat clé : un avant, un après, un écart à combler.",
  },
  {
    id: "warmup.okre.l1.deployer",
    level: 1,
    kind: "verb",
    prompt: "Déployer",
    expected: "output",
    explanation:
      "« Déployer » (un programme, une organisation) décrit une activité de mise en œuvre. Aucun changement mesurable nommé : output.",
  },
  {
    id: "warmup.okre.l1.reduire",
    level: 1,
    kind: "verb",
    prompt: "Réduire",
    expected: "outcome",
    explanation:
      "« Réduire » appelle un avant et un après. Verbe outcome qui structure bien un Résultat clé entreprise.",
  },
  {
    id: "warmup.okre.l1.convertir",
    level: 1,
    kind: "verb",
    prompt: "Convertir",
    expected: "outcome",
    explanation:
      "« Convertir N % de [population] en [état] » formule un Résultat clé de conversion : métrique nette, segment, état cible. Outcome.",
  },
  {
    id: "warmup.okre.l1.maintenir",
    level: 1,
    kind: "verb",
    prompt: "Maintenir",
    expected: "output",
    explanation:
      "Piège classique en OKR : « maintenir au-dessus de N » décrit un état à préserver, pas un changement à atteindre. C'est une health metric, pas un Résultat clé.",
  },
  {
    id: "warmup.okre.l1.recruter",
    level: 1,
    kind: "verb",
    prompt: "Recruter",
    expected: "output",
    explanation:
      "Recruter des personnes ou des partenaires est un moyen. Le Résultat clé, c'est l'effet que ce recrutement doit produire (part de marché, satisfaction, chiffre d'affaires…).",
  },
  {
    id: "warmup.okre.l1.multiplier",
    level: 1,
    kind: "verb",
    prompt: "Multiplier",
    expected: "outcome",
    explanation:
      "« Multiplier par N » force à nommer la métrique et le facteur. Verbe outcome qui structure un Résultat clé ambitieux.",
  },
  {
    id: "warmup.okre.l1.former",
    level: 1,
    kind: "verb",
    prompt: "Former",
    expected: "output",
    explanation:
      "Former les équipes est une activité de production. Le Résultat clé serait l'effet attendu : taux d'adoption d'une nouvelle pratique, baisse d'un délai, hausse d'une satisfaction interne.",
  },

  // ============================================================
  // Niveau 2 — mini-KR à classer
  // ============================================================
  {
    id: "warmup.okre.l2.nouveau-marche",
    level: 2,
    kind: "objective",
    prompt: "Ouvrir une filiale commerciale en Espagne.",
    expected: "output",
    explanation:
      "Ouvrir une filiale est un projet, pas un Résultat clé. Reformuler en outcome : qu'est-ce que cette filiale doit changer ? (chiffre d'affaires généré, nombre de clients signés, part de marché…)",
  },
  {
    id: "warmup.okre.l2.nps-entreprise",
    level: 2,
    kind: "objective",
    prompt: "Faire passer le score de recommandation client (NPS) de 15 à 40 sur l'année.",
    expected: "outcome",
    explanation:
      "Métrique nommée, point de départ, cible, échéance annuelle. Format de Résultat clé exemplaire.",
  },
  {
    id: "warmup.okre.l2.refonte-offre",
    level: 2,
    kind: "objective",
    prompt: "Refondre l'offre commerciale de l'entreprise.",
    expected: "output",
    explanation:
      "Refondre = projet, pas un changement mesuré. Et après la refonte ? Outcome : « Faire passer le taux de clients qui souscrivent à la nouvelle offre de 0 % à 30 % ».",
  },
  {
    id: "warmup.okre.l2.fidelisation",
    level: 2,
    kind: "objective",
    prompt: "Faire passer le taux de clients fidélisés à 3 ans de 22 % à 40 %.",
    expected: "outcome",
    explanation:
      "Cible chiffrée, horizon de fidélité précisé, point de départ connu. Résultat clé valide.",
  },
  {
    id: "warmup.okre.l2.culture-floue",
    level: 2,
    kind: "objective",
    prompt: "Renforcer la culture d'entreprise.",
    expected: "output",
    explanation:
      "Ni mesurable, ni un changement nommé. C'est une intention, pas un Résultat clé. Pour le rendre mesurable : « Faire passer le score d'engagement des salariés de 58 à 75 ».",
  },
  {
    id: "warmup.okre.l2.churn-maintain",
    level: 2,
    kind: "objective",
    prompt: "Maintenir le taux de résiliation des clients grands comptes sous 5 % toute l'année.",
    expected: "output",
    explanation:
      "Health metric déguisée en Résultat clé. « Maintenir sous » décrit un seuil à préserver, pas un changement à atteindre. Pour en faire un vrai Résultat clé : nommer un avant et un après (« passer de 9 % à 5 % »).",
  },
  {
    id: "warmup.okre.l2.international",
    level: 2,
    kind: "objective",
    prompt: "Faire passer la part du chiffre d'affaires réalisée à l'international de 8 % à 25 % d'ici la fin de l'année.",
    expected: "outcome",
    explanation:
      "Métrique nommée (part du chiffre d'affaires international), avant/après chiffré, échéance annuelle. Résultat clé exemplaire.",
  },
  {
    id: "warmup.okre.l2.reorganisation",
    level: 2,
    kind: "objective",
    prompt: "Réorganiser les directions commerciales et marketing.",
    expected: "output",
    explanation:
      "Activité d'organisation interne. Aucun changement constaté pour un client ou un salarié. Pour en faire un Résultat clé, nommer l'effet attendu (délai de décision commerciale raccourci, taux de perte de deals réduit, etc.).",
  },
  {
    id: "warmup.okre.l2.marque",
    level: 2,
    kind: "objective",
    prompt: "Faire passer le taux de notoriété spontanée de la marque de 12 % à 30 % sur le marché cible.",
    expected: "outcome",
    explanation:
      "Métrique de marque nommée, marché cible précisé, avant/après chiffré. Résultat clé clair et falsifiable.",
  },
  {
    id: "warmup.okre.l2.charte-valeurs",
    level: 2,
    kind: "objective",
    prompt: "Rédiger et diffuser la nouvelle charte de valeurs de l'entreprise.",
    expected: "output",
    explanation:
      "Activité de production. Rédiger et diffuser un document ne garantit aucun changement de comportement. Le vrai Résultat clé est l'effet attendu : salariés capables de citer les valeurs, décisions managériales alignées, score d'adhésion en hausse.",
  },
];
