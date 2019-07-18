import pdfjs from '@bundled-es-modules/pdfjs-dist';
import {clearRef} from './clearRef';

export default function renderPdf({pdfsRef, setPages, acceptedFiles, setCanvases}) {
  let scale = 2;
  let viewport;
  let totalPages = 0;
  let canvases = [];

  clearRef(pdfsRef);

  acceptedFiles.forEach(file => {
    const fileReader = new FileReader();

    fileReader.onload = function() {
      pdfjs.getDocument(fileReader.result).promise.then(function getPdf(pdf) {
        const canvasPages = Array(pdf.numPages);
        totalPages += pdf.numPages;

        function renderPage(pageNumber, canvas, numPages) {
          pdf.getPage(pageNumber).then(function (page) {
            viewport = page.getViewport({scale});
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            canvases.push(canvas);

            page.render({
              canvasContext: canvas.getContext('2d'),
              viewport: viewport
            }).promise.then(() => {
              canvasPages[pageNumber - 1] = canvas;

              if (canvasPages.length === numPages) {
                canvasPages.forEach(canvasPage => {
                  pdfsRef.current.appendChild(canvasPage)
                });

                setPages(totalPages);
                setCanvases(canvases);
              }
            });
          });
        }

        for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const canvas = document.createElement('canvas');
          canvas.className = `pdf-canvas canvas-${pageNumber}`;

          renderPage(pageNumber, canvas, pdf.numPages);
        }
      }, function(error){
        console.log(error);
      });
    };

    fileReader.readAsArrayBuffer(file);
  });
}
