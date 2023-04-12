let handpose;
let video;
let predictions = [];
let canvas2;

function setup() {
  let canvas = createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);
  canvas2 = createGraphics(640, 480);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on('predict', (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log('Model ready!');
}

function draw() {
  image(video, 0, 0, width, height);
  image(canvas2, 0, 0);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }

    const thumb = prediction.annotations.thumb;
    const pointer = prediction.annotations.indexFinger;

    canvas2.stroke(255);
    canvas2.strokeWeight(10);

    for (let k = 0; k < thumb.length; k++) {
      const thumb_keypoint = thumb[k];
      const pointer_keypoint = pointer[k];

      canvas2.line(
        thumb_keypoint[0],
        thumb_keypoint[1],
        pointer_keypoint[0],
        pointer_keypoint[1]
      );
    }
  }
}
