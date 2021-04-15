let canvas = null;
var ctx = null;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


var data = [];
var dataLength = 500;

for (let i = 1; i <= dataLength; i++) {
  data.push({
    number: i,
    bgcolor: getRandomColor(),
    _elementId: i
  });
}

var bug = {
  x: 0,
  y: 0,
  increament: 3
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
    const squareSize = Math.sqrt((canvas.width * (canvas.height)) / dataLength);
    const rowLength = Math.floor(canvas.width / squareSize);
    const rowCounter = Math.ceil(data.length / rowLength);
    const squareWidth = squareSize + ((canvas.width - rowLength * squareSize) / rowLength);
    const squareHeight = squareSize + (((canvas.height) - rowCounter * squareSize) / rowCounter);
    bug.increament = squareSize * 0.05;
    let count = 0;
    let x = 0;
    let y = 0;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      ctx.fillStyle = '#fff';
      ctx.fillRect(x, y, squareWidth, squareHeight);
      ctx.fillStyle = d.bgcolor;
      ctx.fillRect(x + squareWidth * 0.1, y + squareHeight * 0.1, squareWidth - squareWidth * 0.2, squareHeight - squareHeight * 0.2);

      d.x = x + squareWidth * 0.1;
      d.y = y + squareHeight * 0.1;
      d.width = squareWidth - squareWidth * 0.2;
      d.height = squareHeight - squareHeight * 0.2;
      d.containerWidth = squareWidth;
      d.containerHeight = squareHeight;
      d.containerX = x;
      d.containerY = y;
      d.marginX = squareWidth * 0.1;
      d.marginY = squareHeight * 0.1;

      count++;
      if (count === rowLength) {
        count = 0;
        y += squareHeight;
        x = 0;
      } else {
        x += squareWidth;
      }
    }


    eatRandom(true);
  } else {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '26px Verdana';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('No data!', canvas.width / 2, canvas.height / 2);
  }
}

function eat(d) {
  if (d) {
    async function moveBug() {

      d.eaten = true;

      function drawBug() {

        let arr = data.filter(g =>
          g.y + g.containerHeight > bug.y &&
          g.x + g.containerWidth > bug.x &&
          g.y < bug.y + g.containerHeight &&
          g.x < bug.x + g.containerWidth
        );

        for (let cube of arr) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(cube.containerX - cube.containerWidth * 0.1, cube.containerY - cube.containerHeight * 0.1, cube.containerWidth + cube.containerWidth * 0.2, cube.containerHeight + cube.containerHeight * 0.2);
          ctx.fillStyle = cube.bgcolor;
          ctx.fillRect(cube.x, cube.y, cube.width, cube.height);
        }

        ctx.fillStyle = 'transparent';
        ctx.fillRect(bug.x, bug.y, d.containerWidth, d.containerHeight);

        ctx.fillStyle = 'black';
        ctx.fillRect(bug.x + d.containerWidth * 0.1, bug.y + d.containerHeight * 0.1, d.width, d.height);
      }

      drawBug();

      if (bug.x + bug.increament > d.containerX && bug.x - bug.increament < d.containerX) {
        bug.x = d.containerX;
        drawBug();
        if (bug.y + bug.increament > d.containerY && bug.y - bug.increament < d.containerY) {
          bug.y = d.containerY;
          drawBug();

          d.bgcolor = '#000';
          eatRandom();
        } else {
          if (bug.y < d.containerY) {
            bug.y += bug.increament;
          } else if (bug.y > d.containerY) {
            bug.y -= bug.increament;
          }

          requestAnimationFrame(moveBug);
        }


      } else {
        if (bug.x < d.containerX) {
          bug.x += bug.increament;
        } else if (bug.x > d.containerX) {
          bug.x -= bug.increament;
        }

        requestAnimationFrame(moveBug);
      }
    }

    moveBug();
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function eatRandom(par = false) {
  let arrToEat = data.filter(d => !d.hasOwnProperty('eaten'));
  if (arrToEat.length > 0) {
    if (par === true) {
      bug.x = arrToEat[0].containerX;
      bug.y = arrToEat[0].containerY;
    }

    eat(arrToEat[getRndInteger(0, arrToEat.length - 1)]);
  }
}