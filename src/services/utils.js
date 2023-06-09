import { limit, orderBy, where } from 'firebase/firestore';

export const createDocumentIdFilter = (ids) => {
  return where('__name__', 'in', ids);
};

export const debounce = (callback, delay = 500) => {
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
