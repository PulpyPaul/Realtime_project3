// Convert a canvas coordiante to physics coordinate
const getCanvasLocation = (mouseEvent) => {
    var rect = canvas.getBoundingClientRect();
    var x = mouseEvent.clientX - rect.left;
    var y = mouseEvent.clientY - rect.top;
    return [x, y];
};