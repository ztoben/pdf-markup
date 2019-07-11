import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: '64px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerClose: {
    overflowX: 'hidden',
    width: '64px',
    marginTop: '64px',
    zIndex: '100'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AppDrawer({setZoom, zoom}) {
  const classes = useStyles();

  function handleZoom(type) {
    if (type === 'out' && zoom > .5) {
      setZoom(zoom - .5);
    }

    if (type === 'in' && zoom < 3) {
      setZoom(zoom + .5);
    }
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerClose]: true,
      })}
      classes={{
        paper: clsx({
          [classes.drawerClose]: true,
        }),
      }}
    >
      <List>
        <ListItem button onClick={() => handleZoom('in')}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <ListItemText>
            {`x${zoom}`}
          </ListItemText>
        </ListItem>
        <ListItem button onClick={() => handleZoom('out')}>
          <ListItemIcon>
            <RemoveCircleIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  );
}
