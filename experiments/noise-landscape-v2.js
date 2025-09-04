// Dunes - Recreation of Noise Landscape V2

let gridsize = 10;
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

function generateHorizon(base, maxHeight) {
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
  let maxHeight = 4;
  while (h > 0) {
    noiseSeed(seed);
    generateHorizon(h, maxHeight);
    seed += 1;
    h -= 130;
  }
}

function draw() {
  background(164, 126, 27);

  layers = [];
  generateLayers(); 

  for (let layer of layers) {
    stroke(70, 44, 99, 61);
    fill(300, 302, 400, 62);
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