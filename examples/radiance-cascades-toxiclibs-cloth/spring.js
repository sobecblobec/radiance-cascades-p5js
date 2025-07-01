class Spring extends VerletSpring2D {
  constructor(a, b, seed) {
    super(a, b, w, 1);
    this.toDelete = false;
    physics.addSpring(this);
    this.seed = seed;
  }

  remove() {
    physics.removeSpring(this);
    this.toDelete = true;
  }

  display() {
    randomSeed(this.seed);
    let c = color(0, 0, 0, 15);
    // if (dist(this.a.x, this.a.y,this.b.x, this.b.y) < this.seed / 500) {
    //   c = color(255)
    // }
    stroke(c);

    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
