import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import * as Posts from './Posts';
import * as Users from './Users';
import { firestoreService } from '../services/firestore/FirestoreService';
import { debounce } from './utils';

export const addComment = async (userId, postId, comment) => {
  const batch = writeBatch(firestoreService.firestore);
  const commentCollectionRef = doc(
    collection(firestoreService.firestore, 'comments'),
  );
  // add comment to the db

  batch.set(commentCollectionRef, {
    authorId: userId,
    text: comment.text,
    upvotes: comment.upvotes,
    downvotes: comment.downvotes,
    timestamp: serverTimestamp(),
  });

  // add id (ref id) to the user

  Users.addCommentId(userId, commentCollectionRef.id, batch);

  // add id (ref id) to the post

  Users.addCommentId(postId, commentCollectionRef.id, batch);

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
  // remove comment from the db

  batch.delete(commentDocRef);

  // remove id (ref id) from the user

  Users.removeCommentId(userId, commentId, batch);

  // add id (ref id) to the post

  Posts.removeCommentId(postId, commentId, batch);

  // execute WriteBatch
  try {
    await batch.commit();
  } catch (err) {
    console.error(err);
  }
};

export const fetchCommentsByIds = async (commentIds) => {
  if (!commentIds) {
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
