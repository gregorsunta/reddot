import { createUseStyles } from 'react-jss';
import { SIZES_REM } from '../../constants';

const useStyles = createUseStyles({
  container: {
    padding: `${SIZES_REM.SIZE_64}`,
  },
});

const Notification = ({ children }) => {
  const styles = useStyles();
  return <div className={styles.container}>{children}</div>;
};

export { Notification };
