import './App.css';
import './utils/utilityStyles.css';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { IconContext } from 'react-icons';
import FirestoneService from './services/FirestoreService';
import { getFirebaseConfig } from './services/firebase-config';
import AuthStore from './stores/authStore';
import { AuthStoreContext } from './context/authStoreContext';
import { RouterConfig } from './navigation';

const app = initializeApp(getFirebaseConfig());
FirestoneService.init(app);

const App = () => {
  const [authStore] = useState(() => AuthStore);
  useEffect(() => {
    authStore.init(app);
  }, [authStore]);

  return (
    <IconContext.Provider value={{ size: '100%' }}>
      <AuthStoreContext.Provider value={authStore}>
        <RouterConfig />
      </AuthStoreContext.Provider>
    </IconContext.Provider>
  );
};

export default App;
