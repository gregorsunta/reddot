import React from 'react';
import { createUseStyles } from 'react-jss';
import { Stack } from '../molecules/';
import { LIGHTNESS, NEUTRAL, SIZES_REM } from '../../constants';

const useContainerStyles = createUseStyles({
  container: {
    maxWidth: '1100px',
    margin: `0 auto`,
    paddingTop: `80px`,
    minHeight: '100lvh',
  },
  background: {
    backgroundColor: `hsl(${NEUTRAL.HS} ${LIGHTNESS.L_90})`,
  },
});
const useContentStyles = createUseStyles({
  content: {
    width: '640px',
  },
});
const useSideStyles = createUseStyles({
  side: {
    width: '310px',
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
        spacing={SIZES_REM.SIZE_16}
        customClassName={containerClassNames.container}
      >
        <section className={contentClassNames.content}>{content}</section>
        <section className={sideClassNames.side}>{side}</section>
      </Stack>
    </div>
  );
};

export default MainTemplate;
