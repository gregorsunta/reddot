import React from 'react';
import { CreatePostPanel, PageInfoPanel, FeedPanel } from '../molecules/panels';
import MainTemplate from '../templates/MainTemplate';

const HomePage = () => {
  return (
    <MainTemplate
      content={
        <>
          <CreatePostPanel />
          <FeedPanel />
        </>
      }
      side={<PageInfoPanel />}
    />
  );
};

export default HomePage;
