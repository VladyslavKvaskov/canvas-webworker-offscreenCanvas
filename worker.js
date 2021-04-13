let canvas = null;
let ctx = null;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


let data = [];
let dataLength = 500000;

for (let i = 1; i <= dataLength; i++) {
  data.push({
    number: i,
    bgcolor: getRandomColor(),
    _elementId: i
  });
}

self.onmessage = function(e) {
  if (e.data.type === 'canvas') {
    canvas = e.data.canvas;
    ctx = canvas.getContext('2d', {
      alpha: false
    });

    canvas.width = e.data.window.width;
    canvas.height = e.data.window.height;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (e.data.type === 'resize') {
    canvas.width = e.data.window.width;
    canvas.height = e.data.window.height;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  draw();
};

function draw() {
  if (data.length > 0) {
    const squareSize = Math.sqrt((canvas.width * canvas.height) / dataLength);
    const rowLength = Math.floor(canvas.width / squareSize);
    const rowCounter = Math.ceil(data.length / rowLength);
    const squareWidth = squareSize + ((canvas.width - rowLength * squareSize) / rowLength);
    const squareHeight = squareSize + ((canvas.height - rowCounter * squareSize) / rowCounter);

    let count = 0;
    let x = 0;
    let y = 0;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      ctx.beginPath();
      ctx.fillStyle = d.bgcolor;
      ctx.fillRect(x, y, squareWidth, squareHeight);

      count++;
      if (count === rowLength) {
        count = 0;
        y += squareHeight;
        x = 0;
      } else {
        x += squareWidth;
      }
    }
  } else {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '26px Verdana';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('No data!', canvas.width / 2, canvas.height / 2);
  }
}