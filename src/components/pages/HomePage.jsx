import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFirestoreService } from '../../context/firestoreServiceContext';
import { PostPanel, BriefPostPanel, CreatePost } from '../organisms/';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { Stack, Panel } from '../molecules/';
import { useAuthStore } from '../../context/authStoreContext';
import { SIZES_REM, SIZES_PX } from '../../constants';

const authenticatedSide = (authStore) => (
  <Stack orientation="column" spacing={SIZES_REM.SIZE_16}>
    <Panel>
      <p>
        Hi {authStore?.user?.displayName}, currently we can't show your personal
        home page, but we are implementing this feature.
      </p>
    </Panel>
    <Panel>
      <p>gregorsunta</p>
    </Panel>
  </Stack>
);
const anonymousSide = (
  <Stack spacing={SIZES_REM.SIZE_16}>
    <Panel>
      <p>
        Log in or Sign up to view reddot with all of its (limited) features.
      </p>
      <Stack orientation="column" spacing={SIZES_REM.SIZE_8}>
        <Button variant="outlined" to={'/login'}>
          Log in
        </Button>
        <Button variant="solid" to={'/signup'}>
          Sign up
        </Button>
      </Stack>
    </Panel>
    <Panel>
      <p>gregorsunta</p>
    </Panel>
  </Stack>
);

const HomePage = () => {
  const authStore = useAuthStore();
  const { firestoreService, postFunctions } = useFirestoreService();
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    const posts = await postFunctions.getPosts();
    setPosts(posts);
  };

  const createPostComponents = (posts) => {
    return posts?.map((post) => (
      <BriefPostPanel post={post} key={post.id} id={post.id}></BriefPostPanel>
    ));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <MainTemplate
      content={
        <Stack orientation="column" spacing={SIZES_PX.SIZE_16}>
          {authStore.user && <CreatePost />}
          {createPostComponents(posts)}
        </Stack>
      }
      side={authStore.user ? authenticatedSide(authStore) : anonymousSide}
    />
  );
};

export default HomePage;
