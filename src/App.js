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

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const AuthStore = new authStore(auth);
FirestoneService.init(app);

const App = () => {
  return (
    <AuthContext.Provider value={AuthStore}>
      <RouterConfig />
    </AuthContext.Provider>
  );
};

export default App;
