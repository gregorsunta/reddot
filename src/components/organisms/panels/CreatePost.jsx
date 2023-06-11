import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { SIZES_REM } from '../../../constants';
import { Input } from '../../atoms';
import { Panel, Stack } from '../../molecules/';
import { useStores } from '../../../context/authStoreContext';

const CreatePost = () => {
  const authStore = useStores();
  const { container, profileIcon, input } = useStyles();

  return (
    <Panel className={container}>
      <Stack orientation="row" spacing={SIZES_REM.SIZE_16}>
        <img
          className={profileIcon}
          src={authStore?.user?.photoURL}
          alt="Profile icon"
          referrerPolicy="no-referrer"
        />
        <Link to="/submit">
          <Input
            className={input}
            type="text"
            placeholder="Create post"
            readOnly={true}
          />
        </Link>
      </Stack>
    </Panel>
  );
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--size-5)',
  },
  profileIcon: {
    width: '2rem',
    height: '2rem',
  },
  input: {
    flex: 1,
  },
});

export { CreatePost };
