import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppNavBar from './components/AppNavBar';
import AppContentContainer from './components/AppContentContainer';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppNavBar />
      <AppContentContainer />
    </div>
  );
}
