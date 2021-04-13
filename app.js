const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const wCanvas = canvas.transferControlToOffscreen();
const worker = new Worker('worker.js');
let timeout;
worker.postMessage({
    type: 'canvas',
    canvas: wCanvas,
    window: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  [wCanvas]
);

window.onresize = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    worker.postMessage({
      type: 'resize',
      window: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    })
  }, 300);
}