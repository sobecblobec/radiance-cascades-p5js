// https://p5js.org/examples/animation-and-variables-drawing-lines/
// Mobile Device Movement by p5.js Contributors and the Processing Foundation is licensed under CC BY-NC-SA 4.0.
// edited code to add radiance cascades
let canvas;
let rc;
let buffer;
function setup() {
  P5Capture.setDefaultOptions({
    format: "gif",
    framerate: 15,
    quality: 1,
  });
  // Create the canvas
  canvas = createCanvas(500, 500, WEBGL);
  noSmooth();
  // pixelDensity(3);
  rc = new RadianceCascades(canvas);

  buffer = createFramebuffer();

  // Set width of the lines
  strokeWeight(10);

  // Set color mode to hue-saturation-brightness (HSB)
  colorMode(HSB);
}
function draw() {
  clear();
  image(buffer, -width / 2, -height / 2, width, height);
  push();
  blendMode(REPLACE);
  image(rc.draw(), -width / 2, -height / 2, width, height);
  pop();
}
function mouseDragged() {
  // Set the color based on the mouse position, and draw a line
  // from the previous position to the current position
  buffer.begin();
  let lineHue = mouseX - mouseY;
  stroke(lineHue, 90, 90);
  line(
    pmouseX - width / 2,
    pmouseY - height / 2,
    mouseX - width / 2,
    mouseY - height / 2
  );
  buffer.end();
}
