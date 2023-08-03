import { useEffect } from 'react';
import { contentStore } from '../stores';
import { toJS } from 'mobx';

const useDebugClick = () => {
  useEffect(() => {
    const handleDebugClick = () => {
      console.log(toJS(contentStore.posts));
      console.log(toJS(contentStore.tempPost));
    };
    window.addEventListener('click', handleDebugClick);
    return () => {
      window.removeEventListener('click', handleDebugClick);
    };
  });
  return null;
};

export { useDebugClick };
