const p2 = require('p2');
const sockets = require('./socketServerEvents.js');

let boxDrawData = [];
let circleDrawData = [];
let bucketDrawData = [];

let world;
const worldCircles = [];
const worldBoxes = [];
const worldCircleBodies = [];
const worldBoxBodies = [];
const worldSensors = [];
const worldSensorBodies = [];
const numOfBalls = 40;
const maxVelocity = 600;
const worldBuckets = [];
const worldBucketBodies = [];

const colors = ['blue', 'red', 'green', 'yellow'];

let circleShape;
let circleBody;

const mouseBodies = {};
const mouseConstraints = {};

const scores = { redScore: 0, blueScore: 0, greenScore: 0, yellowScore: 0 };

const getDrawData = () => {
    // Clear the array
  boxDrawData = [];
  circleDrawData = [];
  bucketDrawData = [];

    // Adds all boxes x/y and w/h data to the draw data array
  for (let i = 0; i < worldBoxes.length; i++) {
    const boxData = {
      x: worldBoxBodies[i].position[0],
      y: worldBoxBodies[i].position[1],
      width: worldBoxes[i].width,
      height: worldBoxes[i].height,
    };

    boxDrawData.push(boxData);
  }

    // Adds all buckets x/y and w/h data to the draw data array
  let bucketCount = 0;
  let colorVal = 0;

  for (let i = 0; i < worldBuckets.length; i++) {
    const bucketData = {
      x: worldBucketBodies[i].position[0],
      y: worldBucketBodies[i].position[1],
      width: worldBuckets[i].width,
      height: worldBuckets[i].height,
      color: colors[colorVal],
    };

    bucketCount++;

    if (bucketCount > 2) {
      bucketCount = 0;
      colorVal++;
    }

    bucketDrawData.push(bucketData);
  }

    // Adds all circle x/y and r data to the draw data array
  for (let i = 0; i < worldCircles.length; i++) {
    const circleData = {
      x: worldCircleBodies[i].position[0],
      y: worldCircleBodies[i].position[1],
      radius: worldCircles[i].radius,
      color: colors[i % 4],
    };

    circleDrawData.push(circleData);
  }
};

const createWalls = () => {
  const groundShape = new p2.Box({ width: 1800, height: 10 });
  const groundBody = new p2.Body({ mass: 0, position: [0, 805] });
  groundBody.addShape(groundShape);
  world.addBody(groundBody);
  worldBoxes.push(groundShape);
  worldBoxBodies.push(groundBody);

  const leftWallShape = new p2.Box({ width: 10, height: 1600 });
  const leftWallBody = new p2.Body({ mass: 0, position: [-5, 800] });
  leftWallBody.addShape(leftWallShape);
  world.addBody(leftWallBody);
  worldBoxes.push(leftWallShape);
  worldBoxBodies.push(leftWallBody);

  const rightWallShape = new p2.Box({ width: 10, height: 1600 });
  const rightWallBody = new p2.Body({ mass: 0, position: [905, 800] });
  rightWallBody.addShape(rightWallShape);
  world.addBody(rightWallBody);
  worldBoxes.push(rightWallShape);
  worldBoxBodies.push(rightWallBody);

  const ceilingShape = new p2.Box({ width: 1800, height: 10 });
  const ceilingBody = new p2.Body({ mass: 0, position: [0, -5] });
  ceilingBody.addShape(ceilingShape);
  world.addBody(ceilingBody);
  worldBoxes.push(ceilingShape);
  worldBoxBodies.push(ceilingBody);
};

const createBucket = (x, y) => {
    // creates walls of bucket
  const bucketLeft = new p2.Box({ width: 12, height: 100 });
  const bucketLeftBody = new p2.Body({ mass: 0, position: [x, y] });
  bucketLeftBody.addShape(bucketLeft);
  world.addBody(bucketLeftBody);
  worldBuckets.push(bucketLeft);
  worldBucketBodies.push(bucketLeftBody);

  const bucketBottom = new p2.Box({ width: 100, height: 12 });
  const bucketBottomBody = new p2.Body({ mass: 0, position: [x + 44, y + 50] });
  bucketBottomBody.addShape(bucketBottom);
  world.addBody(bucketBottomBody);
  worldBuckets.push(bucketBottom);
  worldBucketBodies.push(bucketBottomBody);

  const bucketRight = new p2.Box({ width: 12, height: 95 });
  const bucketRightBody = new p2.Body({ mass: 0, position: [x + 88, y - 4] });
  bucketRightBody.addShape(bucketRight);
  world.addBody(bucketRightBody);
  worldBuckets.push(bucketRight);
  worldBucketBodies.push(bucketRightBody);

    // creates sensor in bucket to check is balls are in bucket
  const bucketSensor = new p2.Box({ width: 70, height: 10 });
  bucketSensor.sensor = true;
  const bucketSensorBody = new p2.Body({ mass: 0, position: [x + 44, y + 35] });
  bucketSensorBody.addShape(bucketSensor);
  world.addBody(bucketSensorBody);
  worldSensors.push(bucketSensor);
  worldSensorBodies.push(bucketSensorBody);
};

const createBalls = (numBalls) => {
  for (let i = 0; i < (numBalls); i++) {
                    // Create new circle shape and body
    circleShape = new p2.Circle({ radius: 15 });

    const randomX = Math.floor((Math.random() * 800) + 50);
    const randomY = Math.floor((Math.random() * 200) + 550);
    circleBody = new p2.Body({ mass: 1, position: [randomX, randomY] });
    circleBody.addShape(circleShape);

                    // Add the object to the world and arrays
    world.addBody(circleBody);
    worldCircles.push(circleShape);
    worldCircleBodies.push(circleBody);
  }
};

const createMouseBody = (id) => {
  mouseBodies[id] = new p2.Body({ mass: 0, position: [0, 0] });
  world.addBody(mouseBodies[id]);
};

const removeMouseBody = (id) => {
  delete mouseBodies[id];
};

const createWorld = () => {
    // Initializes the p2 physics simulation
  world = new p2.World({ gravity: [0, 200] });

  createBalls(numOfBalls);

  createWalls();

  createBucket(Math.floor((Math.random() * 100) + 50), Math.floor((Math.random() * 150) + 250));
  createBucket(Math.floor((Math.random() * 100) + 250), Math.floor((Math.random() * 150) + 250));
  createBucket(Math.floor((Math.random() * 100) + 450), Math.floor((Math.random() * 150) + 250));
  createBucket(Math.floor((Math.random() * 100) + 650), Math.floor((Math.random() * 150) + 250));

  getDrawData();

  // check if ball is in bucket
  world.on('beginContact', (event) => {
    for (let i = 0; i < worldCircleBodies.length; i++) {
      for (let j = 0; j < worldSensorBodies.length; j++) {
        const c = worldCircleBodies[i];
        const s = worldSensorBodies[j];
        if ((event.bodyA === c || event.bodyB === c) && (event.bodyA === s || event.bodyB === s)) {
          if (worldCircles[i].sensor !== true) {
                            // handle ball in bucket event
            worldCircles[i].radius = 0;
            worldCircles[i].sensor = true;
            switch (circleDrawData[i].color) {
              case 'blue':
                if (j === 0) {
                  scores.blueScore += 10;
                } else {
                  scores.blueScore -= 10;
                }
                sockets.updateScore(scores);
                break;
              case 'red':
                if (j === 1) {
                  scores.redScore += 10;
                } else {
                  scores.redScore -= 10;
                }
                sockets.updateScore(scores);
                break;
              case 'green':
                if (j === 2) {
                  scores.greenScore += 10;
                } else {
                  scores.greenScore -= 10;
                }
                sockets.updateScore(scores);
                break;
              case 'yellow':
                if (j === 3) {
                  scores.yellowScore += 10;
                } else {
                  scores.yellowScore -= 10;
                }
                sockets.updateScore(scores);
                break;
              default:
                break;
            }
          }
        }
      }
    }
  });
};

const resetCircle = () => {
  for (let i = 0; i < worldCircleBodies.length; i++) {
    const randomX = Math.floor((Math.random() * 500) + 50);
    const randomY = Math.floor((Math.random() * 300) + 450);
    worldCircleBodies[i].position[0] = randomX;
    worldCircleBodies[i].position[1] = randomY;
    worldCircleBodies[i].velocity = [0, 0];
  }
};

const clampVelocity = () => {
  for (let i = 0; i < worldCircleBodies.length; i++) {
    let angle;
    let vx = worldCircleBodies[i].velocity[0];
    let vy = worldCircleBodies[i].velocity[1];
    const currentVelocity = vx * vx + vy * vy;
    if (currentVelocity > maxVelocity * maxVelocity) {
      angle = Math.atan2(vy, vx);

      vx = Math.cos(angle) * maxVelocity;
      vy = Math.sin(angle) * maxVelocity;

      worldCircleBodies[i].velocity[0] = vx;
      worldCircleBodies[i].velocity[1] = vy;
    }
  }
};

const startPhysics = () => {
  setInterval(() => {
    clampVelocity();
    world.step(1 / 60);
  }, 16);
};

const updateClient = () => {
  setInterval(() => {
    getDrawData();
    sockets.updateData(boxDrawData, circleDrawData, bucketDrawData);
    sockets.getMouse();
  }, 16);
};

const removeConstraint = (id) => {
  world.removeConstraint(mouseConstraints[id]);
  mouseConstraints[id] = null;
};

const updateMouse = (position, id) => {
  if (position[1] < 575) removeConstraint(id);
; mouseBodies[id].position[0] = position[0];
  mouseBodies[id].position[1] = position[1];
};

const createConstraint = (position, id) => {
  const hitObjects = world.hitTest(position, worldCircleBodies);

  if (hitObjects.length) {
    mouseBodies[id].position[0] = position[0];
    mouseBodies[id].position[1] = position[1];
    mouseConstraints[id] = new p2.RevoluteConstraint(mouseBodies[id], hitObjects[0], {
      worldPivot: position,
      collideConnected: false,
    });

    world.addConstraint(mouseConstraints[id]);
  } else {
    return;
  }
};


module.exports.createWorld = createWorld;
module.exports.startPhysics = startPhysics;
module.exports.updateClient = updateClient;
module.exports.resetCircle = resetCircle;
module.exports.createConstraint = createConstraint;
module.exports.updateMouse = updateMouse;
module.exports.removeConstraint = removeConstraint;
module.exports.createMouseBody = createMouseBody;
module.exports.removeMouseBody = removeMouseBody;
