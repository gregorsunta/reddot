import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button, TextArea } from '../atoms';
import { Stack } from '../molecules';
import { useStores, useThemeContext } from '../../context';
import { SIZES_PX, SIZES_REM } from '../../constants';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Color from 'color';

const CommentSubmitBox = observer(({ postId, authorId }) => {
  const [commentText, setCommentText] = useState();
  const { theme } = useThemeContext();
  const { commentStore, userStore } = useStores();
  const user = toJS(userStore._user);
  const { container, textArea, buttonArea, mask } = useStyles({
    theme,
  });

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

  const handleSubmit = async (text, postId, user) => {
    if (!user) {
      // change error popup content and display it
    } else if (!text) {
      // change error popup content and display it
    } else {
      submitComment(commentText, postId);
    }
  };

  return (
    <Stack className={container}>
      {!user && (
        <Stack justifyContent={'center'} alignItems={'center'} className={mask}>
          <p>You need to be signed in to comment</p>
        </Stack>
      )}
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
          onClick={() => handleSubmit(commentText, postId, user)}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
});

const useStyles = createUseStyles({
  mask: {
    color: ({ theme }) => theme.TEXT,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: ({ theme }) =>
      Color(theme.BACKGROUND).alpha(0.6).toString(),
  },
  container: {
    position: 'relative',

    backgroundColor: ({ theme }) => theme.BACKGROUND,
    border: ({ theme }) => `1px solid ${theme.BORDER}`,
    borderRadius: SIZES_PX.SIZE_3,
  },
  textArea: {
    backgroundColor: ({ theme }) => theme.BACKGROUND_1,
    padding: SIZES_PX.SIZE_10,
    border: 'none',
    '&::placeholder': {
      color: ({ theme }) => theme.TEXT_1,
    },
  },
  buttonArea: {
    padding: SIZES_REM.SIZE_6,
  },
});

export { CommentSubmitBox };
