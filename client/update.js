let animating = false;

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  // Render scene
  render();
};

const updateBuckets = (bucketData) => {
  buckets = bucketData;  
};

const updateBoxes = (boxData) => {
  boxes = boxData;
};

const updateCircles = (circleData) => {
  circles = circleData;

  if (!animating){
    animate();
    animating = true;
  }
};

const updateMouse = () => {
  socket.emit('updateMouse', mousePosition);
};

const updatePlayers = (playersArray, newPlayer) => {
  players = playersArray; 

  thisPlayer = newPlayer;

  document.getElementById("teamColor").innerHTML += thisPlayer.color;
  
};