const physics = require('./physics.js');

// socket io instance
let io;
let players = [];

// setup socket server
const setupSockets = (ioInstance) => {
  io = ioInstance;

  io.sockets.on('connection', (sock) => {
    const socket = sock;

    socket.on('joinRoom', (roomName) => {
      socket.join(roomName);
      players.push({
        id: socket.id,
        mousePosition: [],
        room: roomName, 
        color: "white"
      });
    });

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
/*
      physics.removeConstraint();
*/
    });

    socket.on('disconnect', () => {
      socket.leave();
    });
  });
};

const updateData = (boxData, circleData) => {
  /*for (var i = 1; i < 5; i++)
  {
    io.sockets.in("room" + i).emit('updateBoxes', boxData);
    io.sockets.in("room" + i).emit('updateCircles', circleData);
  }*/
  io.sockets.in("room" + 1).emit('updateBoxes', boxData);
  io.sockets.in("room" + 1).emit('updateCircles', circleData);
};

const getMouse = () => {
  for (var i = 1; i < 5; i++)
  {
    io.sockets.in("room" + i).emit('getMouse');    
  }
};

module.exports.setupSockets = setupSockets;
module.exports.updateData = updateData;
module.exports.getMouse = getMouse;
