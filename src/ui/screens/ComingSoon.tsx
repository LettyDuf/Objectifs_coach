/**
 * Écran d'attente pour PI et OKR — annonce du périmètre cible, retour à l'accueil.
 *
 * Présent en V1 pour matérialiser le périmètre annoncé sans laisser l'utilisateur
 * cliquer dans le vide. Sera remplacé par le vrai parcours au fil des incréments.
 */

interface Props {
  typeLabel: string;
  onBack: () => void;
}

export function ComingSoon({ typeLabel, onBack }: Props) {
  return (
    <section>
      <h2 className="screen-title">{typeLabel}, à venir</h2>
      <p className="screen-lede">
        Le module {typeLabel} est planifié dans la feuille de route mais pas encore disponible.
        En attendant, le module Sprint est utilisable de bout en bout.
      </p>
      <button className="btn btn--primary" onClick={onBack}>
        Retour à l'accueil
      </button>
    </section>
  );
}
