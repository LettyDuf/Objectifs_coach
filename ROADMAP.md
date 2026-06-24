# ROADMAP — Coach Objectifs

## Vision
Application web pédagogique qui apprend à **des groupes de différents niveaux hiérarchiques** (équipes de développeurs, Product Owners, Product Managers, gestionnaires) à rédiger d'excellents objectifs (Sprint, PI, OKR). Pensée pour un atelier de groupe sur écran partagé, en présence d'un facilitateur. Pas d'IA, pas de backend, pas d'authentification.

Le périmètre se déploie sur **deux dimensions orthogonales** : le **type d'objectif** (Sprint / PI / OKR) et l'**audience** (dev, PO, PM, gestionnaire). Le V1 couvre une seule audience (équipe de développeurs) sur les trois types. Les autres audiences viennent en V2 et au-delà, sans remettre en cause l'architecture.

## V1 — périmètre tranché
- **Audience cible : équipe de développeurs** (une seule audience activée, les autres viendront).
- Trois types d'objectifs supportés, modules séparés et étanches : **Sprint**, **PI**, **OKR**. **Sélection indépendante** : l'utilisateur choisit un seul type à la fois en entrée d'atelier ; tout le parcours qui suit reste cantonné à ce type.
- Deux modes : **Apprendre** (parcours guidé avec exemples annotés bons/mauvais) et **S'entraîner** (l'utilisateur rédige, le moteur diagnostique en direct).
- Évaluation : grille auto-co-construite (questions précises posées à l'utilisateur) + heuristiques objectives sur le texte (verbe d'action, présence d'un seuil chiffré, mots ambigus, formulation outcome vs output). Pas d'IA.
- Feedback visuel immédiat : code couleur vert / ambre / rouge par critère, score 0–100, badges « bon objectif débloqué ».
- Mode atelier : typographie lisible à 3 mètres, interface épurée, contrôle au clavier.
- Export en fin d'atelier : Markdown, JSON, et copie dans le presse-papier.

## Hors périmètre V1 — assumé
- **Autres audiences** : Product Owner, Product Manager, gestionnaire. Activables en V2 sans réécriture (axe paramétré dès la conception).
- INVEST / user stories (outil distinct si besoin plus tard).
- Multi-joueurs temps réel synchronisé.
- Backend, authentification, persistance serveur.
- Historique local entre sessions (`localStorage`).
- Génération PDF.
- Intégrations Jira / Notion / Linear.
- Internationalisation (V1 = français uniquement).
- Analyse de texte par LLM.

## Incréments — ordre proposé
1. **Squelette technique** : scaffolding Vite + TS + React + Vitest, structure hexagonale, CI locale (lint + tests).
2. **Moteur — tronc commun** : critères partagés à tous types (outcome, falsifiable, borné, sous influence, ambition crédible). Tests sur exemples annotés.
3. **Module Sprint** : règles spécifiques + contenu pédagogique + UI d'entraînement.
4. **Mode Apprendre — Sprint** : exemples annotés, parcours guidé.
5. **Export Markdown / JSON / presse-papier**.
6. **Module PI** : règles + contenu + UI.
7. **Module OKR** : règles + contenu + UI (KR outcome-based, ~70% = succès).
8. **Polissage UX atelier** : typographie, navigation clavier, accessibilité WCAG AA.

Chaque incrément est livré testé, démontrable, et l'état est consigné dans `STATUS.md`.

## V2 — pistes (non engagées)
- **Activation des autres audiences** : PO, PM, gestionnaire. Chaque audience apporte son propre jeu d'exemples annotés et son vocabulaire, le moteur reste inchangé.
- Module INVEST (user stories) en outil distinct.
- Historique local et reprise d'atelier.
- Export PDF de synthèse d'atelier.
- Mode multi-joueurs léger (un facilitateur partage un lien, les participants proposent).
- Chaîne d'indicateurs KBI → KPI → KGI rattachée à chaque objectif.
