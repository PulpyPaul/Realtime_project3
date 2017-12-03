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
};