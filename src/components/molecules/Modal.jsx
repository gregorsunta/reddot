import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Button } from '../atoms';
import { Panel } from './';
import { SIZES_PX, SIZES_REM } from '../../constants/StyleConstants';

const Modal = ({ children, onClose }) => {
  const { window, container, exitButton } = useStyles();

  return (
    <div className={window}>
      <Panel className={container}>
        <div className={exitButton}>
          <Button onClick={onClose} variant="icon">
            <GrClose />
          </Button>
        </div>
        {children}
      </Panel>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const useStyles = createUseStyles({
  window: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '2',

    backgroundColor: 'hsla(0, 0%, 21%, 0.5)',
    backdropFilter: 'blur(1px)',
    display: 'grid',
    placeItems: 'center',
  },
  container: {
    position: 'relative',
    maxWidth: `400px`,
    backgroundColor: 'white',
  },
  exitButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '22px',
    height: '22px',
  },
});

export { Modal };
