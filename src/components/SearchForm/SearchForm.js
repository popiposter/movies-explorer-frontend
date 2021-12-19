import React, {useEffect, useState} from 'react';
import './SearchForm.css';
import searchBtnPath from '../../images/search-btn.svg';

function SearchForm(props) {
  const {handleIsLoading} = props;
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    handleIsLoading(checked);
  }, [handleIsLoading, checked])

  return (
    <form className="search-form">
      <div className="search-form__container">
        <input className="search-form__input" type="text" required placeholder="Фильм"/>
        <button type="submit" className="search-form__btn" aria-label="Искать">
          <img src={searchBtnPath} alt="Стрелка вправо"/>
        </button>
      </div>
      <hr className="search-form__separator"/>
      <div className="search-form__switch-wrapper">
        <label className="search-form__switch">
          <input type="checkbox" aria-label="Короткометражки" onChange={handleChange}/>
          <span className="search-form__slider"/>
        </label>
        <span className="search-form__switch-text">Короткометражки</span>
      </div>
    </form>
  );
}

export default SearchForm;
