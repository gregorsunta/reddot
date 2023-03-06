import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const signInUser = (auth, provider) => {
  try {
    signInWithPopup(auth, provider);
  } catch (err) {
    throw new Error(err);
  }
};

const signOutUser = (auth) => {
  try {
    signOut(auth);
  } catch (err) {
    throw new Error(err);
  }
};

export { signInUser, signOutUser };
