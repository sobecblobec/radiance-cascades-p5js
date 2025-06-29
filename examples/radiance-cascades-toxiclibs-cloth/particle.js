
class Particle extends VerletParticle2D {

  constructor( x,  y) {
    super(x, y);
    this.col = color(255);
    this.connections = [];
  }
  
  attach(s) {
    this.connections.push(s); 
  }

   display() {
    fill(this.col);
    
    ellipse(this.x, this.y, 10);
  }
  
  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < 10) {
      this.col = color(0, 0, 0);
      for (let s of this.connections) {
        s.remove(); 
      }
    }
  }
}