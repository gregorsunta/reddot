import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config';

const firebaseConfig = getFirebaseConfig();

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {};
