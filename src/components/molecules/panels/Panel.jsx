import styles from '../../../styles/molecules/panels/Panel.module.css';

const Panel = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export { Panel };
