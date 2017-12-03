const drawCircle = (circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
    ctx.stroke();
};

const drawBox = (box) => {
    ctx.fillRect(box.x, box.y - 5, box.width, box.height);
};

const render = () => {
  
  // Clear the screen
  ctx.clearRect(0,0,w,h);

  // Save the canvas data
  ctx.save();
    
  // Draw all data
  for (let i = 0; i < boxes.length; i++){
      drawBox(boxes[i]);
  }
    
  for (let i = 0; i < circles.length; i++){
      drawCircle(circles[i]);
  }
    
  // Restore transform
  ctx.restore();
};