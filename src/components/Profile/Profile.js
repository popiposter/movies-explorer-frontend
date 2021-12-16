import React from 'react';
import './Profile.css';

function Profile(props) {
  return (
    <section className="page__section profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__input-wrapper">
          <label htmlFor="input-name" className="profile__input-label">Имя</label>
          <input className="profile__input" type="text" id="input-name" value="Виталий" required/>
        </div>
        <hr className="profile__separator"/>
        <div className="profile__input-wrapper">
          <label htmlFor="input-email" className="profile__input-label">E-mail</label>
          <input className="profile__input" type="text" id="input-email" value="pochta@yandex.ru" required/>
        </div>
      </form>
      <button className="profile__edit-btn" type="submit">Редактировать</button>
      <button className="profile__logout-btn" type="button">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
