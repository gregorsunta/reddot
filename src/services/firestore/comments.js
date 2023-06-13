// import {
//   arrayUnion,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   serverTimestamp,
//   where,
//   writeBatch,
// } from 'firebase/firestore';
// import { firestoreService } from './FirestoreService';
// import { getPost } from './posts';
// import { debounce } from '../utils';
// import { getUser } from './users';

// const getComment = async (commentId) => {
//   try {
//     const ref = doc(firestoreService.firestore, 'comments', commentId);
//     const docSnap = await getDoc(ref);
//     if (docSnap.exists()) {
//       const comment = { ...docSnap.data(), id: commentId };
//       const user = await getUser(comment.authorId);
//       const commentWithUser = {
//         ...comment,
//         data: { ...comment.data, author: user },
//       };
//       return commentWithUser;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// const getCommentsByPostId = async (postId) => {
//   const post = await getPost(postId);
//   const commentIds = post.data.commentIds;
//   if (!commentIds) {
//     console.info('CommentIds from post missing, aborting getCommentsByPostId.');
//     return null;
//   }
//   const fetchedComments = [];
//   try {
//     const q = query(
//       collection(firestoreService.firestore, 'comments'),
//       where('__name__', 'in', commentIds),
//     );
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) =>
//       fetchedComments.push({ id: doc.id, data: doc.data() }),
//     );
//     const commentPromises = fetchedComments.map(async (comment) => {
//       const user = await getUser(comment.data.authorId);
//       return { ...comment, data: { ...comment.data, author: user } };
//     });

//     return await Promise.all(commentPromises);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const addCommentWithDebounce = debounce();
// const getCommentWithDebounce = debounce(getComment);
// const getCommentsByPostIdWithDebounce = debounce(getCommentsByPostId);

// export {
//   addCommentWithDebounce as addComment,
//   getCommentWithDebounce as getComment,
//   getCommentsByPostIdWithDebounce as getCommentsByPostId,
// };
