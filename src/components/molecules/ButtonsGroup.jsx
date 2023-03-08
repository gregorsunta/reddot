import { Button } from '../atoms';
import { withRedirect } from '../../utils/withRedirect.jsx';
import { observer } from 'mobx-react';

const RedirectButton = withRedirect(Button);

const ButtonsGroup = observer(({ buttons }) => {
  return (
    <>
      {buttons.map((btn) => {
        return btn.link ? (
          <RedirectButton
            text={btn.text}
            icon={btn.icon}
            link={btn.link}
            className={btn.className}
            key={btn.key}
          />
        ) : (
          <Button
            text={btn.text}
            icon={btn.icon}
            onClick={btn.event}
            className={btn.className}
            key={btn.key}
          />
        );
      })}
    </>
  );
});

export { ButtonsGroup };
