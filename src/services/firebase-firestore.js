import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import getFirebaseConfig from './firebase-config';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const firebaseApp = initializeApp(getFirebaseConfig);

const db = getFirestore(firebaseApp);

const addDocFirestore = async (path) => {
  try {
    const docRef = await addDoc(collection(db, ...path), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document added.');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
const getDocsFirestore = async (path) => {
  const data = await getDocs(collection(db, 'users'));
  return data;
};
const deleteDocFirestore = async (path) => {
  try {
    await deleteDoc(doc(db, ...path));
  } catch (err) {
    console.error(err);
  }
};

export {
  getDocsFirestore as getDocs,
  addDocFirestore as addData,
  deleteDocFirestore as deleteDocs,
};
