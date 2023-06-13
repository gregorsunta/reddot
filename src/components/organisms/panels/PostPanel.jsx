import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms';
import { Stack, Panel } from '../../molecules';
import { PostComment, CommentSubmitBox } from '../';
import { useFirestoreService } from '../../../context/firestoreServiceContext.js';
import { useThemeContext } from '../../../context/themeContext.js';
import { SIZES_PX, SIZES_REM } from '../../../constants/StyleConstants.js';
import { commentStore } from '../../../stores';
import { toJS } from 'mobx';

const PostPanel = ({ post }) => {
  const { data = {}, id = {} } = post;
  const { author, title, text, upvotes, downvotes, profilePicURL } = data;
  const { theme } = useThemeContext();
  const { container, fadedButton } = useStyles({ theme });
  const comments = toJS(commentStore.comments);

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
            >
              Upvote
            </Button>
            {parseInt(upvotes) - parseInt(downvotes)}
            <Button
              className={fadedButton}
              type="button"
              variant="icon"
              startIcon={<BiDownvote />}
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
            <PostComment comment={comment}></PostComment>
          ))}
        </Stack>
      </Stack>
    </Panel>
  );
};

PostPanel.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
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
