import React from 'react';
import { createUseStyles } from 'react-jss';
import logoSvg from '../../assets/images/logo.svg';
import { useThemeContext } from '../../context';
import { SIZES_REM } from '../../constants';
import { Link } from 'react-router-dom';

const Logo = () => {
  const { theme } = useThemeContext();
  const { container, logoIcon, logoText } = useStyles({ theme });

  return (
    <Link to={'/'} className={container}>
      <img className={logoIcon} src={logoSvg} alt="Outlined robot head." />
      <p className={logoText}>reddot</p>
    </Link>
  );
};

const useStyles = createUseStyles({
  container: {
    flex: '0 0 auto',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    '&:visited, &:link': {
      textDecoration: 'none',
    },
  },
  logoIcon: {
    height: '100%',
  },
  logoText: {
    fontSize: SIZES_REM.SIZE_32,
    fontWeight: '400',
    textDecoration: 'none',
    color: ({ theme }) => theme.LOW_FADED_TEXT,
    letterSpacing: '-1px',
    '@media (max-width: 920px)': {
      display: 'none',
    },
  },
});

export { Logo };
