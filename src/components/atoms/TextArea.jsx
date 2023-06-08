import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { useThemeContext } from '../../context';
import PropTypes from 'prop-types';

const TextArea = ({ placeholder, onChange, className, resizeDirection }) => {
  const { theme } = useThemeContext();
  const { container } = useStyles({ theme, resizeDirection });
  const containerClasses = classNames(container, className);

  return (
    <textarea
      className={containerClasses}
      placeholder={placeholder}
      onChange={onChange}
    ></textarea>
  );
};

const useStyles = createUseStyles({
  container: {
    color: ({ theme }) => theme.PRIMARY_TEXT,
    backgroundColor: ({ theme }) => theme.TERTIARY_BACKGROUND,
    border: ({ theme }) => `1px solid ${theme.BORDER}`,
    resize: ({ resizeDirection }) => resizeDirection,
    '&::placeholder': {
      color: ({ theme }) => theme.PRIMARY_TEXT,
    },
    '&:focus': {
      outline: ({ theme }) => `1.5px solid ${theme.HIGHLIGHTED_BORDER}`,
    },
  },
});

TextArea.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  resizeDirection: PropTypes.oneOf(['horizontal', 'vertical', 'both', 'none']),
};

export { TextArea };
