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

const addPost = async (post) => {
  return await addDoc(collection(firestoreService.firestore, 'posts'), {
    author: post.author,
    title: post.title,
    text: post.text,
    timestamp: serverTimestamp(),
  });
};

const getPost = async (postId) => {
  try {
    const ref = doc(firestoreService.firestore, 'posts', postId);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      return docSnap.data();
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
    const extractedPosts = [];
    querySnapshot.forEach((doc) =>
      extractedPosts.push({ ...doc.data(), id: doc.id }),
    );
    return extractedPosts;
  } catch (err) {
    console.error(err);
  }
};

export { getPosts, getPost, addPost };
