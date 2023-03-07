import React, { useContext } from 'react';

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
