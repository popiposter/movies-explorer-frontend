import React from 'react';
import './MainSection.css';

function MainSection(props) {
  const { title, grayBackground, children } = props;

  return (
    <section
      className={`page__section main-section ${
        grayBackground ? 'main-section_background-grey' : ''
      }`}
    >
      <h2 className="main-section__title">{title}</h2>
      <hr className="main-section__separator" />
      {children}
    </section>
  );
}

export default MainSection;
