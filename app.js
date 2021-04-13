const canvas = document.createElement('canvas');

canvas.width = 500;
canvas.height = 700;

document.body.appendChild(canvas);

const wCanvas = canvas.transferControlToOffscreen();
const worker = new Worker('worker.js');

// worker.postMessage({ canvas: wCanvas }, [wCanvas]);
console.log(navigator);
worker.postMessage(
    {
        type: 'canvas',
        canvas: wCanvas,
        screen: {
            width: window.screen.width,
            height: window.screen.height,
        },
        window: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
    },
    [wCanvas]
);
