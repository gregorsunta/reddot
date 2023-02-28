const firebaseConfig = {
  apiKey: 'AIzaSyAwTMVr0eYDM7sPer6CUDplqq9Yf4ecOKI',
  authDomain: 'reddot-b1116.firebaseapp.com',
  projectId: 'reddot-b1116',
  storageBucket: 'reddot-b1116.appspot.com',
  messagingSenderId: '753035621309',
  appId: '1:753035621309:web:a0d1d6580dd8b6632b98d4',
};

function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js",
    );
  } else {
    return firebaseConfig;
  }
}

export { getFirebaseConfig };
