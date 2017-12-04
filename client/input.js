const handleKeyDown = (e) => {
    let key = e.which;
    
    // R press
    if (key === 82){
        socket.emit('resetCircle');
    }
};

const handleMouseDown = (e) => {
    let key = e.which;
    
    // Left Click
    if (key === 1){
        let position = getCanvasLocation(e);
        socket.emit('createConstraint', position);
    }
    
    // Right click
    if (key === 3){
        
    }
};

const handleMouseMove = (e) => {
    let position = getCanvasLocation(e);
    socket.emit('updateMouse', position);
};

const handleMouseUp = (e) => {
    socket.emit('removeConstraint');
};