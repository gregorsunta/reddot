import { useEffect } from 'react';
import { commentStore, postStore } from '../stores';
import { toJS } from 'mobx';

const useDebugClick = () => {
  useEffect(() => {
    const handleDebugClick = () => {
      console.log(toJS(postStore.posts));
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
