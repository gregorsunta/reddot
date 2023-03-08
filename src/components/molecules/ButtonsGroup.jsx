import { Button } from '../atoms';
import { withRedirect } from '../../utils/withRedirect.jsx';
import { observer } from 'mobx-react';

const RedirectButton = withRedirect(Button);

const ButtonsGroup = observer(({ buttons }) => {
  return (
    <>
      {buttons.map(({ link, ...rest }) => {
        return link ? (
          <RedirectButton link={link} {...rest} />
        ) : (
          <Button {...rest} />
        );
      })}
    </>
  );
});

export { ButtonsGroup };
