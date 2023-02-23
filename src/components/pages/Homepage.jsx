import React from 'react';
import HomeTemplate from '../templates/HomeTemplate.module.css';
import Header from '../organisms/Header/Header';
import PageInfoPanel from '../molecules/PageInfoPanel/PageInfoPanel';
import FeedPanel from '../organisms/FeedPanel/FeedPanel';
import CreatePostPanel from '../molecules/CreatePostPanel/CreatePostPanel';
import styles from './Homepage.module.css';

const Homepage = () => {
  return (
    <>
      <Header className={`${HomeTemplate.header}`}></Header>
      <div className={`${HomeTemplate.main} ${styles.container}`}>
        <div className={HomeTemplate.content}>
          <CreatePostPanel className={`${styles.panel}`} />
          <FeedPanel className={`${styles.feed} ${styles.panel}`}></FeedPanel>
        </div>
        <div className={HomeTemplate['side-panel-container']}>
          <PageInfoPanel className={styles.panel}></PageInfoPanel>
        </div>
      </div>
    </>
  );
};

export default Homepage;
