import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit as queryLimit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
  arrayUnion,
  arrayRemove,
  startAfter,
  onSnapshot,
  where,
  getFirestore,
} from 'firebase/firestore';

class FirestoreService {
  init = (app) => {
    this.firestore = getFirestore(app);
  };

  updateDocument = async (ref, obj) => {
    updateDoc(ref, obj);
  };

  addDocument = async (collectionName, documentName) => {
    try {
      return await addDoc(
        collection(this.firestore, collectionName),
        documentName,
      );
    } catch (err) {
      console.error(err);
    }
  };

  getDocument = async (ref) => {
    try {
      return await getDoc(ref);
    } catch (err) {
      console.error(err);
    }
  };

  getDocumentsByQuery = async (query) => {
    try {
      return await getDocs(query);
    } catch (err) {
      console.error(err);
    }
  };

  getDocumentsByIds = async (ids, path) => {
    if (!ids || !ids.length || !path) {
      console.info('Aborting getDocumentsByIds() due to parameters missing');
      return null;
    }

    const collectionRef = collection(firestoreService.firestore, path);
    const batches = [];

    while (ids.length) {
      const batch = ids.splice(0, 10);
      const q = query(collectionRef, where('__name__', 'in', batch));
      batches.push(
        getDocs(q).then((querySnapshot) =>
          querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }),
        ),
      );
    }

    // after all of the data is fetched, return it
    return Promise.all(batches).then((content) => content.flat());
  };

  getDocumentById = async (id, ...path) => {
    if (!id || !path) {
      console.info('Aborting getDocumentsByIds() due to parameters missing');
      return null;
    }
    const docRef = this.getDocumentRef(...path, id);
    const doc = await getDoc(docRef);
    if (doc.exists()) {
      return { id: doc.id, ...doc.data() };
    } else {
      console.info(
        'getDocumentById() doc with specified id and path does not exist: id ',
        id,
        'path',
        path,
      );
      return null;
    }
  };

  getDocumentRef = (collectionName, documentId) => {
    if (!documentId) {
      return doc(collection(this.firestore, collectionName));
    }
    return doc(this.firestore, collectionName, documentId);
  };

  attachOnSnapshot = async (docRef, cb) => {
    // return an unsubscribe function
    return onSnapshot(docRef, (doc) => {
      cb(doc);
    });
  };

  setToBatch = async (ref, obj, batch) => {
    if (batch) {
      batch.set(ref, obj);
    } else {
      console.error('Expected WriteBatch, got: ', batch);
    }
  };

  updateToBatch = async (ref, obj, batch) => {
    if (batch) {
      batch.update(ref, obj);
    } else {
      console.error('Expected WriteBatch, got: ', batch);
    }
  };

  deleteToBatch = async (ref, batch) => {
    if (batch) {
      batch.delete(ref);
    } else {
      console.error('Expected WriteBatch, got: ', batch);
    }
  };
}
const firestoreService = new FirestoreService();
export { firestoreService };
