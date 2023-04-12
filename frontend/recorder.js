let recording = false;
let recorder;
let chunks = [];

const fr = 30; // framerate

function record() {
  chunks.length = 0;

  let stream = document.querySelector('canvas').captureStream(fr);

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (e) => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };

  recorder.onstop = exportVideo;
}

function exportVideo(e) {
  var blob = new Blob(chunks, { type: 'video/webm' });

  // Download the video
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'newVid.webm';
  a.click();
  window.URL.revokeObjectURL(url);
}

document.getElementById('recordBtn').addEventListener('click', (e) => {
  // toggle recording true or false
  recording = !recording;
  console.log(recording);

  if (recording) {
    console.log('recording started!');
    recorder.start();
  }

  // if we are recording, stop recording
  if (!recording) {
    console.log('recording stopped!');
    recorder.stop();
  }
});
