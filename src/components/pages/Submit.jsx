import SubmitPanel from '../molecules/SubmitPanel/SubmitPanel';
import DefaultTemplate from '../templates/DefaultTemplate.module.css';

const Submit = ({ className }) => {
  return (
    <div className={className}>
      <SubmitPanel className={DefaultTemplate.panel} />
    </div>
  );
};

export default Submit;
