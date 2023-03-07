import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config';

class FirestoreService {
  init = (app) => {
    this.firestore = getFirestore(app);
  };
}

export default new FirestoreService();
