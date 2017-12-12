let mousePosition = [];

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
        socket.emit('createConstraint', {position: position, id: thisPlayer.id});
    }
    
    // Right click
    if (key === 3){
        
    }
};

const handleMouseMove = (e) => {
    mousePosition = getCanvasLocation(e);
};

const handleMouseUp = (e) => {
    socket.emit('removeConstraint');
};