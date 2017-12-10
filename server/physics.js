const p2 = require('p2');
const sockets = require('./socketServerEvents.js');

let boxDrawData = [];
let circleDrawData = [];

let world;
const worldCircles = [];
const worldBoxes = [];
const worldCircleBodies = [];
const worldBoxBodies = [];
const worldSensors = [];
const worldSensorBodies = [];
const circleColors = [];
const numOfBalls = 24;

const colors = ["blue", "red", "green", "yellow"];

let circleShape;
let circleBody;

let mouseBody;
let mouseConstraint;

const getDrawData = () => {
    // Clear the array
  boxDrawData = [];
  circleDrawData = [];

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

    // Adds all circle x/y and r data to the draw data array
  for (let i = 0; i < worldCircles.length; i++) {
    const circleData = {
      x: worldCircleBodies[i].position[0],
      y: worldCircleBodies[i].position[1],
      radius: worldCircles[i].radius,
      color: circleColors[worldCircles[i].id],
    };

    circleDrawData.push(circleData);
  }
};

const createWalls = () => {
  
  let groundShape = new p2.Box({ width: 600 * 2, height: 10 });
  let groundBody = new p2.Body({ mass: 0, position: [0, 805] });
  groundBody.addShape(groundShape);
  world.addBody(groundBody);
  worldBoxes.push(groundShape);
  worldBoxBodies.push(groundBody);

  let leftWallShape = new p2.Box({ width: 10, height: 1600 });
  let leftWallBody = new p2.Body({ mass: 0, position: [-5, 800]});
  leftWallBody.addShape(leftWallShape);
  world.addBody(leftWallBody);
  worldBoxes.push(leftWallShape);
  worldBoxBodies.push(leftWallBody);
    
  let rightWallShape = new p2.Box({ width: 10, height: 1600 });
  let rightWallBody = new p2.Body({ mass: 0, position: [605, 800]});
  rightWallBody.addShape(rightWallShape);
  world.addBody(rightWallBody);
  worldBoxes.push(rightWallShape);
  worldBoxBodies.push(rightWallBody);
    
  let ceilingShape = new p2.Box({ width: 1200, height: 10});
  let ceilingBody = new p2.Body({ mass: 0, position: [0, -5]});
  ceilingBody.addShape(ceilingShape);
  world.addBody(ceilingBody);
  worldBoxes.push(ceilingShape);
  worldBoxBodies.push(ceilingBody);
};

const createBucket = (x, y) => {
  
    //creates walls of bucket
    let bucketLeft = new p2.Box({ width: 12, height: 100});
    let bucketLeftBody = new p2.Body({ mass: 0, position: [x, y]});
    bucketLeftBody.addShape(bucketLeft);
    world.addBody(bucketLeftBody);
    worldBoxes.push(bucketLeft);
    worldBoxBodies.push(bucketLeftBody);
    
    let bucketBottom = new p2.Box({ width: 100, height: 12});
    let bucketBottomBody = new p2.Body({ mass: 0, position: [x + 44, y + 50]});
    bucketBottomBody.addShape(bucketBottom);
    world.addBody(bucketBottomBody);
    worldBoxes.push(bucketBottom);
    worldBoxBodies.push(bucketBottomBody);
    
    let bucketRight = new p2.Box({ width: 12, height: 100});
    let bucketRightBody = new p2.Body({ mass: 0, position: [x + 88, y]});
    bucketRightBody.addShape(bucketRight);
    world.addBody(bucketRightBody);
    worldBoxes.push(bucketRight);
    worldBoxBodies.push(bucketRightBody);
    
    //creates sensor in bucket to check is balls are in bucket
    let bucketSensor = new p2.Box({ width: 70, height: 10});
    bucketSensor.sensor = true;
    let bucketSensorBody = new p2.Body({ mass: 0, position: [x + 44, y + 45]});
    bucketSensorBody.addShape(bucketSensor);
    world.addBody(bucketSensorBody);
    worldSensors.push(bucketSensor);
    worldSensorBodies.push(bucketSensorBody);
    
};

const createBalls = (numBalls, numPlayers) => {
    for(let i = 0; i < 4; i++)
        {
            for(let j = 0; j < (numBalls/4); j++)
                {
                    // Create new circle shape and body
                    circleShape = new p2.Circle({ radius: 15 });
                    circleColors[circleShape.id] = colors[i%4];
                    let randomX = Math.floor((Math.random() * 500) + 50);
                    let randomY = Math.floor((Math.random() * 300) + 450);
                    circleBody = new p2.Body({ mass: 1, position: [randomX, randomY] });
                    circleBody.addShape(circleShape);

                    // Add the object to the world and arrays
                    world.addBody(circleBody);
                    worldCircles.push(circleShape);
                    worldCircleBodies.push(circleBody);
                } 
        }
    
};

const createWorld = () => {
    // Initializes the p2 physics simulation
  world = new p2.World({ gravity: [0, 200] });

    createBalls(numOfBalls, 4);
    
  createWalls();
    
    createBucket(50, 200);
    createBucket(350, 400);
    
  // Creates an empty body to hold the mouse
  mouseBody = new p2.Body;
  world.addBody(mouseBody);
    
    //check if ball is in bucket
    world.on("beginContact", (event) =>{
       for(let i = 0; i < worldCircleBodies.length; i++)
           {
               for(let j = 0; j < worldSensorBodies.length; j++)
                   {
                        let c = worldCircleBodies[i];
                        let s = worldSensorBodies[j];
                        if((event.bodyA == c || event.bodyB == c) && (event.bodyA == s || event.bodyB == s))
                        {
                            //handle ball in bucket event
                            console.log("collision");
                            worldCircles[i].radius = 0;
                            worldCircles[i].sensor = true;
                        }
                   }
           }
    });

  getDrawData();
};

const resetCircle = () => {
    for(let i = 0; i < worldCircleBodies.length; i++)
    {
        let randomX = Math.floor((Math.random() * 500) + 50);
        let randomY = Math.floor((Math.random() * 300) + 450);
        worldCircleBodies[i].position[0] = randomX;
        worldCircleBodies[i].position[1] = randomY;
        worldCircleBodies[i].velocity = [0, 0];
    }
};

const startPhysics = () => {
  setInterval(() => {
    world.step(1 / 60);
  }, 16);
};

const updateClient = () => {
  setInterval(() => {
    getDrawData();
    sockets.updateData(boxDrawData, circleDrawData);
    sockets.getMouse();    
  }, 16);
};

const updateMouse = (position) => {
  mouseBody.position[0] = position[0];
  mouseBody.position[1] = position[1];
};

const createConstraint = (position) => {
  const hitObjects = world.hitTest(position, worldCircleBodies);

  if (hitObjects.length) {
    mouseBody.position[0] = position[0];
    mouseBody.position[1] = position[1];

    mouseConstraint = new p2.RevoluteConstraint(mouseBody, hitObjects[0], {
      worldPivot: position,
      collideConnected: false,
    });

    world.addConstraint(mouseConstraint);
  } else {
    return;
  }
};

const removeConstraint = () => {
  world.removeConstraint(mouseConstraint);
  mouseConstraint = null;
};

module.exports.createWorld = createWorld;
module.exports.startPhysics = startPhysics;
module.exports.updateClient = updateClient;
module.exports.resetCircle = resetCircle;
module.exports.createConstraint = createConstraint;
module.exports.updateMouse = updateMouse;
module.exports.removeConstraint = removeConstraint;
