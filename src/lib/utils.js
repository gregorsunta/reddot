import {
  FieldPath,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { firestoreService } from '../services/firestore/FirestoreService';

export const debounce = (callback, delay = 500) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
