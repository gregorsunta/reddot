import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi';
import { Button, Stack } from '../../atoms';
import { Panel } from '../../molecules';
import { useThemeContext } from '../../../context/themeContext.js';
import { SIZES_REM } from '../../../constants/StyleConstants.js';
import { handleVote } from '../../../lib/Votes';
import { useStores } from '../../../context';
import { toJS } from 'mobx';

const BriefPostPanel = ({ post = {} }) => {
  const { author, title, text, votes, id } = post;
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const { container, authorInformation } = useStyles({ theme });
  const { authStore } = useStores();
  const { user } = toJS(authStore);

  const handleClick = (event) => {
    const dataClickId = event.target
      .closest('[data-click-id]')
      .getAttribute('data-click-id');

    if (dataClickId === 'comments' || dataClickId === 'background') {
      navigate(`post/${id}`);
    } else {
      if (!user) {
        console.info('handleClick() user not signed in.');
        return;
      }

      if (dataClickId === 'upvote') {
        handleVote('posts', id, user.uid, 'upvote');
      } else if (dataClickId === 'downvote') {
        handleVote('posts', id, user.uid, 'downvote');
      }
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
          Posted by {author?.displayName ?? 'Anonymous'}
        </span>
        <p>{title}</p>
        <p>{text}</p>
        <Stack orientation="row">
          <Button
            type="button"
            variant="icon"
            startIcon={<BiUpvote />}
            dataAttributes={{ 'data-click-id': 'upvote' }}
          />
          {parseInt(votes)}
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
      borderColor: ({ theme }) => theme.BORDER_1,
    },
  },
  authorInformation: {
    fontSize: SIZES_REM.SIZE_12,
    color: ({ theme }) => theme.MEDIUM_FADED_TEXT,
  },
});

export { BriefPostPanel };
