import { useNavigate } from 'react-router-dom';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms/Button.jsx';
import { Stack } from '../../molecules/Stack.jsx';
import { Panel } from '../../molecules/Panel.jsx';
import { ElementSkeleton } from '../../atoms/ElementSkeleton.jsx';
import { createUseStyles } from 'react-jss';
import { useThemeContext } from '../../../context/themeContext.js';

const BriefPostPanel = ({ post, postId }) => {
  const { author, title, text } = post?.data;
  const navigate = useNavigate();

  const { theme } = useThemeContext();
  const { container } = useStyles({ theme });

  const handleClick = (event) => {
    const dataClickId = event.target
      .closest('[data-click-id]')
      .getAttribute('data-click-id');

    if (dataClickId === 'comments' || dataClickId === 'background') {
      navigate(`post/${postId}`);
    } else if (dataClickId === 'upvote') {
      // upvote
    } else if (dataClickId === 'downvote') {
      // downvote
    }
  };

  return (
    <Panel
      onClick={handleClick}
      dataAttributes={{ 'data-click-id': 'background' }}
      className={container}
    >
      <Stack data-click-id="post">
        <p>{author?.displayName}</p>
        <p>{title}</p>
        <p>{text}</p>
        <Stack orientation="row">
          <Button
            type="button"
            variant="icon"
            startIcon={<BiUpvote />}
            dataAttributes={{ 'data-click-id': 'upvote' }}
          />
          <Button
            type="button"
            variant="icon"
            startIcon={<BiDownvote />}
            dataAttributes={{ 'data-click-id': 'downvote' }}
          />
          <Button
            type="button"
            variant="icon"
            startIcon={<BiComment />}
            // to={`post/${id}`}
            dataAttributes={{ 'data-click-id': 'comments' }}
          />
        </Stack>
      </Stack>
    </Panel>
  );
};

const useStyles = createUseStyles({
  container: {
    '&:hover': {
      // borderColor: ({ theme }) => theme.HIGHLIGHTED_BORDER,
      borderColor: ({ theme }) => theme.HIGHLIGHTED_BORDER,
    },
  },
});

export { BriefPostPanel };
