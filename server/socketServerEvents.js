const physics = require('./physics.js');

// socket io instance
let io;
let players = [];
let playerColors = [];
let rooms = [0, 0, 0, 0]
let colors = ["blue", "red", "green", "yellow"];

// setup socket server
const setupSockets = (ioInstance) => {
  io = ioInstance;

  io.sockets.on('connection', (sock) => {
    const socket = sock;

    socket.on('joinRoom', (roomName) => {
      console.log(roomName);
      socket.join(roomName);
        let playerColor;
        switch(roomName){
            case "room1":
                playerColor = colors[rooms[0]];
                rooms[0]++;
                break;
            case "room2":
                playerColor = colors[rooms[1]];
                rooms[1]++;
                break;
            case "room3":
                playerColor = colors[rooms[2]];
                rooms[2]++;
                break;
            case "room4":
                playerColor = colors[rooms[3]];
                rooms[3]++;
                break;
                       }
      players.push({
        id: socket.id,
        mousePosition: [],
        room: roomName, 
        color: playerColor,
      });
        playerColors[socket.id] = playerColor;
        socket.emit('playerColor', playerColor);
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
      physics.updateMouse(data);
    });

    socket.on('removeConstraint', () => {
      physics.removeConstraint();
    });

    socket.on('disconnect', () => {
      socket.leave();
    });
  });
};

const updateData = (boxData, circleData, bucketData) => {
  for (var i = 1; i < 5; i++)
  {
    io.sockets.in("room" + i).emit('updateBoxes', boxData);
    io.sockets.in("room" + i).emit('updateCircles', circleData);
    io.sockets.in("room" + i).emit('updateBuckets', bucketData);
  }
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
module.exports.players = players;
module.exports.playerColors = playerColors;
