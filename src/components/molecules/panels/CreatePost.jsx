import { Link } from 'react-router-dom';
import styles from '../../../styles/molecules/panels/CreatePostPanel.module.css';
import { Input } from '../../atoms';

const CreatePost = () => {
  return (
    <div className={`panel ${styles.container}`}>
      <p>PI</p>
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
