import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextOutline,
  ImageOutline,
  LinkOutline,
  AlbumsOutline,
  MicOutline,
} from 'react-ionicons';
import indexStyles from '../../../styles/molecules/panels/index.module.css';
import styles from '../../../styles/molecules/panels/SubmitPanel.module.css';
import { Button } from '../../atoms/Button';
import { ButtonsGroup } from '../';

const SubmitPanel = () => {
  const [activeType, setActiveType] = useState('text');
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
          />
        );
      case 'visual':
        return <input></input>;
      case 'link':
        return (
          <textarea
            className={`${styles['text-area']}`}
            type="text"
            placeholder="Url"
          />
        );
      default:
        console.error(`The entered panel type is invalid. Type: ${activeType}`);
    }
  };

  return (
    <div className={`${`${indexStyles.container}`} ${styles.container}`}>
      <ButtonsGroup orientation="horizontal" variant="outlined">
        <Button
          variant="text"
          children="Text"
          startIcon={<TextOutline />}
          className={styles.btn}
          activeClassName={styles.active}
          type="text"
          isActive={'text' === activeType}
          onClick={() => changeType('text')}
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
        />
      </ButtonsGroup>
      <input className={`${styles.input}`} type="text" placeholder="Title" />
      {displayPanelType()}
      <div className={styles['form-btn']}>
        <Link to={'/'}>
          <button>Cancel</button>
        </Link>
        <Link to={'/'}>
          <button>Post</button>
        </Link>
      </div>
    </div>
  );
};

export { SubmitPanel };
