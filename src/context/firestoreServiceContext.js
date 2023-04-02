import { createContext, useContext } from 'react';

export const FirestoreServiceContext = createContext();
export const useFirestoreService = () => {
  return useContext(FirestoreServiceContext);
};
