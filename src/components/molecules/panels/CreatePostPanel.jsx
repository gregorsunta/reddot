import { Link } from 'react-router-dom';
import styles from '../../../styles/molecules/panels/CreatePostPanel.module.css';
import indexStyles from '../../../styles/molecules/panels/index.module.css';

const CreatePostPanel = () => {
  return (
    <div className={`${indexStyles.container} ${styles.container}`}>
      <p>PI</p>
      <Link to="/submit">
        <input
          className={`${styles.input}`}
          type="text"
          placeholder="Create post"
          readOnly="true"
        />
      </Link>
    </div>
  );
};
export { CreatePostPanel };
