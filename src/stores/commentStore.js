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
  where,
  serverTimestamp,
  updateDoc,
  writeBatch,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { firestoreService } from '../services/firestore/FirestoreService';
import { userStore, postStore } from './';
import { debounce, limit as callLimit } from '../utils';
import { toJS } from 'mobx';

class CommentStore {
  _comments = null;

  get posts() {
    return this._comments;
  }

  fetchCommentsByIds = async (commentIds) => {
    // if (!commentIds) {
    //   console.info(
    //     'CommentIds from post missing, aborting getCommentsByPostId.',
    //   );
    //   return null;
    // }
    // const fetchedComments = [];
    // try {
    //   const q = query(
    //     collection(firestoreService.firestore, 'comments'),
    //     where('__name__', 'in', commentIds),
    //   );
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) =>
    //     fetchedComments.push({ id: doc.id, data: doc.data() }),
    //   );
    //   const commentPromises = fetchedComments.map(async (comment) => {
    //     const user = await getUser(comment.data.authorId);
    //     return { ...comment, data: { ...comment.data, author: user } };
    //   });
    //   return await Promise.all(commentPromises);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  updateCommentsByIds = async (commentIds) => {
    const fetchCommentsByIdsWithDebounce = await debounce(
      this.fetchCommentsByIds,
    );
    const fetchedComments = await fetchCommentsByIdsWithDebounce();
    this._comments = fetchedComments;
  };

  addComment = async (postId, userId, comment) => {
    const batch = writeBatch(firestoreService.firestore);
    const commentCollectionRef = doc(
      collection(firestoreService.firestore, 'comments'),
    );

    // add comment to the db
    // apply to WriteBatch
    batch.set(commentCollectionRef, {
      authorId: userId,
      text: comment.text,
      upvotes: comment.upvotes,
      downvotes: comment.downvotes,
      timestamp: serverTimestamp(),
    });
    // add id (ref id) to the user
    // pass a WriteBatch along

    userStore.addCommentId(userId, commentCollectionRef.id, batch);

    // add id (ref id) to the post
    // pass a WriteBatch along

    postStore.addCommentId(postId, commentCollectionRef.id, batch);

    // execute WriteBatch
    try {
      await batch.commit();
    } catch (err) {
      console.error(err);
    }
  };
}

const commentStore = new CommentStore();
export { commentStore };
