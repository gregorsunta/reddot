import './App.css';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { IconContext } from 'react-icons';
import { firestoreService } from './services/firestore/FirestoreService';
import { getFirebaseConfig } from './services/firebase-config';
import {
  StoreContext,
  FirestoreServiceContext,
  ThemeContext,
  FirestoreStoreContext,
} from './context/';
import { ErrorBoundary } from './utils/';
import { RouterConfig } from './navigation';
import { THEMES } from './styles';
import * as firestoreFunctions from './services/firestore/';
import * as stores from './stores/';
import { useBeforeUnloadLocalStorage, useOnLoadLocalStorage } from './utils/';
import { toJS } from 'mobx';
import { useDebugClick } from './utils/useDebugClick';

const app = initializeApp(getFirebaseConfig());
firestoreService.init(app);

const App = () => {
  const [authStore] = useState(() => stores.authStore);
  const { light, dark } = THEMES;
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  };
  const setLightTheme = () => {
    setTheme(light);
  };
  const setDarkTheme = () => {
    setTheme(dark);
  };
  useEffect(() => {
    authStore.init(app);
  }, [authStore]);

  return (
    <ErrorBoundary fallback={<p>An error occured..</p>}>
      <StoreContext.Provider value={stores}>
        <FirestoreServiceContext.Provider
          value={{ firestoreService, ...firestoreFunctions }}
        >
          <ThemeContext.Provider
            value={{
              theme: theme,
              onSetLightTheme: setLightTheme,
              onSetDarkTheme: setDarkTheme,
              onToggleTheme: toggleTheme,
            }}
          >
            <IconContext.Provider value={{ size: '100%' }}>
              <RouterConfig />
            </IconContext.Provider>
          </ThemeContext.Provider>
        </FirestoreServiceContext.Provider>
      </StoreContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
