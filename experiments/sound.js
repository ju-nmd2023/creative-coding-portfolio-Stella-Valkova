let oscillator;
let chorus;
let synth;

// Code for the Particles
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.2 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 100 + Math.random() * 100;
  }

  update() {
    this.lifespan--;

    this.velocity.mult(0.99);
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    stroke(10, 80, 255, 10);
    strokeWeight(random(15));
    noFill();
    line(10, 10, 20, 150);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  blendMode(ADD);
}

function generateParticles(x, y) {
  for (let i = 0; i < 1; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    const particle = new Particle(px, py);
    particles.push(particle);
  }
}

let particles = [];

function draw() {
  background(0, 0, 0);

  for (let particle of particles) {
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }
}

// Code for the Sound
window.addEventListener("load", () => {
  chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
  synth = new Tone.PolySynth().connect(chorus);
});

function mouseClicked() {
  generateParticles(mouseX, mouseY);
  Tone.start();
  let notes = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5"];
  let note = random(notes);
  synth.triggerAttackRelease(note, "8n");
}
