import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card} from '@material-ui/core';
import AppDrawer from './AppDrawer';
import AppActions from './AppActions';
import PdfDropzone from './PdfDropzone';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: 'lightgray',
    height: '100vh',
    marginLeft: '64px',
    overflow: 'scroll'
  },
  cardContent: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '200px'
  },
  hidden: {
    display: 'none'
  },
  canvasContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& .pdf-canvas': {
      marginBottom: '10px'
    }
  }
}));

export default function AppContent() {
  const [pdfs, setPdfs] = useState(false);
  const [zoom, setZoom] = useState(1.5);
  const classes = useStyles();
  const pdfsRef = useRef(null);

  return (
    <main className={classes.content}>
      <AppDrawer
        setZoom={setZoom}
        zoom={zoom}
      />
      {!pdfs && (
        <Card className={classes.cardContent}>
          <PdfDropzone setPdfs={setPdfs} pdfs={pdfs} pdfsRef={pdfsRef} zoom={zoom} />
        </Card>
      )}
      <div className={classes.contentContainer}>
        <div className={classes.canvasContainer} ref={pdfsRef} />
      </div>
      <AppActions
        setPdfs={setPdfs}
        pdfsRef={pdfsRef}
      />
    </main>
  );
}
