import React from 'react';
import { CreatePostPanel, PageInfoPanel, FeedPanel } from '../molecules/panels';
import Protected from '../../navigation/Protected';
import MainTemplate from '../templates/MainTemplate';

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
    />
  );
};

export default HomePage;
