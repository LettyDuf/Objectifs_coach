# Corpus mini-exercices Sprint — V3 consolidée

Pour validation en bloc avant intégration code. Cette version intègre la révision par l'expert linguiste-pédagogue Lean-Agile francophone (V2) et les 3 corrections consensuelles du panel pluridisciplinaire (devs, PO, PM, DevSecOps, data).

Style : vocabulaire francophone, pas d'acronyme non expliqué, pas d'anglicisme parasite, position des bonnes réponses variée.

---

## 1. Indicateur — QCM 1 parmi 3

**Promesse pédagogique** : repérer l'indicateur opérationnel et univoque (on sait exactement quoi mesurer, comment, avec quoi) face à un concept-parapluie flou.

| # | Énoncé de l'objectif | a | b | c | Bonne | Justification |
|---|---|---|---|---|---|---|
| 1 | Améliorer le passage en caisse en ligne | **Taux de paniers payés sur paniers démarrés** | Fluidité du parcours d'achat | Performance globale du tunnel | a | Ratio chiffré sans ambiguïté ; les autres sont des étiquettes. |
| 2 | Réduire la charge du support niveau 1 | **Nombre de demandes traitées sans escalade vers le niveau 2** | Efficacité du support | Maîtrise de la pression entrante | a | Compte précis, source claire (outil de tickets). |
| 3 | Fiabiliser la paie mensuelle | Qualité du processus paie | Conformité de la chaîne salariale | **Nombre de bulletins corrigés après envoi** | c | Comptage net, vérifiable sur le mois. |
| 4 | Mieux servir les commerciaux terrain | Satisfaction des forces de vente | **Délai moyen entre demande de devis et réponse client** | Réactivité commerciale | b | Durée mesurée, comparable d'un mois à l'autre. |
| 5 | Stabiliser le site marchand | Robustesse de la plateforme | Tenue de charge en heure de pointe | **Taux de disponibilité du site sur le mois** | c | *Corrigé panel* : « Tenue de charge » est aussi mesurable, le piège ne tenait pas. Le taux de disponibilité est l'indicateur opérationnel standard. |
| 6 | Améliorer la qualité des données client | Hygiène du référentiel | **Pourcentage de fiches client uniques après déduplication** | Propreté des données | b | *Corrigé panel* : « Nombre de doublons détectés » pousse au mauvais comportement (meilleure détection = plus de doublons comptés). Le pourcentage de fiches uniques pointe l'effet visé. |
| 7 | Réduire les retards de facturation fournisseurs | **Pourcentage de factures payées sous 30 jours** | Maîtrise du cycle achats | Discipline de paiement | a | Ratio borné, lisible par tous. |
| 8 | Renforcer l'accueil des nouveaux arrivants | **Délai entre l'arrivée et le premier accès aux outils métier** | Vivacité du parcours d'accueil (note interne) | Qualité de l'intégration | a | Durée mesurée, indépendante des perceptions. |
| 9 | Améliorer la conversion d'une campagne d'emailing | Engagement de l'audience | **Taux de clic sur le lien principal** | Performance relationnelle | b | *Corrigé panel* : énoncé recentré sur la conversion (le taux d'ouverture est obsolète depuis 2021 à cause d'Apple Mail Privacy). Le clic reste un signal fiable. |
| 10 | Réduire les incidents en production | Solidité des livraisons | Robustesse des mises en ligne | **Nombre d'incidents de sévérité 1 ou 2 sur 30 jours glissants** | c | *Corrigé panel* : « critique » sans définition est exactement le piège qu'on veut enseigner à éviter. Sévérité 1 ou 2 est défini sans ambiguïté dans les politiques d'incident. |

**Répartition des bonnes réponses** : a = 4, b = 3, c = 3. Équilibré, aucune position ne domine.

---

## 2. Variation chiffrée — Grille 8 fragments à sélection multiple

**Consigne** : cocher les fragments qui expriment une variation précise et chiffrée. Les autres restent vagues.

| # | Fragment | Précis ? | Justification |
|---|---|---|---|
| 1 | Diviser par deux le nombre de paniers abandonnés | Oui | Division par 2, base claire. |
| 2 | Améliorer nettement la satisfaction client | Non | « Nettement » n'est pas chiffré. |
| 3 | Passer de 12 à 6 jours de délai moyen de réponse | Oui | Valeurs de départ et d'arrivée données. |
| 4 | Réduire significativement les incidents de paie | Non | « Significativement » reste à interpréter. |
| 5 | Faire baisser de 30 % les retards de facturation | Oui | Pourcentage explicite. |
| 6 | Mieux gérer les pics de charge | Non | Aucune mesure ni cible. |
| 7 | Atteindre 95 % de factures payées sous 30 jours | Oui | Cible chiffrée, seuil net. |
| 8 | Renforcer la qualité du référentiel client | Non | Pas de niveau de départ ni d'arrivée. |

**Fragments précis attendus** : 1, 3, 5, 7.

**Note panel** : Karim (PO) signale que la baseline manque sur plusieurs cas (« Diviser par deux » sans point de départ). Considérer comme variations valables ici, mais à enseigner en complément qu'une variation précise idéale donne la baseline (vu en exercice « Indicateur »).

---

## 3. Échéance — Grille 8 fragments à sélection multiple

**Consigne** : cocher les fragments qui posent une échéance précise (date, fin de période, sprint nommé). Les autres laissent l'horizon flotter.

| # | Fragment | Borné ? | Justification |
|---|---|---|---|
| 1 | D'ici la fin du sprint 14 | Oui | Sprint nommé, fin identifiable. |
| 2 | Dans les meilleurs délais | Non | Formule vide. |
| 3 | Avant le 30 septembre | Oui | Date calendaire précise. |
| 4 | Rapidement après la mise en production | Non | « Rapidement » n'est pas une borne. |
| 5 | À la clôture du trimestre en cours | Oui | Fin de période identifiée. |
| 6 | Sur les prochaines semaines | Non | Combien de semaines, à partir de quand. |
| 7 | Au plus tard le vendredi de la revue de sprint | Oui | Jour et événement précis. |
| 8 | Dans la durée | Non | Aucun horizon. |

**Fragments bornés attendus** : 1, 3, 5, 7.

---

## 4. Contexte — QCM 1 parmi 4 « Qui est le vrai bénéficiaire ? »

**Promesse pédagogique** : derrière un objectif, identifier la personne ou le groupe dont la vie change concrètement quand l'objectif est atteint, pas l'équipe qui livre.

| # | Objectif | a | b | c | d | Bénéficiaire | Justification |
|---|---|---|---|---|---|---|---|
| 1 | Réduire de 12 à 6 jours le délai de réponse aux demandes de devis d'ici fin du trimestre | Direction commerciale | **Clients prospects en attente** | Équipe avant-vente | Service marketing | b | Ce sont eux qui attendent et qui décident pendant ce délai. |
| 2 | Passer le taux de bulletins de paie corrigés après envoi sous 1 % d'ici décembre | Équipe paie | Direction des ressources humaines | **Salariés de l'entreprise** | Cabinet comptable externe | c | Ils reçoivent un bulletin juste du premier coup. |
| 3 | Faire passer le pourcentage de fiches client uniques de 92 % à 99 % d'ici fin du semestre | Équipe données | **Conseillers qui consultent le dossier client en rendez-vous** | Direction informatique | Auditeurs internes | b | *Corrigé panel* : énoncé reformulé (effet visé : qualité ressentie en agence). Bénéficiaire précisé : ceux qui consultent le dossier en situation de rendez-vous. |
| 4 | Faire passer le taux de factures fournisseurs payées sous 30 jours de 70 % à 90 % d'ici la fin de l'année | Service comptabilité | Direction financière | **Fournisseurs de l'entreprise** | Acheteurs internes | c | Ils touchent leur argent à temps. |
| 5 | Diviser par deux le nombre de minutes d'indisponibilité du site marchand sur le mois | Équipe technique | **Clients en train d'acheter** | Direction du numérique | Prestataire d'hébergement | b | Un site disponible leur permet de finir leur achat. |
| 6 | Réduire de 8 à 3 jours le délai entre l'arrivée d'un nouvel embauché et son premier accès aux outils métier | Service informatique interne | Équipe ressources humaines | **Nouveaux embauchés** | Managers d'équipe | c | Ils peuvent enfin travailler dès le début. |
| 7 | Atteindre 95 % de demandes au support résolues sans escalade vers le niveau 2 d'ici fin du sprint 18 | Équipe support niveau 2 | **Personnes qui ouvrent une demande au support** | Responsable du support | Équipe formation interne | b | Elles obtiennent une réponse plus vite, en un seul passage. |
| 8 | Faire passer le taux de clic sur le lien principal de la lettre d'information de 4 % à 8 % d'ici trois envois | Équipe marketing | Direction de la communication | **Abonnés de la lettre d'information** | Prestataire d'envoi | c | *Cohérent avec la correction Indicateur n°9* : on cible la conversion, donc le clic. Les abonnés reçoivent enfin un contenu qui les fait agir. |

**Répartition** : b = 4, c = 4. Variée et lisible.

---

## Notes de transparence (panel d'experts)

Les corrections appliquées dans cette V3 ont été produites par :
- Marie (dev front-end) : pertinence métier des indicateurs et exemples web
- Karim (PO) : pertinence du cadrage Sprint, observation baseline
- Sophie (PM) : robustesse statistique (outliers vs médiane)
- Thomas (DevSecOps) : précision opérationnelle (sévérité incidents, métriques d'observabilité)
- Léa (data) : biais de mesure qui peuvent pousser au mauvais comportement (cas n°6)

**3 corrections consensuelles intégrées** : Indicateur n°5 (disponibilité au lieu de tenue de charge), Indicateur/Contexte n°6 et 3 (déduplication au lieu de comptage de doublons), Indicateur/Contexte n°9 et 8 (clic au lieu de taux d'ouverture obsolète). **1 correction structurelle intégrée** : Indicateur n°10 (sévérité 1 ou 2 au lieu de « critique »).

Domaines couverts : vente en ligne, paie, données client, achats, plateforme, intégration interne, support, marketing relationnel. Diversification volontaire pour parler à plusieurs profils d'équipe.

---

## À ta validation

Réponse possible :
- « OK pour tout » → j'intègre dans le code.
- « OK sauf [n° + remplacement] » → j'intègre avec tes corrections.
- « Reprends [section] avec [angle] » → je relance un round d'expertise ciblé.
