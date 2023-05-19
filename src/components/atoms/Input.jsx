const Input = ({
  placeholder = '',
  type = 'text',
  className = '',
  onChange = null,
  readOnly = false,
}) => {
  return (
    <input
      className={`${className}`}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
};
export { Input };
