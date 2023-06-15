import { makeAutoObservable, runInAction } from 'mobx';
import {
  arrayRemove,
  onSnapshot,
  collection,
  arrayUnion,
  doc,
  getDoc,
  addDoc,
} from 'firebase/firestore';
import { firestoreService } from '../services/firestore/FirestoreService';

class UserStore {
  _user = null;

  constructor() {
    makeAutoObservable(this);
  }

  get user() {
    return this._user;
  }

  get userId() {
    return this._user.id;
  }

  addUser = async (userObj) => {
    const collectionRef = collection(firestoreService.firestore, 'users');
    await addDoc(collectionRef, userObj);
  };

  fetchUserByUserId = async (userId) => {
    try {
      if (!userId) {
        console.error('Expected userId, got:', userId);
        return null;
      }
      const docRef = this.getUserRefById(userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, data: docSnap.data() };
      } else {
        console.warn(`Doc snap does not exist.`);
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  checkUser = async (user) => {
    const userExists = await this.userExistsInDatabase(user);
    !userExists && this.addUserToDatabase(user);
  };

  userExistsInDatabase = async (userObj) => {
    const user = await this.getUser(userObj.uid);
    return !!user;
  };

  addUserToDatabase = async (userObj) => {
    await this.addUser(userObj);
  };

  subscribeToUser(userId) {
    const userRef = this.getUserRefById(userId);
    return onSnapshot(userRef, (userDoc) => {
      runInAction(() => (this._user = { id: userId, data: userDoc.data() }));
    });
  }

  updateDocument = async (ref, obj, batch) => {
    if (batch) {
      await batch.update(ref, obj);
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

  addPostId = async (userId, postId, batch) => {
    console.log(userId);
    console.log(postId);
    const userRef = this.getUserRefById(userId);
    const objToUpdate = {
      postIds: arrayUnion(postId),
    };
    await this.updateDocument(userRef, objToUpdate, batch);
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

  // other
  getUserRefById = (userId) => {
    return doc(collection(firestoreService.firestore, 'users'), userId);
  };
}

const userStore = new UserStore();
export { userStore };
