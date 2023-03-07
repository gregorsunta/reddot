import Protected from '../../navigation/Protected';
import { SubmitPanel } from '../molecules/panels';
import MainTemplate from '../templates/MainTemplate.jsx';

const SubmitPage = () => {
  return <MainTemplate content={<SubmitPanel />}></MainTemplate>;
};

export default SubmitPage;
