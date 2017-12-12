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