export const getResponse = (res) => {
  if (res.ok) {
    return res.json().then((json) => {
      if (json.data) {
        return json.data;
      } else {
        return json;
      }
    });
  }

  return res.json().then((data) => {
    return Promise.reject(data.message);
  });
};

export const getMovieDuration = (minutes) => {
  const mm = minutes % 60;
  const hh = (minutes - mm) / 60;

  const hhStr = hh ? hh.toString() + 'ч' : '';

  return hhStr + mm.toString() + 'м';
};

export const getIsMovieShort = (duration) => {
  return Number.isInteger(duration) && duration <= 40;
};

export const getCardsInRow = (windowWidth) => {
  if (windowWidth >= 1280) {
    return 4;
  } else if (windowWidth < 1280 && windowWidth >= 990) {
    return 3;
  } else if (windowWidth < 990 && windowWidth >= 620) {
    return 2;
  } else return 5;
};

export const isMovieInSaved = (movie, savedMovies) => {
  return (
    savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
  );
};
