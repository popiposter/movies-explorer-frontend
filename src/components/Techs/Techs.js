import React from 'react';
import MainSection from '../MainSection/MainSection';
import './Techs.css';

function Techs() {
  return (
    <MainSection title="Технологии" grayBackground="true">
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__tech-list">
        <li className="techs__tech-list-item">
          <p className="techs__tech-list-text">HTML</p>
        </li>
        <li className="techs__tech-list-item">
          <p className="techs__tech-list-text">CSS</p>
        </li>
        <li className="techs__tech-list-item">
          <p className="techs__tech-list-text">JS</p>
        </li>
        <li className="techs__tech-list-item">
          <p className="techs__tech-list-text">React</p>
        </li>
        <li className="techs__tech-list-item">
          <p className="techs__tech-list-text">Git</p>
        </li>
        <li className="techs__tech-list-item">
          <p className="techs__tech-list-text">Express.js</p>
        </li>
        <li className="techs__tech-list-item">
          <p className="techs__tech-list-text">mongoDB</p>
        </li>
      </ul>
    </MainSection>
  );
}

export default Techs;
