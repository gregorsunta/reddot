import { addDoc, onSnapshot } from 'firebase/firestore';

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

export const attachOnSnapshot = async (docRef, cb) => {
  // return an unsubscribe function
  return onSnapshot(docRef, (doc) => {
    cb(doc);
  });
};

export const setToBatch = async (ref, obj, batch) => {
  if (batch) {
    batch.set(ref, obj);
  } else {
    console.error('Expected WriteBatch, got: ', batch);
  }
};

export const updateToBatch = async (ref, obj, batch) => {
  if (batch) {
    batch.update(ref, obj);
  } else {
    console.error('Expected WriteBatch, got: ', batch);
  }
};
