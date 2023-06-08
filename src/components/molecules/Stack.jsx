import classNames from 'classnames';
import PropTypes, { array } from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: ({ orientation, spacing, justifyContent, alignItems }) => ({
    display: 'flex',
    flexDirection: orientation,
    gap: spacing,
    justifyContent: justifyContent,
    alignItems: alignItems,
  }),
});

const Stack = ({
  component: Component = 'div',
  children,
  orientation = 'column',
  className,
  spacing,
  justifyContent,
  alignItems,
}) => {
  const containerClassNames = useStyles({
    orientation,
    spacing,
    justifyContent,
    alignItems,
  });
  const allClassNames = classNames(containerClassNames.container, className);

  return <Component className={allClassNames}>{children}</Component>;
};

Stack.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  orientation: PropTypes.oneOf(['column', 'row']),
  className: PropTypes.string,
  spacing: PropTypes.string,
  justifyContent: PropTypes.oneOf(['space-between', 'center', 'start', 'end']),
  alignItems: PropTypes.oneOf(['stretch', 'center', 'start', 'end']),
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
