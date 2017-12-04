let animating = false;

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  
  // Render scene
  render();
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