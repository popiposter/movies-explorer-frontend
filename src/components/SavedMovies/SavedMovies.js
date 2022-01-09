import PropTypes from 'prop-types'
import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const { savedMovies, savedFilter, onSearch, messages, onShortsToggle, isSavedMoviesPage, onDelete } = props;

  return (
    <>
      <SearchForm
        onSubmit={onSearch}
        onShortsToggle={onShortsToggle}
        queryRequiredMsg={''}
        savedFilter={savedFilter}
      />
      <section className="page__section saved-movies">
        <MoviesCardList cards={savedMovies} keyName={'_id'} isSavedMoviesPage={isSavedMoviesPage} onSave={onDelete}/>
        {!savedMovies.length && (savedFilter.query.length > 0 || savedFilter.shorts)  && (
          <p className="saved-movies__search-results-msg">
            {messages.noResultsMSG}
          </p>)}
      </section>
    </>
  );
}

export default SavedMovies;

SavedMovies.propTypes = {
  isSavedMoviesPage: PropTypes.bool,
  messages: PropTypes.object,
  onDelete: PropTypes.func,
  onSearch: PropTypes.func,
  onShortsToggle: PropTypes.func,
  savedFilter: PropTypes.object,
  savedMovies: PropTypes.array
}
