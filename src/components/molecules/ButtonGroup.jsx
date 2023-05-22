import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: ({ orientation }) => ({
    flexDirection: orientation,
    listStyleType: 'none',
  }),
});

const ButtonGroup = ({
  children,
  className, //user defined optional
  orientation,
  variant,
}) => {
  const { container } = useStyles(orientation, variant);
  const containerClasses = classNames(container, className);

  return (
    <ul className={containerClasses}>
      {children.map((item) => (
        <li key={item.key}>{item}</li>
      ))}
    </ul>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.array, //only two ore more items are allowed
  ownerClasses: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  variant: PropTypes.oneOf(['outlined', 'solid', 'text', 'icon']),
};
export { ButtonGroup };
