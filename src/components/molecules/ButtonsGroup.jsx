import { Button } from '../atoms';
import { observer } from 'mobx-react';

const ButtonsGroup = observer(({ buttons }) => {
  return (
    <>
      {buttons.map(({ ...rest }) => {
        return <Button {...rest} />;
      })}
    </>
  );
});

export { ButtonsGroup };
