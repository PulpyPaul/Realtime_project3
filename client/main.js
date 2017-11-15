let canvas;
let ctx;
let socket;
let hash;           // holds unique user ID

const init = () => {
    
    // Get reference to necessary HTML elements
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
            
    // Gets socket.io instance
    socket = io.connect();
};

window.onload = init;