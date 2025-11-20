window.addEventListener('DOMContentLoaded', () => {
  if (!window.pdfjsLib) return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  document.querySelectorAll('.figure-canvas').forEach((canvas) => {
    const url = canvas.dataset.pdf;
    if (!url) return;
    const task = pdfjsLib.getDocument(url);
    task.promise
      .then((pdf) => pdf.getPage(1))
      .then((page) => {
        const parentWidth = canvas.parentElement.clientWidth || canvas.clientWidth || 800;
        const viewport = page.getViewport({ scale: parentWidth / page.getViewport({ scale: 1 }).width });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        return page.render({ canvasContext: ctx, viewport }).promise;
      })
      .catch((err) => {
        const fallback = document.createElement('p');
        fallback.textContent = `Unable to render PDF: ${err.message}`;
        canvas.replaceWith(fallback);
      });
  });
});
