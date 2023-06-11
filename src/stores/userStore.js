import { makeAutoObservable } from 'mobx';
import {
  arrayRemove,
  onSnapshot,
  collection,
  arrayUnion,
  doc,
} from 'firebase/firestore';
import { firestoreService } from '../services/firestore/FirestoreService';

class UserStore {
  _user = null;
  _cachedUser = null;

  constructor() {
    makeAutoObservable(this);
  }

  get user() {
    return this._user;
  }

  get userId() {
    return this._user.id;
  }

  get cachedUser() {
    return this._cachedUser;
  }

  getUserRefById = (userId) => {
    return doc(collection(firestoreService.firestore, 'users'), userId);
  };

  updateDocument = async (ref, obj, batch) => {
    if (batch) {
      batch.update(ref, obj);
    } else {
      console.error('Expected WriteBatch, got: ', batch);
    }
  };

  addCommentId = async (userId, commentId, batch) => {
    const userRef = this.getUserRefById(userId);
    const objToUpdate = {
      postIds: arrayUnion(commentId),
    };
    this.updateDocument(userRef, objToUpdate, batch);
  };

  addUpvotedPostId = async (userId, postId, batch) => {
    const userRef = this.getUserRefById(userId);
    const objToUpdate = {
      upvotedPosts: arrayUnion(postId),
    };
    this.updateDocument(userRef, objToUpdate, batch);
  };

  addDownvotedPostId = async (userId, postId, batch) => {
    const userRef = this.getUserRefById(userId);
    const objToUpdate = {
      downvotedPosts: arrayUnion(postId),
    };
    this.updateDocument(userRef, objToUpdate, batch);
  };

  removeUpvotedPostId = async (userId, postId, batch) => {
    const userRef = this.getUserRefById(userId);
    const objToUpdate = {
      upvotedPosts: arrayRemove(postId),
    };
    this.updateDocument(userRef, objToUpdate, batch);
  };

  removeDownvotedPostId = async (userId, postId, batch) => {
    const userRef = this.getUserRefById(userId);
    const objToUpdate = {
      downvotedPosts: arrayRemove(postId),
    };
    this.updateDocument(userRef, objToUpdate, batch);
  };

  addOwnPostId = async (userId, postId, batch) => {
    const userRef = this.getUserRefById(userId);
    const objToUpdate = {
      postIds: arrayUnion(postId),
    };
    this.addCommentId(userRef, objToUpdate, batch);
  };

  setCachedUser(user) {
    this._cachedUser = { ...user, timestamp: Date.now() };
  }

  updateCachedUser() {
    this.setCachedUser = this.user;
  }

  unsubscribeFromUser() {
    // const userRef = getUserReferenceByUserId(authStore.userId);
    // return onSnapshot(userRef, (user) => {
    //   this._user = user.data();
    // });
  }
}

const userStore = new UserStore();
export { userStore };
