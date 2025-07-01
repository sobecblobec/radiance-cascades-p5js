// https://p5js.org/examples/repetition-bezier/
// Define strokeHue as a global variable. This variable
// will be used to color each line.
// this is by p5.js Contributors, the Processing Foundation, sobecblobec, and is licensed under CC BY-NC-SA 4.0.
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// edited code to add radiance cascades
let strokeHue = 20;
let rc;
let canvas;
function setup() {
  P5Capture.setDefaultOptions({
    format: "gif",
    framerate: 15,
    quality: 1,
  });
  canvas = createCanvas(300, 300);
  pixelDensity(2);
  rc = new RadianceCascades(canvas);
  rc.myBaseIntervalLength = 0.1;
  rc.myCascadeNumber = 10;
  // Remove the bezier stroke fills and establish a new
  // stroke weight. Change the color mode to HSB.
  noFill();
  strokeWeight(5);
  colorMode(HSB);
}

function draw() {
  clear();

  // Create 10 bezier lines with anchor points moving
  // with the X coordinate of the cursor.
  for (let i = 0; i < 200; i += 20) {
    // Add 10 to the line's hue value during
    // each iteration.
    strokeColor = i + 10;

    stroke(strokeColor, 50, 60);

    let x1 = mouseX - i / 2;
    let y1 = 0 + i;
    let x2 = 171;
    let y2 = 15;
    let x3 = 183;
    let y3 = 225;
    let x4 = 100 - i / 16;
    let y4 = 225 + i / 8;

    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
  image(rc.draw(), 0, 0, width, height);
}
