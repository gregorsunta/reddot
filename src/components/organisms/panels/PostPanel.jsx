import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button, Stack } from '../../atoms';
import { Panel } from '../../molecules';
import { PostComment, CommentSubmitBox } from '../';
import { useFirestoreService } from '../../../context/firestoreServiceContext.js';
import { useThemeContext } from '../../../context/themeContext.js';
import { SIZES_PX, SIZES_REM } from '../../../constants/StyleConstants.js';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useStores } from '../../../context';
import { handleVote } from '../../../lib/Votes';

const PostPanel = observer(({ post }) => {
  const { author, title, text, votes, profilePicURL, commentIds, id } = post;

  const { theme } = useThemeContext();
  const { container, fadedButton } = useStyles({ theme });
  const { contentStore } = useStores();
  const { user, comments } = toJS(contentStore);

  useEffect(() => {
    const getComments = async () => {
      try {
        await contentStore.getCommentsWithAuthorsForListByIds(...commentIds);
      } catch (err) {
        console.error('Failed to get comments: ', err);
      }
    };
    if (commentIds && commentIds.length > 0) {
      getComments();
    }
    return () => {
      contentStore.resetComments();
    };
  }, [commentIds]);

  return (
    <Panel>
      <Stack spacing={SIZES_PX.SIZE_24}>
        <Stack>
          <p>{author?.displayName}</p>
          <h2>{title}</h2>
          <p>{text}</p>
          <Stack orientation="row">
            <Button
              className={fadedButton}
              type="button"
              variant="icon"
              startIcon={<BiUpvote />}
              onClick={() => handleVote('posts', id, user.id, 'upvote')}
            >
              Upvote
            </Button>
            {parseInt(votes)}
            <Button
              className={fadedButton}
              type="button"
              variant="icon"
              startIcon={<BiDownvote />}
              onClick={() => handleVote('posts', id, user.id, 'downvote')}
            >
              Downvote
            </Button>
            <Button
              className={fadedButton}
              type="button"
              variant="icon"
              startIcon={<BiComment />}
            >
              Comments
            </Button>
          </Stack>
        </Stack>
        <CommentSubmitBox postId={id} authorId={author?.id}></CommentSubmitBox>
        <Stack>
          {comments?.map((comment) => (
            <PostComment
              key={comment.id}
              comment={comment}
              post={post}
            ></PostComment>
          ))}
        </Stack>
      </Stack>
    </Panel>
  );
});

PostPanel.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.object,
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  postId: PropTypes.string,
};

const useStyles = createUseStyles({
  container: {},
  fadedButton: {
    fontWeight: '600',
    fontSize: SIZES_REM.SIZE_14,
    color: ({ theme }) => theme.MEDIUM_FADED_TEXT,
  },
});

export { PostPanel };
