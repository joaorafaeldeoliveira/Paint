let currentColor = 'black';
let screen = document.querySelector("#tela");
let ctx = screen.getContext('2d');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let isEraser = false;


document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});


document.querySelector("#eraser").addEventListener("click", () => {
    isEraser = true;
    currentColor = "white";
    document.querySelectorAll(".color").forEach(c => c.classList.remove("active"));
});


screen.addEventListener('mousedown', mousedownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);


screen.addEventListener('touchstart', touchStartEvent);
screen.addEventListener('touchmove', touchMoveEvent);
screen.addEventListener('touchend', touchEndEvent);


document.querySelector('.clear').addEventListener('click', clearScreen);


document.querySelector("#bucket").addEventListener("click", fillCanvas);


function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;
    isEraser = false;
    document.querySelectorAll('.color.active').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
}


function mousedownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}


function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}


function mouseUpEvent() {
    canDraw = false;
}


function touchStartEvent(e) {
    canDraw = true;
    let touch = e.touches[0];
    mouseX = touch.pageX - screen.offsetLeft;
    mouseY = touch.pageY - screen.offsetTop;
    e.preventDefault(); 
}


function touchMoveEvent(e) {
    if (canDraw) {
        let touch = e.touches[0];
        draw(touch.pageX, touch.pageY);
        e.preventDefault(); 
    }
}


function touchEndEvent() {
    canDraw = false;
}


function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}


function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}


function fillCanvas() {
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}