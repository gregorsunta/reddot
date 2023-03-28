import React, { useContext } from 'react';

export const AuthStoreContext = React.createContext();

export const useAuthStore = () => {
  return useContext(AuthStoreContext);
};
