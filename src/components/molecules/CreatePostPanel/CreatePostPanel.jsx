import Input from '../../atoms/Input/Input';
import styles from './CreatePostPanel.module.css';

const CreatePostPanel = ({ className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <p>PI</p>
      <a href="/submit">
        <input
          className={`${styles.input}`}
          type="text"
          placeholder="Create post"
          readOnly="true"
        />
      </a>
    </div>
  );
};
export default CreatePostPanel;
