import React, { useEffect, useReducer, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ComponentWithNavigation from '../ComponentWithNavigation/ComponentWithNavigation';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { defaultUserContext, UserContext } from '../../contexts/UserContext';
import mainApi from '../../utils/MainApi';
import EditProfile from '../EditProfile/EditProfile';
import { RequestStatusContext } from '../../contexts/RequestStatusContext';
import moviesApi from '../../utils/MoviesApi';
import {
  FILTERED_MOVIES_STATE_ITEM,
  MAIN_API_PROFILE_SAVED_MSG,
  MOVIE_API_ERROR_MSG,
  MOVIES_FILTER_ITEM,
  REG_EXP_TOKEN_SET,
  SEARCH_NO_RESULTS_MSG,
  SEARCH_QUERY_REQUIRED_MSG,
  URL_REGEX,
} from '../../utils/constants';
import {
  getCardsInRow,
  getIsMovieShort,
  getMovieDuration,
  isMovieInSaved,
} from '../../utils/utils';
import useWindowWidth from '../../hooks/useWindowWidth';

function App() {
  const windowWidth = useWindowWidth();
  const [cardsInRow, setCardsInRow] = useState(4);
  const movieApiBaseAddress = moviesApi.getBaseAddress();
  const navigate = useNavigate();
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);
  const [userContext, setUserContext] = useState(defaultUserContext);
  const [requestStatus, setRequestStatus] = useState({
    isRunning: false,
    isError: false,
    message: '',
  });

  const requestStatusValue = { requestStatus, setRequestStatus };
  const moviesInitialState = {
    allMovies: [],
    filteredMovies: [],
    savedMovies: [],
    filteredSavedMovies: [],
    moviesFilter: {
      query: '',
      shorts: false,
    },
    savedMoviesFilter: {
      query: '',
      shorts: false,
    },
    needToFilter: false,
    lastShownIndex: 0,
    isLoadMoreAvailable: false,
    needToLoadMoreCards: false,
  };

  const [moviesState, dispatchMoviesState] = useReducer(
    moviesReducer,
    moviesInitialState
  );

  function moviesReducer(state, action) {
    const { payload } = action;

    switch (action.type) {
      case 'setLastFilter':
        const { filteredMovies, lastShownIndex, isLoadMoreAvailable } =
          payload.filteredMoviesData.filteredMoviesState;

        return {
          ...state,
          moviesFilter: payload.moviesFilter
            ? {
              query: payload.moviesFilter.query || '',
              shorts: payload.moviesFilter.shorts || false,
            }
            : moviesInitialState.moviesFilter,
          filteredMovies: filteredMovies ? filteredMovies : [],
          lastShownIndex: lastShownIndex ? lastShownIndex : 0,
          isLoadMoreAvailable: isLoadMoreAvailable
            ? isLoadMoreAvailable
            : false,
        };
      case 'loadMoreCards':
        return {
          ...state,
          needToLoadMoreCards: true,
        };
      case 'setSavedMovies':
        const newSavedMovies = payload.savedMovies;
        return {
          ...state,
          savedMovies: newSavedMovies,
          filteredSavedMovies: [...newSavedMovies],
        };
      case 'setSavedFilter':
        const { savedMoviesFilter } = payload;
        let newFilteredSavedMovies = [];

        if (savedMoviesFilter.query === '' && !savedMoviesFilter.shorts) {
          newFilteredSavedMovies = [...state.savedMovies];
        } else {
          newFilteredSavedMovies = getFilteredMovies(state.savedMovies, savedMoviesFilter);
        }

        return {
          ...state,
          filteredSavedMovies: newFilteredSavedMovies,
          savedMoviesFilter: savedMoviesFilter,
        }
      case 'setAllMovies':
        return {
          ...state,
          allMovies: payload.allMovies,
        };
      case 'setFilter':
        return {
          ...state,
          moviesFilter: payload.moviesFilter,
          needToFilter: payload.needToFilter,
          filteredMovies: [],
        };
      case 'setFiltered':
        return {
          ...state,
          filteredMovies: payload.filteredMovies,
          lastShownIndex: 0,
          needToFilter: false,
          needToLoadMoreCards: true,
        };
      case 'showMoreCards':
        const remainingCards =
          state.filteredMovies.length - state.lastShownIndex;
        const newLastShownIndex =
          state.lastShownIndex + Math.min(cardsInRow, remainingCards);

        const newFilteredMovies = state.filteredMovies.map((movie, index) => {
          if (index >= state.lastShownIndex && index < newLastShownIndex) {
            movie.isShown = true;
          }

          return movie;
        });

        const newIsLoadMoreAvailable =
          newLastShownIndex < state.filteredMovies.length - 1;

        localStorage.setItem(
          FILTERED_MOVIES_STATE_ITEM,
          JSON.stringify({
            filteredMoviesState: {
              filteredMovies: newFilteredMovies,
              lastShownIndex: newLastShownIndex,
              isLoadMoreAvailable: newIsLoadMoreAvailable,
            },
          })
        );

        return {
          ...state,
          filteredMovies: newFilteredMovies,
          lastShownIndex: newLastShownIndex,
          isLoadMoreAvailable: newIsLoadMoreAvailable,
          needToLoadMoreCards: false,
        };
      case 'changeSavedState':
        const updatedAllMovies = state.allMovies.map((m) => {
          if (m.id === payload.movie.movieId) {
            m._id = payload.isSaved ? payload.movie._id : '';
            m.isSaved = payload.isSaved;
          }

          return m;
        });

        const updatedFilteredMovies = state.filteredMovies.map((m) => {
          if (m.id === payload.movie.movieId) {
            m._id = payload.isSaved ? payload.movie._id : '';
            m.isSaved = payload.isSaved;
          }

          return m;
        });

        localStorage.setItem(
          FILTERED_MOVIES_STATE_ITEM,
          JSON.stringify({
            filteredMoviesState: {
              filteredMovies: updatedFilteredMovies,
              lastShownIndex: state.lastShownIndex,
              isLoadMoreAvailable: state.isLoadMoreAvailable,
            },
          })
        );

        let updatedSavedMovies;
        let updatedFilteredSavedMovies;

        if (payload.isSaved) {
          updatedSavedMovies = [...state.savedMovies, payload.movie];
          updatedFilteredSavedMovies = [...updatedSavedMovies];
        } else {
          updatedSavedMovies = state.savedMovies.filter((m) => {
            return m._id !== payload.movie._id;
          });

          updatedFilteredSavedMovies = state.filteredSavedMovies.filter((m) => {
            return m._id !== payload.movie._id;
          });
        }

        return {
          ...state,
          allMovies: updatedAllMovies,
          filteredMovies: updatedFilteredMovies,
          savedMovies: updatedSavedMovies,
          filteredSavedMovies: updatedFilteredSavedMovies,
          needToLoadMoreCards: false,
        };
      case 'reset':
        return moviesInitialState;
      default:
        return new Error();
    }
  }

  function processMovie(movie) {
    movie.thumbnail = movieApiBaseAddress + movie.image.formats.thumbnail.url;
    movie.image = movieApiBaseAddress + movie.image.url;
    movie.year = parseInt(movie.year);
    movie.country = movie.country || 'Неизвестно';
    movie.nameEN = movie.nameEN || movie.nameRU;
    movie.durationString = getMovieDuration(movie.duration);
    movie.isShort = getIsMovieShort(movie.duration);
    const movieInSaved = isMovieInSaved(movie, moviesState.savedMovies);
    movie.isSaved = !!movieInSaved;
    movie._id = movieInSaved ? movieInSaved._id : '';
    movie.movieId = movie.id;
    movie.trailerLink =
      movie.trailerLink && movie.trailerLink.match(URL_REGEX)
        ? movie.trailerLink
        : 'https://youtube.com';
  }

  function getFilteredMovies(movies, filter) {
    const query = filter.query.toLowerCase();

    const filtered = [];
    movies.forEach((movie) => {
      if (
        (query === '' || movie.nameRU.toLowerCase().includes(query)) &&
        (filter.shorts ? movie.isShort : true)
      ) {
        filtered.push({ ...movie });
      }
    });

    return filtered;
  }

  function handleApiError(err) {
    setRequestStatus((requestStatus) => ({
      ...requestStatus,
      isError: true,
      message: typeof err === 'string' ? err : MOVIE_API_ERROR_MSG,
    }));
  }

  function beforeApiRequest() {
    setRequestStatus((requestStatus) => ({
      ...requestStatus,
      isRunning: true,
      isError: false,
      message: '',
    }));
  }

  function afterApiRequest() {
    setRequestStatus((requestStatus) => ({
      ...requestStatus,
      isRunning: false,
    }));
  }

  function onRegister({ name, email, password }) {
    beforeApiRequest();

    mainApi
      .register(name, email, password)
      .then(() => {
        onLogin({ email, password });
      })
      .catch((err) => handleApiError(err))
      .finally(() => afterApiRequest());
  }

  function onLogin({ email, password }) {
    beforeApiRequest();

    mainApi
      .login(email, password)
      .then((data) => {
        setUserContext({
          isLoggedIn: true,
          currentUser: {
            name: data.name,
            email: data.email,
          },
        });
        navigate('/movies', { replace: true });
      })
      .catch((err) => handleApiError(err))
      .finally(() => afterApiRequest());
  }

  function onLogout() {
    beforeApiRequest();

    mainApi
      .logout()
      .then(() => {
        setUserContext(defaultUserContext);
      })
      .catch((err) => handleApiError(err))
      .finally(() => afterApiRequest());
  }

  function onEditProfile({ name, email }) {
    beforeApiRequest();

    mainApi
      .setUserInfo(name, email)
      .then((data) => {
        setUserContext((userContext) => ({
          ...userContext,
          currentUser: {
            name: data.name,
            email: data.email,
          },
        }));

        setRequestStatus((requestStatus) => ({
          ...requestStatus,
          message: MAIN_API_PROFILE_SAVED_MSG,
        }));
      })
      .catch((err) => handleApiError(err))
      .finally(() => afterApiRequest());
  }

  function onMoviesSearch(filter) {
    beforeApiRequest();

    if (!moviesState.allMovies.length) {
      moviesApi
        .getMovies()
        .then((data) => {
          const processedData = data.map((movie) => {
            processMovie(movie);

            return movie;
          });

          dispatchMoviesState({
            type: 'setAllMovies',
            payload: {
              allMovies: processedData,
            },
          });
        })
        .catch(() => {
          handleApiError(MOVIE_API_ERROR_MSG);
          afterApiRequest();
        });
    }

    dispatchMoviesState({
      type: 'setFilter',
      payload: {
        needToFilter: true,
        moviesFilter: filter,
      },
    });
  }

  function onSavedMoviesSearch(filter) {
    if (moviesState.savedMovies.length) {
      dispatchMoviesState({
        type: 'setSavedFilter',
        payload: {
          savedMoviesFilter: filter,
        },
      });
    }
  }

  useEffect(() => {
    if (!moviesState.needToFilter) {
      return;
    }

    if (moviesState.allMovies.length && moviesState.moviesFilter.query !== '') {
      const filtered = getFilteredMovies(moviesState.allMovies, moviesState.moviesFilter);

      localStorage.setItem(
        MOVIES_FILTER_ITEM,
        JSON.stringify(moviesState.moviesFilter)
      );

      dispatchMoviesState({
        type: 'setFiltered',
        payload: {
          filteredMovies: filtered,
        },
      });

      afterApiRequest();
    }
  }, [
    moviesState.needToFilter,
    moviesState.allMovies,
    moviesState.moviesFilter,
  ]);

  function onLoadMoreMovies() {
    dispatchMoviesState({ type: 'loadMoreCards' });
  }

  function onChangeMovieSavedStatus(movie) {
    if (movie._id) {
      mainApi
        .deleteMovie(movie._id)
        .then((deletedMovie) => {
          dispatchMoviesState({
            type: 'changeSavedState',
            payload: {
              movie: deletedMovie,
              isSaved: false,
            },
          });
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        .saveMovie(movie)
        .then((savedMovie) => {
          savedMovie.isShort = getIsMovieShort(savedMovie.duration);

          dispatchMoviesState({
            type: 'changeSavedState',
            payload: {
              movie: savedMovie,
              isSaved: true,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    setCardsInRow(getCardsInRow(windowWidth));
  }, [windowWidth]);

  useEffect(() => {
    if (document.cookie.match(REG_EXP_TOKEN_SET)) {
      mainApi
        .checkToken()
        .then((data) => {
          setUserContext({
            isLoggedIn: true,
            currentUser: {
              name: data.name,
              email: data.email,
            },
          });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsAuthChecking(false);
        });
    } else {
      setIsAuthChecking(false);
    }
    // Если добавить в зависимости будет постоянный ре-рендер.
    // https://github.com/remix-run/react-router/issues/8349
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!userContext.isLoggedIn) {
      return;
    }

    let lastFilter;
    let lastFilteredMoviesData;

    lastFilteredMoviesData = localStorage.getItem(FILTERED_MOVIES_STATE_ITEM);
    lastFilteredMoviesData = lastFilteredMoviesData
      ? JSON.parse(lastFilteredMoviesData)
      : lastFilteredMoviesData;

    lastFilter = localStorage.getItem(MOVIES_FILTER_ITEM);
    lastFilter = lastFilter ? JSON.parse(lastFilter) : lastFilter;

    dispatchMoviesState({
      type: 'setLastFilter',
      payload: {
        filteredMoviesData: lastFilteredMoviesData
          ? lastFilteredMoviesData
          : { filteredMoviesState: {} },
        moviesFilter: lastFilter,
      },
    });
  }, [userContext.isLoggedIn]);

  useEffect(() => {
    if (!userContext.isLoggedIn) {
      return;
    }

    mainApi
      .getSavedMovies()
      .then((data) => {
        const processedSavedMovies = data.map((movie) => {
          movie.isShort = getIsMovieShort(movie.duration);

          return movie;
        });

        dispatchMoviesState({
          type: 'setSavedMovies',
          payload: { savedMovies: processedSavedMovies },
        });
      })
      .catch((err) => console.log(err));
  }, [userContext.isLoggedIn]);

  useEffect(() => {
    if (!moviesState.needToLoadMoreCards) {
      return;
    }

    dispatchMoviesState({
      type: 'showMoreCards',
    });
  }, [moviesState.needToLoadMoreCards]);

  return (
    <RequestStatusContext.Provider value={requestStatusValue}>
      <UserContext.Provider value={userContext}>
        <div className="page">
          <div className="page__content">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route
                path="/"
                element={
                  isAuthChecking ? (
                    ''
                  ) : (
                    <ComponentWithNavigation
                      isHeaderEnabled={true}
                      isFooterEnabled={true}
                    >
                      <Main />
                    </ComponentWithNavigation>
                  )
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    isChecking={isAuthChecking}
                    isLoggedIn={userContext.isLoggedIn}
                  >
                    <ComponentWithNavigation
                      isHeaderEnabled={true}
                      isFooterEnabled={true}
                    >
                      <Movies
                        onSearch={onMoviesSearch}
                        movies={moviesState.filteredMovies}
                        savedFilter={{
                          query: moviesState.moviesFilter.query,
                          shorts: moviesState.moviesFilter.shorts,
                        }}
                        messages={{
                          queryRequiredMsg: SEARCH_QUERY_REQUIRED_MSG,
                          noResultsMSG: SEARCH_NO_RESULTS_MSG,
                        }}
                        canLoadMore={moviesState.isLoadMoreAvailable}
                        onLoadMore={onLoadMoreMovies}
                        onSave={onChangeMovieSavedStatus}
                      />
                    </ComponentWithNavigation>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    isChecking={isAuthChecking}
                    isLoggedIn={userContext.isLoggedIn}
                  >
                    <ComponentWithNavigation
                      isHeaderEnabled={true}
                      isFooterEnabled={true}
                    >
                      <SavedMovies
                        savedFilter={{
                          query: moviesState.savedMoviesFilter.query,
                          shorts: moviesState.savedMoviesFilter.shorts,
                        }}
                        messages={{
                          noResultsMSG: SEARCH_NO_RESULTS_MSG,
                        }}
                        savedMovies={moviesState.filteredSavedMovies}
                        isSavedMoviesPage={true}
                        onDelete={onChangeMovieSavedStatus}
                        onSearch={onSavedMoviesSearch}
                      />
                    </ComponentWithNavigation>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isChecking={isAuthChecking}
                    isLoggedIn={userContext.isLoggedIn}
                  >
                    <ComponentWithNavigation
                      isHeaderEnabled={true}
                      isFooterEnabled={false}
                    >
                      <Profile onLogout={onLogout} />
                    </ComponentWithNavigation>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute
                    isChecking={isAuthChecking}
                    isLoggedIn={userContext.isLoggedIn}
                  >
                    <ComponentWithNavigation
                      isHeaderEnabled={true}
                      isFooterEnabled={false}
                    >
                      <EditProfile onEditProfile={onEditProfile} />
                    </ComponentWithNavigation>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  userContext.isLoggedIn ? (
                    <Navigate to="/movies" replace />
                  ) : (
                    <Login onLogin={onLogin} />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  userContext.isLoggedIn ? (
                    <Navigate to="/movies" replace />
                  ) : (
                    <Register onRegister={onRegister} />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </UserContext.Provider>
    </RequestStatusContext.Provider>
  );
}

export default App;
