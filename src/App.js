import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { observer } from 'mobx-react';
import { RouterConfig } from './navigation';
import RootStore from './stores/rootStore';
import FirestoneService from './services/FirestoreService';
import { getFirebaseConfig } from './services/firebase-config';
import './App.css';
import { AuthContext } from './context/authContext';
import { IconContext } from 'react-icons';

const app = initializeApp(getFirebaseConfig());
FirestoneService.init(app);

const App = () => {
  const [rootStore] = useState(() => RootStore(app));
  return (
    <IconContext.Provider value={{ size: '100%' }}>
      <AuthContext.Provider rootStore={rootStore}>
        <RouterConfig />
      </AuthContext.Provider>
    </IconContext.Provider>
  );
};

export default App;
