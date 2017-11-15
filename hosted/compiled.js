'use strict';

var canvas = void 0;
var ctx = void 0;
var socket = void 0;
var hash = void 0; // holds unique user ID

var init = function init() {

    // Get reference to necessary HTML elements
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    // Gets socket.io instance
    socket = io.connect();
};

window.onload = init;
