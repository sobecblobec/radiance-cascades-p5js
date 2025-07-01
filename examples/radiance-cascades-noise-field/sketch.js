// Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/vDcIAbfg7
// edited code to add radiance cascades
var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;
let rc;
let canvas;

let buffer;
function setup() {
  P5Capture.setDefaultOptions({
    format: "gif",
    framerate: 15,
    quality: 1,
  });
  canvas = createCanvas(300, 300, WEBGL);
  pixelDensity(2);
  buffer = createFramebuffer();

  rc = new RadianceCascades(canvas);
  rc.myCascadeNumber = 8;
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  clear();

  buffer.begin();
  noiseDetail(1, 0.01);
  translate(-width / 2, -height / 2);
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  buffer.end();

  image(buffer, -width / 2, -height / 2, width, height);
  push();
  blendMode(REPLACE);
  image(rc.draw(), -width / 2, -height / 2, width, height);
  pop();
}
