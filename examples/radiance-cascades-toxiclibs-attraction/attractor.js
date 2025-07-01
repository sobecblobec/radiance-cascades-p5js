class Attractor extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
    physics.addBehavior(new AttractionBehavior(this, width, 0.1));
    physics.addBehavior(new AttractionBehavior(this, this.r + 4, -5));
    physics.addParticle(this);
  }

  show() {
    fill("#ff5200");

    rect(this.x, this.y, this.r * 1);
  }
}
