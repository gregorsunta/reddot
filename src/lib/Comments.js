import {
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import * as Posts from './Posts';
import * as Users from './Users';
import * as Votes from './Votes';
import { firestoreService } from '../services/firestore/FirestoreService';

export const addComment = async (userId, postId, comment) => {
  const batch = writeBatch(firestoreService.firestore);
  const commentCollectionRef = doc(
    collection(firestoreService.firestore, 'comments'),
  );
  // add comment to the db

  batch.set(commentCollectionRef, {
    authorId: userId,
    text: comment.text,
    votes: 0,
    timestamp: serverTimestamp(),
  });

  // add id (ref id) to the user

  Users.addCommentId(userId, commentCollectionRef.id, batch);

  // add id (ref id) to the post

  Posts.addCommentId(postId, commentCollectionRef.id, batch);

  // execute WriteBatch
  try {
    await batch.commit();
  } catch (err) {
    console.error(err);
  }
};

export const removeComment = async (userId, postId, commentId) => {
  const batch = writeBatch(firestoreService.firestore);
  const commentDocRef = getCommentReferenceByCommentId(commentId);
  const voteId = Votes.createVoteId('comments', commentId);
  // remove comment from the db

  batch.delete(commentDocRef);

  // remove commentId from entities

  Users.removeCommentId(userId, commentId, batch);

  Posts.removeCommentId(postId, commentId, batch);

  // remove vote
  await Votes.removeVote(userId, voteId, batch);

  Users.removeVoteId(userId, voteId, batch);

  // execute
  try {
    await batch.commit();
  } catch (err) {
    console.error(err);
  }
};

export const fetchCommentsByIds = async (commentIds) => {
  if (commentIds.length === 0 || !commentIds) {
    console.info('CommentIds from post missing, aborting getCommentsByPostId.');
    return null;
  }
  // const fetchedComments = [];
  try {
    const content = await firestoreService.getDocumentsByIds(
      commentIds,
      'comments',
    );
    return content;
    // const q = query(
    //   collection(firestoreService.firestore, 'comments'),
    //   where('__name__', 'in', commentIds),
    // );
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) =>
    //   fetchedComments.push({ id: doc.id, data: doc.data() }),
    // );
    // return fetchedComments;
  } catch (err) {
    console.error(err);
  }
};

export const getCommentReferenceByCommentId = (commentId) => {
  return doc(firestoreService.firestore, 'comments', commentId);
};

export const addAuthorsToComments = (comments) => {
  const commentsWithAuthors = comments.map(async (comment) => {
    const author = await Users.fetchUserByUserId(comment.authorId);
    return { ...comment, author: author };
  });

  return Promise.all(commentsWithAuthors);
};

export const getCommentsByIdsWithAuthors = async (commentIds) => {
  const comments = await fetchCommentsByIds(commentIds);
  const commentsWithAuthors = comments.map(async (comment) => {
    const author = await Users.fetchUserByUserId(comment.authorId);
    return { ...comment, author: { ...author } };
  });
  return await Promise.all(commentsWithAuthors);
};

export const incrementCommentVotes = async (commendId, value, batch) => {
  const commentRef = getCommentReferenceByCommentId(commendId);
  const objToUpdate = { votes: increment(value) };
  firestoreService.updateToBatch(commentRef, objToUpdate, batch);
};
