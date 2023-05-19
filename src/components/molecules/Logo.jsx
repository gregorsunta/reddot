import React from 'react';
import { createUseStyles } from 'react-jss';
import logo from '../../assets/images/logo.svg';

const Logo = () => {
  const { container } = useStyles();

  return (
    <div className={container}>
      <img className={''} src={logo} alt="Outlined robot head." />
      <p className={''}>reddot</p>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    gap: '0.5vw',
  },
});

export { Logo };
