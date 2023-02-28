const Protected = ({
  auth,
  component: Component,
  alternative: Alternative,
  ...rest
}) => {
  if (auth) {
    return <Component />;
  }
  if (!Alternative) {
    return null;
  }
  return <Alternative />;
};

export default Protected;
