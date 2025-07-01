// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs
// https://editor.p5js.org/codingtrain/sketches/wAe_oPVHo
// edited code to add radiance cascades
var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 11;
var rows = 8;
let rc;
let canvas;
function setup() {
  P5Capture.setDefaultOptions({
    format: "gif",
    framerate: 15,
    quality: 1,
  });
  canvas = createCanvas(300, 300);
  pixelDensity(1);
  rc = new RadianceCascades(canvas);

  rc.myCascadeNumber = 10;
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
  //world.gravity.y = 2;

  function collision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var labelA = pairs[i].bodyA.label;
      var labelB = pairs[i].bodyB.label;
      if (labelA == "particle" && labelB == "plinko") {
        //ding.play();
      }
      if (labelA == "plinko" && labelB == "particle") {
        //ding.play();
      }
    }
  }

  Events.on(engine, "collisionStart", collision);

  newParticle();
  var spacing = width / cols;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols + 1; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
      var y = spacing + j * spacing;
      var p = new Plinko(x, y, 8);
      plinkos.push(p);
    }
  }

  var b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);

  for (var i = 0; i < cols + 2; i++) {
    var x = i * spacing;
    var h = 50;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);
  }
}

function newParticle() {
  var p = new Particle(width / 2 + random(-width / 4, width / 4), 0, 4);
  particles.push(p);
}

function draw() {
  clear();
  if (frameCount % 5 == 0) {
    newParticle();
  }
  Engine.update(engine, 1000 / 30);
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  push();
  colorMode(RGB);
  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }
  pop();

  image(rc.draw(), 0, 0, width, height);
}
