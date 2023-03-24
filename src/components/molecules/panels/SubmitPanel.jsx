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
    return type === activeType ? styles.active : '';
  };
  const changeType = (type) => {
    setActiveType(type);
  };
  const displayType = () => {
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
  const buttons = [
    {
      variant: 'outlined',
      children: 'Text',
      startIcon: <TextOutline />,
      type: 'text',
      className: styles.btn,
      activeClassName: styles.active,
      onClick: changeType.bind(this, 'text'),
      isActive: activeType === 'text',
    },
    {
      variant: 'outlined',
      children: 'Image & Video',
      startIcon: <ImageOutline />,
      type: 'visual',
      className: styles.btn,
      activeClassName: styles.active,
      onClick: changeType.bind(this, 'visual'),
      isActive: activeType === 'visual',
    },
    {
      variant: 'outlined',
      children: 'Link',
      startIcon: <LinkOutline />,
      type: 'link',
      className: styles.btn,
      activeClassName: styles.active,
      onClick: changeType.bind(this, 'link'),
      isActive: activeType === 'link',
    },
    {
      variant: 'outlined',
      children: 'Poll',
      startIcon: <AlbumsOutline />,
      type: 'poll',
      className: styles.btn,
      activeClassName: styles.active,
      onClick: changeType.bind(this, 'poll'),
      isActive: activeType === 'poll',
    },
    {
      variant: 'outlined',
      children: 'Live',
      startIcon: <MicOutline />,
      type: 'live',
      className: styles.btn,
      activeClassName: styles.active,
      onClick: changeType.bind(this, 'live'),
      isActive: activeType === 'live',
    },
  ];
  return (
    <div className={`${`${indexStyles.container}`} ${styles.container}`}>
      <ButtonsGroup className={styles['btns-container']} buttons={buttons} />
      <input className={`${styles.input}`} type="text" placeholder="Title" />
      {displayType()}
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
