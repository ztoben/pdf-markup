import React from 'react';
import {NavigateBefore, NavigateNext} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    right: 0,
    top: 84,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'darkgray',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    padding: 5
  }
}));

export default function PageControls({currentPage, pages, setCurrentPage}) {
  const classes = useStyles();

  function handleNavigationClick(direction) {
    if (direction === 'next' && currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }

    if (direction === 'before' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={() => handleNavigationClick('before')}>
        <NavigateBefore/>
      </IconButton>
      {`${currentPage}/${pages}`}
      <IconButton onClick={() => handleNavigationClick('next')}>
        <NavigateNext/>
      </IconButton>
    </div>
  );
}
