# Coach Objectifs

Outil pédagogique web qui apprend à rédiger d'excellents objectifs **Sprint, PI et OKR**, pour des équipes de différents niveaux (V1 : développeurs).

État du projet : **V1 en cours**. Cadrage figé, moteur d'évaluation en place et testé. L'interface utilisateur arrive dans l'incrément suivant.

---

## Pour les non-techniciens

### Lancer l'outil — double-clic, c'est tout

Ouvrir le fichier **`coach-objectifs.html`** (à la racine de ce dossier) dans n'importe quel navigateur récent : Chrome, Firefox, Safari, Edge. Tout est dedans, aucun serveur, aucune installation.

### Fichiers à connaître

- `ROADMAP.md` — ce que l'outil fera et dans quel ordre.
- `DOMAINE.md` — **la vérité métier** de l'outil. C'est toi qui la valides.
- `STATUS.md` — où on en est, ce qui vient ensuite.

Si tu veux faire évoluer la pédagogie (verbes, mots flous, exemples), tout est dans `src/content/`. Pas besoin de toucher au reste — mais il faut rebuilder (voir plus bas) pour produire un nouveau `coach-objectifs.html`.

---

## Lancer le projet (une seule fois)

Prérequis : avoir [Node.js 20+](https://nodejs.org/fr) installé.

Ouvrir un terminal dans le dossier `coach-objectifs/` et lancer :

```bash
npm install
```

(Quelques minutes la première fois ; rien à faire ensuite.)

## Vérifier que le moteur évalue correctement les objectifs

```bash
npm test
```

Doit afficher `36 passed`. Chaque exemple validé dans `DOMAINE.md` est rejoué automatiquement.

## Lancer l'application en local (UI minimale pour l'instant)

```bash
npm run dev
```

Puis ouvrir l'URL affichée (par défaut `http://localhost:5173`).

## Reconstruire le fichier autonome après modification

```bash
npm run build
```

Régénère `coach-objectifs.html` à la racine — un seul fichier prêt à partager (JS et CSS inline).

---

## Architecture (pour les développeurs)

Hexagonale stricte, voir `DECISIONS.md` (D1).

```
src/
├── domain/                  ← cœur de domaine, TS pur, sans React
│   ├── types.ts             ← types métier (Objective, Audience, Criterion…)
│   ├── ports.ts             ← interfaces d'entrée / de sortie
│   ├── heuristics.ts        ← détections objectives (verbes, mots flous, "et"…)
│   ├── engine.ts            ← orchestration de l'évaluation
│   └── criteria/
│       ├── common.ts        ← critères du tronc commun (5)
│       └── penalties.ts     ← pénalités spécifiques (V1 : composite)
├── content/                 ← contenu pédagogique (driven adapter)
│   ├── heuristics.fr.ts     ← listes de verbes / mots flous
│   ├── repository.ts        ← assemblage du contenu
│   └── examples/
│       └── sprint.dev.fr.ts ← exemples annotés Sprint × dev × FR
├── ui/                      ← adaptateur React (driving)
│   └── App.tsx
├── composition.ts           ← câblage domaine + adaptateurs
└── main.tsx                 ← point d'entrée React
```

**Règle d'or** : `src/domain/` n'importe jamais ni React, ni Vite, ni quoi que ce soit du dossier `src/ui/` ou `src/content/`. Le domaine doit pouvoir vivre sans interface.
