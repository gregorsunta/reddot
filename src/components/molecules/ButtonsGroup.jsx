import PropTypes from 'prop-types';
import styles from '../../styles/molecules/ButtonsGroup.module.css';

const createExpectedClasses = (expectedProps) => {
  return [
    `flex-${expectedProps.orientation}`,
    `variant-${expectedProps.variant}`,
    styles.container,
  ].join(' ');
};
const ButtonsGroup = ({ children, ownerClasses, orientation, variant }) => {
  const expectedProps = { orientation, variant };
  const expectedClasses = createExpectedClasses(expectedProps);

  return (
    <ul className={`${expectedClasses} ${ownerClasses}`}>
      {children.map((item) => (
        <li key={item.key}>{item}</li>
      ))}
    </ul>
  );
};

ButtonsGroup.propTypes = {
  children: PropTypes.array, //only two ore more items are allowed
  ownerClasses: PropTypes.array,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  variant: PropTypes.oneOf(['outlined', 'solid', 'text', 'icon']),
};
export { ButtonsGroup };
