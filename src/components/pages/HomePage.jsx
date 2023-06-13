import { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { useFirestoreService } from '../../context/firestoreServiceContext';
import { PostPanel, BriefPostPanel, CreatePost } from '../organisms/';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { Stack, Panel } from '../molecules/';
import { useStores } from '../../context/authStoreContext';
import { SIZES_REM, SIZES_PX } from '../../constants';
import { observer } from 'mobx-react';

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

const HomePage = observer(() => {
  const { authStore, postStore } = useStores();
  const [postComponents, setPostComponents] = useState(null);
  const [postFieldFilter, setPostFilter] = useState('timestamp');
  const [postDirectionFilter, setPostDirectionFilter] = useState('desc');
  const [postLimitFilter, setPostLimitFilter] = useState(10);
  const posts = toJS(postStore.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await postStore.fetchPostsForListWithSnapshot(
          postFieldFilter,
          postDirectionFilter,
          postLimitFilter,
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
    return () => {};
  }, [postFieldFilter, postDirectionFilter, postLimitFilter]);

  return (
    <MainTemplate
      content={
        <Stack orientation="column" spacing={SIZES_PX.SIZE_16}>
          {authStore.user && <CreatePost />}
          {posts?.map((post) => (
            <BriefPostPanel post={post} key={post.id}></BriefPostPanel>
          ))}
        </Stack>
      }
      side={authStore.user ? authenticatedSide(authStore) : anonymousSide}
    ></MainTemplate>
  );
});

export default HomePage;
