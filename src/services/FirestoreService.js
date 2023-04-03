import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

class FirestoreService {
  init = (app) => {
    this.firestore = getFirestore(app);
  };
  saveTextPost = async (post) => {
    // save only structured text (w/o images etc.)
    try {
      await addDoc(collection(this.firestore, 'posts'), {
        owner: post.owner,
        title: post.title,
        text: post.text,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
  };
  saveImagePost = async (post) => {
    try {
      // save the post in firestore (structured text) and firebase storage (images etc)
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
  getPosts = async () => {
    try {
      const q = query(
        collection(this.firestore, 'posts'),
        orderBy('owner', 'desc'),
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
}
const firestoreService = new FirestoreService();
export { firestoreService };
