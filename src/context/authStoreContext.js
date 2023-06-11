import React, { useContext } from 'react';

export const StoreContext = React.createContext();

export const useStores = () => {
  return useContext(StoreContext);
};
