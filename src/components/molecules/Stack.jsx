import PropTypes, { array } from 'prop-types';
import styles from '../../styles/molecules/Stack.module.css';

const createExpectedClassesString = (expectedProps) => {
  // predefined non optional classes + predefined optional
  return [styles.container, `flex-${expectedProps.orientation}`].join(' ');
};

const Stack = ({
  component: Component = 'div',
  children,
  orientation = 'vertical',
  ownerClasses, //user defined optional
  spacing,
}) => {
  const expectedProps = { orientation };
  const expectedClassesString = createExpectedClassesString(expectedProps);

  return (
    <Component className={[expectedClassesString, ownerClasses].join(' ')}>
      {children}
    </Component>
  );
};

Stack.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
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
