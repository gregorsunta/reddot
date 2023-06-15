import { Panel } from '../molecules';
import { PostPanel } from '../organisms/panels';
import MainTemplate from '../templates/MainTemplate';
import { useFirestoreService } from '../../context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postStore } from '../../stores';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

const PostPage = observer(() => {
  const { postId } = useParams();
  const [post, setPost] = useState(
    toJS(postStore.findPostOnListByPostId(postId)),
  );

  useEffect(() => {
    const fetchPost = async () => {
      await postStore.fetchPostForListWithSnapshot(postId);
    };
    const getPost = () => {
      setPost(toJS(postStore.findPostOnListByPostId(postId)));
    };
    if (!post) {
      fetchPost();
      getPost();
    }
  });

  return (
    <MainTemplate
      content={<PostPanel post={post ?? {}}></PostPanel>}
      side={<Panel></Panel>}
    ></MainTemplate>
  );
});
export { PostPage };
