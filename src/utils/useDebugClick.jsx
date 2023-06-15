import { useEffect } from 'react';
import { authStore, commentStore, postStore } from '../stores';
import { toJS } from 'mobx';

const useDebugClick = () => {
  useEffect(() => {
    const handleDebugClick = () => {
      console.log(toJS(commentStore.comments));
    };
    window.addEventListener('click', handleDebugClick);
    return () => {
      window.removeEventListener('click', handleDebugClick);
    };
  });
  return null;
};

export { useDebugClick };
