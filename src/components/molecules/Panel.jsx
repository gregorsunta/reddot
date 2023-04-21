import styles from '../../styles/molecules/panels/Panel.module.css';
import { createUseStyles } from 'react-jss';
import { SIZES_REM, NEUTRAL } from '../../constants/StyleConstants';

const useStyles = createUseStyles({
  container: () => ({
    padding: `${SIZES_REM.SIZE_1}`,
    borderRadius: `var(--size-2)`,
    border: `${SIZES_REM.SIZE_1} solid hsl(${NEUTRAL.HS},${NEUTRAL.L_90} )`,
    backgroundColor: `white`,
  }),
});

const Panel = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export { Panel };
