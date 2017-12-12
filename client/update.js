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

const updatePlayers = (playersArray) => {
    players = playersArray;    
};

const updateScore = (scores) => {
    blueScore.innerHTML = "Blue Score: " +scores.blueScore;
    redScore.innerHTML = "Red Score: " +scores.redScore;
    greenScore.innerHTML = "Green Score: " +scores.greenScore;
    yellowScore.innerHTML = "Yellow Score: " +scores.yellowScore;
};