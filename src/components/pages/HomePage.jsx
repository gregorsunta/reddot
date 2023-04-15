import React from 'react';
import { useEffect, useState } from 'react';
import { useFirestoreService } from '../../context/firestoreServiceContext';
import { CreatePostPanel, PageInfoPanel, PostPanel } from '../molecules/panels';
import MainTemplate from '../templates/MainTemplate';

const HomePage = () => {
  const firestoreService = useFirestoreService();
  const [posts, setPosts] = useState(null);
  const getPosts = async () => {
    const posts = await firestoreService.getPosts();
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
            <PostPanel post={post} key={post.id}></PostPanel>
          ))}
        </>
      }
      side={<PageInfoPanel />}
    />
  );
};

export default HomePage;
