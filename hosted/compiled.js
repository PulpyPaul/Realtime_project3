"use strict";

var drawCircle = function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  ctx.stroke();
};

var drawBox = function drawBox(box) {
  ctx.fillRect(box.x, box.y - 5, box.width, box.height);
};

var render = function render() {

  // Clear the screen
  ctx.clearRect(0, 0, w, h);

  // Save the canvas data
  ctx.save();

  // Draw all data
  for (var i = 0; i < boxes.length; i++) {
    drawBox(boxes[i]);
  }

  for (var _i = 0; _i < circles.length; _i++) {
    drawCircle(circles[_i]);
  }

  // Restore transform
  ctx.restore();
};
"use strict";

var canvas = void 0;
var ctx = void 0;
var w = void 0;
var h = void 0;
var mouseConstraint = void 0;
var mouseBody = void 0;
var moveCircle = void 0;
var socket = void 0;

// Objects that will be drawn to the canvas
var boxes = void 0;
var circles = void 0;

var init = function init() {

    // Initialize canvas
    canvas = document.getElementById("myCanvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    socket = io.connect();
    moveCircle = false;

    socket.on('createBoxes', createBoxes);
    socket.on('createCircles', createCircles);
    socket.on('startDrawing', animate);
    socket.on('updateBoxes', updateBoxes);
    socket.on('updateCircles', updateCircles);

    canvas.onclick = socket.emit('startPhysics', 0);
};

// Convert a canvas coordiante to physics coordinate
var getPhysicsCoord = function getPhysicsCoord(mouseEvent) {
    var rect = canvas.getBoundingClientRect();
    var x = mouseEvent.clientX - rect.left;
    var y = mouseEvent.clientY - rect.top;
    return [x, y];
};

window.onload = init;

/*
    // Create a body for the cursor
    mouseBody = new p2.Body();
    world.addBody(mouseBody);
    
    canvas.addEventListener('mousedown', () => {
        
        moveCircle = true;
        
        // Convert the canvas coordinate to physics coordinates
        var position = getPhysicsCoord(event);
        
        // Check if the cursor is inside the box
        var hitBodies = world.hitTest(position, [circleBody]);
        
        if(hitBodies.length){
            
            // Move the mouse body to the cursor position
            mouseBody.position[0] = position[0];
            mouseBody.position[1] = position[1];
            
            mouseConstraint = new p2.RevoluteConstraint(mouseBody, circleBody, {
              worldPivot: position,
              collideConnected:false
            });
            world.addConstraint(mouseConstraint);
        } else {
            moveCircle = false;
        }
    });
                            
    //Sync the mouse body to be at the cursor position
    canvas.addEventListener('mousemove', function(event){
       var position = getPhysicsCoord(event);
       mouseBody.position[0] = position[0];
       mouseBody.position[1] = position[1];
    });

    // Remove the mouse constraint on mouse up
    canvas.addEventListener('mouseup', function(event){
        world.removeConstraint(mouseConstraint);
        mouseConstraint = null;
        moveCircle = false;
    });
    */

// Start Animating
//animate();  // goes after init
"use strict";

var createBoxes = function createBoxes(boxData) {
    boxes = boxData;
};

var createCircles = function createCircles(circleData) {
    circles = circleData;
};
"use strict";

// Animation loop
var animate = function animate() {
    requestAnimationFrame(animate);

    // Render scene
    render();
};

var updateBoxes = function updateBoxes(boxData) {
    boxes = boxData;
};

var updateCircles = function updateCircles(circleData) {
    circles = circleData;
};
