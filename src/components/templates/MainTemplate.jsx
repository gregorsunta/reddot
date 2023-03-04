import React from 'react';
import styles from '../../styles/templates/MainTemplate.module.css';

const MainTemplate = ({ auth, content, side }) => {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.content}>{content}</div>
        <div className={styles['side-panel-container']}>{side}</div>
      </div>
    </div>
  );
};

export default MainTemplate;
