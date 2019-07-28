import React, { useContext } from 'react';

const GlobalState = React.createContext({
  user: null,
});

export const GlobalStateProvider = GlobalState.Provider;

export const useGlobalState = () => {
  return useContext(GlobalState);
};
