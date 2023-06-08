import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { firestoreService } from './FirestoreService';

const { addDocument } = firestoreService;

const addPostToDatabase = async (post) => {
  return await addDocument('posts', {
    author: post.author,
    title: post.title,
    text: post.text,
    timestamp: serverTimestamp(),
  });
};

const addPost = async (post) => {
  addPostToDatabase(post);
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

const getPosts = async () => {
  try {
    const q = query(
      collection(firestoreService.firestore, 'posts'),
      orderBy('timestamp', 'desc'),
      limit(10),
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
