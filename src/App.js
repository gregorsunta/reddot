import './App.css';
import './utils/utilityStyles.css';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { IconContext } from 'react-icons';
import { firestoreService } from './services/FirestoreService';
import { getFirebaseConfig } from './services/firebase-config';
import AuthStore from './stores/authStore';
import { AuthStoreContext } from './context/authStoreContext';
import { FirestoreServiceContext } from './context/firestoreServiceContext';

import { RouterConfig } from './navigation';

const app = initializeApp(getFirebaseConfig());
firestoreService.init(app);

const App = () => {
  const [authStore] = useState(() => AuthStore);
  useEffect(() => {
    authStore.init(app);
  }, [authStore]);

  return (
    <FirestoreServiceContext.Provider value={firestoreService}>
      <AuthStoreContext.Provider value={authStore}>
        <IconContext.Provider value={{ size: '100%' }}>
          <RouterConfig />
        </IconContext.Provider>
      </AuthStoreContext.Provider>
    </FirestoreServiceContext.Provider>
  );
};

export default App;
