const physics = require('./physics.js');

// socket io instance
let io;

// setup socket server
const setupSockets = (ioInstance) => {
  io = ioInstance;

  io.sockets.on('connection', (sock) => {
    const socket = sock;

    socket.join('room1');

    socket.on('startUpdating', () => {
      physics.updateClient();
    });

    socket.on('resetCircle', () => {
      physics.resetCircle();
    });

    socket.on('createConstraint', (data) => {
      physics.createConstraint(data);
    });

    socket.on('updateMouse', (data) => {
      physics.updateMouse(data);
    });

    socket.on('removeConstraint', () => {
      physics.removeConstraint();
    });

    socket.on('disconnect', () => {
      socket.leave('room1');
    });
  });
};

const updateData = (boxData, circleData) => {
  io.sockets.in('room1').emit('updateBoxes', boxData);
  io.sockets.in('room1').emit('updateCircles', circleData);
};

const getMouse = () => {
 io.sockets.in('room1').emit('getMouse');    
};

module.exports.setupSockets = setupSockets;
module.exports.updateData = updateData;
module.exports.getMouse = getMouse;
