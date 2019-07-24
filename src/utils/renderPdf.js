import pdfjs from '@bundled-es-modules/pdfjs-dist';
import fabric from 'fabric';
import {clearRef} from './clearRef';

function renderFabric({fabricCanvas, viewport, pdfsRef, pageNumber}) {
  fabricCanvas.height = viewport.height;
  fabricCanvas.width = viewport.width;

  pdfsRef.current.appendChild(fabricCanvas);

  const f = new fabric.Canvas(fabricCanvas, {
    width: viewport.width,
    height: viewport.height,
    containerClass: `fabric-canvas fabric-${pageNumber}`
  });

  // const rect = new fabric.Rect({
  //   top: fabric.util.getRandomInt(0, viewport.height / 2),
  //   left: fabric.util.getRandomInt(0, viewport.width / 2),
  //   width: fabric.util.getRandomInt(0, viewport.width / 2),
  //   height: fabric.util.getRandomInt(0, viewport.height / 2),
  //   angle: fabric.util.getRandomInt(0, 90),
  //   fill: 'red'
  // });
  //
  // f.add(rect);
}

export default function renderPdf({pdfsRef, setPages, acceptedFiles, setCanvases}) {
  let scale = 2;
  let viewport;
  let totalPages = 0;
  let canvases = [];

  clearRef(pdfsRef);

  acceptedFiles.forEach(file => {
    const fileReader = new FileReader();

    fileReader.onload = function () {
      pdfjs.getDocument(fileReader.result).promise.then(function getPdf(pdf) {
        const canvasPages = Array(pdf.numPages);
        totalPages += pdf.numPages;

        function renderPage(pageNumber, canvas, fabricCanvas, numPages) {
          pdf.getPage(pageNumber).then(function (page) {
            viewport = page.getViewport({scale});
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            renderFabric({fabricCanvas, viewport, pdfsRef, pageNumber});

            canvases.push(canvas);

            page.render({
              canvasContext: canvas.getContext('2d'),
              viewport: viewport
            }).promise.then(() => {
              canvasPages[pageNumber - 1] = canvas;

              if (canvasPages.length === numPages) {
                canvasPages.forEach(canvas => {
                  pdfsRef.current.appendChild(canvas);
                });

                setPages(totalPages);
                setCanvases(canvases);
              }
            });
          });
        }

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const canvas = document.createElement('canvas');
          const fabricCanvas = document.createElement('canvas');

          canvas.className = `pdf-canvas canvas-${pageNumber}`;

          renderPage(pageNumber, canvas, fabricCanvas, pdf.numPages);
        }
      }, function (error) {
        console.log(error);
      });
    };

    fileReader.readAsArrayBuffer(file);
  });
}
