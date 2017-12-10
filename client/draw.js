const drawCircle = (circle) => {
    ctx.beginPath();
    ctx.fillStyle = circle.color;
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
};

const drawBox = (box) => {
    ctx.fillStyle = "black";
    ctx.fillRect(box.x - box.width / 2, box.y - box.height / 2, box.width, box.height);
};

const render = () => {
  
  // Clear the screen
  ctx.clearRect(0,0,w,h);

  // Draw all data
  for (let i = 0; i < boxes.length; i++){
      drawBox(boxes[i]);
  }
    
  for (let i = 0; i < circles.length; i++){
      drawCircle(circles[i]);
  }
};