import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms/Button.jsx';
import { Stack } from '../../molecules/Stack.jsx';
import { Panel } from '../../molecules/Panel.jsx';
import { ElementSkeleton } from '../../atoms/ElementSkeleton.jsx';

const BriefPostPanel = ({ post }) => {
  const { owner, title, text, comments } = post;

  return (
    <Panel>
      <Stack>
        {owner ? <p>{owner}</p> : <ElementSkeleton></ElementSkeleton>}
        {title ? <p>{title}</p> : <ElementSkeleton></ElementSkeleton>}
        {text ? (
          <p>{text}</p>
        ) : (
          <ElementSkeleton component={'p'}></ElementSkeleton>
        )}
        <Stack orientation="row">
          <Button type="button" variant="icon" startIcon={<BiUpvote />} />
          <Button type="button" variant="icon" startIcon={<BiDownvote />} />
          <Button type="button" variant="icon" startIcon={<BiComment />} />
        </Stack>
      </Stack>
    </Panel>
  );
};

export { BriefPostPanel };
