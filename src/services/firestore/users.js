import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { firestoreService } from './FirestoreService';
import { debounce } from '../utils';

const addUser = async (user) => {
  return await setDoc(doc(firestoreService.firestore, 'users', user.uid), {
    displayName: user.displayName,
    timestamp: serverTimestamp(),
    profilePicURL: user.photoURL,
    postIds: [],
    commentIds: [],
    upvotedPosts: [],
    downvotedPosts: [],
    upvotedComments: [],
    downvotedComments: [],
  });
};

const getUser = async (userId) => {
  try {
    if (!userId) {
      console.error('Expected userId, got:', userId);
      return null;
    }
    const docRef = doc(firestoreService.firestore, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn(`Doc snap does not exist.`);
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

const getUserReferenceByUserId = (userId) => {
  return doc(firestoreService.firestore, 'users', userId);
};

const getUserWithDebounce = debounce(getUser);
const addUserWithDebounce = debounce(addUser);
export {
  getUserWithDebounce as getUser,
  addUserWithDebounce as addUser,
  getUserReferenceByUserId,
};
