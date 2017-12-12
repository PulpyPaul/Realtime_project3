const physics = require('./physics.js');

// socket io instance
let io;
let players = [];
let colors = ["blue", "red", "green", "yellow"];

// setup socket server
const setupSockets = (ioInstance) => {
  io = ioInstance;

  io.sockets.on('connection', (sock) => {
    const socket = sock;

    socket.on('joinRoom', () => {
      
      players.push({
        id: socket.id,
        mousePosition: [],
        color: colors[players.length % 4],
      });
        
      socket.emit('updatePlayers', players);
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
      physics.removeConstraint();
    });

    socket.on('disconnect', () => {
      socket.leave();
    });
      
    socket.join('room1'); 
  });
};

const updateData = (boxData, circleData, bucketData) => {
    io.sockets.in("room1").emit('updateBoxes', boxData);
    io.sockets.in("room1").emit('updateCircles', circleData);
    io.sockets.in("room1").emit('updateBuckets', bucketData);
};

const getMouse = () => { 
    io.sockets.in("room1").emit('getMouse');    
};

const updateScore = (newScores) => {
    io.sockets.in("room1").emit('updateScore', newScores);
}

module.exports.setupSockets = setupSockets;
module.exports.updateData = updateData;
module.exports.getMouse = getMouse;
module.exports.players = players;
module.exports.updateScore = updateScore;
