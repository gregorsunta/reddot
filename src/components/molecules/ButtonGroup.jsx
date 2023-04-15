import PropTypes from 'prop-types';
import styles from '../../styles/molecules/ButtonsGroup.module.css';

const createExpectedClassesString = (expectedProps) => {
  // predefined non optional classes + predefined optional
  return [
    styles.container,
    `flex-${expectedProps.orientation}`,
    `variant-${expectedProps.variant}`,
  ].join(' ');
};
const ButtonGroup = ({
  children,
  ownerClasses, //user defined optional
  orientation,
  variant,
}) => {
  const expectedProps = { orientation, variant };
  const expectedClassesString = createExpectedClassesString(expectedProps);

  return (
    <ul className={`${expectedClassesString} ${ownerClasses}`}>
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
