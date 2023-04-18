import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextOutline,
  ImageOutline,
  LinkOutline,
  AlbumsOutline,
  MicOutline,
} from 'react-ionicons';
import { ButtonGroup } from '../';
import { uuidv4 } from '@firebase/util';
import styles from '../../../styles/molecules/panels/SubmitPanel.module.css';
import { Button } from '../../atoms/Button';
import { observer } from 'mobx-react';
import { useFirestoreService } from '../../../context/firestoreServiceContext';
import { useAuthStore } from '../../../context/authStoreContext';
import { Panel } from './Panel.jsx';

const SubmitPanel = observer(() => {
  const firestoreService = useFirestoreService();
  const authStore = useAuthStore();
  const [activeType, setActiveType] = useState('text');
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const isActive = (type) => {
    console.log(activeType);
    return type === activeType;
  };
  const changeType = (type) => {
    setActiveType(type);
  };
  const displayPanelType = () => {
    switch (activeType) {
      case 'text':
        return (
          <textarea
            className={`${styles['text-area']}`}
            type="text"
            placeholder="Text (optional)"
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
          />
        );
      case 'visual':
        return (
          <input
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
          ></input>
        );
      case 'link':
        return (
          <textarea
            className={`${styles['text-area']}`}
            type="text"
            placeholder="Url"
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
          />
        );
      default:
        console.error(`The entered panel type is invalid. Type: ${activeType}`);
    }
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
    <Panel className={`${styles.container}`}>
      <ButtonGroup orientation="horizontal" variant="outlined">
        <Button
          variant="text"
          children="Text"
          startIcon={<TextOutline />}
          className={styles.btn}
          activeClassName={styles.active}
          type="text"
          isActive={'text' === activeType}
          onClick={() => changeType('text')}
          key={uuidv4()}
        />
        <Button
          variant="text"
          children="Image & Video"
          startIcon={<ImageOutline />}
          className={styles.btn}
          activeClassName={styles.active}
          type="visual"
          isActive={'visual' === activeType}
          onClick={() => changeType('visual')}
          key={uuidv4()}
        />

        <Button
          variant="text"
          children="Link"
          startIcon={<LinkOutline />}
          className={styles.btn}
          activeClassName={styles.active}
          type="link"
          isActive={'link' === activeType}
          onClick={() => changeType('link')}
          key={uuidv4()}
        />

        <Button
          variant="text"
          children="Poll"
          startIcon={<AlbumsOutline />}
          className={styles.btn}
          activeClassName={styles.active}
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
          className={styles.btn}
          activeClassName={styles.active}
          isDisabled={true}
          type="live"
          isActive={'live' === activeType}
          onClick={() => changeType('live')}
          key={uuidv4()}
        />
      </ButtonGroup>
      <input
        className={`${styles.input}`}
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      {displayPanelType()}
      <div className={styles['form-btn']}>
        <Button variant="outlined" to={'/'}>
          Cancel
        </Button>
        <Button variant="solid" onClick={savePost}>
          Post
        </Button>
      </div>
    </Panel>
  );
});

export { SubmitPanel };
