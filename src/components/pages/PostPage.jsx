import { Panel } from '../molecules';
import { PostPanel } from '../organisms/panels';
import MainTemplate from '../templates/MainTemplate';
import { useFirestoreService, useStores } from '../../context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observe, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Posts } from '../../lib';

const PostPage = observer(() => {
  const { postId } = useParams();
  const { contentStore } = useStores();
  const { tempPost: post, resetTempPost } = toJS(contentStore);

  useEffect(() => {
    const unsubscribe =
      contentStore.verifyAndSubscribeIfTempPostNotExists(postId);

    const stop = () => {
      if (unsubscribe) {
        unsubscribe();
        contentStore.resetComments();
      }
    };

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const getAuthor = async () => {
      // await contentStore.addAuthorToTempPost();
    };
    if (!post.author) {
      // getAuthor();
    }
  }, []);

  return (
    <MainTemplate
      content={<PostPanel post={post ?? {}}></PostPanel>}
      side={<Panel></Panel>}
    ></MainTemplate>
  );
});
export { PostPage };
