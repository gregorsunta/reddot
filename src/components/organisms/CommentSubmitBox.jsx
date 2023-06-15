import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button, TextArea } from '../atoms';
import { Stack } from '../molecules';
import { useStores, useThemeContext } from '../../context';
import { SIZES_PX } from '../../constants';
import { toJS } from 'mobx';

const CommentSubmitBox = ({ postId, authorId }) => {
  const [commentText, setCommentText] = useState();
  const { theme } = useThemeContext();
  const { container, textArea, buttonArea } = useStyles({ theme });
  const { commentStore, userStore } = useStores();
  const user = toJS(userStore._user);

  const submitComment = async (text, postId) => {
    // text validation!!!
    const obj = {
      text: text,
      downvotes: 0,
      upvotes: 1,
    };
    try {
      await commentStore.addComment(user.id, postId, obj);
    } catch (err) {
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
          onClick={() => submitComment(commentText, postId)}
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
