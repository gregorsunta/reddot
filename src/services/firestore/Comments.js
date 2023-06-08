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
  where,
  writeBatch,
} from 'firebase/firestore';
import { firestoreService } from './FirestoreService';
import { getPost } from './posts';

const { addDocument } = firestoreService;

const addComment = async (postId, comment) => {
  const batch = writeBatch(firestoreService.firestore);
  // add to the db
  const commentRef = doc(collection(firestoreService.firestore, 'comments'));
  batch.set(commentRef, {
    author: comment.author,
    text: comment.text,
    upvotes: comment.upvotes,
    downvotes: comment.downvotes,
    timestamp: serverTimestamp(),
  });
  // add ref to the post
  const postRef = doc(collection(firestoreService.firestore, 'posts'), postId);
  batch.update(postRef, { commentIds: arrayUnion(commentRef.id) });

  try {
    await batch.commit();
  } catch (err) {
    console.error(err);
  }
};

const getComment = async (commentId) => {
  try {
    const ref = doc(firestoreService.firestore, 'comments', commentId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: commentId };
    }
  } catch (err) {
    console.error(err);
  }
};

const getCommentsByPostId = async (postId) => {
  const { commentIds } = await getPost(postId);
  const fetchedDocuments = [];
  try {
    const q = query(
      collection(firestoreService.firestore, 'comments'),
      where('__name__', 'in', commentIds),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      fetchedDocuments.push({ id: doc.id, data: doc.data() }),
    );

    return fetchedDocuments;
  } catch (err) {
    console.error(err);
  }
};

export { addComment, getComment, getCommentsByPostId };
