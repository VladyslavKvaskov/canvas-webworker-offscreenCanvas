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

const squareConfig = {
    width: 50,
    height: 50,
    padding: 15,
    margin: 15,
};

let data = [];
let page = 1;
let limit = 500;
let dataLength = 500000;
for (let i = 1; i <= dataLength; i++) {
    data.push({ number: i, bgcolor: getRandomColor(), _elementId: i });
}

self.onmessage = function (e) {
    if (e.data.type === 'canvas') {
        console.log(e.data);
        canvas = e.data.canvas;
        ctx = canvas.getContext('2d', { alpha: false });
        canvas.width = e.data.window.width;
        canvas.height = e.data.window.height;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        draw();
    }
};

function draw() {
    if (data.length > 0) {
        const rowLength = Math.ceil(canvas.width / (squareConfig.width + squareConfig.padding * 2 + squareConfig.margin * 2));
        const rowCounter = Math.ceil(data.length / rowLength);
        console.log(rowLength);
        console.log(rowCounter);

        canvas.height = rowCounter * (squareConfig.height + squareConfig.padding * 2 + squareConfig.margin * 2);
        console.log(rowCounter * (squareConfig.height + squareConfig.padding * 2 + squareConfig.margin * 2));

        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            ctx.fillStyle = d.bgcolor;
            ctx.fillRect(20, 20, 150, 100);
        }

        console.log(123);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '26px Verdana';
        ctx.textAlign = 'center';
        ctx.fillText('No data!', canvas.width / 2, canvas.height / 2);
    }
}
