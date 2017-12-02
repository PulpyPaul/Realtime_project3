"use strict";
"use strict";

var canvas = void 0;
var ctx = void 0;
var w = void 0;
var h = void 0;
var world = void 0;
var groundShape = void 0;
var groundBody = void 0;
var mouseConstraint = void 0;
var mouseBody = void 0;
var circleShape = void 0;
var circleBody = void 0;
var moveCircle = void 0;
var socket = void 0;

var init = function init() {

    // Initialize canvas
    canvas = document.getElementById("myCanvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    socket = io.connect();
    moveCircle = false;

    socket.on('createWorld', createWorld);
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
};

// Convert a canvas coordiante to physics coordinate
var getPhysicsCoord = function getPhysicsCoord(mouseEvent) {
    var rect = canvas.getBoundingClientRect();
    var x = mouseEvent.clientX - rect.left;
    var y = mouseEvent.clientY - rect.top;
    return [x, y];
};

var drawCircle = function drawCircle() {
    ctx.beginPath();
    var x = circleBody.position[0],
        y = circleBody.position[1],
        radius = circleShape.radius;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
};

var drawGround = function drawGround() {
    ctx.fillRect(groundBody.position[0], groundBody.position[1] - 5, groundShape.width, groundShape.height);
};

var render = function render() {

    ctx.clearRect(0, 0, w, h);

    ctx.save();

    // Draw all bodies
    drawGround();
    drawCircle();

    // Restore transform
    ctx.restore();
};

// Animation loop
var animate = function animate() {
    requestAnimationFrame(animate);
    // Move physics bodies forward in time
    world.step(1 / 60);
    // Render scene
    render();
};

window.onload = init;
'use strict';

var createWorld = function createWorld(worldData) {
    console.log('created!');
};
"use strict";
