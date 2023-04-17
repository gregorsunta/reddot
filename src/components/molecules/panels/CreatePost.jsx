import { Link } from 'react-router-dom';
import styles from '../../../styles/molecules/panels/CreatePostPanel.module.css';
import { Input } from '../../atoms';
import { useAuthStore } from '../../../context/authStoreContext';

const CreatePost = () => {
  const authStore = useAuthStore();
  return (
    <div className={`panel ${styles.container}`}>
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
    </div>
  );
};
export { CreatePost };
