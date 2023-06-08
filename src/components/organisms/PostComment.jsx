import { createUseStyles } from 'react-jss';
import { Button } from '../atoms/Button';
import { Stack } from '../molecules/Stack';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { SIZES_REM } from '../../constants';
import { useThemeContext } from '../../context';
import { number } from 'joi';

const PostComment = ({
  id,
  authorProfileIcon,
  author,
  text,
  upvotes,
  downvotes,
  timestamp,
}) => {
  const { theme } = useThemeContext();
  const { fadedButton } = useStyles({ theme });

  return (
    <Stack orientation="row">
      <Button variant="icon" type="button">
        {authorProfileIcon}
      </Button>
      <Stack>
        <p>{author}</p>
        <p>{text}</p>
        <Stack orientation="row">
          <Button
            className={fadedButton}
            type="button"
            variant="icon"
            startIcon={<BiUpvote />}
            dataAttributes={{ 'data-click-id': 'upvote' }}
          ></Button>
          {parseInt(upvotes) - parseInt(downvotes)}
          <Button
            className={fadedButton}
            type="button"
            variant="icon"
            startIcon={<BiDownvote />}
            dataAttributes={{ 'data-click-id': 'downvote' }}
          ></Button>
          <Button
            className={fadedButton}
            type="button"
            variant="icon"
            startIcon={<BiComment />}
            dataAttributes={{ 'data-click-id': 'comments' }}
          >
            Reply
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const useStyles = createUseStyles({
  fadedButton: {
    fontWeight: '600',
    fontSize: SIZES_REM.SIZE_14,
    color: ({ theme }) => theme.MEDIUM_FADED_TEXT,
  },
});

export { PostComment };
