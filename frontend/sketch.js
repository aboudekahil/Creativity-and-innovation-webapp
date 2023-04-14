let handpose;
let video;
let predictions = [];
let prev_predictions = [];
let canvas2;
let drawingIF;

function setup() {
  createCanvas(640, 480);
  frameRate(fr);

  video = createCapture(VIDEO);
  video.size(width, height);
  canvas2 = createGraphics(640, 480);
  drawingIF = new DrawInterface(canvas2);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on('hand', (results) => {
    prev_predictions = predictions;
    predictions = results;
  });

  record();

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
  let prev_prediction;
  let prev_pointer;
  let prev_keypoint;

  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];

    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }

    if(prev_predictions.length != 0){
      //sets up previous hand detection
      prev_prediction = prev_predictions[i];
      prev_pointer = prev_prediction.annotations.indexFinger;
      prev_keypoint = prev_pointer[3];

      //current hand detection
      const pointer = prediction.annotations.indexFinger;
      const middleFinger = prediction.annotations.middleFinger;

      drawingIF.setColor(255, 255, 255);
      drawingIF.setStrokeWeight(10);

      const pointer_keypoint = pointer[3];
      const middle_keypoint = middleFinger[3];

      // if(middle_keypoint[1] >= pointer_keypoint[1]){
      //   drawingIF.startErasing();
      // }
      // else{
      //   drawingIF.stopErasing();
      // }

      drawingIF.draw(prev_keypoint[0], prev_keypoint[1], pointer_keypoint[0], pointer_keypoint[1], 100);
    }
  }
}
