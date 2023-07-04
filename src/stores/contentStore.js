import { Posts, Users, Comments } from '../lib';
import { makeAutoObservable, runInAction, toJS } from 'mobx';

import { firestoreService } from '../services/firestore/FirestoreService';
import { limit, onSnapshot, orderBy, startAt } from 'firebase/firestore';
import {
  addAuthorsToPosts,
  fetchPostsByQueryParams,
  getPostReferenceByPostId,
} from '../lib/Posts';
import { debounce } from '../lib/utils';
import { getUserRefById } from '../lib/Users';

class ContentStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = {};
  posts = [];
  comments = [];

  // basic list manipulating functions
  resetUser = () => {
    this.user = [];
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

  // list reading functions

  findPostOnListByPostId = (postId) => {
    const posts = toJS(this.posts);
    const post = posts.find((post) => post.id === postId);
    return post;
  };

  // async list manipulating functions

  getUserForListById = async (id) => {
    const user = await Users.fetchUserByUserId(id);
    this.resetUser();
    this.addUser(user);
  };

  getPostsForListByTimestamp = async (startAtValue = 0) => {
    const params = [
      orderBy('timestamp', 'desc'),
      limit(10),
      // startAt(startAtValue),
    ];
    const posts = await Posts.fetchPostsByQueryParams();
    const postsWithAuthors = await addAuthorsToPosts(posts);
    this.resetPosts();
    this.pushToPosts(...postsWithAuthors);
  };

  getPostsForListByTimestampWithDebounce = debounce(
    this.getPostsForListByTimestamp,
  );

  getPostForListByPostId = async (id) => {
    const postRef = getPostReferenceByPostId(id);
    const post = await firestoreService.getDocument(postRef);
    this.pushToPosts({ id: post.id, ...post.data() });
  };

  getCommentsForListByIds = async (...ids) => {
    const comments = await Comments.fetchCommentsByIds(ids);
    this.resetComments();
    this.pushToComments(...comments);
  };

  getCommentsWithAuthorsForListByIds = async (...commentIds) => {
    const comments = await Comments.fetchCommentsByIds(commentIds);
    const commentsWithAuthors = comments.map(async (comment) => {
      const author = await Users.fetchUserByUserId(comment.authorId);
      console.log(author);
      return { ...comment, author: { ...author } };
    });
    this.resetComments();
    const awaitedCommentsWithAuthors = await Promise.all(commentsWithAuthors);
    this.pushToComments(...awaitedCommentsWithAuthors);
  };

  getCommentsWithAuthorsForListByIdsWithDebounce = debounce(
    this.getCommentsWithAuthorsForListByIds,
  );

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
