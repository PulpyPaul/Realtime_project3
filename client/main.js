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
let buckets = {};
let circles;
let roomName;


const setupLobby = () => {
  canvas = document.getElementById("myCanvas");


  // add event that hides lobby buttons and shows canvas
  for(var i = 1; i < 5; i++){
    var temp = document.getElementById("room" + i);
    temp.addEventListener("click", () => {
      canvas.style.display = "block";
      roomName = temp.id;
      init();
    });
  }

};

const updateColor = (color) => {
  document.getElementById("playercolor").innerHTML = color;
}

const init = () => {
  // hide each of the buttons
  for(var j = 1; j < 5; j++){
    document.getElementById("room" + j).style.display = "none";
  }
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