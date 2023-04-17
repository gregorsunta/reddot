import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFirestoreService } from '../../context/firestoreServiceContext';
import { Panel, PostPanel, BriefPostPanel } from '../molecules/';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { CreatePost } from '../molecules/panels/CreatePost';
import { Stack } from '../molecules/';
import { useAuthStore } from '../../context/authStoreContext';

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
  const authSide = (
    <Stack orientation="vertical">
      <Panel>
        <p>gregorsunta</p>
      </Panel>
      <Panel>
        <p>
          Hi {authStore?.user?.displayName}, this is your personal home page
        </p>
      </Panel>
    </Stack>
  );
  const anonSide = (
    <Stack orientation="vertical">
      <Panel>
        <p>gregorsunta</p>
      </Panel>
      <Panel>
        <p>Log in or Sign up to view reddot with all of its features.</p>
        <Button variant="outlined">Log in</Button>
        <Button variant="solid">Sign up</Button>
      </Panel>
    </Stack>
  );
  return (
    <MainTemplate
      content={
        <Stack orientation="vertical">
          <Panel>
            <div
            // className={`panel ${styles.container}`}
            >
              <CreatePost />
            </div>
          </Panel>
          {posts?.map((post) => (
            <BriefPostPanel post={post} key={post.id}></BriefPostPanel>
          ))}
        </Stack>
      }
      side={authStore.user ? authSide : anonSide}
    />
  );
};

export default HomePage;
