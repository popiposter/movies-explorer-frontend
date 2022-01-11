import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import './ProtectedRoute.css';
import Preloader from '../Preloader/Preloader';

function ProtectedRoute(props) {
  const { isLoggedIn, isChecking, children } = props;

  return isChecking ? (
    <section className="protected-route">
      <Preloader />
    </section>
  ) : isLoggedIn ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  isChecking: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};
