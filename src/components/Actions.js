import React, {Component} from 'react';
import clsx from 'clsx';
import jsPDF from 'jspdf';
import {withStyles} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import {clearRef} from '../utils/clearRef';
import {makeid} from '../utils/makeId';
import {A4_LONG, A4_SHORT, LANDSCAPE, PORTRAIT} from '../constants';

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
    this.setState({open: false});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  buildDocument() {
    const {canvases} = this.props;
    let doc = null;

    canvases.forEach((canvas, idx) => {
      const imgData = canvas.toDataURL('image/png');
      const orientation = canvas.width >= canvas.height ? LANDSCAPE : PORTRAIT;
      const imgWidth = orientation === LANDSCAPE ? A4_LONG : A4_SHORT;
      const imgHeight = orientation === PORTRAIT ? A4_LONG : A4_SHORT;

      if (!doc) doc = new jsPDF(orientation, 'mm', 'a4');

      if (idx > 0) doc.addPage('a4', orientation);

      doc.setPage(idx + 1);
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    });

    return doc;
  }

  buildActions = () => {
    const {setAcceptedFiles, pdfsRef, setPages, setCurrentPage, canvases, setCanvases} = this.props;

    return [
      {
        icon: <SaveIcon/>, name: 'Save', onClick: () => {
          if (canvases.length > 0) {
            const doc = this.buildDocument();

            doc.save(`markup-${makeid(5)}.pdf`);
          }
        }
      },
      {
        icon: <PrintIcon/>, name: 'Print', onClick: () => {
          if (canvases.length > 0) {
            const doc = this.buildDocument();

            doc.autoPrint();
            window.open(doc.output('bloburl'), '_blank');
          }
        }
      },
      {icon: <ShareIcon/>, name: 'Share'},
      {
        icon: <DeleteIcon/>, name: 'Delete', onClick: () => {
          clearRef(pdfsRef);
          setAcceptedFiles(false);
          setPages(undefined);
          setCurrentPage(1);
          setCanvases([]);
        }
      },
    ];
  };

  render() {
    const {classes} = this.props;
    const {hidden, open} = this.state;

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
          icon={<SpeedDialIcon/>}
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
