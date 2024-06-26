export const ReaderPage = () => {
  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>PDF Viewer</title>
      <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.7.570/build/pdf.min.js"></script>
      <style>
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          display: flex;
        }
  
        .reader-container {
          justify-content: center;
          align-items: center;
          flex-direction: column;
          display: flex;
          margin: 0 auto;
        }
  
        .reader {
          justify-content: center;
          align-items: center;
        }
  
        .reader-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
        }
  
        #reader-pages {
          margin-bottom: 10px;
        }
  
        canvas {
          rotate: 180deg;
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
        }
      </style>
    </head>
    <body>
      <div class="reader-container">
        <div class="reader-info">
          <div id="reader-pages">
            Page: <span id="page_num"></span> / <span id="page_count"></span>
          </div>
          <div class="reader-actions">
            <button id="prev">Prev</button>
            <button id="next">Next</button>
            <button id="zoomIn">++</button>
            <button id="zoomOut">--</button>
          </div>
        </div>
  
        <div class="reader">
          <canvas id="pdf_canvas"></canvas>
        </div>
      </div>
  
      <script type="module">
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.7.570/build/pdf.worker.min.js";
  
        let pdfDoc = null,
          pageNum = 1,
          pageRendering = false,
          pageNumPending = null,
          scale = 1;
  
        let canvas = document.getElementById("pdf_canvas");
        let ctx = canvas.getContext("2d");
  
        const renderPage = (num) => {
          pageRendering = true;
          pdfDoc.getPage(num).then((page) => {
            canvas.height = page._pageInfo.view[3];
            canvas.width = page._pageInfo.view[2];
            ctx.scale(scale, scale);
  
            const renderContext = {
              canvasContext: ctx,
              viewport: {
                height: page._pageInfo.view[3],
                width: page._pageInfo.view[2],
              },
            };
  
            const renderTask = page.render(renderContext);
            renderTask.promise.then(() => {
              pageRendering = false;
              if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
              }
            });
          });
  
          document.getElementById("page_num").textContent = num;
        };
  
        const onPrevPage = () => {
          if (pageNum <= 1) {
            return;
          }
          pageNum--;
          queueRenderPage(pageNum);
        };
  
        const onNextPage = () => {
          if (pageNum >= pdfDoc.numPages) {
            return;
          }
          pageNum++;
          queueRenderPage(pageNum);
        };
  
        const zoomOut = () => {
          scale -= 0.1;
          renderPage(pageNum);
        };
  
        const zoomIn = () => {
          scale += 0.1;
          renderPage(pageNum);
        };
  
        document.getElementById("zoomOut").addEventListener("click", zoomOut);
        document.getElementById("zoomIn").addEventListener("click", zoomIn);
        document.getElementById("prev").addEventListener("click", onPrevPage);
        document.getElementById("next").addEventListener("click", onNextPage);
  
        const queueRenderPage = (num) => {
          if (pageRendering) {
            pageNumPending = num;
          } else {
            renderPage(num);
          }
        };
  
        pdfjsLib
          .getDocument(
            "../../public/sample.pdf"
          )
          .promise.then((doc) => {
            pdfDoc = doc;
            document.getElementById("page_count").textContent = doc.numPages;
            renderPage(pageNum);
          });
      </script>
    </body>
  </html>
  `;

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
