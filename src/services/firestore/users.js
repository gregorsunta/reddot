import { serverTimestamp } from 'firebase/firestore';
import { firestoreService } from './FirestoreService';

const { addDocument } = firestoreService;

export const addUserToDatabase = async (user) => {
  return await addDocument('users', {
    user: user.id,
    timestamp: serverTimestamp(),
  });
};
export const addUser = async (post) => {
  this.addPostToDatabase(post);
};
