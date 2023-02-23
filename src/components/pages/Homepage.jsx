import React from 'react';
import HomeTemplate from '../templates/HomeTemplate.module.css';
import Header from '../organisms/Header/Header';
import PageInfoPanel from '../organisms/PageInfoPanel/PageInfoPanel';
import FeedPanel from '../organisms/FeedPanel/FeedPanel';
import CreatePostPanel from '../organisms/CreatePostPanel/CreatePostPanel';

const Homepage = () => {
  return (
    <>
      <Header className={HomeTemplate.header}></Header>
      <div className={HomeTemplate.main}>
        <div className={HomeTemplate.content}>
          <CreatePostPanel className={`${HomeTemplate.panel}`} />
          <FeedPanel
            className={`${HomeTemplate.feed} ${HomeTemplate.panel}`}
          ></FeedPanel>
        </div>
        <div className={HomeTemplate['side-panel-container']}>
          <PageInfoPanel className={HomeTemplate.panel}></PageInfoPanel>
        </div>
      </div>
    </>
  );
};

export default Homepage;
