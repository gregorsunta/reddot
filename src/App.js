import './App.css';
import './utils/utilityStyles.css';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { IconContext } from 'react-icons';
import { firestoreService } from './services/FirestoreService';
import { getFirebaseConfig } from './services/firebase-config';
import AuthStore from './stores/authStore';
import {
  AuthStoreContext,
  FirestoreServiceContext,
  ThemeContext,
} from './context/';
import ErrorBoundary from './utils/ErrorBoundary.jsx';
import { RouterConfig } from './navigation';
import { THEMES } from './constants';

const app = initializeApp(getFirebaseConfig());
firestoreService.init(app);

const App = () => {
  const [authStore] = useState(() => AuthStore);
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
      <FirestoreServiceContext.Provider value={firestoreService}>
        <AuthStoreContext.Provider value={authStore}>
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
        </AuthStoreContext.Provider>
      </FirestoreServiceContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
