const physics = require('./physics.js');

// socket io instance
let io;
const players = [];
const colors = ['Blue', 'Red', 'Green', 'Yellow'];

// setup socket server
const setupSockets = (ioInstance) => {
  io = ioInstance;

  io.sockets.on('connection', (sock) => {
    const socket = sock;

    socket.on('joinRoom', () => {
      const newPlayer = {
        id: socket.id,
        mousePosition: [],
        color: colors[players.length % 4],
      };

      players.push(newPlayer);

      physics.createMouseBody(socket.id);

      socket.emit('updatePlayers', players, newPlayer);
    });

    socket.on('startUpdating', () => {
      physics.updateClient();
    });

    socket.on('resetCircle', () => {
      physics.resetCircle();
    });

    socket.on('createConstraint', (data) => {
      physics.createConstraint(data, socket.id);
    });

    socket.on('updateMouse', (data) => {
      physics.updateMouse(data, socket.id);
    });

    socket.on('removeConstraint', () => {
      physics.removeConstraint(socket.id);
    });

    socket.on('disconnect', () => {
      physics.removeMouseBody(socket.id);
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === socket.id) { players.splice(i, 1); }
      }
      socket.leave('room1');
    });

    socket.join('room1');
  });
};

const updateData = (boxData, circleData, bucketData) => {
  io.sockets.in('room1').emit('updateBoxes', boxData);
  io.sockets.in('room1').emit('updateCircles', circleData);
  io.sockets.in('room1').emit('updateBuckets', bucketData);
};

const getMouse = () => {
  io.sockets.in('room1').emit('getMouse');
};

const updateScore = (newScores) => {
  io.sockets.in('room1').emit('updateScore', newScores);
};

module.exports.setupSockets = setupSockets;
module.exports.updateData = updateData;
module.exports.getMouse = getMouse;
module.exports.players = players;
module.exports.updateScore = updateScore;
