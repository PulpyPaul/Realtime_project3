let canvas;
let ctx;
let w;
let h;
let mouseConstraint; 
let mouseBody;
let moveCircle;
let socket;

// Objects that will be drawn to the canvas
let boxes;
let circles;

const init = () => {
        
    // Initialize canvas
    canvas = document.getElementById("myCanvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    
    socket = io.connect();
    moveCircle = false;
    
    socket.on('startDrawing', animate);
    socket.on('updateBoxes', updateBoxes);
    socket.on('updateCircles', updateCircles);
    socket.on('getMouse', updateMouse);
    
    socket.emit('startUpdating');
    
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup',   handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);
    
    document.addEventListener('keydown', handleKeyDown);
};

window.onload = init;
