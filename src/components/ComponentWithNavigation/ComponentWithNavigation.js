import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function ComponentWithNavigation(props) {
  const { isHeaderEnabled, isFooterEnabled, children } = props;

  return (
    <>
      {isHeaderEnabled && <Header />}
      {children}
      {isFooterEnabled && <Footer />}
    </>
  );
}

export default ComponentWithNavigation;

ComponentWithNavigation.propTypes = {
  children: PropTypes.node,
  isFooterEnabled: PropTypes.bool,
  isHeaderEnabled: PropTypes.bool,
};
