import React from 'react'
import './Login.css';
import UserForm from '../UserForm/UserForm';
import {Link} from 'react-router-dom';

function Login() {
  const inputs = {
    name: false,
    email: true,
    password: true
  }

  return (
    <section className="page__section login">
      <UserForm name="login" title="Рады видеть!" submitTitle="Войти" inputConfig={inputs}>
      </UserForm>
      <div className="user-form__link-wrapper">
        <p className="user-form__text">
          Ещё не зарегистрированы?
        </p>
        <Link className="user-form__link" to="/signup">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
