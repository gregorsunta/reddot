import { GrClose } from 'react-icons/gr';
import styles from '../../styles/organisms/Modal.module.css';
import PropTypes from 'prop-types';
import { Button } from '../atoms';

const Modal = ({ children, onClose }) => {
  return (
    <div className={`${styles.window}`}>
      <div className={`${styles.container} panel`}>
        <div className={styles['button-close']}>
          <Button onClick={onClose} variant="icon">
            <GrClose />
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.array,
};

export { Modal };
