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

const SubmitPanel = () => {
  const [activeType, setActiveType] = useState('text');
  const isActive = (value) => {
    return value === activeType ? styles.active : '';
  };
  const changeType = (type) => {
    setActiveType(type);
  };
  const displayType = () => {
    if (activeType === 'text')
      return (
        <textarea
          className={`${styles['text-area']}`}
          type="text"
          placeholder="Text (optional)"
        />
      );
    if (activeType === 'visual') return <input></input>;
    if (activeType === 'link')
      return (
        <textarea
          className={`${styles['text-area']}`}
          type="text"
          placeholder="Url"
        />
      );
  };
  return (
    <div className={`${`${indexStyles.container}`} ${styles.container}`}>
      <div className={styles['btns-container']}>
        {/* post type buttons */}
        <button
          className={`${styles.btn} ${isActive('text')}`}
          onClick={changeType.bind(this, 'text')}
        >
          <TextOutline />
          Text
        </button>
        <button
          className={`${styles.btn} ${styles['long']} ${isActive('visual')}`}
          onClick={changeType.bind(this, 'visual')}
        >
          <ImageOutline />
          Image & Video
        </button>
        <button
          className={`${styles.btn} ${isActive('link')}`}
          onClick={changeType.bind(this, 'link')}
        >
          <LinkOutline />
          Link
        </button>
        <button
          disabled
          className={`${styles.btn} ${isActive('poll')}`}
          onClick={changeType.bind(this, 'link')}
        >
          <AlbumsOutline color={'gray'} />
          Poll
        </button>
        <button
          disabled
          className={`${styles.btn} ${isActive('live')}`}
          onClick={changeType.bind(this, 'link')}
        >
          <MicOutline color={'gray'} />
          Live
        </button>
        {/* title */}
        {/* changeble window */}
        {/* post/submit button */}
      </div>
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
