import { Button } from '../atoms';

const HeaderButtons = ({ auth }) => {
  if (!auth.user) {
    return <Button></Button>;
  }
  return;
};

export default HeaderButtons;
