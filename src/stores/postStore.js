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
import { firestoreService } from '../services/firestore/FirestoreService';
import { debounce, limit as callLimit } from '../utils';
import { userStore, authStore } from './';
import { makeAutoObservable, toJS } from 'mobx';

class PostStore {
  _posts = null;

  constructor() {
    makeAutoObservable(this);
  }

  set posts(newPosts) {
    this._posts = newPosts;
  }

  get posts() {
    return this._posts;
  }

  updateDocument = async (ref, obj, batch) => {
    if (batch) {
      batch.update(ref, obj);
    } else {
      console.error('Expected WriteBatch, got: ', batch);
    }
  };

  addDocument = async (ref, obj, batch) => {
    if (batch) {
      batch.set(ref, obj);
    } else {
      console.error('Expected WriteBatch, got: ', batch);
    }
  };

  addPost = async (post) => {
    const batch = writeBatch();
    const postCollectionRef = collection(firestoreService.firestore, 'posts');
    const objToSet = {
      authorId: authStore.user.uid,
      title: post.title,
      text: post.text,
      timestamp: serverTimestamp(),
    };

    // add to db
    this.addDocument(postCollectionRef, objToSet, batch);

    // add to user
    userStore.addOwnPostId();
  };

  addCommentId = async (postId, commentId, batch) => {
    const postRef = doc(
      collection(firestoreService.firestore, 'posts'),
      postId,
    );
    const objToUpdate = { commentIds: arrayUnion(commentId) };
    this.updateDocument(postRef, objToUpdate, batch);
  };

  getPost = async (postId) => {
    if (!postId) {
      console.error('Expected postId, got:', postId);
      return null;
    }
    try {
      const docRef = doc(firestoreService.firestore, 'posts', postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const snapData = docSnap.data();
        return { ...snapData };
      }
    } catch (err) {
      console.error(err);
    }
  };

  getPosts = async (fieldToSortBy, sortDirection, postNumberLimit) => {
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
        const id = docSnap.id;
        fetchedPosts.push({ data: { ...snapData }, id: id });
      });
      return fetchedPosts;
    } catch (err) {
      console.error(err);
    }
  };

  getPostsForStore = async (fieldToSortBy, sortDirection, postNumberLimit) => {
    const posts = await this.getPosts(
      fieldToSortBy,
      sortDirection,
      postNumberLimit,
    );
    this.posts = posts;
  };

  getPostReferenceByPostId = (postId) => {
    return doc(firestoreService.firestore, 'posts', postId);
  };

  checkIfPostUpvoted = (user, postId) => {
    console.log(user);
    return user.upvotedPosts.includes(postId);
  };

  checkIfPostDownvoted = (user, postId) => {
    return user.downvotedPosts.includes(postId);
  };

  addPostUpvote = async (userId, postId) => {
    const batch = writeBatch(firestoreService.firestore);
    const postRef = this.getPostReferenceByPostId(postId);

    // update post
    batch.update(postRef, { upvotes: increment(1) });

    // update users upvoted posts
    userStore.addUpvotedPostId(userId, postId, batch);

    return batch.commit();
  };

  addPostDownvote = async (userId, postId) => {
    const batch = writeBatch(firestoreService.firestore);
    const postRef = this.getPostReferenceByPostId(postId);

    // update post
    batch.update(postRef, { downvotes: increment(1) });

    // update users upvoted posts
    userStore.addDownvotedPostId(userId, postId, batch);

    return batch.commit();
  };

  removePostUpvote = async (userId, postId) => {
    const postRef = this.getPostReferenceByPostId(postId);
    const batch = writeBatch(firestoreService.firestore);

    // update post
    batch.update(postRef, { upvotes: increment(-1) });

    // update user
    userStore.removeUpvotedPostId(userId, postId, batch);

    return batch.commit();
  };

  removePostDownvote = async (userId, postId) => {
    const postRef = this.getPostReferenceByPostId(postId);
    const batch = writeBatch(firestoreService.firestore);

    // update post
    batch.update(postRef, { downvotes: increment(-1) });

    // update user
    userStore.removeDownvotedPostId(userId, postId, batch);

    return batch.commit();
  };

  handlePostUpvote = async (userId, postId) => {
    // firestoreStore.updateCachedUser();

    // checks if cachedUser already upvoted/downvoted
    // ommited non cached user check because it may be out of sync
    const userObj = toJS(userStore.user);
    const cachedUserObj = toJS(userStore.cachedUser);

    const postUpvoted = this.checkIfPostUpvoted(userObj, postId);
    const postDownvoted = this.checkIfPostDownvoted(userObj, postId);

    // add upvote to cache
    const updatedList = [userObj.upvotedPosts, postId];
    userStore.setCachedUser({
      ...userObj,
      upvotedPosts: updatedList,
    });

    if (!postUpvoted && !postDownvoted) {
      // try to upvote in firestore
      try {
        await this.addPostUpvote(userId, postId);
      } catch (err) {
        // could not upvote to firestore
        console.error('Failed to upvote post: ', err);
        userStore.updateCachedUser();
      }
    } else if (!postUpvoted && postDownvoted) {
      // revertDownvote
      try {
        await this.removePostDownvote(userId, postId);
      } catch (err) {
        console.error('Could not remove post downvote: ', err);
        userStore.updateCachedUser();
      }

      // upvote
    } else if (postUpvoted) {
      try {
        await this.removePostUpvote(userId, postId);
      } catch (err) {
        console.error('Could not remove post upvote: ', err);
        userStore.updateCachedUser();
      }
    }
  };

  handlePostDownvote = async (userId, postId) => {
    // firestoreStore.updateCachedUser();

    // checks if cachedUser already upvoted/downvoted
    // ommited non cached user check because it may be out of sync
    const userObj = toJS(userStore.user);
    const cachedUserObj = toJS(userStore.cachedUser);

    const postUpvoted = this.checkIfPostUpvoted(userObj, postId);
    const postDownvoted = this.checkIfPostDownvoted(userObj, postId);

    // add upvote to cache
    const updatedList = [userObj.downvotedPosts, postId];
    userStore.setCachedUser({
      ...userObj,
      downvotedPosts: updatedList,
    });

    if (!postUpvoted && !postDownvoted) {
      // try to upvote in firestore
      try {
        await this.addPostDownvote(userId, postId);
      } catch (err) {
        // could not upvote to firestore
        console.error('Failed to upvote post: ', err);
        userStore.updateCachedUser();
      }
    } else if (!postUpvoted && postDownvoted) {
      // revertUpvote
      try {
        await this.removePostUpvote(userId, postId);
      } catch (err) {
        console.error('Could not remove post upvote: ', err);
        userStore.updateCachedUser();
      }

      // upvote
    } else if (postDownvoted) {
      try {
        await this.removePostDownvote(userId, postId);
      } catch (err) {
        console.error('Could not remove post downvote: ', err);
        userStore.updateCachedUser();
      }
    }
  };
}

const postStore = new PostStore();
export { postStore };
