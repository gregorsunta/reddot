import { Link } from 'react-router-dom';
import styles from '../../../styles/molecules/panels/CreatePostPanel.module.css';
import { Input } from '../../atoms';
import { useAuthStore } from '../../../context/authStoreContext';
import { Panel, Stack } from '../../molecules/';
import { SIZES_REM } from '../../../constants';

const CreatePost = () => {
  const authStore = useAuthStore();
  return (
    <Panel className={`${styles.container}`}>
      <Stack orientation="row" spacing={SIZES_REM.SIZE_16}>
        <img
          className={styles['profile-icon']}
          src={authStore?.user?.photoURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <Link to="/submit">
          <Input
            className={`${styles.input}`}
            type="text"
            placeholder="Create post"
            readOnly={true}
          />
        </Link>
      </Stack>
    </Panel>
  );
};
export { CreatePost };
