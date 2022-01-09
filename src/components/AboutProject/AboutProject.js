import React from 'react';
import './AboutProject.css';
import MainSection from '../MainSection/MainSection';

function AboutProject() {
  return (
    <MainSection title="О проекте">
      <section className="about-project__description">
        <article className="about-project__description-item">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article className="about-project__description-item">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </section>
      <ul className="about-project__timeline">
        <li className="about-project__timeline-item_front">
          <p className="about-project__timeline-segment about-project__timeline-segment_front">
            1 неделя
          </p>
          <p className="about-project__timeline-segment-title">Back-end</p>
        </li>
        <li className="about-project__timeline-item_back">
          <p className="about-project__timeline-segment about-project__timeline-segment_back">
            4 недели
          </p>
          <p className="about-project__timeline-segment-title">Front-end</p>
        </li>
      </ul>
    </MainSection>
  );
}

export default AboutProject;
