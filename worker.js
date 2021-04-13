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
let dataLength = 5001;

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
    ctx.font = '16px Verdana';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('head', canvas.width / 2 - 20, 15);

    const squareSize = Math.sqrt((canvas.width * (canvas.height - 20)) / dataLength);
    const rowLength = Math.floor(canvas.width / squareSize);
    const rowCounter = Math.ceil(data.length / rowLength);
    const squareWidth = squareSize + ((canvas.width - rowLength * squareSize) / rowLength);
    const squareHeight = squareSize + (((canvas.height - 20) - rowCounter * squareSize) / rowCounter);

    let count = 0;
    let x = 0;
    let y = 20;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      ctx.fillStyle = '#fff';
      ctx.fillRect(x, y, squareWidth, squareHeight);
      ctx.fillStyle = d.bgcolor;
      ctx.fillRect(x + squareWidth * 0.1, y + squareHeight * 0.1, squareWidth - squareWidth * 0.2, squareHeight - squareHeight * 0.2);
      // ctx.fillRect(x + 0.75, y + 0.75, squareWidth - 1.5, squareHeight - 1.5);

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

// ctx.fillRect(x + squareWidth * 0.1, y + squareHeight * 0.1, squareWidth - squareWidth * 0.2, squareHeight - squareHeight * 0.2);