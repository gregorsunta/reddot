import PropTypes from 'prop-types';

const createExpectedClasses = (expectedProps) => {
  return [
    `flex-${expectedProps.orientation}`,
    `variant-${expectedProps.variant}`,
  ].join(' ');
};
const ButtonsGroup = ({ children, ownerClasses, orientation, variant }) => {
  const expectedProps = { orientation, variant };
  const expectedClasses = createExpectedClasses(expectedProps);

  return <div className={`${expectedClasses} ${ownerClasses}`}>{children}</div>;
};

ButtonsGroup.propTypes = {
  ownerClasses: PropTypes.array,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  variant: PropTypes.oneOf(['outlined', 'solid', 'text', 'icon']),
};
export { ButtonsGroup };
