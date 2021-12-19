import React from 'react';
import './Promo.css';
import landingLogoPath from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo page__section">
      <div className="promo__container">
        <img className="promo__img" src={landingLogoPath} alt="Лого web по всему земному шару."/>
        <div className="promo__title-container">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#x2011;разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
      </div>
      <button className="promo__btn">Узнать больше</button>
    </section>
  );
}

export default Promo;
