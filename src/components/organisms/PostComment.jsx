import { observer } from 'mobx-react';
import { createUseStyles } from 'react-jss';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button, Stack } from '../atoms';
import { SIZES_PX, SIZES_REM } from '../../constants';
import { useStores, useThemeContext } from '../../context';
import { useState } from 'react';
import { firestoreService } from '../../services/firestore/FirestoreService';

const PostComment = observer(({ comment = {}, post = {} }) => {
  const { text, upvotes, author = {}, downvotes } = comment;
  const { displayName, profilePicURL } = author;
  const { theme } = useThemeContext();
  const {
    container,
    fadedButton,
    author: authorClassname,
    commentLine,
    commentLineContainer,
    hide,
  } = useStyles({ theme });
  const [postHidden, setPostHidden] = useState();
  const { contentStore, authStore } = useStores();

  return (
    <Stack orientation="row" className={container}>
      <Stack orientation="row" alignItems="start">
        <Stack orientation="row">
          <Button variant="icon" type="button" width={'25px'}>
            <img src={profilePicURL} referrerPolicy="no-referrer" alt="" />
          </Button>

          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            className={[commentLineContainer, postHidden && hide]}
            onClick={() => setPostHidden(true)}
          >
            <div className={commentLine}></div>
          </Stack>
        </Stack>
        <Stack>
          <Stack orientation="row" justifyContent="space-between">
            <p className={authorClassname}>{displayName}</p>
            {authStore.user && (
              <Button
                variant="icon"
                type="button"
                width={'5px'}
                onClick={() => {
                  firestoreService.removeComment(
                    contentStore.user.id,
                    post.id,
                    comment.id,
                  );
                }}
              >
                D
              </Button>
            )}
          </Stack>
          <p>{text}</p>
          <Stack orientation="row" className={postHidden && hide}>
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
  hide: {
    display: 'none',
  },
});

export { PostComment };
