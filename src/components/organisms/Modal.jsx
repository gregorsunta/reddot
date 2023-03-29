import styles from '../../styles/organisms/Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

Modal.propTypes = {
  children: PropTypes.array,
};

export default Modal;
