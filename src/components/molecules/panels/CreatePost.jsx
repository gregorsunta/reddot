import { Link } from 'react-router-dom';
import styles from '../../../styles/molecules/panels/CreatePostPanel.module.css';
import { Input } from '../../atoms';
import { useAuthStore } from '../../../context/authStoreContext';
import { Panel } from './Panel.jsx';

const CreatePost = () => {
  const authStore = useAuthStore();
  return (
    <Panel className={`${styles.container}`}>
      <img
        className={styles['profile-icon']}
        src={authStore?.user?.photoURL}
        alt="User profile icon"
      />
      <Link to="/submit">
        <Input
          className={`${styles.input}`}
          type="text"
          placeholder="Create post"
          readOnly={true}
        />
      </Link>
    </Panel>
  );
};
export { CreatePost };
