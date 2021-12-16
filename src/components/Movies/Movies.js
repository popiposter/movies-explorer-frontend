import React, {useState} from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movie1Path from '../../images/movie-1.jpg';
import movie2Path from '../../images/movie-2.jpg';
import movie3Path from '../../images/movie-3.jpg';
import movie4Path from '../../images/movie-4.jpg';
import Preloader from '../Preloader/Preloader';

function Movies() {
  const defaultMovies = [
    {
      id: 1,
      name: '33 слова о дизайне',
      link: movie1Path,
      duration: '1ч42м',
      isSaved: false
    },
    {
      id: 2,
      name: '33 слова о дизайне',
      link: movie2Path,
      duration: '1ч42м',
      isSaved: false
    },
    {
      id: 3,
      name: '33 слова о дизайне',
      link: movie3Path,
      duration: '1ч42м',
      isSaved: true
    },
    {
      id: 4,
      name: '33 слова о дизайне',
      link: movie4Path,
      duration: '1ч42м',
      isSaved: false
    },
    {
      id: 5,
      name: '33 слова о дизайне',
      link: movie1Path,
      duration: '1ч42м',
      isSaved: false
    },
    {
      id: 6,
      name: '33 слова о дизайне',
      link: movie2Path,
      duration: '1ч42м',
      isSaved: false
    },
    {
      id: 7,
      name: '33 слова о дизайне',
      link: movie3Path,
      duration: '1ч42м',
      isSaved: true
    },
    {
      id: 8,
      name: '33 слова о дизайне',
      link: movie4Path,
      duration: '1ч42м',
      isSaved: false
    },
    {
      id: 9,
      name: '33 слова о дизайне',
      link: movie1Path,
      duration: '1ч42м',
      isSaved: true
    }
  ];
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SearchForm handleIsLoading={setIsLoading}/>
      <section className="page__section movies">
        {isLoading && (<Preloader/>)}
        {!isLoading && (<><MoviesCardList cards={defaultMovies}/>
          <button className="movies__more-btn" type="button">Еще</button>
        </>)}
      </section>
    </>
  );
}

export default Movies;
