import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms/Button.jsx';
import { Stack } from '../Stack.jsx';

const PostPanel = ({ post }) => {
  return (
    <div className={`panel`}>
      <div>
        <p>{post.owner}</p>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
      </div>
      <Stack orientation={'horizontal'}>
        <Button type="button" variant="icon" startIcon={<BiUpvote />} />
        <Button type="button" variant="icon" startIcon={<BiDownvote />} />
        <Button type="button" variant="icon" startIcon={<BiComment />} />
      </Stack>
    </div>
  );
};

export { PostPanel };
