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
import { toJS } from 'mobx';

class CommentStore {
  _comments = null;

  get comments() {
    return this._comments;
  }

  // fetchCommentIdsByPostId = async () => {}

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

  modifyCommentOnListById = (updatedComment) => {
    const index = this.findCommentIndexOnList(updatedComment.id);
    this._comments[index] = {
      ...this._comments[index],
      data: updatedComment.data,
    };
  };

  findCommentIndexOnList = (commentId) => {
    return this._comments.findIndex((comment) => comment.id === commentId);
  };

  addAuthorsToComments = (comments) => {
    const commentsWithAuthors = comments.map(async (comment) => {
      const author = await userStore.fetchUserByUserId(comment.data.authorId);
      return { ...comment, data: { ...comment.data, author: author } };
    });

    return Promise.all(commentsWithAuthors);
  };

  fetchCommentsForListWithSnapshot = async (commentIds) => {
    const fetchedComments = await this.fetchCommentsByIds(commentIds);

    const commentsWithSubscribe = fetchedComments.map((comment) => {
      const commentRef = this.getCommentReferenceByCommentId(comment.id);
      const unsubscribe = onSnapshot(commentRef, async (comment) => {
        this.modifyCommentOnListById(comment);
      });
      return { ...comment, unsubscribe: unsubscribe };
    });

    const commentsWithAuthors = await this.addAuthorsToPosts(
      commentsWithSubscribe,
    );
    this.replacePostsOnList(commentsWithAuthors);
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

  getCommentReferenceByCommentId = (commentId) => {
    return doc(firestoreService.firestore, 'comments', commentId);
  };
}

const commentStore = new CommentStore();
export { commentStore };
