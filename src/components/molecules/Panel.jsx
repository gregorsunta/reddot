import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { SIZES_PX } from '../../constants/StyleConstants';
import { useThemeContext } from '../../context/';

const useStyles = createUseStyles({
  container: {
    padding: `${SIZES_PX.SIZE_24}`,
    borderRadius: `${SIZES_PX.SIZE_3}`,
    border: ({ theme }) => `${SIZES_PX.SIZE_1} solid ${theme.BORDER}`,
    backgroundColor: ({ theme }) => theme.SECONDARY_BACKGROUND,
    color: ({ theme }) => theme.PRIMARY_TEXT,
  },
});

const Panel = ({ children, className }) => {
  const { theme } = useThemeContext();
  const { container } = useStyles({ theme });
  const allContainerClasses = classNames(container, className);

  return <div className={allContainerClasses}>{children}</div>;
};

export { Panel };
