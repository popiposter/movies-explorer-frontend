import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Страница не найдена</h2>
      <button className="not-found__back-btn" type="button" onClick={handleNavigateBack}>Назад</button>
    </section>
  );
}

export default NotFound;
