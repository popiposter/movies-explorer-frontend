import React from 'react';
import './MoviesCard.css';
import savedPath from '../../images/movie-saved.svg';
import notSavedPath from '../../images/movie-not-saved.svg';
import deletePath from '../../images/delete-btn.svg';

function MoviesCard(props) {
  const {card} = props;
  const {name, link, duration, isSaved, isDeleteEnabled} = card;
  // const cardStyle = {backgroundImage: `url(${link})`};
  const btnImg = isDeleteEnabled ? deletePath : isSaved ? savedPath : notSavedPath;
  const btnName = isDeleteEnabled || isSaved ? 'Удалить' : 'Сохранить';

  return (
    <li className="movies__item">
      <img
        className="movies__image"
        src={link}
        alt={name}
        // style={cardStyle}
      />
      <div className="movies__description">
        <div className="movies__title-wrapper">
          <h2 className="movies__title">{name}</h2>
          <button className="movies__btn" type="button" aria-label={btnName}>
            <img className={`movies__btn-img ${isDeleteEnabled ? 'movies__btn-img_delete' : ''}`} src={btnImg}
                 alt={btnName}/>
          </button>
        </div>
        <p className="movies__duration">{duration}</p>
      </div>

    </li>
  );
}

export default MoviesCard;
