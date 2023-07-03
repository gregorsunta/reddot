import { Panel } from '../molecules';
import { PostPanel } from '../organisms/panels';
import MainTemplate from '../templates/MainTemplate';
import { useFirestoreService, useStores } from '../../context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observe, toJS } from 'mobx';
import { observer } from 'mobx-react';

const PostPage = observer(() => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const { contentStore } = useStores();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await contentStore.getPostForListByPostId(postId);
        const post = contentStore.findPostOnListByPostId(postId);
        setPost(post);
      } catch (err) {
        console.error(err);
      }
    };
    const existingPost = contentStore.findPostOnListByPostId(postId);

    if (existingPost) {
      setPost(existingPost);
    } else {
      fetchPost();
    }
  }, [postId]);

  return (
    <MainTemplate
      content={<PostPanel post={post ?? {}}></PostPanel>}
      side={<Panel></Panel>}
    ></MainTemplate>
  );
});
export { PostPage };
