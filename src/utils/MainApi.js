import { getResponse } from './utils';

class MainApi {
  constructor({ address }) {
    this._address = address;
  }

  register(name, email, password) {
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    }).then(getResponse);
  }

  login(email, password) {
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then(getResponse);
  }

  logout() {
    return fetch(`${this._address}/signout`, {
      method: 'POST',
      credentials: 'include',
    }).then(getResponse);
  }

  checkToken() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(getResponse);
  }

  setUserInfo(name, email) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(getResponse);
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(getResponse);
  }

  saveMovie({
              country,
              director,
              duration,
              year,
              description,
              image,
              trailerLink: trailer,
              thumbnail,
              id: movieId,
              nameRU,
              nameEN,
            }) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    }).then(getResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._address}/movies/${movieId}`, {
      method: "DELETE",
      credentials: "include",
    }).then(getResponse);
  }
}

const mainApi = new MainApi({
  address: 'https://api.diploma.as.nomoredomains.rocks',
});

export default mainApi;
