import React, {Component} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import {clearRef} from '../utils/clearRef';

const styles = theme => ({
  root: {
    width: '100%',
  },
  speedDial: {
    position: 'absolute',
    '&$directionUp': {
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    }
  },
  directionUp: {}
});

class Actions extends Component {
  state = {
    open: false,
    hidden: false,
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  buildActions = () => {
    const { setAcceptedFiles, pdfsRef, setPages, setCurrentPage } = this.props;

    return [
      { icon: <SaveIcon />, name: 'Save' },
      { icon: <PrintIcon />, name: 'Print' },
      { icon: <ShareIcon />, name: 'Share' },
      { icon: <DeleteIcon />, name: 'Delete', onClick:  () => {
        clearRef(pdfsRef);
        setAcceptedFiles(false);
        setPages(undefined);
        setCurrentPage(1);
      }},
    ];
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    const speedDialClassName = clsx(
      classes.speedDial,
      classes['directionUp'],
    );

    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="Actions"
          className={speedDialClassName}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
          direction="up"
        >
          {this.buildActions().map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                if (action.onClick) action.onClick();
                this.handleClick();
              }}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

export default withStyles(styles)(Actions);
