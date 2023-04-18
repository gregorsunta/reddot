import { createUseStyles } from 'react-jss';
import { SIZES } from '../../constants';

const useStyles = createUseStyles({
  container: {
    padding: `${SIZES.SIZE_64}`,
  },
});

const Notification = ({ children }) => {
  const styles = useStyles();
  return <div className={styles.container}>{children}</div>;
};

export { Notification };
