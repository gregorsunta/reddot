// import styles from '../../styles/molecules/panels/Panel.module.css';
import { createUseStyles } from 'react-jss';
import {
  SIZES_REM,
  SIZES_PX,
  NEUTRAL,
  LIGHTNESS,
} from '../../constants/StyleConstants';
import classNames from 'classnames';

const useStyles = createUseStyles({
  container: () => ({
    padding: `${SIZES_PX.SIZE_24}`,
    // borderRadius: `${SIZES_PX.SIZE_6}`,
    border: `${SIZES_PX.SIZE_1} solid hsl(${NEUTRAL.HS} ${LIGHTNESS.L_80})`,
    backgroundColor: `white`,
  }),
});

const Panel = ({ children, className }) => {
  const { container } = useStyles();
  const allContainerClasses = classNames(container, className);

  return <div className={allContainerClasses}>{children}</div>;
};

export { Panel };
