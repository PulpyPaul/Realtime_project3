// Necessary for getting unique user ID
const xxh = require('xxhashjs');
const physics = require('./physics.js');

// socket io instance
let io;

// setup socket server
const setupSockets = (ioInstance) => {
  io = ioInstance;

  io.sockets.on('connection', (sock) => {
    const socket = sock;

    socket.join('room1');

    socket.emit('createWorld', physics.simulation);


    socket.on('disconnect', () => {
      socket.leave('room1');
    });
  });
};

module.exports.setupSockets = setupSockets;

