export const debounce = (callback, delay = 200) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const idSeperator = (idStr) => {
  return idStr.split('_');
};
