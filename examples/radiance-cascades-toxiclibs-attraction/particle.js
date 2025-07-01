class Particle extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
    physics.addBehavior(new AttractionBehavior(this, r * 2, -2));
    physics.addParticle(this);
    this.c = color(random(["black"]));
    this.c.setAlpha(255);
  }

  show() {
    fill(this.c);

    rect(this.x, this.y, this.r * 2);
  }
}
