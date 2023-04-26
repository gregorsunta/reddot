import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { LIGHTNESS, NEUTRAL } from '../../constants';

const useStyles = createUseStyles({
  container: {
    backgroundColor: `hsl(${NEUTRAL.HS} ${LIGHTNESS.L_90})`,
    width: '100%',
  },
});

const ElementSkeleton = ({ component: Component }) => {
  const styles = useStyles();
  const containerClassNames = classNames(styles.container);

  return <Component className={containerClassNames}></Component>;
};

ElementSkeleton.propTypes = {
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

export { ElementSkeleton };
