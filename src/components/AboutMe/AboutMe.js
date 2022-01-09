import React from 'react';
import MainSection from '../MainSection/MainSection';
import './AboutMe.css';
import studentPath from '../../images/student_pic.jpg';

function AboutMe() {
  return (
    <MainSection title="О студенте">
      <section className="about-me__student">
        <div className="about-me__student-info">
          <article>
            <h3 className="about-me__student-title">Виталий</h3>
            <p className="about-me__student-subtitle">
              Фронтенд-разработчик, 30 лет
            </p>
            <p className="about-me__student-text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </article>
          <ul className="about-me__student-links">
            <li className="about-me__student-link-item">
              <a
                className="about-me__student-link"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="about-me__student-link-item">
              <a
                className="about-me__student-link"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about-me__student-pic"
          src={studentPath}
          alt="Фото студента."
        />
      </section>
      <section className="about-me__portfolio">
        <h4 className="about-me__portfolio-title">Портфолио</h4>
        <ul className="about-me__portfolio-links">
          <li className="about-me__portfolio-links-item">
            <a
              className="about-me__portfolio-link"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>Статичный сайт</span>
              <span>↗</span>
            </a>
          </li>
          <li className="about-me__portfolio-links-item">
            <a
              className="about-me__portfolio-link"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>Адаптивный сайт</span>
              <span>↗</span>
            </a>
          </li>
          <li className="about-me__portfolio-links-item">
            <a
              className="about-me__portfolio-link"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>Одностраничное приложение</span>
              <span>↗</span>
            </a>
          </li>
        </ul>
      </section>
    </MainSection>
  );
}

export default AboutMe;
