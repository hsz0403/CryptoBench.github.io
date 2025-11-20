(() => {
  const cache = new Map();

  const loadDocument = (url) => {
    if (!cache.has(url)) {
      cache.set(url, pdfjsLib.getDocument(url).promise);
    }
    return cache.get(url);
  };

  const renderCanvas = (canvas) => {
    const url = canvas.dataset.pdf;
    if (!url || !window.pdfjsLib) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const styles = window.getComputedStyle(parent);
    const padding = parseFloat(styles.paddingLeft || '0') + parseFloat(styles.paddingRight || '0');
    const available = Math.max(0, (parent.clientWidth || canvas.clientWidth || 0) - padding);
    if (!available) return;

    loadDocument(url)
      .then((pdf) => pdf.getPage(1))
      .then((page) => {
        const ratio = window.devicePixelRatio || 1;
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = available / baseViewport.width;
        const viewport = page.getViewport({ scale: scale * ratio });
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${available}px`;
        canvas.style.height = `${viewport.height / ratio}px`;
        return page.render({ canvasContext: ctx, viewport }).promise;
      })
      .catch((err) => {
        console.error('PDF render failed', err);
        const fallback = document.createElement('p');
        fallback.textContent = 'Unable to render PDF.';
        canvas.replaceWith(fallback);
      });
  };

  const renderAll = () => document.querySelectorAll('.figure-canvas').forEach(renderCanvas);

  window.addEventListener('DOMContentLoaded', () => {
    if (!window.pdfjsLib) return;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    renderAll();
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(renderAll, 150);
    });
  });
})();
