import styles from '../../styles/organisms/Modal.module.css';

const Modal = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Modal;
