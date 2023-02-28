import './App.css';
import { initializeApp } from 'firebase/app';
import { RouterConfig } from './navigation';
import { getFirestore } from 'firebase/firestore';
import { getFirebaseConfig } from './services';

const App = () => {
  return (
    <div>
      <RouterConfig />
    </div>
  );
};

export default App;
