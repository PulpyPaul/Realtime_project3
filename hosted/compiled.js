'use strict';

var canvas = void 0;
var ctx = void 0;
var socket = void 0;
var hash = void 0; // holds unique user ID
var animationFrame = void 0;
var circleShape = void 0;
var circleBody = void 0;
var boxShape1 = void 0;
var boxShape2 = void 0;
var boxShape3 = void 0;
var boxShape4 = void 0;
var boxBody1 = void 0;
var boxBody2 = void 0;
var boxBody3 = void 0;
var boxBody4 = void 0;
var world = void 0;

var init = function init() {

    // Get reference to necessary HTML elements
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    // Gets socket.io instance
    socket = io.connect();

    world = new p2.World({
        gravity: [0, 0]
    });

    world.applyDamping = false;
    //world.applySpringForces = false;

    circleShape = new p2.Circle({ radius: 20 });
    circleShape.sensor = true;
    circleBody = new p2.Body({ mass: 1, position: [canvas.width / 2, canvas.height / 2] });
    circleBody.addShape(circleShape);
    world.addBody(circleBody);
    circleBody.velocity[0] = 200;
    circleBody.velocity[1] = 0;

    boxShape1 = new p2.Box({ width: 10, height: canvas.height });
    boxShape2 = new p2.Box({ width: 10, height: canvas.height });
    boxShape3 = new p2.Box({ width: canvas.width / 2, height: 10 });
    boxShape4 = new p2.Box({ width: canvas.width / 2, height: 10 });

    boxBody1 = new p2.Body({ mass: 0, position: [canvas.width / 4, 0] });
    boxBody2 = new p2.Body({ mass: 0, position: [canvas.width / 4 * 3, 0] });
    boxBody3 = new p2.Body({ mass: 0, position: [canvas.width / 4, 0] });
    boxBody4 = new p2.Body({ mass: 0, position: [canvas.width / 4, canvas.height - 10] });

    boxBody1.sensor = true;
    boxBody2.sensor = true;
    boxBody3.sensor = true;
    boxBody4.sensor = true;

    boxBody1.addShape(boxShape1);
    boxBody2.addShape(boxShape2);
    boxBody3.addShape(boxShape3);
    boxBody4.addShape(boxShape4);

    world.addBody(boxBody1);
    world.addBody(boxBody2);
    world.addBody(boxBody3);
    world.addBody(boxBody4);

    world.on('beginContact', function (e) {
        console.log("Contact");
        if (e.bodyA == circleBody || e.bodyB == circleBody) {
            if (e.bodyA == boxBody2 || e.bodyB == boxBody2 || e.bodyA == boxBody1 || e.bodyB == boxBody2) {
                circleBody.velocity[0] *= -1;
            }
            if (e.bodyA == boxBody3 || e.bodyB == boxBody3 || e.bodyA == boxBody4 || e.bodyB == boxBody4) {
                circleBody.velocity[1] *= -1;
            }
        }
    });

    requestAnimationFrame(draw);
};

var draw = function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    world.step(1 / 60);

    ctx.beginPath();
    var x = circleBody.position[0];
    var y = circleBody.position[1];
    var radius = circleShape.radius;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillRect(boxBody1.position[0], boxBody1.position[1], boxShape1.width, boxShape1.height);
    ctx.fillRect(boxBody2.position[0], boxBody2.position[1], boxShape2.width, boxShape2.height);
    ctx.fillRect(boxBody3.position[0], boxBody3.position[1], boxShape3.width, boxShape3.height);
    ctx.fillRect(boxBody4.position[0], boxBody4.position[1], boxShape4.width, boxShape4.height);

    animationFrame = requestAnimationFrame(draw);
};

window.onload = init;
