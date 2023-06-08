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
import { getPost } from './Posts';

const { addDocument } = firestoreService;

const addCommentToDatabase = async (comment) => {
  return await addDocument('comments', {
    author: comment.author,
    text: comment.text,
    upvotes: comment.upvotes,
    downvotes: comment.downvotes,
    timestamp: serverTimestamp(),
  });
};

const addComment = async (postId, comment) => {
  // add to the db
  const commentRef = await addCommentToDatabase(comment);
  // add ref to the post
  const postRef = firestoreService.getDocumentRef('posts', postId);
  await updateDoc(postRef, {
    commentIds: arrayUnion(commentRef.id),
  });
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

  try {
    const commentPromises = commentIds.map((commentId) => {
      return getComment(commentId);
    });
    return Promise.all(commentPromises);
  } catch (err) {
    console.error(err);
  }
};

export { addCommentToDatabase, addComment, getComment, getCommentsByPostId };
