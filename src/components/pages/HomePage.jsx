import React from 'react';
import { useEffect, useState } from 'react';
import { useFirestoreService } from '../../context/firestoreServiceContext';
import { CreatePostPanel, PageInfoPanel, FeedPanel } from '../molecules/panels';
import MainTemplate from '../templates/MainTemplate';

const HomePage = () => {
  const firestoreService = useFirestoreService();
  const [posts, setPosts] = useState(null);
  const getPosts = async () => {
    const posts = await firestoreService.getPost();
    setPosts(posts);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <MainTemplate
      content={
        <>
          <CreatePostPanel />
          {posts?.map((post) => (
            <FeedPanel post={post} key={post.id}></FeedPanel>
          ))}
        </>
      }
      side={<PageInfoPanel />}
    />
  );
};

export default HomePage;
