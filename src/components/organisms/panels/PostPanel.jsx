import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms/Button.jsx';
import { Stack, Panel } from '../../molecules';
import { CommentSubmitBox } from '../CommentSubmitBox.jsx';
import { PostComment } from '../PostComment.jsx';
import { useEffect, useState } from 'react';
import { useFirestoreService } from '../../../context/firestoreServiceContext.js';
import PropTypes from 'prop-types';
import { SIZES_PX, SIZES_REM } from '../../../constants/StyleConstants.js';
import { createUseStyles } from 'react-jss';
import { useThemeContext } from '../../../context/themeContext.js';

const PostPanel = ({ post, postId }) => {
  let fallbackPost = post ? post : {};
  const { author, title, text } = fallbackPost;
  const { commentFunctions } = useFirestoreService();
  const [commentList, setCommentList] = useState([]);
  const [commentComponentList, setCommentComponentList] = useState([]);
  const { theme } = useThemeContext();
  const { container, fadedButton } = useStyles({ theme });

  const fetchComments = async (postId) => {
    const comments = await commentFunctions.getCommentsByPostId(postId);
    setCommentList(comments);
  };
  const createCommentComponents = (commentList) => {
    return commentList?.map((comment) => (
      <PostComment {...comment} key={comment.id} />
    ));
  };

  useEffect(() => {
    fetchComments(postId);
  }, []);

  useEffect(() => {
    const commentComponents = createCommentComponents(commentList);
    setCommentComponentList(commentComponents);
  }, [commentList]);

  return (
    <Panel>
      <Stack spacing={SIZES_PX.SIZE_24}>
        <Stack>
          <p>{author}</p>
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
        <CommentSubmitBox postId={postId}></CommentSubmitBox>
        <Stack>{commentComponentList}</Stack>
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
