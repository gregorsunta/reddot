import React from 'react';
import styles from '../../styles/templates/MainTemplate.module.css';
import Header from '../organisms/Header.jsx';
import {
  PageInfoPanel,
  CreatePostPanel,
  FeedPanel,
} from '../molecules/panels/';

const MainTemplate = ({ auth, content, side }) => {
  return (
    <div>
      <Header auth={auth} className={styles.header}></Header>
      <div className={styles.main}>
        <div className={styles.content}>{content}</div>
        <div className={styles['side-panel-container']}>{side}</div>
      </div>
    </div>
  );
};

export default MainTemplate;
