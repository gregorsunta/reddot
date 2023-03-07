import React from 'react';
import { CreatePostPanel, PageInfoPanel, FeedPanel } from '../molecules/panels';
import Protected from '../../navigation/Protected';
import MainTemplate from '../templates/MainTemplate';
import HeaderButtons from '../molecules/HeaderButtons.jsx';

const HomePage = () => {
  return (
    <MainTemplate
      content={
        <>
          <Protected auth={true} component={CreatePostPanel} alternative={''} />
          <FeedPanel />
        </>
      }
      side={<PageInfoPanel />}
    ></MainTemplate>
  );
};

export default HomePage;
