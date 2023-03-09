import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { observer } from 'mobx-react';
import { getAuth, GoogleAuthProvider, initializeAuth } from 'firebase/auth';
import { RouterConfig } from './navigation';
import authStore from './stores/authStore';
import FirestoneService from './services/FirestoreService';
import { getFirebaseConfig } from './services/firebase-config';
import './App.css';
import { AuthContext } from './context/authContext';
import { IconContext } from 'react-icons';

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const AuthStore = new authStore(auth);
FirestoneService.init(app);

const App = () => {
  return (
    <IconContext.Provider value={{ size: '100%' }}>
      <AuthContext.Provider value={AuthStore}>
        <RouterConfig />
      </AuthContext.Provider>
    </IconContext.Provider>
  );
};

export default App;
