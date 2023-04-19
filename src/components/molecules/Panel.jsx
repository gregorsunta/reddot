import styles from '../../styles/molecules/panels/Panel.module.css';
import { createUseStyles } from 'react-jss';
import { SIZES, NEUTRAL } from '../../constants/StyleConstants';

const useStyles = createUseStyles({
  container: () => ({
    padding: `${SIZES.SIZE_1}`,
    borderRadius: `var(--size-2)`,
    border: `${SIZES.SIZE_1} solid hsl(${NEUTRAL.HS},${NEUTRAL.L_90} )`,
    backgroundColor: `white`,
  }),
});

const Panel = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export { Panel };
