let canvas;
let rc;
function setup() {
  canvas = createCanvas(300, 300);
  noSmooth();
  pixelDensity(1);
  rc = new RadianceCascades(canvas);
  rc.myCascadeNumber = 10;
  rc.myBaseIntervalLength = 0.1;
}

function draw() {
  clear();
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 0, 2);
  rect(width / 2, height / 2, width * 0.1);
  fill(255);
  rect(width * 0.66, height / 2, width * 0.1);
  fill("orange");
  rect(width * 0.33, height / 2, width * 0.1);
  image(rc.draw(), 0, 0);
}
