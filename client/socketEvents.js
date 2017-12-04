const createBoxes = (boxData) => {
    boxes = boxData;
};

const createCircles = (circleData) => {
    circles = circleData;
    socket.emit('startPhysics', 0);
};