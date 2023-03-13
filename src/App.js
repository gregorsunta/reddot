import './App.css';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { IconContext } from 'react-icons';
import FirestoneService from './services/FirestoreService';
import { getFirebaseConfig } from './services/firebase-config';
import createRootStore from './stores/rootStore';
import { RootStoreContext } from './context/rootStoreContext';
import { RouterConfig } from './navigation';

const app = initializeApp(getFirebaseConfig());
FirestoneService.init(app);

const App = () => {
  const [rootStore] = useState(() => createRootStore(app));

  return (
    <IconContext.Provider value={{ size: '100%' }}>
      <RootStoreContext.Provider value={rootStore}>
        <RouterConfig />
      </RootStoreContext.Provider>
    </IconContext.Provider>
  );
};

export default App;
