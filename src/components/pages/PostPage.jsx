import { Panel } from '../molecules';
import { PostPanel } from '../organisms/panels';
import MainTemplate from '../templates/MainTemplate';
import { useFirestoreService } from '../../context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  const firestoreService = useFirestoreService();
  const [data, setData] = useState({});
  useEffect(() => {
    const getPost = async () => {
      setData(await firestoreService.getPost(postId));
    };
    getPost().catch((err) => console.error(err));
  }, []);
  return (
    <MainTemplate
      content={<PostPanel post={data}></PostPanel>}
      side={<Panel></Panel>}
    />
  );
};
export { PostPage };
