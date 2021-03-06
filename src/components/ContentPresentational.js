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
  canvases,
  selectedTool,
  setAcceptedFiles,
  setCanvases,
  setCurrentPage,
  setPages,
  setZoom,
  setSelectedTool,
  pdfsRef
}) {
  const useStyles = makeStyles(theme => ({
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
      display: canvases ? 'flex' : 'none',
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
      },
      '& .fabric-canvas': {
        display: 'none',
        zIndex: 100
      },
      [`& .fabric-${currentPage}`]: {
        display: 'flex'
      },
      maxHeight: 'calc(100vh - 128px)'
    }
  }));

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Drawer
        setZoom={setZoom}
        zoom={zoom}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      {!acceptedFiles && (
        <Card className={classes.cardContent}>
          <PdfDropzone setAcceptedFiles={setAcceptedFiles}/>
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
        canvases={canvases}
        setCanvases={setCanvases}
      />
    </main>
  );
}
