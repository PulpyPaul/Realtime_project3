let canvas;
let ctx;
let w;
let h;
let world;
let groundShape;
let groundBody;
let mouseConstraint; 
let mouseBody;
let circleShape;
let circleBody;
let moveCircle;
let socket;

const init = () => {
        
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
const getPhysicsCoord = (mouseEvent) => {
    var rect = canvas.getBoundingClientRect();
    var x = mouseEvent.clientX - rect.left;
    var y = mouseEvent.clientY - rect.top;
    return [x, y];
}

const drawCircle = () => {
    ctx.beginPath();
    var x = circleBody.position[0],
        y = circleBody.position[1],
        radius = circleShape.radius;
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.stroke();
}

const drawGround = () => {
    ctx.fillRect(groundBody.position[0], groundBody.position[1] - 5, groundShape.width, groundShape.height);
}

const render = () => {
  
  ctx.clearRect(0,0,w,h);

  ctx.save();
    
  // Draw all bodies
  drawGround();
  drawCircle();
    
  // Restore transform
  ctx.restore();
}

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  // Move physics bodies forward in time
  world.step(1/60);
  // Render scene
  render();
}

window.onload = init;