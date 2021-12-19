import React from 'react';
import './Logo.css';
import logoPath from '../../images/logo.svg';
import {Link} from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={logoPath} alt={'Логотип дипломной работы.'}/>
    </Link>

  );
}

export default Logo;
