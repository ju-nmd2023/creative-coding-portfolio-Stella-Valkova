// "The Blood Pressure Has Risen" - Recreation of Noise Landscape V1.1

let gridsize = 50;
let seed = 0;
let layers = [];
let counter = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  generateLayers();
  frameRate(4);
}

class Point {
  constructor(x, y, noise) {
    this.x = x;
    this.y = y;
    this.noise = noise;
  }
}

function generateHorizon(base, maxHeight, offset) {
  let points = [];
  for (let i = 0; i < width; i++) {
    const noiseValue = noise((i + counter) / 10);
    const y = base + noiseValue * maxHeight;
    const point = new Point(i, y, noiseValue);
    points.push(point);
  }
  layers.push(points);
}

function generateLayers() {
  let h = 500;
  let maxHeight = 80;
  while (h > 0) {
    noiseSeed(seed);
    generateHorizon(h, maxHeight, counter); 
    seed += 1;
    h -= 60;
  }
}

function draw() {
  background(173, 40, 49);
  
  layers = [];
  generateLayers(); 

  for (let layer of layers) {
    stroke(128, 14, 19);
    fill(108, 182, 255, 10);
    beginShape();
    vertex(0, 0);
    for (let p of layer) {
      vertex(p.x, p.y);
    }
    vertex(width, 0);
    endShape();
  }

  counter += 0.01; 
}
