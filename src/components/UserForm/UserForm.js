import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './UserForm.css';
import { useFormWithValidation } from '../../hooks/useForm';
import Logo from '../Logo/Logo';
import { RequestStatusContext } from '../../contexts/RequestStatusContext';

function UserForm(props) {
  const {
    title,
    submitTitle,
    name,
    children,
    formConfig,
    onSubmit,
    previousValues,
  } = props;

  const { values, setValues, handleChange, errors, isValid } =
    useFormWithValidation();
  const { requestStatus, setRequestStatus } = useContext(RequestStatusContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const resetRequestStatus = useCallback(() => {
    setRequestStatus((requestStatus) => ({
      ...requestStatus,
      isError: false,
      message: '',
    }));
  }, [setRequestStatus]);

  const isValuesEqualsPrevious = () => {
    if (!previousValues) {
      return false;
    }

    const keysNewValues = Object.keys(values);

    for (let key of keysNewValues) {
      if (values[key] !== previousValues[key]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (previousValues) {
      setValues(previousValues);
    }
  }, [previousValues, setValues]);

  useEffect(() => {
    return () => {
      resetRequestStatus();
    };
  }, [resetRequestStatus]);

  return (
    <>
      <div className="user-form">
        {formConfig.logo && <Logo />}
        <h2 className="user-form__title">{title}</h2>
        <form
          className={`user-form__form user-form__form_id_${name}`}
          id={`form_id_${name}`}
          onSubmit={handleSubmit}
          noValidate
        >
          {formConfig.name && (
            <>
              <label htmlFor={`${name}-name`} className="user-form__form-field">
                Имя
              </label>
              <input
                className={`user-form__form-input user-form__form-input_id_${name}-name`}
                name="name"
                id={`${name}-name`}
                value={values.name || ''}
                onChange={handleChange}
                onKeyDown={resetRequestStatus}
                minLength="2"
                maxLength="30"
                pattern="[a-zA-Zа-яА-Я -]{1,}"
                required
                type="text"
              />
              <span
                className={`user-form__form-input-error ${name}-name-error`}
              >
                {errors.name || ''}
              </span>
            </>
          )}
          {formConfig.email && (
            <>
              <label
                htmlFor={`${name}-email`}
                className="user-form__form-field"
              >
                E-mail
              </label>
              <input
                className={`user-form__form-input user-form__form-input_id_${name}-email`}
                name="email"
                id={`${name}-email`}
                value={values.email || ''}
                onChange={handleChange}
                onKeyDown={resetRequestStatus}
                required
                type="email"
              />
              <span
                className={`user-form__form-input-error ${name}-email-error`}
              >
                {errors.email || ''}
              </span>
            </>
          )}
          {formConfig.password && (
            <>
              <label
                htmlFor={`${name}-password`}
                className="user-form__form-field"
              >
                Пароль
              </label>
              <input
                className={`user-form__form-input user-form__form-input_id_${name}-password`}
                name="password"
                id={`${name}-password`}
                value={values.password || ''}
                onChange={handleChange}
                onKeyDown={resetRequestStatus}
                minLength="8"
                required
                type="password"
              />
              <span
                className={`user-form__form-input-error ${name}-password-error"`}
              >
                {errors.password || ''}
              </span>
            </>
          )}
        </form>
      </div>
      <div className="user-form__bottom">
        <span
          className={`user-form__api-error-text
          ${
            requestStatus.isError
              ? 'user-form__api-error-text_error'
              : 'user-form__api-error-text_info'
          }`}
        >
          {requestStatus.message || ''}
        </span>
        {requestStatus.isRunning ? (
          <div className="user-form__loader" />
        ) : (
          <button
            className="button user-form__button-submit user-form__button-submit_id_submit"
            form={`form_id_${name}`}
            type="submit"
            disabled={!isValid || isValuesEqualsPrevious()}
          >
            {submitTitle}
          </button>
        )}
        {children}
      </div>
    </>
  );
}

export default UserForm;

UserForm.propTypes = {
  children: PropTypes.node,
  formConfig: PropTypes.object,
  name: PropTypes.string,
  onSubmit: PropTypes.func,
  previousValues: PropTypes.object,
  submitTitle: PropTypes.string,
  title: PropTypes.string,
};
