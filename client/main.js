let canvas;
let ctx;
let w;
let h;
let mouseConstraint; 
let mouseBody;
let moveCircle;
let socket;
let blueScore;
let redScore;
let greenScore;
let yellowScore;

// Objects that will be drawn to the canvas
let boxes;
let buckets = {};
let circles;


let players = [];
let thisPlayer = {};

const setupLobby = () => {
  canvas = document.getElementById("myCanvas");

  // add event that hides lobby buttons and shows canvas
  let lobbyButton = document.getElementById("room1");
    lobbyButton.addEventListener("click", () => {
      canvas.style.display = "block";
      document.getElementById("adBanner").style.display = "block";
      document.getElementById("lobbyText").style.display = "none";
      init();
    });
}

const init = () => {
  
  document.getElementById("room1").style.display = "none";    
    
  blueScore = document.getElementById("blueScore");
  redScore = document.getElementById("redScore");
  greenScore = document.getElementById("greenScore");
  yellowScore = document.getElementById("yellowScore");
  
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
  socket.on('updateScore', updateScore);
  
  socket.emit('startUpdating');

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup',   handleMouseUp);
  canvas.addEventListener('mouseout', handleMouseUp);

  document.addEventListener('keydown', handleKeyDown);

};

window.onload = setupLobby;