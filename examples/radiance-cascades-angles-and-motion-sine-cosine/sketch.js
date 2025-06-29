// https://p5js.org/examples/angles-and-motion-sine-cosine/
// this is by p5.js Contributors, the Processing Foundation, sobecblobec, and is licensed under CC BY-NC-SA 4.0.
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// edited code to add radiance cascades
let canvas;
let rc;

let circleX = 200;
let circleY = 150;
let circleRadius = 75;

let graphX = 50;
let graphY = 300;
let graphAmplitude = 50;
let graphPeriod = 300;

function setup() {
  P5Capture.setDefaultOptions({
    format: "gif",
    framerate: 15,
    quality: 1,
  });
  canvas = createCanvas(400, 400);
  pixelDensity(2);

  angleMode(DEGREES);

  rc = new RadianceCascades(canvas);
  rc.myBaseIntervalLength = 0.1;
  rc.myCascadeNumber = 10;
}

function draw() {
  clear();

  // Set angle based on frameCount, and display current value

  let angle = frameCount % 360;
  noStroke();
  textStyle(BOLD);
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`angle: ${angle}`, 25, 25);

  // Draw circle and diameters

  noFill();
  stroke(128);
  strokeWeight(3);
  circle(circleX, circleY, 2 * circleRadius);

  line(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
  line(circleX - circleRadius, circleY, circleX + circleRadius, circleY);

  // Draw moving points

  let pointX = circleX + circleRadius * cos(angle);
  let pointY = circleY - circleRadius * sin(angle);

  line(circleX, circleY, pointX, pointY);

  noStroke();

  fill("white");
  circle(pointX, pointY, 10);

  fill("orange");
  circle(pointX, circleY, 10);

  fill("red");
  circle(circleX, pointY, 10);

  // Draw graph

  stroke("grey");
  strokeWeight(3);
  line(graphX, graphY, graphX + 300, graphY);
  line(graphX, graphY - graphAmplitude, graphX, graphY + graphAmplitude);
  line(
    graphX + graphPeriod,
    graphY - graphAmplitude,
    graphX + graphPeriod,
    graphY + graphAmplitude
  );

  fill("grey");
  noStroke();
  textAlign(CENTER, CENTER);
  text("0", graphX, graphY + graphAmplitude + 20);
  text("360", graphX + graphPeriod, graphY + graphAmplitude + 20);
  text("1", graphX / 2, graphY - graphAmplitude);
  text("0", graphX / 2, graphY);
  text("-1", graphX / 2, graphY + graphAmplitude);

  fill("orange");
  text("cos", graphX + graphPeriod + graphX / 2, graphY - graphAmplitude);
  fill("red");
  text("sin", graphX + graphPeriod + graphX / 2, graphY);

  // Draw cosine curve

  noFill();
  stroke("orange");
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, graphX, graphX + graphPeriod);
    let y = graphY - graphAmplitude * cos(t);
    vertex(x, y);
  }
  endShape();

  // Draw sine curve

  noFill();
  stroke("red");
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, graphX, graphX + graphPeriod);
    let y = graphY - graphAmplitude * sin(t);
    vertex(x, y);
  }
  endShape();

  let lineX = map(angle, 0, 360, graphX, graphX + graphPeriod);

  // Draw moving points on graph

  let orangeY = graphY - graphAmplitude * cos(angle);
  let redY = graphY - graphAmplitude * sin(angle);

  noStroke();

  fill("orange");
  circle(lineX, orangeY, 10);

  fill("red");
  circle(lineX, redY, 10);

  image(rc.draw(), 0, 0, width, height);
}
