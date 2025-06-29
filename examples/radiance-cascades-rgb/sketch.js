let rc;
let canvas;
function setup() {
  canvas = createCanvas(300, 300);
  pixelDensity(3);
  rc = new RadianceCascades(canvas);
  rc.myCascadeNumber = 10;
  rc.myBaseIntervalLength = 0.2;
}
function draw() {
  clear();
  noStroke();
  fill(0);
  let size = width * 0.05;
  for (let a = 0; a < width / 2 - size; a += size) {
    rect(a, height / 2, size, 10);
  }

  for (let a = width / 2 + size; a < width; a += size) {
    rect(a, height / 2, size, 10);
  }

  size = width * 0.05;
  fill(255, 0, 0);
  rect(0, height - 5, width / 3, 10);
  fill(0, 255, 0);
  rect(width / 3, height - 5, width / 3, 10);
  fill(0, 0, 255);
  rect((2 * width) / 3, height - 5, width / 3, 10);
  image(rc.draw(), 0, 0);
}
