import { useEffect } from 'react';

const useBeforeUnloadLocalStorage = (key, data) => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      localStorage.setItem(key, JSON.stringify(data));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  return null;
};

export { useBeforeUnloadLocalStorage };
