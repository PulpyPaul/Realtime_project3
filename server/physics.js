const p2 = require('p2');
const sockets = require('./socketServerEvents.js');

let boxDrawData = [];
let circleDrawData = [];

let world;
const worldCircles = [];
const worldBoxes = [];
const worldCircleBodies = [];
const worldBoxBodies = [];

let circleShape;
let circleBody;

let groundShape;
let groundBody;

const createWorld = () => {
  
    // Initializes the p2 physics simulation
    world = new p2.World({ gravity: [0, 200] });
    
    // Create new circle shape and body
    circleShape = new p2.Circle({ radius: 30 });
    circleBody = new p2.Body({ mass: 1, position: [50, 50] });
    circleBody.addShape(circleShape);
    
    // Add the object to the world and arrays
    world.addBody(circleBody);
    worldCircles.push(circleShape);
    worldCircleBodies.push(circleBody);
    
    // Create the ground plane
    groundShape = new p2.Box({ width: 600 * 2, height: 10 });
    groundBody = new p2.Body({ mass: 0, position: [0, 800 - 5] });
    groundBody.addShape(groundShape);
    
    // Add the object to world and arrays
    world.addBody(groundBody);
    worldBoxes.push(groundShape);
    worldBoxBodies.push(groundShape);
    
    getDrawData();
};

const getDrawData = () => {
    
    // Clear the array
    boxDrawData = [];
    circleDrawData = [];
    
    // Adds all boxes x/y and w/h data to the draw data array
    for (let i = 0; i < worldBoxes.length; i++){
        let boxData = { x: worldBoxBodies[i].position[0], y: worldBoxBodies[i].position[1], width: worldBoxes[i].width, height: worldBoxes[i].height};
        boxDrawData.push(boxData);
    }
    
    // Adds all circle x/y and r data to the draw data array
    for (let i = 0; i < worldCircles.length; i++){
        let circleData = { x: worldCircleBodies[i].position[0], y: worldCircleBodies[i].position[1], radius: worldCircles[i].radius};
        circleDrawData.push(circleData);
    }
};


const startPhysics = () => {
    setInterval(() => {
        world.step(1/60);
        getDrawData();
        sockets.updateData();
    }, 16);
};

module.exports.createWorld = createWorld;
module.exports.startPhysics = startPhysics;
module.exports.boxDrawData = boxDrawData;
module.exports.circleDrawData = circleDrawData;


