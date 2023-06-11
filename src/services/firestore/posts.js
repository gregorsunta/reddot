import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit as queryLimit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { firestoreService } from './FirestoreService';
import { getUser, getUserReferenceByUserId } from './';
import { debounce, limit as callLimit } from '../utils';
import { userStore, authStore } from '../../stores/';
import { toJS } from 'mobx';

const addPost = async (post) => {
  return await addDoc(collection(firestoreService.firestore, 'posts'), {
    authorId: authStore.user.uid,
    title: post.title,
    text: post.text,
    timestamp: serverTimestamp(),
  });
};

const getPost = async (postId) => {
  if (!postId) {
    console.error('Expected postId, got:', postId);
    return null;
  }
  try {
    const docRef = doc(firestoreService.firestore, 'posts', postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const snapData = docSnap.data();
      const author = await getUser(snapData.authorId);
      return { id: docSnap.id, data: { ...snapData, author } };
    }
  } catch (err) {
    console.error(err);
  }
};

const getPosts = async (fieldToSortBy, sortDirection, postNumberLimit) => {
  try {
    const q = query(
      collection(firestoreService.firestore, 'posts'),
      orderBy(fieldToSortBy, sortDirection),
      queryLimit(postNumberLimit),
    );
    const querySnapshot = await getDocs(q);
    const fetchedPosts = [];

    querySnapshot.forEach((docSnap) => {
      const snapData = docSnap.data();
      fetchedPosts.push({
        id: docSnap.id,
        data: { ...snapData },
      });
    });
    const postPromises = fetchedPosts.map(async (post) => {
      const user = await getUser(post.data.authorId);
      return { ...post, data: { ...post.data, author: user } };
    });

    return await Promise.all(postPromises);
  } catch (err) {
    console.error(err);
  }
};

const getPostReferenceByPostId = (postId) => {
  return doc(firestoreService.firestore, 'posts', postId);
};

const checkIfPostUpvoted = (user, postId) => {
  console.log(user);
  return user.upvotedPosts.includes(postId);
};

const checkIfPostDownvoted = (user, postId) => {
  return user.downvotedPosts.includes(postId);
};

const addPostUpvote = async (userId, postId) => {
  const postRef = getPostReferenceByPostId(postId);
  const userRef = getUserReferenceByUserId(userId);

  const batch = writeBatch(firestoreService.firestore);
  batch.update(userRef, {
    upvotedPosts: arrayUnion(postId),
  });
  batch.update(postRef, { upvotes: increment(1) });
  return batch.commit();
};

const addPostDownvote = async (user, postId) => {
  const postRef = getPostReferenceByPostId(postId);
  const userRef = getUserReferenceByUserId(user.uid);

  const batch = writeBatch(firestoreService.firestore);
  batch.update(userRef, {
    downvotedPosts: arrayUnion(postId),
  });
  batch.update(postRef, { downvotes: increment(1) });
  batch.commit();
};

const removePostUpvote = async (userId, postId) => {
  const postRef = getPostReferenceByPostId(postId);
  const userRef = getUserReferenceByUserId(userId);

  const batch = writeBatch(firestoreService.firestore);
  batch.update(userRef, {
    upvotedPosts: arrayRemove(postId),
  });
  batch.update(postRef, { upvotes: increment(-1) });
  return batch.commit();
};

const removePostDownvote = async (userId, postId) => {
  const postRef = getPostReferenceByPostId(postId);
  const userRef = getUserReferenceByUserId(userId);

  const batch = writeBatch(firestoreService.firestore);
  batch.update(userRef, {
    downvotedPosts: arrayRemove(postId),
  });
  batch.update(postRef, { downvotes: increment(-1) });
  return batch.commit();
};

const handlePostUpvote = async (userId, postId) => {
  // firestoreStore.updateCachedUser();

  // checks if cachedUser already upvoted/downvoted
  // ommited non cached user check because it may be out of sync
  const userObj = toJS(userStore.user);
  const cachedUserObj = toJS(userStore.cachedUser);

  const postUpvoted = checkIfPostUpvoted(userObj, postId);
  const postDownvoted = checkIfPostDownvoted(userObj, postId);

  // add upvote to cache
  const updatedList = [userObj.upvotedPosts, postId];
  userStore.setCachedUser({
    ...userObj,
    upvotedPosts: updatedList,
  });

  if (!postUpvoted && !postDownvoted) {
    // try to upvote in firestore
    try {
      await addPostUpvote(userId, postId);
    } catch (err) {
      // could not upvote to firestore
      console.error('Failed to upvote post: ', err);
      userStore.updateCachedUser();
    }
  } else if (!postUpvoted && postDownvoted) {
    // revertDownvote
    try {
      await removePostDownvote(userId, postId);
    } catch (err) {
      console.error('Could not remove post downvote: ', err);
      userStore.updateCachedUser();
    }

    // upvote
  } else if (postUpvoted) {
    try {
      await removePostUpvote(userId, postId);
    } catch (err) {
      console.error('Could not remove post upvote: ', err);
      userStore.updateCachedUser();
    }
  }
};

const handlePostDownvote = async (userId, postId) => {
  // firestoreStore.updateCachedUser();

  // checks if cachedUser already upvoted/downvoted
  // ommited non cached user check because it may be out of sync
  const userObj = toJS(userStore.user);
  const cachedUserObj = toJS(userStore.cachedUser);

  const postUpvoted = checkIfPostUpvoted(userObj, postId);
  const postDownvoted = checkIfPostDownvoted(userObj, postId);

  // add upvote to cache
  const updatedList = [userObj.downvotedPosts, postId];
  userStore.setCachedUser({
    ...userObj,
    downvotedPosts: updatedList,
  });

  if (!postUpvoted && !postDownvoted) {
    // try to upvote in firestore
    try {
      await addPostDownvote(userId, postId);
    } catch (err) {
      // could not upvote to firestore
      console.error('Failed to upvote post: ', err);
      userStore.updateCachedUser();
    }
  } else if (!postUpvoted && postDownvoted) {
    // revertUpvote
    try {
      await removePostUpvote(userId, postId);
    } catch (err) {
      console.error('Could not remove post upvote: ', err);
      userStore.updateCachedUser();
    }

    // upvote
  } else if (postDownvoted) {
    try {
      await removePostDownvote(userId, postId);
    } catch (err) {
      console.error('Could not remove post downvote: ', err);
      userStore.updateCachedUser();
    }
  }
};

const addPostWithDebounce = debounce(addPost);
const getPostWithDebounce = debounce(getPost);
const getPostsWithDebounce = debounce(getPosts);
export {
  getPostsWithDebounce as getPosts,
  getPostWithDebounce as getPost,
  addPostWithDebounce as addPost,
  handlePostUpvote,
};
