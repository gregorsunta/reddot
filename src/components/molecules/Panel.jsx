// import styles from '../../styles/molecules/panels/Panel.module.css';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import {
  SIZES_REM,
  SIZES_PX,
  NEUTRAL,
  LIGHTNESS,
} from '../../constants/StyleConstants';
import { useThemeContext } from '../../context/';

const useStyles = createUseStyles({
  container: {
    padding: `${SIZES_PX.SIZE_24}`,
    // borderRadius: `${SIZES_PX.SIZE_6}`,
    border: `${SIZES_PX.SIZE_1} solid hsl(${NEUTRAL.HS} ${LIGHTNESS.L_80})`,
    backgroundColor: ({ theme }) => theme.BASE_BACKGROUND,
    color: ({ theme }) => theme.BASE_TEXT,
  },
});

const Panel = ({ children, className }) => {
  const { theme } = useThemeContext();
  const { container } = useStyles({ theme });
  const allContainerClasses = classNames(container, className);

  return <div className={allContainerClasses}>{children}</div>;
};

export { Panel };
