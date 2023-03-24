import React from 'react';
import styles from '../../styles/templates/MainTemplate.module.css';

const MainTemplate = ({ auth, content, side }) => {
  return (
    <div className={styles['main-background']}>
      <div className={styles['main-wrapper']}>
        <div className={styles.main}>
          <section className={styles.content}>{content}</section>
          <section className={styles['side-panel-container']}>{side}</section>
        </div>
      </div>
    </div>
  );
};

export default MainTemplate;
