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
import { getUserRefById } from '../lib/Users';

class ContentStore {
  constructor() {
    makeAutoObservable(this);
  }
  fetchingUser = false;
  fetchingPosts = false;
  fetchingTempPost = false;
  fetchingComments = false;
  user = {};
  tempPost = {};
  posts = [];
  comments = [];

  // basic list manipulating functions

  setFetchingUser = (bool) => {
    this.fetchingUser = bool;
  };

  setFetchingPosts = (bool) => {
    this.fetchingPosts = bool;
  };

  setFetchingTempPost = (bool) => {
    this.fetchingTempPost = bool;
  };

  setFetchingComments = (bool) => {
    this.fetchingComments = bool;
  };

  resetUser = () => {
    this.user = {};
  };

  resetPosts = () => {
    this.posts = [];
  };

  resetTempPost = () => {
    this.tempPost = {};
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

  updateTempPost = (post) => {
    this.tempPost = { ...this.tempPost, ...post };
  };

  pushToComments = (...comments) => {
    this.comments.push(...comments);
  };

  updatePost = (post) => {
    const postIndex = this.findPostIndexOnListByPostId(post.id);
    this.posts[postIndex] = { ...this.posts[postIndex], ...post };
  };

  handleSubscribedPost = (post) => {
    const postIndex = this.findPostIndexOnListByPostId(post.id);
    if (postIndex !== -1) {
      this.updatePost(post);
    } else {
      this.pushToPosts(post);
    }
  };

  // store reading functions

  findPostOnListByPostId = (postId) => {
    const posts = toJS(this.posts);
    const post = posts.find((post) => post.id === postId);
    return post;
  };

  findPostIndexOnListByPostId = (postId) => {
    const posts = toJS(this.posts);
    return posts.findIndex((post) => post.id === postId);
  };

  // async store manipulating functions

  getUserForListById = async (id) => {
    if (this.fetchingUser) {
      console.info(
        'getPostsForListByTimestamp() is already fetching user. Aborting.',
      );
      return;
    }
    this.setFetchingUser(true);
    const user = await Users.fetchUserByUserId(id);
    this.resetUser();
    this.addUser(user);
    this.setFetchingUser(false);
  };

  getPostsForListByTimestamp = async (lastPostId) => {
    if (this.fetchingPosts) {
      console.info(
        'getPostsForListByTimestamp() is already fetching posts. Aborting.',
      );
      return;
    }
    this.setFetchingPosts(true);

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
    const postsWithAuthors = await Posts.addAuthorsToPosts(posts);
    this.resetPosts();
    this.pushToPosts(...postsWithAuthors);
    this.setFetchingPosts(false);
  };

  getPostForListByPostId = async (id) => {
    if (this.fetchingPosts) {
      console.info(
        'getPostForListByPostId() is already fetching posts. Aborting.',
      );
      return;
    }
    this.setFetchingPosts(true);
    const postRef = Posts.getPostReferenceByPostId(id);
    const post = await firestoreService.getDocument(postRef);
    const postWithAuthor = await Posts.addAuthorToPost(post.data());
    this.pushToPosts({ id: post.id, ...postWithAuthor });
    this.setFetchingPosts(false);
  };

  getCommentsForListByIds = async (...ids) => {
    if (this.fetchingComments) {
      console.info(
        'getCommentsForListByIds() is already fetching comments. Aborting.',
      );
      return;
    }
    this.setFetchingComments(true);
    const comments = await Comments.fetchCommentsByIds(ids);
    this.resetComments();
    this.pushToComments(...comments);
    this.setFetchingComments(false);
  };

  getCommentsWithAuthorsForListByIds = async (...commentIds) => {
    if (this.fetchingComments) {
      console.info(
        'getCommentsForListByIds() is already fetching comments. Aborting.',
      );
      return;
    }
    this.setFetchingComments(true);
    const comments = await Comments.getCommentsByIdsWithAuthors(commentIds);
    this.resetComments();
    this.pushToComments(...comments);
    this.setFetchingComments(false);
  };

  getAuthorForTempPost = async () => {
    if (Object.keys(this.tempPost).length === 0) {
      console.info(`addAuthorToTempPost() tempPost doesn't exist yet.`);
      return;
    }
    const userId = this.tempPost.authorId;
    const user = Users.fetchUserByUserId(userId);
    this.updateTempPost(user);
  };

  getMissingPostAuthorsOnList = async () => {
    const missingAuthorIds = [];

    // add id if post.author does not exist
    this.posts.forEach(
      (post) => post?.author ?? missingAuthorIds.push(post.authorId),
    );
    if (missingAuthorIds.length === 0) {
      console.info(
        'getMissingPostAuthorsOnList() canceling fetch because ids not specified.',
      );
      return;
    }
    const authors = await Users.fetchUsersByUserIds(missingAuthorIds);
    this.posts.forEach((post) => {
      authors.forEach(
        (author) =>
          post.authorId === author.id && this.updatePost({ ...post, author }),
      );
    });
  };

  // subscriber functions

  subscribeToUser = async (userId) => {
    const userRef = getUserRefById(userId);
    return onSnapshot(userRef, (snapshot) => {
      this.resetUser();
      this.addUser(snapshot);
    });
  };

  subscribeToTempPost = async (postId) => {
    if (this.fetchingTempPost) {
      console.info(
        'subscribeToTempPost() tempPost is already being fetched or listened to',
      );
      return;
    }
    this.setFetchingTempPost(true);

    const unsubscribe = await Posts.subscribeToPost(
      postId,
      this.updateTempPost,
    );

    return async () => {
      console.info(
        'subscribeToTempPost() calling callback. Unsubscribing and stuff..',
      );

      unsubscribe();
      this.setFetchingTempPost(false);
    };
  };

  subscribeToPostsByTimestamp = async (lastPostId) => {
    if (this.fetchingPosts) {
      console.info(
        'getPostsForListByTimestamp() something is already fetching posts. Aborting.',
      );
      return;
    } else {
      console.log(
        'getPostsForListByTimestamp() something is not fetching posts. Continuing.',
      );
    }
    this.setFetchingPosts(true);

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

    return await Posts.subscribeToPostsWithOwnersByQueryParams(
      q,
      this.handleSubscribedPost,
    );
  };
}

const contentStore = new ContentStore();
export { contentStore };
