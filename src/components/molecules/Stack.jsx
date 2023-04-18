import classNames from 'classnames';
import PropTypes, { array } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: ({ orientation, spacing }) => ({
    display: 'flex',
    flexDirection: orientation,
    gap: spacing,
  }),
});

const Stack = ({
  component: Component = 'div',
  children,
  orientation = 'column',
  customClassName, //user defined optional
  spacing,
}) => {
  const containerClassNames = useStyles({ orientation, spacing });
  const allClassNames = classNames(
    containerClassNames.container,
    customClassName,
  );

  return <Component className={allClassNames}>{children}</Component>;
};

Stack.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  orientation: PropTypes.oneOf(['column', 'row']),
  ownerClasses: PropTypes.string,
  spacing: PropTypes.string,
  component: PropTypes.oneOf([
    'div',
    'section',
    'article',
    'nav',
    'header',
    'footer',
    'main',
    'aside',
    'ul',
    'ol',
    'li',
    'dl',
    'dt',
    'dd',
    'form',
    'input',
    'textarea',
    'label',
    'select',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ]),
};

export { Stack };
