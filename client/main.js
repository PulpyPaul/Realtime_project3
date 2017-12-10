let canvas;
let ctx;
let w;
let h;
let mouseConstraint; 
let mouseBody;
let moveCircle;
let socket;
 
// Objects that will be drawn to the canvas
let boxes;
let buckets;
let circles;
let roomName;


const setupLobby = () => {
  canvas = document.getElementById("myCanvas");


  // add event that hides lobby buttons ans shows canvas
  document.getElementById("room1").addEventListener("click", () => {
    canvas.style.display = "block";
    roomName = "room1";
    init();
  });

  document.getElementById("room2").addEventListener("click", () => {
    canvas.style.display = "block";
    roomName = "room2";
    init();
  });

  document.getElementById("room3").addEventListener("click", () => {
    canvas.style.display = "block";
    roomName = "room3";
    init();
  });

  document.getElementById("room4").addEventListener("click", () => {
    canvas.style.display = "block";
    roomName = "room4";
    init();
  });
};

const updateColor = (color) => {
    document.getElementById("playercolor").innerHTML = color;
}

const init = () => {
  document.getElementById("buttons").style.display = "none";
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
  socket.on('updateBuckets', updateBuckets);
  socket.on('getMouse', updateMouse);
  socket.on('playerColor', updateColor);

  socket.emit('startUpdating');

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup',   handleMouseUp);
  canvas.addEventListener('mouseout', handleMouseUp);

  document.addEventListener('keydown', handleKeyDown);
  
};

window.onload = setupLobby;
