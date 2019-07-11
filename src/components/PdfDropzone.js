import React, {useCallback, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import pdfjs from "@bundled-es-modules/pdfjs-dist/build/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function PdfDropzone({pdfs, setPdfs, pdfsRef, zoom}) {
  const onDrop = useCallback(acceptedFiles => {
    let scale = zoom;
    let viewport;

    acceptedFiles.forEach(file => {
      const fileReader = new FileReader();

      fileReader.onload = function() {
        pdfjs.getDocument(fileReader.result).promise.then(function getPdf(pdf) {
          const canvasPages = Array(pdf.numPages);

          function renderPage(pageNumber, canvas, numPages) {
            pdf.getPage(pageNumber).then(function (page) {
              viewport = page.getViewport({scale});
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              page.render({
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
              }).promise.then(() => {
                canvasPages[pageNumber - 1] = canvas;

                if (canvasPages.length === numPages) {
                  canvasPages.forEach(canvasPage => pdfsRef.current.appendChild(canvasPage));
                }
              });
            });
          }

          for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-canvas';

            renderPage(pageNumber, canvas, pdf.numPages);
          }
        }, function(error){
          console.log(error);
        });
      };

      fileReader.readAsArrayBuffer(file);
    });

    setPdfs(acceptedFiles);
  }, [setPdfs, pdfsRef, zoom]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'application/pdf'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return !pdfs ? (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the pdf here...</p> :
          <p>Drag 'n' drop a PDF, or click to select files</p>
      }
    </div>
  ) : null;
}
