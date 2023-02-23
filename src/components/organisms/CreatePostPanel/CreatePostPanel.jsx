import SearchBar from '../../atoms/Input/Input';
import styles from './CreatePostPanel.module.css';

const CreatePostPanel = ({ className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <p>PI</p>
      <SearchBar placeholder={'Create post'} emptyValue={true} />
    </div>
  );
};
export default CreatePostPanel;
