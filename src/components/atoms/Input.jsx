import classNames from 'classnames';

const Input = ({
  placeholder = '',
  type = 'text',
  className = '',
  onChange = null,
  readOnly = false,
}) => {
  const containerClasses = classNames(className);

  return (
    <input
      className={containerClasses}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
};
export { Input };
