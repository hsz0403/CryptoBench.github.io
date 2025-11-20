(function () {
  function renderCanvas(canvas) {
    const url = canvas.dataset.pdf;
    if (!url || !window.pdfjsLib) return;
    const containerWidth = canvas.parentElement.clientWidth || canvas.clientWidth || 800;
    pdfjsLib.getDocument(url).promise
      .then((pdf) => pdf.getPage(1))
      .then((page) => {
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        return page.render({ canvasContext: ctx, viewport }).promise;
      })
      .catch((err) => {
        canvas.replaceWith(Object.assign(document.createElement('p'), { textContent: 'Unable to render PDF.' }));
        console.error('PDF render failed', err);
      });
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (!window.pdfjsLib) return;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    document.querySelectorAll('.figure-canvas').forEach(renderCanvas);
    window.addEventListener('resize', () => {
      document.querySelectorAll('.figure-canvas').forEach(renderCanvas);
    });
  });
})();
