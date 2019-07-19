import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MaterialDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import HighlightIcon from '@material-ui/icons/Edit';
import UndoIcon from '@material-ui/icons/Undo';
import AddTextIcon from '@material-ui/icons/TextFields';
import OutlineIcon from '@material-ui/icons/CropFree';
import AddPointIcon from '@material-ui/icons/Loupe';
import DefaultIcon from '@material-ui/icons/NearMe';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import {ADD_POINT, ADD_TEXT, DEFAULT, HIGHLIGHT, OUTLINE, UNDO} from '../constants';

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
    overflowX: 'hidden',
    marginTop: '64px',
    zIndex: '100',
    border: 'none'
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
  zoomText: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  listItem: {
    justifyContent: 'center',
    height: 64
  },
  listItemIcon: {
    justifyContent: 'center'
  },
  selected: {
    backgroundColor: '#eee'
  }
}));

export default function Drawer({
  setZoom,
  zoom,
  setSelectedTool,
  selectedTool
}) {
  const classes = useStyles();
  const drawerTools = [
    {action: DEFAULT, icon: <DefaultIcon/>},
    {action: ADD_POINT, icon: <AddPointIcon/>},
    {action: ADD_TEXT, icon: <AddTextIcon/>},
    {action: OUTLINE, icon: <OutlineIcon/>},
    {action: HIGHLIGHT, icon: <HighlightIcon/>},
    {action: UNDO, icon: <UndoIcon/>},
  ];

  function handleZoom(type) {
    if (type === 'out' && zoom > .5) setZoom(zoom - .25);
    if (type === 'in' && zoom < 3) setZoom(zoom + .25);
  }

  return (
    <MaterialDrawer
      variant="permanent"
      className={classes.drawer}
      classes={{paper: classes.drawer}}
    >
      <List disablePadding>
        {drawerTools.map(tool => (
          <ListItem
            button
            onClick={() => selectedTool !== tool.action && setSelectedTool(tool.action)}
            className={clsx(classes.listItem, {
              [classes.selected]: selectedTool === tool.action
            })}
          >
            <ListItemIcon className={classes.listItemIcon}>
              {tool.icon}
            </ListItemIcon>
          </ListItem>
        ))}
        <Divider/>
        <ListItem
          button
          className={classes.listItem}
          onClick={() => handleZoom('in')}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <AddCircleIcon/>
          </ListItemIcon>
        </ListItem>
        <ListItem dense>
          <ListItemText className={classes.zoomText}>
            {`x${zoom.toFixed(2)}`}
          </ListItemText>
        </ListItem>
        <ListItem
          button
          className={classes.listItem}
          onClick={() => handleZoom('out')}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <RemoveCircleIcon/>
          </ListItemIcon>
        </ListItem>
      </List>
    </MaterialDrawer>
  );
}
