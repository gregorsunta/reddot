import PropTypes, { array } from 'prop-types';
import styles from '../../styles/molecules/Stack.module.css';

const createExpectedClassesString = (expectedProps) => {
  // predefined non optional classes + predefined optional
  return [styles.container, `flex-${expectedProps.orientation}`].join(' ');
};

const Stack = ({
  children,
  orientation = 'vertical',
  ownerClasses, //user defined optional
  spacing,
}) => {
  const expectedProps = { orientation };
  const expectedClassesString = createExpectedClassesString(expectedProps);

  return (
    <div className={[expectedClassesString, ownerClasses].join(' ')}>
      {children}
    </div>
  );
};

Stack.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  ownerClasses: PropTypes.string,
  spacing: PropTypes.string,
};

export { Stack };
