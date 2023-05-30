import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextOutline,
  ImageOutline,
  LinkOutline,
  AlbumsOutline,
  MicOutline,
} from 'react-ionicons';
import { ButtonGroup } from '../../molecules/ButtonGroup.jsx';
import { uuidv4 } from '@firebase/util';
import { Button } from '../../atoms/Button';
import { observer } from 'mobx-react';
import { useFirestoreService } from '../../../context/firestoreServiceContext';
import { useAuthStore } from '../../../context/authStoreContext';
import { Panel, Stack } from '../../molecules';
import { createUseStyles } from 'react-jss';
import { InputBox } from '../.';

const SubmitPanel = observer(() => {
  const firestoreService = useFirestoreService();
  const authStore = useAuthStore();
  const [activeType, setActiveType] = useState('text');
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const { container, btnsContainer, btn, input, textArea, active } =
    useStyles();

  const isActive = (type) => {
    return type === activeType;
  };
  const changeType = (type) => {
    setActiveType(type);
  };
  const savePost = () => {
    const type = activeType;
    console.log(postContent);
    if (type === 'text') {
      firestoreService.saveTextPost({
        owner: authStore.user.displayName,
        title: title,
        text: postContent,
      });
    }
  };
  return (
    <Panel className={container}>
      <ButtonGroup
        className={btnsContainer}
        orientation="horizontal"
        variant="outlined"
      >
        <Button
          variant="text"
          children="Text"
          startIcon={<TextOutline />}
          className={btn}
          activeClassName={active}
          type="text"
          isActive={'text' === activeType}
          onClick={() => changeType('text')}
          key={uuidv4()}
        />
        <Button
          variant="text"
          children="Image & Video"
          startIcon={<ImageOutline />}
          className={btn}
          activeClassName={active}
          type="visual"
          isActive={'visual' === activeType}
          onClick={() => changeType('visual')}
          key={uuidv4()}
        />

        <Button
          variant="text"
          children="Link"
          startIcon={<LinkOutline />}
          className={btn}
          activeClassName={active}
          type="link"
          isActive={'link' === activeType}
          onClick={() => changeType('link')}
          key={uuidv4()}
        />

        <Button
          variant="text"
          children="Poll"
          startIcon={<AlbumsOutline />}
          className={btn}
          activeClassName={active}
          isDisabled={true}
          type="poll"
          isActive={'poll' === activeType}
          onClick={() => changeType('poll')}
          key={uuidv4()}
        />
        <Button
          variant="text"
          children="Live"
          startIcon={<MicOutline />}
          className={btn}
          activeClassName={active}
          isDisabled={true}
          type="live"
          isActive={'live' === activeType}
          onClick={() => changeType('live')}
          key={uuidv4()}
        />
      </ButtonGroup>
      <input
        className={input}
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <InputBox type={activeType} />
      <Stack orientation={'row'}>
        <Button variant="outlined" to={'/'}>
          Cancel
        </Button>
        <Button variant="solid" onClick={savePost}>
          Post
        </Button>
      </Stack>
    </Panel>
  );
});

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--size-4)',
    maxWidth: '100vw',
    // samsung internet support?
    // maxWidth: '100dvw',
  },
  btnsContainer: {
    display: 'flex',
    overflowY: 'scroll',
    '@media screen and (max-width: 500px)': {
      overflowY: 'auto',
    },
  },
  btn: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'var(--size-3)',
    color: 'black',
    borderRadius: 0,
    borderColor: 'var(--gray-4)',
    borderBottom: 'var(--size-1) solid var(--gray-4)',
    padding: 'var(--size-4)',
    '&.long': {
      flex: 1.3,
    },
    '&:hover': {
      backgroundColor: 'var(--gray-1)',
    },
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  input: {
    height: 'var(--size-7)',
    width: '100%',
  },
  textArea: {
    width: '100%',
    minHeight: 'var(--size-9)',
    height: 'var(--size-10)',
    resize: 'vertical',
  },
  active: {
    borderBottom: 'var(--size-1) solid var(--gray-9)',
    backgroundColor: 'var(--gray-1)',
  },
});

export { SubmitPanel };
