import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFirestoreService } from '../../context/firestoreServiceContext';
import { PostPanel, BriefPostPanel, CreatePost } from '../organisms/';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { Stack, Panel } from '../molecules/';
import { useAuthStore } from '../../context/authStoreContext';
import { SIZES } from '../../constants';

const HomePage = () => {
  const authStore = useAuthStore();
  const firestoreService = useFirestoreService();
  const [posts, setPosts] = useState(null);
  const getPosts = async () => {
    const posts = await firestoreService.getPosts();
    setPosts(posts);
  };
  useEffect(() => {
    getPosts();
  }, []);
  const authenticatedSide = (
    <Stack orientation="column" spacing={SIZES.SIZE_16}>
      <Panel>
        <p>
          Hi {authStore?.user?.displayName}, this is your personal home page
        </p>
      </Panel>
      <Panel>
        <p>gregorsunta</p>
      </Panel>
    </Stack>
  );
  const anonymousSide = (
    <Stack spacing={SIZES.SIZE_16}>
      <Panel>
        <p>Log in or Sign up to view reddot with all of its features.</p>
        <Stack orientation="row" spacing={SIZES.SIZE_8}>
          <Button variant="outlined">Log in</Button>
          <Button variant="solid">Sign up</Button>
        </Stack>
      </Panel>
      <Panel>
        <p>gregorsunta</p>
      </Panel>
    </Stack>
  );
  return (
    <MainTemplate
      content={
        <Stack orientation="column" spacing={SIZES.SIZE_16}>
          {authStore.user && (
            <Panel>
              <CreatePost />
            </Panel>
          )}
          {posts?.map((post) => (
            <BriefPostPanel post={post} key={post.id}></BriefPostPanel>
          ))}
        </Stack>
      }
      side={authStore.user ? authenticatedSide : anonymousSide}
    />
  );
};

export default HomePage;
