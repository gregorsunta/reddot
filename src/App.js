import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { observer } from 'mobx-react';
import { getAuth, GoogleAuthProvider, initializeAuth } from 'firebase/auth';
import { RouterConfig } from './navigation';
import authStore from './stores/authStore';
import { getFirebaseConfig } from './services/firebase-config';
import './App.css';
import { AuthContext } from './context/authContext';

const app = initializeApp(getFirebaseConfig());

const auth = getAuth(app);

const store = new authStore(auth);

const db = getFirestore();

const App = () => {
  return (
    <AuthContext.Provider value={store}>
      <RouterConfig />
    </AuthContext.Provider>
  );
};

export default App;
