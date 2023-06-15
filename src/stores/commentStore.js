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
  onSnapshot,
} from 'firebase/firestore';

import { firestoreService } from '../services/firestore/FirestoreService';
import { userStore, postStore } from './';
import { debounce } from './utils';
import { makeAutoObservable, runInAction, toJS } from 'mobx';

class CommentStore {
  _comments = [];

  constructor() {
    makeAutoObservable(this);
  }

  get comments() {
    return this._comments;
  }

  // list functions

  setCommentsOnList = (comments) => {
    this._comments = comments;
  };

  clearCommentList = () => {
    this.setCommentsOnList([]);
  };

  unsubscribeAllComments = () => {
    this._comments.forEach((comment) => comment.unsubscribe());
  };

  resetCommentList = () => {
    this.unsubscribeAllComments();
    this.clearCommentList();
  };

  modifyCommentOnList = (updatedComment) => {
    const index = this.findCommentIndexOnList(updatedComment.id);
    this._comments[index] = {
      ...toJS(this._comments[index]),
      data: updatedComment.data,
    };
  };

  findCommentIndexOnList = (commentId) => {
    return toJS(this._comments).findIndex(
      (comment) => comment.id === commentId,
    );
  };

  filterCommentsFromList = (commentIds) => {
    return this.comments.filter((comment) => commentIds.includes(comment.id));
  };

  // updateCommentsByIds = async (commentIds) => {
  //   const fetchCommentsByIdsWithDebounce = await debounce(
  //     this.fetchCommentsByIds,
  //   );
  //   const fetchedComments = await fetchCommentsByIdsWithDebounce();
  //   this._comments = fetchedComments;
  // };

  // firestore async functions

  addComment = async (userId, postId, comment) => {
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

    userStore.addCommentId(userId, commentCollectionRef.id, batch);

    // add id (ref id) to the post

    postStore.addCommentId(postId, commentCollectionRef.id, batch);

    // execute WriteBatch
    try {
      await batch.commit();
    } catch (err) {
      console.error(err);
    }
  };

  fetchCommentsByIds = async (commentIds) => {
    if (!commentIds) {
      console.info(
        'CommentIds from post missing, aborting getCommentsByPostId.',
      );
      return null;
    }
    const fetchedComments = [];
    try {
      const q = query(
        collection(firestoreService.firestore, 'comments'),
        where('__name__', 'in', commentIds),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
        fetchedComments.push({ id: doc.id, data: doc.data() }),
      );
      return fetchedComments;
    } catch (err) {
      console.error(err);
    }
  };

  // list and firestore functions

  fetchCommentsForListWithSnapshot = async (commentIds) => {
    if (!commentIds) {
      console.info('Expected commentIds got: ', commentIds);
      return;
    }
    try {
      const fetchedComments = await this.fetchCommentsByIds(commentIds);

      const commentsWithSubscribe = fetchedComments.map((comment) => {
        const commentRef = this.getCommentReferenceByCommentId(comment.id);
        const unsubscribe = onSnapshot(commentRef, async (comment) => {
          this.modifyCommentOnList(comment.data());
        });
        return { ...comment, unsubscribe: unsubscribe };
      });

      const commentsWithAuthors = await this.addAuthorsToComments(
        commentsWithSubscribe,
      );
      runInAction(() => {
        this._comments = commentsWithAuthors;
      });
    } catch (err) {
      console.error(err);
    }
  };

  fetchCommentsForListWithSnapshotDebounce = debounce(
    this.fetchCommentsForListWithSnapshot,
  );

  // firestore other

  getCommentReferenceByCommentId = (commentId) => {
    return doc(firestoreService.firestore, 'comments', commentId);
  };

  addAuthorsToComments = (comments) => {
    const commentsWithAuthors = comments.map(async (comment) => {
      const author = await userStore.fetchUserByUserId(comment.data.authorId);
      return { ...comment, data: { ...comment.data, author: author } };
    });

    return Promise.all(commentsWithAuthors);
  };
}

const commentStore = new CommentStore();
export { commentStore };
