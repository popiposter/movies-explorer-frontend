import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function ComponentWithNavigation(props) {
  const {isHeaderEnabled, isFooterEnabled, children} = props;

  return (
    <>
      {isHeaderEnabled && <Header/>}
      {children}
      {isFooterEnabled && <Footer/>}
    </>
  );
}

export default ComponentWithNavigation;
