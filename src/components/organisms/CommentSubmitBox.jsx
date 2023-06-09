import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button, TextArea } from '../atoms';
import { Stack } from '../molecules';
import {
  useAuthStore,
  useFirestoreService,
  useThemeContext,
} from '../../context';
import { SIZES_PX } from '../../constants';

const CommentSubmitBox = ({ postId, authorId }) => {
  const [commentText, setCommentText] = useState();
  const { commentFunctions } = useFirestoreService();
  const [error, setError] = useState();
  const authStore = useAuthStore();
  const { theme } = useThemeContext();
  const { container, textArea, buttonArea } = useStyles({ theme });

  const handleError = (err) => {
    setError(err);
  };
  const submitComment = async (text, authStore, postId) => {
    // text validation!!!
    const obj = {
      text: text,
      downvotes: 0,
      upvotes: 1,
    };
    try {
      await commentFunctions.addComment(postId, authStore.user.uid, obj);
    } catch (err) {
      handleError(err);
      console.error(err);
    }
  };

  return (
    <Stack className={container}>
      <TextArea
        className={textArea}
        placeholder="Your thoughts?"
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
      />
      <Stack orientation="row" className={buttonArea} justifyContent="end">
        <Button
          variant="solid"
          width={'min-content'}
          onClick={() => submitComment(commentText, authStore, postId)}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

const useStyles = createUseStyles({
  container: {
    border: ({ theme }) => `1px solid ${theme.BORDER}`,
    borderRadius: SIZES_PX.SIZE_3,
    backgroundColor: ({ theme }) => theme.PRIMARY_BACKGROUND,
  },
  textArea: {
    padding: ({ theme }) => SIZES_PX.SIZE_10,
    border: 'none',
  },
  buttonArea: {},
});

export { CommentSubmitBox };
