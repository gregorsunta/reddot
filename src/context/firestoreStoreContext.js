import React, { useContext } from 'react';

export const FirestoreStoreContext = React.createContext();

export const useFirestoreStore = () => {
  return useContext(FirestoreStoreContext);
};
