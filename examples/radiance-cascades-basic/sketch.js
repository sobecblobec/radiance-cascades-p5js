let canvas;
let r;
let arrayPoints = [];
function setup() {
  canvas = createCanvas(1000, 1000);
  pixelDensity(1);
  noSmooth();
  rc = new RadianceCascades(canvas);
  rc.myCascadeNumber = 8;
}
function draw() {
  clear();
  strokeCap(SQUARE);
  strokeWeight(5);
  noFill();

  stroke(255, 253, 227);
  line(width * 0.1, height * 0.1, width * 0.15, height * 0.3);
  stroke(0);
  line(width * 0.15, height * 0.3, width * 0.2, height * 0.5);

  stroke(255, 253, 227);
  line(width * 0.3, height * 0.1, width * 0.3, height * 0.2);
  stroke(0);
  line(width * 0.3, height * 0.2, width * 0.3, height * 0.3);

  stroke(255, 253, 227);
  line(width * 0.2, height * 0.2, width * 0.25, height * 0.3);
  stroke(0);
  line(width * 0.25, height * 0.3, width * 0.3, height * 0.4);

  stroke(0);
  line(width * 0.4, height * 0.25, width * 0.45, height * 0.35);
  stroke(255, 253, 227);
  line(width * 0.45, height * 0.35, width * 0.5, height * 0.45);

  stroke(0);
  line(width * 0.45, height * 0.35, width * 0.35, height * 0.4);
  stroke(255, 253, 227);
  line(width * 0.35, height * 0.4, width * 0.25, height * 0.45);

  stroke(255, 253, 227);
  line(width * 0.4, height, width * 0.4, height * 0.9);
  stroke(0);
  line(width * 0.4, height * 0.9, width * 0.4, height * 0.8);

  stroke(255, 253, 227);
  line(width * 0.6, height, width * 0.6, height * 0.9);
  stroke(0);
  line(width * 0.6, height * 0.9, width * 0.6, height * 0.8);

  stroke(0);
  line(width * 0.6, height * 0.7, width * 0.6, height * 0.6);
  stroke(255, 253, 227);
  line(width * 0.6, height * 0.6, width * 0.6, height * 0.5);

  stroke(0);
  line(width * 0.15, height * 0.6, width * 0.25, height * 0.7);
  stroke(255, 253, 227);
  line(width * 0.25, height * 0.7, width * 0.35, height * 0.8);

  stroke(0);
  line(width * 0.35, height * 0.6, width * 0.4, height * 0.5);
  stroke(255, 253, 227);
  line(width * 0.35, height * 0.6, width * 0.25, height * 0.6);

  stroke(0);
  line(width * 0.7, height * 0.2, width * 0.6, height * 0.3);
  stroke(255, 253, 227);
  line(width * 0.7, height * 0.2, width * 0.85, height * 0.2);
  stroke(0);
  line(width * 0.85, height * 0.2, width * 0.85, height * 0.05);

  stroke(0);
  line(width * 0.7, height * 0.6, width * 0.8, height * 0.7);
  stroke(255, 253, 227);
  line(width * 0.8, height * 0.7, width * 0.9, height * 0.8);

  stroke(0);
  line(width * 0.85, height * 0.5, width * 0.85, height * 0.7);
  stroke(255, 253, 227);
  line(width * 0.85, height * 0.5, width * 0.85, height * 0.3);

  stroke(0);
  line(width * 0.8, height * 0.4, width * 0.65, height * 0.4);
  stroke(255, 253, 227);
  line(width * 0.65, height * 0.4, width * 0.55, height * 0.5);

  stroke(0);
  line(width * 0.4, height * 0.1, width * 0.5, height * 0.1);
  stroke(255, 253, 227);
  line(width * 0.5, height * 0.1, width * 0.6, height * 0.1);

  stroke(0);
  line(width * 0.1, height * 0.9, width * 0.2, height * 0.9);
  stroke(255, 253, 227);
  line(width * 0.2, height * 0.9, width * 0.3, height * 0.8);

  stroke(0);
  line(width * 0.95, height * 0.9, width * 0.8, height * 0.9);
  stroke(255, 253, 227);
  line(width * 0.8, height * 0.9, width * 0.7, height * 0.8);
  let indexColor = 0;
  let arrayColor = [255, 0];
  for (let a = 0; a < arrayPoints.length - 1; a += 2) {
    stroke(arrayColor[indexColor]);
    line(
      arrayPoints[a].x,
      arrayPoints[a].y,
      arrayPoints[a + 1].x,
      arrayPoints[a + 1].y
    );
    indexColor = (indexColor + 1) % 2;
    // stroke(0)
  }
  push();
  blendMode(REPLACE);
  image(rc.draw(), 0, 0);
  pop();
}

function mousePressed() {
  arrayPoints.push(createVector(mouseX, mouseY));
}

function mouseReleased() {
  arrayPoints.push(createVector(mouseX, mouseY));
}
