import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { getFirebaseConfig } from './firebase-config';

class FirestoreService {
  init = (app) => {
    this.firestore = getFirestore(app);
  };
  saveTextPost = async (post) => {
    try {
      await addDoc(collection(this.firestore, 'posts'), {
        owner: post.owner,
        title: post.title,
        text: post.text,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      console.log('Should be posted');
    }
  };
  saveImagePost = async (post) => {
    try {
      // create a new post in firestore
      const postRef = await addDoc(collection(this.firestore, 'posts'), {
        name: '',
        title: post.title,
        imageUrl: 'LOADING',
        timestamp: serverTimestamp(),
      });
      const filePath = `${getAuth().currentUser.uid}/${postRef.id}/${
        post.name
      }`;
      const imageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(imageRef, filePath);
      const publicImageUrl = getDownloadURL(imageRef);

      await updateDoc(postRef, {
        imageUrl: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
      });
    } catch (err) {
      console.error(err);
    }
  };
  getPost = async () => {
    try {
      const q = query(
        collection(this.firestore, 'posts'),
        orderBy('owner', 'desc'),
        limit(10),
      );
      const querySnapshot = await getDocs(q);
      const extractedPosts = [];
      querySnapshot.forEach((doc) => extractedPosts.push(doc.data()));
      return extractedPosts;
    } catch (err) {
      console.error(err);
    }
  };
}
const firestoreService = new FirestoreService();
export { firestoreService };
