function setup() {
    createCanvas(innerWidth, innerHeight);
  }
  
  const size = 60;
  const layers = 50;
  
  function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 0, 1, -variance, variance);
  }
  
  function drawLayers(x, y, size, layers) {
    noFill();
    const variance = size / 100;
    //   rectMode(CENTER);
    for (let i = 0; i < layers; i++) {
      if (Math.random() > 0.8) {
        continue;
      }
      const s = (size / layers) * i;
      const half = s / 2;
      beginShape();
      curveVertex(
        getRandomValue(x - half, variance),
        getRandomValue(y - half, variance)
      );
      curveVertex(
        getRandomValue(x + half, variance),
        getRandomValue(y - half, variance)
      );
      curveVertex(
        getRandomValue(x + half, variance),
        getRandomValue(y + half, variance)
      );
      curveVertex(
        getRandomValue(x - half, variance),
        getRandomValue(y + half, variance)
      );
      endShape(CLOSE);
      // rect(x - half, y - half, s, s);
    }
  }
  
  function draw() {
    background(255, 255, 255);
  
    //   drawLayers(100, 100, size, layers);
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
      }
    }
    noLoop();
  }