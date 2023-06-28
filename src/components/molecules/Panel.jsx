import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { SIZES_PX } from '../../constants/StyleConstants';
import { useThemeContext } from '../../context/';

const Panel = ({ children, className, onClick, dataAttributes }) => {
  const { theme } = useThemeContext();
  const { container } = useStyles({ theme });
  const allContainerClasses = classNames(container, className);

  return (
    <div className={allContainerClasses} onClick={onClick} {...dataAttributes}>
      {children}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    padding: `${SIZES_PX.SIZE_24}`,
    borderRadius: `${SIZES_PX.SIZE_3}`,
    border: ({ theme }) => `${SIZES_PX.SIZE_1} solid ${theme.BORDER}`,
    backgroundColor: ({ theme }) => theme.BACKGROUND_1,
    // color: ({ theme }) => theme.TEXT,
  },
});

export { Panel };
