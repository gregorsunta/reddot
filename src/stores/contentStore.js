import { Posts, Users, Comments } from '../lib';
import { makeAutoObservable, runInAction, toJS } from 'mobx';

import { firestoreService } from '../services/firestore/FirestoreService';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';
import {
  addAuthorToPost,
  addAuthorsToPosts,
  fetchPostsByQueryParams,
  getPostReferenceByPostId,
} from '../lib/Posts';
import { getUserRefById } from '../lib/Users';

class ContentStore {
  constructor() {
    makeAutoObservable(this);
  }
  fetchingUser = false;
  fetchingPosts = false;
  fetchingComments = false;
  user = {};
  posts = [];
  comments = [];

  // basic list manipulating functions
  resetUser = () => {
    this.user = {};
  };

  resetPosts = () => {
    this.posts = [];
  };

  resetComments = () => {
    this.comments = [];
  };

  addUser = (user) => {
    this.user = user;
  };

  pushToPosts = (...posts) => {
    this.posts.push(...posts);
  };

  pushToComments = (...comments) => {
    this.comments.push(...comments);
  };

  // store reading functions

  findPostOnListByPostId = (postId) => {
    const posts = toJS(this.posts);
    const post = posts.find((post) => post.id === postId);
    return post;
  };

  // async store manipulating functions

  getUserForListById = async (id) => {
    if (this.fetchingUser) {
      console.info(
        'getPostsForListByTimestamp() is already fetching user. Aborting.',
      );
      return;
    }
    this.fetchingUser = true;

    const user = await Users.fetchUserByUserId(id);
    this.resetUser();
    this.addUser(user);
    this.fetchingUser = false;
  };

  getPostsForListByTimestamp = async (lastPostId) => {
    if (this.fetchingPosts) {
      console.info(
        'getPostsForListByTimestamp() is already fetching posts. Aborting.',
      );
      return;
    }
    this.fetchingPosts = true;

    let q;
    if (lastPostId) {
      q = query(
        collection(firestoreService.firestore, 'posts'),
        orderBy('timestamp', 'desc'),
        limit(10),
        startAt(lastPostId),
      );
    } else {
      q = query(
        collection(firestoreService.firestore, 'posts'),
        orderBy('timestamp', 'desc'),
        limit(10),
      );
    }

    const posts = await Posts.fetchPostsByQueryParams(q);
    const postsWithAuthors = await addAuthorsToPosts(posts);
    this.resetPosts();
    this.pushToPosts(...postsWithAuthors);
    this.fetchingPosts = false;
  };

  getPostForListByPostId = async (id) => {
    if (this.fetchingPosts) {
      console.info(
        'getPostForListByPostId() is already fetching posts. Aborting.',
      );
      return;
    }
    this.fetchingPosts = true;
    const postRef = getPostReferenceByPostId(id);
    const post = await firestoreService.getDocument(postRef);
    const postWithAuthor = await addAuthorToPost(post.data());
    this.pushToPosts({ id: post.id, ...postWithAuthor });
    this.fetchingPosts = false;
  };

  getCommentsForListByIds = async (...ids) => {
    if (this.fetchingComments) {
      console.info(
        'getCommentsForListByIds() is already fetching comments. Aborting.',
      );
      return;
    }
    this.fetchingComments = true;
    const comments = await Comments.fetchCommentsByIds(ids);
    this.resetComments();
    this.pushToComments(...comments);
    this.fetchingComments = false;
  };

  getCommentsWithAuthorsForListByIds = async (...commentIds) => {
    if (this.fetchingComments) {
      console.info(
        'getCommentsForListByIds() is already fetching comments. Aborting.',
      );
      return;
    }
    this.fetchingComments = true;
    const comments = await Comments.getCommentsByIdsWithAuthors(commentIds);
    this.resetComments();
    this.pushToComments(...comments);
    this.fetchingComments = false;
  };

  subscribeToUser = async (userId) => {
    const userRef = getUserRefById(userId);
    return onSnapshot(userRef, (snapshot) => {
      this.resetUser();
      this.addUser(snapshot);
    });
  };
}

const contentStore = new ContentStore();
export { contentStore };
