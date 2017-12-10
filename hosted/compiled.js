"use strict";

var drawCircle = function drawCircle(circle) {
    ctx.beginPath();
    ctx.fillStyle = circle.color;
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
};

var drawBox = function drawBox(box) {
    ctx.fillStyle = "black";
    ctx.fillRect(box.x - box.width / 2, box.y - box.height / 2, box.width, box.height);
};

var render = function render() {

    // Clear the screen
    ctx.clearRect(0, 0, w, h);

    // Draw all data
    for (var i = 0; i < boxes.length; i++) {
        drawBox(boxes[i]);
    }

    for (var _i = 0; _i < circles.length; _i++) {
        drawCircle(circles[_i]);
    }

    ctx.beginPath();
    ctx.moveTo(0, 575);
    ctx.lineTo(600, 575);
    ctx.strokeStyle = "black";
    ctx.stroke();
};
'use strict';

var mousePosition = [];

var handleKeyDown = function handleKeyDown(e) {
    var key = e.which;

    // R press
    if (key === 82) {
        socket.emit('resetCircle');
    }
};

var handleMouseDown = function handleMouseDown(e) {
    var key = e.which;

    // Left Click
    if (key === 1) {
        var position = getCanvasLocation(e);
        socket.emit('createConstraint', position);
    }

    // Right click
    if (key === 3) {}
};

var handleMouseMove = function handleMouseMove(e) {
    mousePosition = getCanvasLocation(e);
};

var handleMouseUp = function handleMouseUp(e) {
    socket.emit('removeConstraint');
};
"use strict";

var canvas = void 0;
var ctx = void 0;
var w = void 0;
var h = void 0;
var mouseConstraint = void 0;
var mouseBody = void 0;
var moveCircle = void 0;
var socket = void 0;
// this represents the div that holds the lobby buttons
var lobby = void 0;
// Objects that will be drawn to the canvas
var boxes = void 0;
var circles = void 0;
var roomName = void 0;

var setupLobby = function setupLobby() {
  lobby = document.getElementById("lobby");
  canvas = document.getElementById("myCanvas");

  // add event that hides lobby buttons ans shows canvas
  document.getElementById("room1").addEventListener("click", function () {
    canvas.style.display = "block";
    lobby.style.display = "none";
    roomName = "room1";
    init();
  });

  document.getElementById("room2").addEventListener("click", function () {
    canvas.style.display = "block";
    lobby.style.display = "none";
    roomName = "room2";
    init();
  });

  document.getElementById("room3").addEventListener("click", function () {
    canvas.style.display = "block";
    lobby.style.display = "none";
    roomName = "room3";
    init();
  });

  document.getElementById("room4").addEventListener("click", function () {
    canvas.style.display = "block";
    lobby.style.display = "none";
    roomName = "room4";
    init();
  });
};

var init = function init() {
  // Initialize canvas
  w = canvas.width;
  h = canvas.height;
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;

  socket = io.connect();
  socket.emit('joinRoom', roomName);
  moveCircle = false;

  socket.on('startDrawing', animate);
  socket.on('updateBoxes', updateBoxes);
  socket.on('updateCircles', updateCircles);
  socket.on('getMouse', updateMouse);

  socket.emit('startUpdating');

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseout', handleMouseUp);

  document.addEventListener('keydown', handleKeyDown);
};

window.onload = setupLobby;
'use strict';

var animating = false;

// Animation loop
var animate = function animate() {
    requestAnimationFrame(animate);

    // Render scene
    render();
};

var updateBoxes = function updateBoxes(boxData) {
    boxes = boxData;
};

var updateCircles = function updateCircles(circleData) {
    circles = circleData;

    if (!animating) {
        animate();
        animating = true;
    }
};

var updateMouse = function updateMouse() {
    socket.emit('updateMouse', mousePosition);
};
"use strict";

// Convert a canvas coordiante to physics coordinate
var getCanvasLocation = function getCanvasLocation(mouseEvent) {
    var rect = canvas.getBoundingClientRect();
    var x = mouseEvent.clientX - rect.left;
    var y = mouseEvent.clientY - rect.top;
    return [x, y];
};
