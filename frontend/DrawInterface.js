class DrawInterface {
  constructor(canvasRenderer) {
    this.canvasRenderer = canvasRenderer;
  }

  // Set the color for drawing shapes
  setColor(r, g, b) {
    this.canvasRenderer.fill(r, g, b);
  }

  // Draw a rectangle
  drawRect(x, y, w, h) {
    this.canvasRenderer.rect(x, y, w, h);
  }

  // Draw a circle
  drawCircle(x, y, r) {
    this.canvasRenderer.circle(x, y, r);
  }

  // Draw a line
  drawLine(x1, y1, x2, y2) {
    this.canvasRenderer.line(x1, y1, x2, y2);
  }

  // Set the stroke weight
  setStrokeWeight(weight) {
    this.canvasRenderer.strokeWeight(weight);
  }

  // Set the stroke color
  setStrokeColor(r, g, b) {
    this.canvasRenderer.stroke(r, g, b);
  }

  draw(x1, y1, x2, y2, threshold, radius = 40) {
    if (Math.abs(x1 - x2) < threshold && Math.abs(y1 - y2) < threshold) {
      this.drawLine(x1, y1, x2, y2);
    } else {
      this.drawCircle(x1, y1, radius);
      this.drawCircle(x2, y2, radius);
    }
  }
}
