import React from 'react';
import PropTypes from 'prop-types';
import './MoviesCard.css';
import savedPath from '../../images/movie-saved.svg';
import notSavedPath from '../../images/movie-not-saved.svg';
import deletePath from '../../images/delete-btn.svg';

function MoviesCard(props) {
  const { card, onSave, isSavedMoviesPage } = props;
  const {
    nameRU,
    thumbnail,
    trailerLink,
    durationString,
    isSaved,
    isDeleteEnabled,
  } = card;
  const btnImg = isSavedMoviesPage
    ? deletePath
    : isSaved
      ? savedPath
      : notSavedPath;
  const btnName = isSavedMoviesPage || isSaved ? 'Удалить' : 'Сохранить';

  function handleSave() {
    onSave(card);
  }

  return (
    <li className="movies__item">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies__image" src={thumbnail} alt={nameRU} />
      </a>
      <div className="movies__description">
        <div className="movies__title-wrapper">
          <h2 className="movies__title">{nameRU}</h2>
          <button
            className="movies__btn"
            type="button"
            aria-label={btnName}
            onClick={handleSave}
          >
            <img
              className={`movies__btn-img ${
                isDeleteEnabled ? 'movies__btn-img_delete' : ''
              }`}
              src={btnImg}
              alt={btnName}
            />
          </button>
        </div>
        <p className="movies__duration">{durationString}</p>
      </div>
    </li>
  );
}

export default MoviesCard;

MoviesCard.propTypes = {
  card: PropTypes.object,
  isSavedMoviesPage: PropTypes.bool,
  onSave: PropTypes.func,
};
