import styles from './PageInfoPanel.module.css';

const PageInfoPanel = ({ className }) => {
  return (
    <div className={`${className} ${styles.container}`}>
      <p>This is fake app based on the website reddit. </p>
      <p>Made by gregorsunta</p>
    </div>
  );
};

export default PageInfoPanel;
