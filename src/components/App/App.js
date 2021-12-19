import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ComponentWithNavigation from '../ComponentWithNavigation/ComponentWithNavigation';

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="*"
                 element={<NotFound/>}/>
          <Route path="/"
                 element={<ComponentWithNavigation isHeaderEnabled={true}
                                                   isFooterEnabled={true}><Main/></ComponentWithNavigation>}/>
          <Route path="/movies"
                 element={<ComponentWithNavigation isHeaderEnabled={true}
                                                   isFooterEnabled={true}><Movies/></ComponentWithNavigation>}/>
          <Route path="/saved-movies"
                 element={<ComponentWithNavigation isHeaderEnabled={true}
                                                   isFooterEnabled={true}><SavedMovies/></ComponentWithNavigation>}/>
          <Route path="/profile"
                 element={<ComponentWithNavigation isHeaderEnabled={true}
                                                   isFooterEnabled={false}><Profile/></ComponentWithNavigation>}/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
