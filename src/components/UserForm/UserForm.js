import React from 'react';
import './UserForm.css';
import {useFormWithValidation} from '../../hooks/useForm';
import Logo from '../Logo/Logo';

function UserForm(props) {
  const {title, submitTitle, name, children, inputConfig} = props;

  const {values, handleChange, errors, isValid} = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="user-form">
        <Logo/>
        <h2 className="user-form__title">{title}</h2>
        <form
          className={`user-form__form user-form__form_id_${name}`}
          name={`form_id_${name}`}
          onSubmit={handleSubmit}
          noValidate
        >
          {inputConfig.name && (
            <>
              <label htmlFor={`${name}-name`} className="user-form__form-field">Имя</label>
              <input
                className={`user-form__form-input user-form__form-input_id_${name}-name`}
                name="name"
                id={`${name}-name`}
                value={values.name}
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                pattern="[a-zA-Zа-яА-Я -]{1,}"
                required
                type="text"
              />
              <span className={`user-form__form-input-error ${name}-name-error`}>{errors.name || ''}</span>
            </>
          )}
          {inputConfig.email && (
            <>
              <label htmlFor={`${name}-email`} className="user-form__form-field">E-mail</label>
              <input
                className={`user-form__form-input user-form__form-input_id_${name}-email`}
                name="email"
                id={`${name}-email`}
                value={values.email}
                onChange={handleChange}
                required
                type="email"
              />
              <span className={`user-form__form-input-error ${name}-email-error`}>{errors.email || ''}</span>
            </>
          )}
          {inputConfig.password && (
            <>
              <label htmlFor={`${name}-password`} className="user-form__form-field">Пароль</label>
              <input
                className={`user-form__form-input user-form__form-input_id_${name}-password`}
                name="password"
                id={`${name}-password`}
                value={values.password}
                onChange={handleChange}
                minLength="8"
                required
                type="password"
              />
              <span className={`user-form__form-input-error ${name}-password-error"`}>{errors.password || ''}</span>
            </>
          )}
        </form>
      </div>
      <div className="user-form__bottom">
        <button
          className="button user-form__button-submit user-form__button-submit_id_submit"
          type="submit"
          disabled={!isValid}
        >
          {submitTitle}
        </button>
        {children}
      </div>
    </>
  )
    ;
}

export default UserForm;
