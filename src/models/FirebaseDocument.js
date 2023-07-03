import { collection, doc, getDoc } from 'firebase/firestore';
import { firestoreService } from '../services/firestore/FirestoreService';

export class FirebaseDocument {
  constructor(id) {
    this.id = id;
  }
  getDocument = async (collection) => {
    const docRef = doc(
      collection(firestoreService.firestore, collection),
      this.id,
    );
    return await getDoc(docRef);
  };
}
