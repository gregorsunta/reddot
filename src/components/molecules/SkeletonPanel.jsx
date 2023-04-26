import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { ElementSkeleton } from '../atoms';

const useStyles = createUseStyles({ container: {} });

const SkeletonPanel = ({ type }) => {
  const styles = useStyles();
  const containerClassNames = classNames(styles.container);
  return (
    <div className={containerClassNames}>
      <p></p>
    </div>
  );
};

export { SkeletonPanel };
