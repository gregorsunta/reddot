const useOnLoadLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data;
};

export { useOnLoadLocalStorage };
