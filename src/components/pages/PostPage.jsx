import { Panel } from '../molecules';
import { PostPanel } from '../organisms/panels';
import MainTemplate from '../templates/MainTemplate';
import { useFirestoreService } from '../../context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postStore } from '../../stores';
import { toJS } from 'mobx';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      const post = await postStore.fetchPostWithOwner(postId);
      console.log(post);
      setPost(post);
    };
    if (!post) {
      getPost();
    }
  }, []);

  return (
    <MainTemplate
      content={<PostPanel post={post ?? {}}></PostPanel>}
      side={<Panel></Panel>}
    >
      {console.log(post)}
    </MainTemplate>
  );
};
export { PostPage };
