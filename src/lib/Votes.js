import { writeBatch } from 'firebase/firestore';
import { firestoreService } from '../services/firestore/FirestoreService';
import * as Users from './Users';
import * as Posts from './Posts';
import * as Comments from './Comments';
import { idSeperator } from './utils';

export const getVoteRefByVoteId = (voteId) => {
  return firestoreService.getDocumentRef('votes', voteId);
};

export const getVoteById = async (voteId) => {
  try {
    return await firestoreService.getDocumentById(voteId, 'votes');
  } catch (error) {
    console.error('getVoteById()', error);
  }
};

export const createVoteId = (collectionName, documentId) => {
  return `${collectionName}_${documentId}`;
};

export const addVote = async (collectionName, documentId, voterId, type) => {
  const voteId = createVoteId(collectionName, documentId);
  const vote = { voterId: voterId, type: type };
  const batch = writeBatch(firestoreService.firestore);
  const docRef = firestoreService.getDocumentRef('votes', voteId);

  // add doc to collection
  firestoreService.setToBatch(docRef, vote, batch);

  // add vote id to user
  Users.addVoteId(voterId, voteId, batch);

  // increment/decrement value of voted object

  const value = vote.type === 'upvote' ? 1 : -1;

  if (collectionName === 'posts') {
    Posts.incrementPostVotes(documentId, value, batch);
  } else if (collectionName === 'comments') {
    Comments.incrementCommentVotes(documentId, value, batch);
  } else {
    console.error(
      `addVote(): the specified id (vote.id) does not contain a valid collection name: `,
      vote.id,
    );
  }

  try {
    batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const removeVote = async (voterId, voteId, optionalBatch) => {
  const batch = optionalBatch ?? writeBatch(firestoreService.firestore);
  const docRef = getVoteRefByVoteId(voteId);
  const vote = await getVoteById(voteId);
  const [collectionName, documentId] = idSeperator(voteId);

  if (!vote) {
    console.info(
      'removeVote() vote from getVoteById() returned null. Aborting',
    );
    return;
  }

  // remove doc from collection

  firestoreService.deleteToBatch(docRef, batch);

  // remove vote id from user

  Users.removeVoteId(voterId, voteId, batch);

  // increment/decrement votes object

  const value = vote.type === 'upvote' ? 1 : -1;

  if (collectionName === 'posts') {
    // pass inverted value
    Posts.incrementPostVotes(documentId, -value, batch);
  } else if (collectionName === 'comments') {
    // pass inverted value
    Comments.incrementCommentVotes(documentId, -value, batch);
  } else {
    console.error(
      `addVote(): the specified id (vote.id) does not contain a valid collection name: `,
      vote.id,
    );
  }
  if (!optionalBatch) {
    batch.commit();
  }
};

export const invertVote = async (voteId) => {
  const batch = writeBatch(firestoreService.firestore);
  const docRef = getVoteRefByVoteId(voteId);
  const vote = await getVoteById(voteId);
  const objToUpdate = { type: vote.type === 'upvote' ? 'downvote' : 'upvote' };

  // update doc in collection

  firestoreService.updateToBatch(docRef, objToUpdate, batch);

  // increment/decrement votes object

  const [collectionName, documentId] = idSeperator(voteId);

  // increment/decrement twice, once to revert the previous vote and once for the new vote

  const value = vote.type === 'upvote' ? -2 : 2;

  if (collectionName === 'posts') {
    Posts.incrementPostVotes(documentId, value, batch);
  } else if (collectionName === 'comments') {
    Comments.incrementCommentVotes(documentId, value, batch);
  } else {
    console.error(
      `addVote(): the specified id (vote.id) does not contain a valid collection name: `,
      vote.id,
    );
  }

  // execute
  try {
    batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const handleVote = async (collectionName, documentId, voterId, type) => {
  const voteId = createVoteId(collectionName, documentId);
  const vote = await getVoteById(voteId);
  if (vote) {
    console.info('handleVote() vote found. ');

    if (vote.type === type) {
      // remove vote
      console.info('handleVote() removing vote. ');
      await removeVote(voterId, voteId);
    } else {
      console.info('handleVote() inverting vote. ');
      await invertVote(voteId);
    }
  } else {
    console.info('handleVote() vote not found. Adding new vote.');
    await addVote(collectionName, documentId, voterId, type);
  }
};
