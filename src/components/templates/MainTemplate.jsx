import React from 'react';
import { createUseStyles } from 'react-jss';
import { Stack } from '../molecules/';
import { LIGHTNESS, NEUTRAL, SIZES_REM, SIZES_PX } from '../../constants';
import { useThemeContext } from '../../context';

const useContainerStyles = createUseStyles({
  container: {
    maxWidth: 'max-content',
    margin: `0 auto`,
    paddingTop: `80px`,
    paddingInline: `${SIZES_PX.SIZE_16}`,
    minHeight: '100lvh',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: (theme) => theme.PRIMARY_BACKGROUND,
  },
});
const useContentStyles = createUseStyles({
  content: {
    width: 'clamp(320px,640px,640px)',
  },
});
const useSideStyles = createUseStyles({
  side: {
    maxWidth: '310px',
  },
  '@media(max-width: 970px)': {
    side: {
      display: 'none',
    },
  },
});

const MainTemplate = ({ auth, content, side }) => {
  const { theme } = useThemeContext();
  const containerClassNames = useContainerStyles(theme);
  const contentClassNames = useContentStyles();
  const sideClassNames = useSideStyles();

  return (
    <div className={containerClassNames.background}>
      <Stack
        orientation="row"
        spacing={SIZES_PX.SIZE_16}
        customClassName={containerClassNames.container}
      >
        <section className={contentClassNames.content}>{content}</section>
        <section className={sideClassNames.side}>{side}</section>
      </Stack>
    </div>
  );
};

export default MainTemplate;
