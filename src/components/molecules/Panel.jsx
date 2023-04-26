// import styles from '../../styles/molecules/panels/Panel.module.css';
import { createUseStyles } from 'react-jss';
import {
  SIZES_REM,
  SIZES_PX,
  NEUTRAL,
  LIGHTNESS,
} from '../../constants/StyleConstants';

const useStyles = createUseStyles({
  container: () => ({
    padding: `${SIZES_PX.SIZE_8}`,
    borderRadius: `var(--size-2)`,
    border: `${SIZES_PX.SIZE_1} solid hsl(${NEUTRAL.HS} ${LIGHTNESS.L_80})`,
    backgroundColor: `white`,
  }),
});

const Panel = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.container}>{children}</div>;
};

export { Panel };
