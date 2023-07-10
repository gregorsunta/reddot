import {
  arrayRemove,
  arrayUnion,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAt,
  writeBatch,
} from 'firebase/firestore';
import * as Users from './Users';
import { firestoreService } from '../services/firestore/FirestoreService';
import { debounce } from './utils';

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
    upvotes: 1,
    downvotes: 0,
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
  if (!postId) {
    console.error('Expected postId, got:', postId);
    return null;
  }
  try {
    const docRef = firestoreService.getDocumentRef('posts', postId);
    const docSnap = await firestoreService.getDocument(docRef);
    if (docSnap.exists()) {
      const snapData = docSnap.data();
      return { id: docSnap.id, ...snapData };
    }
  } catch (err) {
    console.error(err);
  }
};

// export const fetchPostDebounce = debounce(fetchPost);

export const fetchPostWithOwner = async (postId) => {
  const post = await this.fetchPost(postId);
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

// export const fetchPostsByQueryParamsWithDebounce = debounce(
//   fetchPostsByQueryParams,
// );

// export const fetchPostsDebounce = debounce(fetchPosts);

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
