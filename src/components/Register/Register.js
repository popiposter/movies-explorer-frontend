import React from 'react';
import PropTypes from 'prop-types';
import './Register.css';
import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';

function Register({ onRegister, apiErrorMessage }) {
  const inputs = {
    logo: true,
    name: true,
    email: true,
    password: true,
  };

  return (
    <section className="page__section register">
      <UserForm
        name="login"
        title="Добро пожаловать!"
        submitTitle="Зарегистрироваться"
        formConfig={inputs}
        onSubmit={onRegister}
        apiErrorMessage={apiErrorMessage}
      />
      <div className="user-form__link-wrapper">
        <p className="user-form__text">Уже зарегистрированы?</p>
        <Link className="user-form__link" to="/signin">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;

Register.propTypes = {
  onRegister: PropTypes.func,
};
