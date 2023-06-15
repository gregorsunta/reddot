import { observer } from 'mobx-react';
import { createUseStyles } from 'react-jss';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../atoms/Button';
import { Stack } from '../molecules/Stack';
import { SIZES_REM } from '../../constants';
import { useThemeContext } from '../../context';

const PostComment = observer(({ comment = {} }) => {
  const { text, upvotes, author = {}, downvotes } = comment?.data;
  const { data: authorData = {} } = author;
  const { displayName, profilePicURL } = authorData;
  const { theme } = useThemeContext();
  const { fadedButton } = useStyles({ theme });

  return (
    <Stack orientation="row">
      <Stack orientation="row" alignItems="start">
        <Button variant="icon" type="button" width={'25px'}>
          <img src={profilePicURL} alt="" />
        </Button>
        <Stack>
          <p>{displayName}</p>
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
    </Stack>
  );
});

const useStyles = createUseStyles({
  fadedButton: {
    fontWeight: '600',
    fontSize: SIZES_REM.SIZE_14,
    color: ({ theme }) => theme.MEDIUM_FADED_TEXT,
  },
});

export { PostComment };
