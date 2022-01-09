import React from 'react';

export const defaultUserContext = {
  isLoggedIn: false,
  currentUser: {
    name: '',
    email: '',
  },
};

export const UserContext = React.createContext();
