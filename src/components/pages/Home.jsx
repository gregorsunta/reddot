import React from 'react';
import DefaultTemplate from '../templates/DefaultTemplate.module.css';
import FeedPanel from '../organisms/FeedPanel/FeedPanel';
import CreatePostPanel from '../molecules/CreatePostPanel/CreatePostPanel';
// import promptSignIn from '../../services/firebase-auth';

const Homepage = ({ className }) => {
  return (
    <div className={className}>
      <CreatePostPanel className={`${DefaultTemplate.panel}`} />
      <FeedPanel
        className={`${DefaultTemplate.feed} ${DefaultTemplate.panel}`}
      ></FeedPanel>
    </div>
  );
};

export default Homepage;
