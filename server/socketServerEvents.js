const physics = require('./physics.js');

// socket io instance
let io;

// setup socket server
const setupSockets = (ioInstance) => {
  io = ioInstance;

  io.sockets.on('connection', (sock) => {
    const socket = sock;

    socket.join('room1');

    socket.emit('createBoxes', physics.boxDrawData);
    socket.emit('createCircles', physics.circleDrawData);

    socket.on('disconnect', () => {
      socket.leave('room1');
    });
      
    socket.on('startPhysics', () => {
        physics.startPhysics();
        socket.emit('startDrawing', 0);
    });
  });
};

const updateData = (boxData, circleData) => {
    
    io.sockets.in('room1').emit('updateBoxes', boxData);
    io.sockets.in('room1').emit('updateCircles', circleData);
};

module.exports.setupSockets = setupSockets;
module.exports.updateData = updateData;

