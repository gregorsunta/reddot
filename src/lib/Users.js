import {
  arrayRemove,
  arrayUnion,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { firestoreService } from '../services/firestore/FirestoreService';
import { queries } from '@testing-library/react';

export const getUserRefById = (userId) => {
  return firestoreService.getDocumentRef('users', userId);
};

export const addUser = async (userObj) => {
  await firestoreService.addDocument('users', userObj);
};

export const fetchUserByUserId = async (userId) => {
  try {
    return await firestoreService.getDocumentById(userId, 'users');
  } catch (err) {
    console.error(err);
  }
};

export const fetchUsersByUserIds = async (userIds) => {
  return await firestoreService.getDocumentsByIds(userIds, 'users');
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
