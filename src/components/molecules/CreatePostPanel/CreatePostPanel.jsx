import Input from '../../atoms/Input/Input';
import styles from './CreatePostPanel.module.css';

const CreatePostPanel = ({ className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <p>PI</p>
      <Input placeholder={'Create post'} readOnly={true} />
    </div>
  );
};
export default CreatePostPanel;
