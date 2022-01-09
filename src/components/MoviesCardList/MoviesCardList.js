import React from 'react';
import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { cards, onSave, keyName, isSavedMoviesPage } = props;

  return (
    <ul className="movies__list">
      {cards.map(
        (card) =>
          (isSavedMoviesPage || card.isShown) && (
            <MoviesCard
              key={card[keyName]}
              card={card}
              onSave={onSave}
              isSavedMoviesPage={isSavedMoviesPage}
            />
          )
      )}
    </ul>
  );
}

export default MoviesCardList;

MoviesCardList.propTypes = {
  cards: PropTypes.array,
  isSavedMoviesPage: PropTypes.bool,
  keyName: PropTypes.string,
  onSave: PropTypes.func,
};
