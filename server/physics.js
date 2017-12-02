const p2 = require('p2');

const simulation = {};

let world;
const worldCircles = [];
const worldBoxes = [];
const worldBodies = [];

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
  worldBodies.push(circleBody);

    // Create the ground plane
  groundShape = new p2.Box({ width: 600 * 2, height: 10 });
  groundBody = new p2.Body({ mass: 0, position: [0, 800 - 5] });
  groundBody.addShape(groundShape);

    // Add the object to world and arrays
  world.addBody(groundBody);
  worldBoxes.push(groundShape);
  worldBodies.push(groundShape);

  simulation.world = world;
  simulation.worldCicles = worldCircles;
  simulation.worldBoxes = worldBoxes;
  simulation.worldBodies = worldBodies;
};

module.exports.createWorld = createWorld;
module.exports.simulation = simulation;
module.exports.worldCircles = worldCircles;
