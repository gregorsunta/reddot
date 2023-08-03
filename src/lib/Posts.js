import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  onSnapshot,
  queryEqual,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import * as Users from './Users';
import * as Comments from './Comments';
import * as Votes from './Votes';
import { firestoreService } from '../services/firestore/FirestoreService';

export const updatePost = async (postRef, objToUpdate, batch) => {
  if (batch) {
    batch.update(postRef, objToUpdate);
  } else {
    firestoreService.updateDocument(postRef, objToUpdate);
  }
};

export const addPost = async (post, userId) => {
  const batch = writeBatch(firestoreService.firestore);
  const postRef = firestoreService.getDocumentRef('posts');

  const objToSet = {
    authorId: userId,
    title: post.title,
    text: post.text,
    timestamp: serverTimestamp(),
    votes: 0,
  };

  // add to db
  await firestoreService.setToBatch(postRef, objToSet, batch);

  // add to user
  await Users.addPostId(userId, postRef.id, batch);

  try {
    await batch.commit();
  } catch (err) {
    console.error(err);
  }
};

export const removePost = async (userId, postId, commentId) => {
  const batch = writeBatch(firestoreService.firestore);
  const postRef = getPostReferenceByPostId(postId);
  const voteId = Votes.createVoteId('posts', postId);

  // remove post from the db

  batch.delete(postRef);

  // remove ids from the entity

  Users.removePostId(userId, commentId, batch);

  // remove vote

  Votes.removeVote(userId, voteId, batch);

  // remove comments

  /////////////
  /* missing */
  /////////////

  // execute

  try {
    await batch.commit();
  } catch (err) {
    console.error(err);
  }
};

export const addCommentId = async (postId, commentId, batch) => {
  const postRef = firestoreService.getDocumentRef('posts', postId);
  const objToUpdate = { commentIds: arrayUnion(commentId) };
  updatePost(postRef, objToUpdate, batch);
};

export const removeCommentId = async (postId, commentId, batch) => {
  const postRef = firestoreService.getDocumentRef('posts', postId);
  const objToUpdate = { commentIds: arrayRemove(commentId) };
  updatePost(postRef, objToUpdate, batch);
};

export const fetchPost = async (postId) => {
  try {
    return await firestoreService.getDocumentById(postId, 'posts');
  } catch (err) {
    console.error(err);
  }
};

export const fetchPostWithOwner = async (postId) => {
  const post = await fetchPost(postId);
  const author = await Users.fetchUserByUserId(post.id);
  return { ...post, ...author };
};

export const fetchPostsByQueryParams = async (query) => {
  console.info('fetchPostsByQueryParams()');

  try {
    const querySnapshot = await firestoreService.getDocumentsByQuery(query);
    const fetchedPosts = [];

    querySnapshot.forEach((docSnap) => {
      const snapData = docSnap.data();
      const id = docSnap.id;
      fetchedPosts.push({ ...snapData, id: id });
    });
    return fetchedPosts;
  } catch (err) {
    console.error(err);
  }
};

export const getPostReferenceByPostId = (postId) => {
  return firestoreService.getDocumentRef('posts', postId);
};

export const addAuthorsToPosts = async (posts) => {
  const postsWithAuthors = posts.map(async (post) => {
    const author = await Users.fetchUserByUserId(post.authorId);
    return { ...post, author: author };
  });

  return Promise.all(postsWithAuthors);
};

export const addAuthorToPost = async (post) => {
  const author = await Users.fetchUserByUserId(post.authorId);
  return { ...post, author: author };
};

export const incrementPostVotes = async (postId, value, batch) => {
  const postRef = getPostReferenceByPostId(postId);
  const objToUpdate = { votes: increment(value) };
  firestoreService.updateToBatch(postRef, objToUpdate, batch);
};

// listeners

export const subscribeToPost = (postId, handleDoc) => {
  if (!postId) {
    console.error('subscribeToPost() no id specified.');
  }
  const postRef = getPostReferenceByPostId(postId);

  return onSnapshot(postRef, (docSnap) => {
    if (docSnap.exists()) {
      handleDoc({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.warn(
        'subscribeToPost() post with specified postId does not exist.',
      );
    }
  });
};

export const subscribeToPostsWithOwnersByQueryParams = (query, handleDoc) => {
  console.info('subscribeToPostsByQueryParams()');

  return onSnapshot(query, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      handleDoc({ id: doc.id, ...doc.data() });
    });
  });
};
