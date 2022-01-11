import React from 'react';

export const RequestStatusContext = React.createContext({
  requestStatus: {
    isRunning: false,
    isError: false,
    message: '',
  },
  setApiContext: () => {
  },
});
