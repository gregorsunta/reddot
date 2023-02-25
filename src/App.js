import { useEffect } from 'react';
import './App.css';
import RouterConfig from './navigation/RouterConfig';
import * as firestore from './services/firebase-firestore';
import './services/firebase-auth';

const App = () => {
  useEffect(() => {
    (async () => {
      const path = ['users', 's6eEcH0HmS1ePOGxxXJbVdf'];
      const docs = await firestore.getDocs(path);
      console.log(docs.docs);
    })();
  });

  return (
    <div>
      <RouterConfig />
    </div>
  );
};

export default App;
