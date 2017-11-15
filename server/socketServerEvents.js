// Necessary for getting unique user ID
const xxh = require('xxhashjs');

// socket io instance
let io;

// setup socket server
const setupSockets = (ioInstance) => {
  io = ioInstance;

  io.sockets.on('connection', (sock) => {
    const socket = sock;

    socket.join('room1');

    // taken from previous assignment, creates unique hash for user
    const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

    socket.hash = hash;

    socket.on('disconnect', () => {
      socket.leave('room1');
    });
  });
};

module.exports.setupSockets = setupSockets;

