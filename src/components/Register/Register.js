import React from 'react';
import './Register.css';
import {Link} from 'react-router-dom';
import UserForm from '../UserForm/UserForm';

function Register() {
  const inputs = {
    name: true,
    email: true,
    password: true
  }

  return (
    <section className="page__section register">
      <UserForm name="login" title="Добро пожаловать!" submitTitle="Зарегистрироваться" inputConfig={inputs}>
      </UserForm>
      <div className="user-form__link-wrapper">
        <p className="user-form__text">
          Уже зарегистрированы?
        </p>
        <Link className="user-form__link" to="/signin">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
