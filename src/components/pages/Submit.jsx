import Protected from '../../navigation/Protected';
import { SubmitPanel } from '../molecules/panels/';

const Submit = () => {
  return (
    <div className={''}>
      <Protected>
        <SubmitPanel className={`${''}`} />
      </Protected>
    </div>
  );
};

export default Submit;
