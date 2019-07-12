import React from 'react';
import {Card, makeStyles} from '@material-ui/core';
import AppDrawer from './AppDrawer';
import PdfDropzone from './PdfDropzone';
import PageControls from './PageControls';
import AppActions from './AppActions';

export default function AppContentPresentational({
  currentPage,
  zoom,
  acceptedFiles,
  pages,
  setAcceptedFiles,
  setCurrentPage,
  setPages,
  setZoom,
  pdfsRef
}) {
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

  return (
    <main className={classes.content}>
      <AppDrawer
        setZoom={setZoom}
        zoom={zoom}
      />
      {!acceptedFiles && (
        <Card className={classes.cardContent}>
          <PdfDropzone setAcceptedFiles={setAcceptedFiles} acceptedFiles={acceptedFiles}/>
        </Card>
      )}
      <div className={classes.contentContainer}>
        <div className={classes.canvasContainer} ref={pdfsRef}/>
      </div>
      {pages && <PageControls currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}/>}
      <AppActions
        setAcceptedFiles={setAcceptedFiles}
        pdfsRef={pdfsRef}
        setPages={setPages}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
