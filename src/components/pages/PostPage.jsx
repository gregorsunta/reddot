import { Panel } from '../molecules';
import { PostPanel } from '../organisms/panels';
import MainTemplate from '../templates/MainTemplate';
import { useFirestoreService } from '../../context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  const { getPost } = useFirestoreService();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchPost = async () => {
      setData(await getPost(postId));
    };
    fetchPost().catch((err) => console.error(err));
  }, []);
  return (
    <MainTemplate
      content={<PostPanel post={data} postId={postId}></PostPanel>}
      side={<Panel></Panel>}
    />
  );
};
export { PostPage };
