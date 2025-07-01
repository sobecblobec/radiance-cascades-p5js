// https://editor.p5js.org/mantissa/sketches/JewcMEDOy
// edited code to add radiance cascades
let { Vec2D, Rect } = toxi.geom;
let {
  VerletPhysics2D,
  VerletParticle2D,
  VerletSpring2D,
  VerletMinDistanceSpring2D,
  VerletConstrainedSpring2D,
  PullBackString2D,
} = toxi.physics2d;
let { RectConstraint, CircularConstraint } = toxi.physics2d.constraints;
let { GravityBehavior, AttractionBehavior } = toxi.physics2d.behaviors;

let physics;
let springs;
let particles;
let mouseAttractor;
let mousePos;
let positions;
let walls;
let springsCreated;
let rc;
let canvas;
function setup() {
  canvas = createCanvas(640, 640);
  pixelDensity(1);
  noSmooth();
  rc = new RadianceCascades(canvas);
  //{!1} What is the rest length of the spring?
  //let length = 200;

  particles = [];
  //positions = [];

  var weight = 0.02;

  //positions[0] = new Vec2D(width / 2-30, height/2-30);

  // Creating a toxiclibs Verlet physics world
  physics = new VerletPhysics2D(0, 50, 0.5, 1);
  physics.setWorldBounds(new Rect(0, 0, width, height));
  //physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  let nPts = 200; // 200 pts

  for (let i = 0; i < nPts; i++) {
    let pos = Vec2D.randomVector()
      .scale(width, height)
      .addSelf(width / 2, height / 2);

    particles[i] = new Particle(pos.x, pos.y, weight, random(10000));

    physics.addParticle(particles[i]);

    physics.addBehavior(new AttractionBehavior(particles[i], 50, -0.5, 0.1));
  }

  // Creating two Particles
  //particle1 = new Particle(width / 2, 0, 8);
  //particle2 = new Particle(width / 2 + length, 0, 8);
  // Locking Particle 1 in place
  //particle1.lock();

  // Creating one Spring
  //let spring = new VerletSpring2D(particle1, particle2, length, 0.01);
  let minDist = 0;
  let strength = 0.00003;
  let limit = 1000.005;
  springs = [];
  //springs[0] = new SpringCon(particles[0], particles[4], minDist, strength, limit);
  //springs[1] = new SpringCon(particles[1], particles[5], minDist, strength, limit);
  //springs[2] = new SpringCon(particles[2], particles[6], minDist, strength, limit);
  //springs[3] = new SpringCon(particles[3], particles[7], minDist, strength, limit);

  walls = [];

  let r0 = new Rect(80, 100, 80, 310);
  walls[0] = new Wall(r0, 1);
  walls[0].setBox(r0);

  let r1 = new Rect(460, 340, 60, 310);
  walls[1] = new Wall(r1, 1);
  walls[1].setBox(r1);

  VerletPhysics2D.addConstraintToAll(walls[0], physics.particles);
  VerletPhysics2D.addConstraintToAll(walls[1], physics.particles);

  springsCreated = false;

  //let circ = new CircularConstraint(new Vec2D(100,100),45);

  //VerletPhysics2D.addConstraintToAll( circ, physics.particles );

  /*
  strength = 0.0001;
  springs[0] = new PullbackSpring(particles[0], particles[4], strength);
  springs[1] = new PullbackSpring(particles[1], particles[5], strength);
  springs[2] = new PullbackSpring(particles[2], particles[6], strength);
  springs[3] = new PullbackSpring(particles[3], particles[7], strength);
  
  //let spring = new VerletConstrainedSpring2D(particle1, particle2, 40, 0.1, 2.3);

  
  //{!3} Must add everything to the world
  physics.addParticle(particles[0]);
  physics.addParticle(particles[1]);
  physics.addParticle(particles[2]);
  physics.addParticle(particles[3]);
  physics.addParticle(particles[4]);
  physics.addParticle(particles[5]);
  physics.addParticle(particles[6]);
  physics.addParticle(particles[7]);
  
  //particles[0].add()
  
  physics.addSpring(springs[0]);
  physics.addSpring(springs[1]);
  physics.addSpring(springs[2]);
  physics.addSpring(springs[3]);
  
  for(let i=0; i<4; i++){
    physics.addBehavior(new AttractionBehavior(particles[i+4], 50, -1.2, 0.01));
  }
  */
}

function draw() {
  //{!1} Must update the physics
  physics.update();
  clear();

  //{!4} Drawing everything

  for (let i = 0; i < walls.length; i++) {
    walls[i].show();
  }

  for (let i = 0; i < springs.length; i++) {
    springs[i].show();
  }

  if (!springsCreated) {
    for (let i = 0; i < particles.length; i++) {
      particles[i].show();
    }
  } else {
    for (let i = 0; i < particles.length * 0.5; i++) {
      particles[i].show();
    }
  }
  image(rc.draw(), 0, 0);
}

function keyPressed() {
  console.log(key);

  if (key == "c") {
    console.log(particles.Count);
    createSprings();
  }
}

function mousePressed() {
  //addParticle();
  mousePos = new Vec2D(mouseX, mouseY);
  // create a new positive attraction force field around the mouse position (radius=250px)
  mouseAttractor = new AttractionBehavior(mousePos, 60, -4.5, 0.1);
  physics.addBehavior(mouseAttractor);
}

function mouseDragged() {
  // update mouse attraction focal point
  mousePos.set(mouseX, mouseY);
}

function mouseReleased() {
  // remove the mouse attraction when button has been released
  physics.removeBehavior(mouseAttractor);
}

function createSprings() {
  console.log("createSprings");
  console.log(particles.length);

  if (springsCreated) return;

  let nParticles = particles.length;

  for (let i = 0; i < nParticles; i++) {
    let p = new Particle(particles[i].x, particles[i].y, particles[i].weight);

    physics.addParticle(p);
    //physics.addBehavior(new AttractionBehavior(p, 50, -0.5, 0.1));

    particles.push(p);
  }

  let strength = 0.001;

  for (let i = 0; i < nParticles; i++) {
    let s = new PullbackSpring(
      particles[i + nParticles],
      particles[i],
      strength
    );

    springs.push(s);

    physics.addSpring(s);
  }

  VerletPhysics2D.addConstraintToAll(walls[0], physics.particles);
  VerletPhysics2D.addConstraintToAll(walls[1], physics.particles);

  springsCreated = true;
}

// How cute is this simple Particle class?!
class Particle extends VerletParticle2D {
  constructor(x, y, r, seed) {
    super(x, y);
    this.r = r;
    this.seed = seed;
  }

  show() {
    randomSeed(this.seed);
    fill(0, 0, 0);
    noStroke();
    //circle(this.x, this.y, this.r * 2);
    circle(this.x, this.y, 15);
  }
}

class Spring extends VerletSpring2D {
  constructor(a, b, minDist, str) {
    super(a, b, minDist, str);
  }

  show() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class SpringMD extends VerletMinDistanceSpring2D {
  constructor(a, b, dist, str) {
    super(a, b, dist, str);
  }

  show() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class SpringCon extends VerletConstrainedSpring2D {
  constructor(a, b, len, str, limit) {
    super(a, b, len, str, limit);
  }

  show() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class PullbackSpring extends PullBackString2D {
  constructor(a, b, str) {
    super(a, b, str);
  }

  show() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Wall extends RectConstraint {
  constructor(a, b) {
    super(a, b);
  }

  show() {
    noStroke();
    fill("#bfffe6");
    rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  }
}
