import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const auth = getAuth();
const provider = GoogleAuthProvider;
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(
      `There was a problem with the authentication: ${errorMessage} (${errorCode})`,
    );
  });
