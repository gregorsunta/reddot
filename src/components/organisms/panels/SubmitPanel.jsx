import { useState } from 'react';
import {
  TextOutline,
  ImageOutline,
  LinkOutline,
  AlbumsOutline,
  MicOutline,
} from 'react-ionicons';
import { ButtonGroup } from '../../molecules/ButtonGroup.jsx';
import { uuidv4 } from '@firebase/util';
import { Button, Stack } from '../../atoms';
import { observer } from 'mobx-react';
import { useFirestoreService } from '../../../context/firestoreServiceContext';
import { useStores } from '../../../context/authStoreContext';
import { Panel } from '../../molecules';
import { createUseStyles } from 'react-jss';
import { InputBox } from '../.';
import { Input } from '../../atoms/Input.jsx';
import * as Posts from '../../../lib/Posts';
import { toJS } from 'mobx';

const SubmitPanel = observer(() => {
  const { contentStore } = useStores();
  const { user } = toJS(contentStore);
  const {} = useFirestoreService();
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
  const submitPost = () => {
    const type = activeType;
    if (type === 'text') {
      Posts.addPost(
        {
          title: title,
          text: postContent,
        },
        user.id,
      );
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
      <Input
        className={input}
        type="text"
        placeholder="Title"
        onChange={setTitle}
      />
      <InputBox type={activeType} onChange={setPostContent} />
      <Stack orientation={'row'}>
        <Button variant="outlined" to={'/'}>
          Cancel
        </Button>
        <Button variant="solid" onClick={submitPost}>
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
