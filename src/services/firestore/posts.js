import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { firestoreService } from './FirestoreService';
import { getUser } from './users';
import authStore from '../../stores/authStore';
import { debounce } from '../utils';

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
      limit(postNumberLimit),
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

const addPostWithDebounce = debounce(addPost, 500);
const getPostWithDebounce = debounce(getPost, 500);
const getPostsWithDebounce = debounce(getPosts, 500);
export {
  getPostsWithDebounce as getPosts,
  getPostWithDebounce as getPost,
  addPostWithDebounce as addPost,
};
