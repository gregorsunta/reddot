import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { useThemeContext } from '../../context';
const Input = ({
  placeholder = '',
  type = 'text',
  className = '',
  onChange = null,
  readOnly = false,
}) => {
  const { theme } = useThemeContext();
  const { container } = useStyles({ theme });
  const containerClasses = classNames(className, container);
  return (
    <input
      className={containerClasses}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

const useStyles = createUseStyles({
  container: {
    color: ({ theme }) => theme.PRIMARY_TEXT,
    backgroundColor: ({ theme }) => theme.BACKGROUND_2,
    border: ({ theme }) => `1px solid ${theme.BORDER}`,
    '&::placeholder': {
      color: ({ theme }) => theme.TEXT,
    },
    '&:focus': {
      outline: ({ theme }) => `1.5px solid ${theme.HIGHLIGHTED_BORDER}`,
    },
    '&:hover': {
      outline: ({ theme }) => `1.5px solid ${theme.HIGHLIGHTED_BORDER}`,
    },
  },
});

export { Input };
