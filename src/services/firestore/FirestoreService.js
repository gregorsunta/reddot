import { addDoc, collection, doc, getFirestore } from 'firebase/firestore';

class FirestoreService {
  init = (app) => {
    this.firestore = getFirestore(app);
  };

  addDocument = async (collectionName, documentName) => {
    try {
      return await addDoc(
        collection(this.firestore, collectionName),
        documentName,
      );
    } catch (err) {
      console.error(err);
    }
  };

  getDocumentRef = (collectionName, documentName) => {
    return doc(this.firestore, collectionName, documentName);
  };

  // saveImagePost = async (post) => {
  //   try {
  //     // save the post in firestore (structured text) and firebase storage (images etc)
  //     const postRef = await this.addDocument('posts', {
  //       name: '',
  //       title: post.title,
  //       imageUrl: 'LOADING',
  //       timestamp: serverTimestamp(),
  //     });

  //     const filePath = `${getAuth().currentUser.uid}/${postRef.id}/${
  //       post.name
  //     }`;

  //     const imageRef = ref(getStorage(), filePath);
  //     const fileSnapshot = await uploadBytesResumable(imageRef, filePath);
  //     const publicImageUrl = getDownloadURL(imageRef);

  //     await updateDoc(postRef, {
  //       imageUrl: publicImageUrl,
  //       storageUri: fileSnapshot.metadata.fullPath,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // updateDocumentWithRef = async (
  //   collectionName,
  //   documentRef,
  //   updatedDocument,
  // ) => {
  //   try {
  //     const postRef = this.addDocument(collectionName, documentName);

  //     await updateDoc(documentRef, {
  //       comments: { commentIds: commentRef.id },
  //     });
  //   } catch (err) {}
  // };
}
const firestoreService = new FirestoreService();
export { firestoreService };
