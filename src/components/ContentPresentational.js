import React from 'react';
import {Card, makeStyles} from '@material-ui/core';
import Drawer from './Drawer';
import PdfDropzone from './PdfDropzone';
import PageControls from './PageControls';
import Actions from './Actions';

export default function ContentPresentational({
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
      flexDirection: 'column',
      transform: `scale(${zoom})`,
      transition: '1s ease-in-out',
      transformOrigin: 'top'
    },
    contentContainer: {
      display: 'flex',
      justifyContent: 'center',
      '& .pdf-canvas': {
        display: 'none',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
      },
      [`& .canvas-${currentPage}`]: {
        display: 'flex'
      }
    }
  }));

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Drawer
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
      <Actions
        setAcceptedFiles={setAcceptedFiles}
        pdfsRef={pdfsRef}
        setPages={setPages}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
