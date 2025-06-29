// https://editor.p5js.org/natureofcode/sketches/kMEEyVuFh
// edited code to add radiance cascades
const VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
const GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
const AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior;
const VerletParticle2D = toxi.physics2d.VerletParticle2D;
const VerletSpring2D = toxi.physics2d.VerletSpring2D;
const VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D;
const Vec2D = toxi.geom.Vec2D;
const Rect = toxi.geom.Rect;

let cols = 10;
let rows = 10;

let particles = make2DArray(cols, rows);
let springs = [];

let w;

let physics;
let g;
let canvas;
let rc;

function setup() {
  P5Capture.setDefaultOptions({
    format: "gif",
    framerate: 15,
    quality: 1,
  });
  canvas = createCanvas(300, 300, WEBGL);
  noStroke();
  w = width * 0.055;

  let OPTIONS = {
    textureFiltering: NEAREST,
    format: UNSIGNED_BYTE,
    depth: false,
  };

  // noSmooth();

  rc = new RadianceCascades(canvas);
  rc.myBaseIntervalLength = 0.01;
  rc.myCascadeNumber = 10;

  physics = new VerletPhysics2D();
  let gravity = new Vec2D(0, 1);
  let gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);

  let x = -width * 0.25;
  for (let i = 0; i < cols; i++) {
    let y = -height * 0.25;
    for (let j = 0; j < rows; j++) {
      let p = new Particle(x, y);
      particles[i][j] = p;
      physics.addParticle(p);
      y = y + w;
    }
    x = x + w;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = particles[i][j];
      if (i != cols - 1) {
        let b1 = particles[i + 1][j];
        let s1 = new Spring(a, b1, random(10000));
        springs.push(s1);
        a.attach(s1);
      }
      if (j != rows - 1) {
        let b2 = particles[i][j + 1];
        let s2 = new Spring(a, b2, random(10000));
        springs.push(s2);
        a.attach(s2);
      }
    }
  }

  particles[0][0].lock();
  particles[cols - 1][0].lock();
}

let test = true;
function draw() {
  clear();
  // background(0);
  physics.update();
  strokeWeight(3);
  for (let s of springs) {
    s.display();
  }
  noStroke();

  let colorArray = ["#ffb852", "#00d973"];
  let c = color(random(colorArray));

  fill(c);
  rectMode(CENTER);
  rect(-width * 0.25, -height * 0.25, 50);
  c = color(random(colorArray));
  fill(c);
  rect(width * 0.25, height * 0.25, 50);

  fill("#bfffe6");
  rect(0, -height / 2 + 10, width * 0.3, 5);
  fill(0);
  rect(0, -height / 2 + 5, width * 1, 10);

  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     // particles[i][j].display();
  //   }
  // }

  for (let i = springs.length - 1; i >= 0; i--) {
    if (springs[i].toDelete) {
      springs.splice(i, 1);
    }
  }

  image(rc.draw(), -width / 2, -height / 2, width, height);
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      particles[i][j].clicked(mouseX - width / 2, mouseY - width / 2);
    }
  }
}
