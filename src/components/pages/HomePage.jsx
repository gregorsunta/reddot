import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFirestoreService } from '../../context/firestoreServiceContext';
import { Panel, PostPanel, BriefPostPanel } from '../molecules/';
import MainTemplate from '../templates/MainTemplate';
import { Input } from '../atoms';

const HomePage = () => {
  const firestoreService = useFirestoreService();
  const [posts, setPosts] = useState(null);
  const getPosts = async () => {
    const posts = await firestoreService.getPosts();
    setPosts(posts);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <MainTemplate
      content={
        <>
          <Panel>
            <div
            // className={`panel ${styles.container}`}
            >
              <p>PI</p>
              <Link to="/submit">
                <Input
                  // className={`${styles.input}`}
                  type="text"
                  placeholder="Create post"
                  readOnly={true}
                />
              </Link>
            </div>
          </Panel>
          {posts?.map((post) => (
            <BriefPostPanel post={post} key={post.id}></BriefPostPanel>
          ))}
        </>
      }
      side={
        <Panel>
          <p>sum stuff</p>
        </Panel>
      }
    />
  );
};

export default HomePage;
