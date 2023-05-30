import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms/Button.jsx';
import { Stack } from '../../molecules/Stack.jsx';
import { Panel } from '../../molecules/Panel.jsx';

const PostPanel = ({ post }) => {
  let fallbackPost = post ? post : {};
  const { owner, title, text, comments } = fallbackPost;

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
