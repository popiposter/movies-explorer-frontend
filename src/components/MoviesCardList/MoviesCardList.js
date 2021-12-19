import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const {cards} = props;

  return (
    <ul className="movies__list">
      {cards.map((card) => (
        <MoviesCard key={card.id} card={card}/>
      ))}
    </ul>
  );
}

export default MoviesCardList;
