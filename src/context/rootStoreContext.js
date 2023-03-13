import React, { useContext } from 'react';

export const RootStoreContext = React.createContext(null);

export const useRoot = () => {
  return useContext(RootStoreContext);
};
