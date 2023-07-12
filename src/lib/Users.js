import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import * as Posts from './Posts';
import * as Users from './Users';
import { firestoreService } from '../services/firestore/FirestoreService';
import { debounce } from './utils';
import { runInAction } from 'mobx';

export const getUserRefById = (userId) => {
  return firestoreService.getDocumentRef('users', userId);
};

export const addUser = async (userObj) => {
  await firestoreService.addDocument('users', userObj);
};

export const fetchUserByUserId = async (userId) => {
  try {
    if (!userId) {
      console.error('Expected userId, got:', userId);
      return null;
    }
    const docRef = getUserRefById(userId);
    const docSnap = await firestoreService.getDocument(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn(`Doc snap does not exist.`);
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

export const checkUser = async (user) => {
  const userExists = await userExistsInDatabase(user);
  !userExists && addUserToDatabase(user);
};

export const userExistsInDatabase = async (userObj) => {
  const user = await fetchUserByUserId(userObj.uid);
  return user.exists();
};

export const addUserToDatabase = async (userObj) => {
  await addUser(userObj);
};

export const addCommentId = async (userId, commentId, batch) => {
  const userRef = getUserRefById(userId);
  const objToUpdate = {
    postIds: arrayUnion(commentId),
  };
  firestoreService.updateToBatch(userRef, objToUpdate, batch);
};

export const removeCommentId = async (userId, commentId, batch) => {
  const userRef = getUserRefById(userId);
  const objToUpdate = {
    postIds: arrayRemove(commentId),
  };
  firestoreService.updateToBatch(userRef, objToUpdate, batch);
};

export const addPostId = async (userId, postId, batch) => {
  const userRef = getUserRefById(userId);
  const objToUpdate = {
    postIds: arrayUnion(postId),
  };
  await firestoreService.updateToBatch(userRef, objToUpdate, batch);
};

export const removePostId = async (userId, postId, batch) => {
  const userRef = getUserRefById(userId);
  const objToUpdate = {
    postIds: arrayRemove(postId),
  };
  await firestoreService.updateToBatch(userRef, objToUpdate, batch);
};

export const addVoteId = async (userId, voteId, batch) => {
  const userRef = getUserRefById(userId);
  const objToUpdate = {
    voteIds: arrayUnion(voteId),
  };
  await firestoreService.updateToBatch(userRef, objToUpdate, batch);
};

export const removeVoteId = async (userId, voteId, batch) => {
  const userRef = getUserRefById(userId);
  const objToUpdate = {
    voteIds: arrayRemove(voteId),
  };
  await firestoreService.updateToBatch(userRef, objToUpdate, batch);
};
