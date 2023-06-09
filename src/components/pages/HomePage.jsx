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
import { firestoreFunctions, getPosts } from '../../services/firestore';

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
  const [postComponents, setPostComponents] = useState(null);
  const [postFieldFilter, setPostFilter] = useState('timestamp');
  const [postDirectionFilter, setPostDirectionFilter] = useState('desc');
  const [postLimitFilter, setPostLimitFilter] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('Getting posts (in HomePage>useEffect>getPosts)');
      try {
        const posts = await postFunctions.getPosts(
          postFieldFilter,
          postDirectionFilter,
          postLimitFilter,
        );
        console.log(
          'Posts from getPosts (in HomePage>useEffect>getPosts):',
          posts,
        );
        setPosts(posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
    return () => {};
  }, [postFieldFilter, postDirectionFilter, postLimitFilter]);

  useEffect(() => {
    const createPostComponents = (posts) => {
      const components = posts?.map((post) => (
        <BriefPostPanel
          post={post}
          key={post.id}
          postId={post.id}
        ></BriefPostPanel>
      ));
      setPostComponents(components);
    };

    createPostComponents(posts);
  }, [posts]);

  return (
    <MainTemplate
      content={
        <Stack orientation="column" spacing={SIZES_PX.SIZE_16}>
          {authStore.user && <CreatePost />}
          {console.log('Post components in HomePage', postComponents)}
          {postComponents}
        </Stack>
      }
      side={authStore.user ? authenticatedSide(authStore) : anonymousSide}
    />
  );
};

export default HomePage;
