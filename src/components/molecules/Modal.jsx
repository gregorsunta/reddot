import { GrClose } from 'react-icons/gr';
import styles from '../../styles/organisms/Modal.module.css';
import PropTypes from 'prop-types';
import { Button } from '../atoms';

const Modal = ({ children, onClose }) => {
  return (
    <div className={`${styles.window}`}>
      <div className={`${styles.container}`}>{children}</div>
      <Button onClick={onClose}>
        <GrClose />
      </Button>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.array,
};

export { Modal };
