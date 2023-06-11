import { firestoreService } from './firestore/FirestoreService';
const { firestore } = firestoreService;

export const debounce = (callback, delay = 200) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = callback(...args);
        resolve(result);
      }, delay);
    });
  };
};

export const limit = (callback, limit) => {};
