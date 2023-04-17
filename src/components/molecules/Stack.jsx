import PropTypes, { array } from 'prop-types';
import { createUseStyles } from 'react-jss';
import styles from '../../styles/molecules/Stack.module.css';

const useStyles = createUseStyles({
  container: (props) => ({
    display: 'flex',
    flexDirection: props.orientation,
    gap: props.spacing,
  }),
});

const Stack = ({
  component: Component = 'div',
  children,
  orientation = 'column',
  ownerClasses, //user defined optional
  spacing,
}) => {
  const ownerStyles = {};
  const styles = useStyles({ orientation, spacing });

  return (
    <Component
      className={[styles.container, ownerClasses].join(' ')}
      styles={ownerStyles}
    >
      {children}
    </Component>
  );
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
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'span',
    'a',
    'em',
    'strong',
    'small',
    'img',
    'figure',
    'figcaption',
    'form',
    'input',
    'textarea',
    'button',
    'label',
    'select',
    'option',
    'optgroup',
    'fieldset',
    'legend',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ]),
};

export { Stack };
