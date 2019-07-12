import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card} from '@material-ui/core';
import AppDrawer from './AppDrawer';
import AppActions from './AppActions';
import PdfDropzone from './PdfDropzone';
import PageControls from './PageControls';

export default function AppContent() {
  const [pdfs, setPdfs] = useState(false);
  const [zoom, setZoom] = useState(1.5);
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

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
        display: 'none'
      },
      [`& .canvas-${currentPage}`]: {
        display: 'flex'
      }
    }
  }));

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
          <PdfDropzone
            setPdfs={setPdfs}
            pdfs={pdfs}
            pdfsRef={pdfsRef}
            zoom={zoom}
            setPages={setPages}
          />
        </Card>
      )}
      <div className={classes.contentContainer}>
        <div className={classes.canvasContainer} ref={pdfsRef} />
      </div>
      {pages && <PageControls currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage} />}
      <AppActions
        setPdfs={setPdfs}
        pdfsRef={pdfsRef}
        setPages={setPages}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
