import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const signInUser = (auth, provider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
    })
    .catch((err) => {
      console.error(
        `There was a problem with the authentication: ${err.message} (${err.code})`,
      );
    });
};

const signOutUser = (auth) => {
  try {
    signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

export { signInUser, signOutUser };
