import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms/Button.jsx';
import { Stack } from '../../molecules/Stack.jsx';
import { Panel } from '../../molecules/Panel.jsx';
import { ElementSkeleton } from '../../atoms/ElementSkeleton.jsx';

const BriefPostPanel = ({ post }) => {
  const { owner, title, text, id } = post;

  return (
    <Panel>
      <Stack>
        <p>{owner}</p>
        <p>{title}</p>
        <p>{text}</p>
        <Stack orientation="row">
          <Button type="button" variant="icon" startIcon={<BiUpvote />} />
          <Button type="button" variant="icon" startIcon={<BiDownvote />} />
          <Button
            type="button"
            variant="icon"
            startIcon={<BiComment />}
            to={`post/${id}`}
          />
        </Stack>
      </Stack>
    </Panel>
  );
};

export { BriefPostPanel };
