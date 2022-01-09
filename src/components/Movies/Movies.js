import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { RequestStatusContext } from '../../contexts/RequestStatusContext';

function Movies(props) {
  const {
    movies,
    canLoadMore,
    onLoadMore,
    onSearch,
    onSave,
    savedFilter,
    messages,
  } = props;
  const { requestStatus } = useContext(RequestStatusContext);

  return (
    <main>
      <SearchForm
        onSubmit={onSearch}
        savedFilter={savedFilter}
        queryRequiredMsg={messages.queryRequiredMsg}
      />
      <section className="page__section movies">
        {requestStatus.isError && (
          <p className="movies__search-results-msg">{requestStatus.message}</p>
        )}
        {requestStatus.isRunning ? (
          <Preloader />
        ) : movies.length > 0 && savedFilter.query.length > 0 ? (
          <>
            <MoviesCardList cards={movies} onSave={onSave} keyName={'id'}/>
            {canLoadMore && (
              <button className="movies__more-btn" type="button" onClick={onLoadMore}>
                Еще
              </button>
            )}
          </>
        ) : (
          savedFilter.query.length > 0 && (
            <p className="movies__search-results-msg">
              {messages.noResultsMSG}
            </p>
          )
        )}
      </section>
    </main>
  );
}

export default Movies;

Movies.propTypes = {
  canLoadMore: PropTypes.bool,
  messages: PropTypes.object,
  movies: PropTypes.array,
  onLoadMore: PropTypes.func,
  onSave: PropTypes.func,
  onSearch: PropTypes.func,
  savedFilter: PropTypes.object
}
