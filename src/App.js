import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppNavBar from './components/AppNavBar';
import AppContent from './components/AppContent';

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
      <AppContent />
    </div>
  );
}
