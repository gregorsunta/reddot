import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button } from '../../atoms/Button.jsx';
import { Stack, Panel } from '../../molecules';
import { useThemeContext } from '../../../context/themeContext.js';
import { SIZES_REM } from '../../../constants/StyleConstants.js';

const BriefPostPanel = ({ post = {} }) => {
  const { data, id } = post;
  const { author, title, text, upvotes, downvotes } = data;
  const { data: authorData } = author;
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const { container, authorInformation } = useStyles({ theme });

  const handleClick = (event) => {
    const dataClickId = event.target
      .closest('[data-click-id]')
      .getAttribute('data-click-id');

    if (dataClickId === 'comments' || dataClickId === 'background') {
      navigate(`post/${id}`);
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
        <span className={authorInformation}>
          Posted by {authorData.displayName}
        </span>
        <p>{title}</p>
        <p>{text}</p>
        <Stack orientation="row">
          <Button
            type="button"
            variant="icon"
            startIcon={<BiUpvote />}
            dataAttributes={{ 'data-click-id': 'upvote' }}
            onClick={async () => {
              // const res = await handlePostUpvote(user.uid, postId);
            }}
          />
          {parseInt(upvotes) - parseInt(downvotes)}
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
            onClick={() => {
              // handlePostDownvotes(user.uid, postId);
            }}
          />
        </Stack>
      </Stack>
    </Panel>
  );
};

const useStyles = createUseStyles({
  container: {
    '&:hover': {
      borderColor: ({ theme }) => theme.BORDER_1,
    },
  },
  authorInformation: {
    fontSize: SIZES_REM.SIZE_12,
    color: ({ theme }) => theme.MEDIUM_FADED_TEXT,
  },
});

export { BriefPostPanel };
