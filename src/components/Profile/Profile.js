import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  const { onLogout } = props;
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onEditProfileClick = () => {
    navigate('/edit-profile');
  };

  return (
    <section className="page__section profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <section className="profile__info">
        <div className="profile__line-wrapper">
          <h2 className="profile__info-title">Имя</h2>
          <p className="profile__info-text">{currentUser.name}</p>
        </div>
        <hr className="profile__separator" />
        <div className="profile__line-wrapper">
          <h2 className="profile__info-title">E-mail</h2>
          <p className="profile__info-text">{currentUser.email}</p>
        </div>
      </section>
      <button
        className="profile__edit-btn"
        type="button"
        onClick={onEditProfileClick}
      >
        Редактировать
      </button>
      <button className="profile__logout-btn" type="button" onClick={onLogout}>
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;

Profile.propTypes = {
  onLogout: PropTypes.func,
};
