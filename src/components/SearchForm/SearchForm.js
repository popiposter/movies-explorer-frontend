import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import searchBtnPath from '../../images/search-btn.svg';
import { RequestStatusContext } from '../../contexts/RequestStatusContext';

function SearchForm(props) {
  const { onSubmit, savedFilter, queryRequiredMsg } = props;
  const [shortsChecked, setShortsChecked] = useState(savedFilter ? savedFilter.shorts : false);
  const [searchQuery, setSearchQuery] = useState(savedFilter ? savedFilter.query : '');

  const queryRequired = queryRequiredMsg !== '';

  const { requestStatus } = useContext(RequestStatusContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      query: searchQuery,
      shorts: shortsChecked,
    });
  };

  const handleShortsToggle = (e) => {
    setShortsChecked(e.target.checked);

    if (searchQuery || !queryRequired) {
      onSubmit({
        query: searchQuery,
        shorts: e.target.checked,
      });
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity(queryRequiredMsg);
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          name="query"
          className="search-form__input"
          type="text"
          required={queryRequired}
          placeholder="Фильм"
          disabled={requestStatus.isRunning}
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button
          type="submit"
          className="search-form__btn"
          aria-label="Искать"
          disabled={requestStatus.isRunning}
        >
          <img src={searchBtnPath} alt="Стрелка вправо" />
        </button>
      </div>
      <hr className="search-form__separator" />
      <div className="search-form__switch-wrapper">
        <label className="search-form__switch">
          <input
            type="checkbox"
            aria-label="Короткометражки"
            checked={shortsChecked}
            disabled={requestStatus.isRunning}
            onChange={handleShortsToggle}
          />
          <span className="search-form__slider" />
        </label>
        <span className="search-form__switch-text">Короткометражки</span>
      </div>
    </form>
  );
}

export default SearchForm;

SearchForm.propTypes = {
  filter: PropTypes.object,
  onSubmit: PropTypes.func,
  queryRequiredMsg: PropTypes.string,
  savedFilter: PropTypes.object
}
