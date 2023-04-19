import React from 'react';
import { createUseStyles } from 'react-jss';
import { Stack } from '../molecules/';
import { LIGHTNESS, NEUTRAL, SIZES } from '../../constants';

const useContainerStyles = createUseStyles({
  container: {
    maxWidth: '1100px',
    margin: `0 auto`,
    padding: `${SIZES.SIZE_56}`,
  },
  background: {
    backgroundColor: `hsl(${NEUTRAL.HS} ${LIGHTNESS.L_90})`,
  },
});
const useContentStyles = createUseStyles({
  content: {
    flex: 4,
  },
});
const useSideStyles = createUseStyles({
  side: {
    flex: 2,
  },
});

const MainTemplate = ({ auth, content, side }) => {
  const containerClassNames = useContainerStyles();
  const contentClassNames = useContentStyles();
  const sideClassNames = useSideStyles();

  return (
    <div className={containerClassNames.background}>
      <Stack
        orientation="row"
        spacing={SIZES.SIZE_16}
        customClassName={containerClassNames.container}
      >
        <section className={contentClassNames.content}>{content}</section>
        <section className={sideClassNames.side}>{side}</section>
      </Stack>
    </div>
  );
};

export default MainTemplate;
