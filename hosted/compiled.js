"use strict";

var drawCircle = function drawCircle(circle) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = circle.color;
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};

var drawBox = function drawBox(box) {
    ctx.fillStyle = "black";
    ctx.fillRect(box.x - box.width / 2, box.y - box.height / 2, box.width, box.height);
};

var drawBucket = function drawBucket(bucket) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = bucket.color;
    ctx.fillRect(bucket.x - bucket.width / 2, bucket.y - bucket.height / 2, bucket.width, bucket.height);
    ctx.strokeRect(bucket.x - bucket.width / 2, bucket.y - bucket.height / 2, bucket.width, bucket.height);
};

var render = function render() {

    // Clear the screen
    ctx.clearRect(0, 0, w, h);

    // Draw all data
    for (var i = 0; i < boxes.length; i++) {
        drawBox(boxes[i]);
    }

    for (var _i = 0; _i < buckets.length; _i++) {
        drawBucket(buckets[_i]);
    }

    for (var _i2 = 0; _i2 < circles.length; _i2++) {
        drawCircle(circles[_i2]);
    }

    ctx.beginPath();
    ctx.moveTo(0, 575);
    ctx.lineTo(900, 575);
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

// Objects that will be drawn to the canvas
var boxes = void 0;
var buckets = {};
var circles = void 0;

var players = [];
var thisPlayer = {};

var setupLobby = function setupLobby() {
  canvas = document.getElementById("myCanvas");

  // add event that hides lobby buttons and shows canvas
  var lobbyButton = document.getElementById("room1");
  lobbyButton.addEventListener("click", function () {
    canvas.style.display = "inline-block";
    document.getElementById("gameInfo").style.display = "inline-block";
    init();
  });
};

var init = function init() {

  // hide each of the buttons
  document.getElementById("room1").style.display = "none";

  // Initialize canvas
  w = canvas.width;
  h = canvas.height;
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;

  socket = io.connect();
  socket.emit('joinRoom');
  moveCircle = false;

  socket.on('startDrawing', animate);
  socket.on('updateBoxes', updateBoxes);
  socket.on('updateCircles', updateCircles);
  socket.on('updateBuckets', updateBuckets);
  socket.on('getMouse', updateMouse);
  socket.on('updatePlayers', updatePlayers);

  socket.emit('startUpdating');

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseout', handleMouseUp);

  document.addEventListener('keydown', handleKeyDown);
};

window.onload = setupLobby;
"use strict";

var animating = false;

// Animation loop
var animate = function animate() {
  requestAnimationFrame(animate);

  // Render scene
  render();
};

var updateBuckets = function updateBuckets(bucketData) {
  buckets = bucketData;
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

var updatePlayers = function updatePlayers(playersArray, newPlayer) {
  players = playersArray;

  thisPlayer = newPlayer;

  document.getElementById("teamColor").innerHTML += thisPlayer.color;
};
"use strict";

// Convert a canvas coordiante to physics coordinate
var getCanvasLocation = function getCanvasLocation(mouseEvent) {
    var rect = canvas.getBoundingClientRect();
    var x = mouseEvent.clientX - rect.left;
    var y = mouseEvent.clientY - rect.top;
    return [x, y];
};
