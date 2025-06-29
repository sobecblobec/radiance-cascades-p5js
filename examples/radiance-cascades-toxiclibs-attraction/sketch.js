// https://editor.p5js.org/natureofcode/sketches/tjIs8XaXP
// edited code to add radiance cascades
let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D } = toxi.physics2d;
let { AttractionBehavior } = toxi.physics2d.behaviors;

// Reference to physics world
let physics;

let particles = [];
let attractor;
let rc;
let g;
let canvas;
function setup() {
  // P5Capture.setDefaultOptions({
  //   format: "gif",
  //   framerate: 15,
  //   quality: 1,
  // });
  canvas = createCanvas(300, 300);
  rectMode(CENTER);
  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));

  physics.setDrag(0.01);

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(random(width), random(height), random(4, 8)));
  }
  attractor = new Attractor(width / 2, height / 2, 32);

  rc = new RadianceCascades(canvas);
  rc.myBaseIntervalLength = 0.075;
  rc.myCascadeNumber = 8;
}

function draw() {
  noStroke();

  clear();
  // Update the physics world
  physics.update();

  attractor.show();
  for (let particle of particles) {
    particle.show();
  }

  // if (mouseIsPressed) {
  //   attractor.lock();
  //   attractor.set(mouseX, mouseY);
  // } else {
  //   attractor.unlock();
  // }

  image(rc.draw(), 0, 0, width, height);
}
