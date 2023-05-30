import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms/Button.jsx';
import { Stack } from '../../molecules/Stack.jsx';
import { Panel } from '../../molecules/Panel.jsx';
import { useState } from 'react';
import { useFirestoreService } from '../../../context/firestoreServiceContext.js';

const PostPanel = ({ post }) => {
  const firestoreService = useFirestoreService();
  let fallbackPost = post ? post : {};
  const [commentContent, setCommentContent] = useState();
  const { owner, title, text, comments } = fallbackPost;

  const saveComment = (comment) => {
    if (comment) firestoreService.savePostComment(comment);
  };

  return (
    <Panel>
      <Stack>
        <p>{owner}</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <Stack orientation="row">
          <Button type="button" variant="icon" startIcon={<BiUpvote />} />
          <Button type="button" variant="icon" startIcon={<BiDownvote />} />
          <Button type="button" variant="icon" startIcon={<BiComment />} />
        </Stack>
        <textarea
          type="text"
          placeholder="Text (optional)"
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
        />
        <Stack>
          {comments?.map(({ owner, text, upvotes, downvotes }) => (
            <>
              <p>{owner}</p>
              <p>{text}</p>
              <p>{parseInt(upvotes) - parseInt(downvotes)}</p>
            </>
          ))}
        </Stack>
      </Stack>
    </Panel>
  );
};

export { PostPanel };
