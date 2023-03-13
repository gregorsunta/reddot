import { Button } from '../atoms';
import { observer } from 'mobx-react';

const ButtonsGroup = observer(({ buttons, className }) => {
  return (
    <div className={className}>
      {buttons.map(({ ...rest }) => {
        return <Button {...rest} />;
      })}
    </div>
  );
});

export { ButtonsGroup };
