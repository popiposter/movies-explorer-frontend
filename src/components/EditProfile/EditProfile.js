import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/UserContext';
import './EditProfile.css';
import UserForm from '../UserForm/UserForm';
import { Link } from 'react-router-dom';

function EditProfile(props) {
  const { onEditProfile } = props;
  const { currentUser } = useContext(UserContext);

  const inputs = {
    logo: false,
    name: true,
    email: true,
    password: false,
  };

  return (
    <section className="page__section edit-profile">
      <UserForm
        name="profile"
        title="Редактирование профиля"
        submitTitle="Сохранить"
        formConfig={inputs}
        onSubmit={onEditProfile}
        previousValues={currentUser}
      />
      <div className="user-form__link-wrapper">
        <Link className="user-form__link" to="/profile">
          Назад в профиль
        </Link>
      </div>
    </section>
  );
}

export default EditProfile;

EditProfile.propTypes = {
  onEditProfile: PropTypes.func,
};
