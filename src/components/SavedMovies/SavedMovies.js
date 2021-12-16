import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import movie1Path from '../../images/movie-1.jpg';
import movie3Path from '../../images/movie-3.jpg';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  const defaultMovies = [
    {
      id: 3,
      name: '33 слова о дизайне',
      link: movie3Path,
      duration: '1ч42м',
      isDeleteEnabled: true
    },
    {
      id: 7,
      name: '33 слова о дизайне',
      link: movie3Path,
      duration: '1ч42м',
      isDeleteEnabled: true
    },
    {
      id: 9,
      name: '33 слова о дизайне',
      link: movie1Path,
      duration: '1ч42м',
      isDeleteEnabled: true
    }
  ];

  return (
    <>
      <SearchForm handleIsLoading={() => {
      }}/>
      <section className="page__section saved-movies">
        <MoviesCardList cards={defaultMovies}/>
      </section>
    </>
  );
}

export default SavedMovies;
