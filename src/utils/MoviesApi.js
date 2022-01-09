import { getResponse } from './utils';

class MoviesApi {
  constructor({ address, baseAddress }) {
    this._baseAddress = baseAddress;
    this._fullAddress = baseAddress + address;
  }

  getMovies() {
    return fetch(`${this._fullAddress}`, {
      method: 'GET',
    }).then(getResponse);
  }

  getBaseAddress() {
    return this._baseAddress;
  }
}

const moviesApi = new MoviesApi({
  baseAddress: 'https://api.nomoreparties.co',
  address: '/beatfilm-movies',
});

export default moviesApi;
