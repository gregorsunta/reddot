import { observer } from 'mobx-react';
import { createUseStyles } from 'react-jss';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../atoms/Button';
import { Stack } from '../molecules/Stack';
import { SIZES_PX, SIZES_REM } from '../../constants';
import { useThemeContext } from '../../context';

const PostComment = observer(({ comment = {} }) => {
  const { text, upvotes, author = {}, downvotes } = comment?.data;
  const { data: authorData = {} } = author;
  const { displayName, profilePicURL } = authorData;
  const { theme } = useThemeContext();
  const {
    container,
    fadedButton,
    author: authorClassname,
    commentLine,
    commentLineContainer,
  } = useStyles({ theme });

  return (
    <Stack orientation="row" className={container}>
      <Stack orientation="row" alignItems="start">
        <Stack>
          <Button variant="icon" type="button" width={'25px'}>
            <img src={profilePicURL} alt="" />
          </Button>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            className={commentLineContainer}
          >
            <div className={commentLine}></div>
          </Stack>
        </Stack>
        <Stack>
          <p className={authorClassname}>{displayName}</p>
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
  container: {
    position: 'relative',
  },
  fadedButton: {
    fontWeight: '600',
    fontSize: SIZES_REM.SIZE_14,
    color: ({ theme }) => theme.MEDIUM_FADED_TEXT,
  },
  author: {
    color: ({ theme }) => theme.TEXT_2,
    fontSize: SIZES_REM.SIZE_12,
    fontWeight: '600',
  },
  commentLineContainer: {
    position: 'absolute',
    top: SIZES_REM.SIZE_28,
    left: '8px',
    bottom: 0,
    width: '8px',
    '&:hover': {
      '& *': {
        backgroundColor: ({ theme }) => theme.BORDER_1,
      },
    },
  },
  commentLine: {
    backgroundColor: ({ theme }) => theme.BORDER,
    width: '2.25px',
    height: '100%',
  },
});

export { PostComment };
