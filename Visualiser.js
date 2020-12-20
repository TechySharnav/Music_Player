var context = new AudioContext();
var src = context.createMediaElementSource(audio);
var analyser = context.createAnalyser();

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

src.connect(analyser);
analyser.connect(context.destination);

analyser.fftSize = 256;

var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);

var dataArray = new Uint8Array(bufferLength);

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var barWidth = WIDTH / bufferLength;
var barHeight;
var x = 0;

function renderFrame() {
  requestAnimationFrame(renderFrame);

  x = 0;

  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    ctx.fillStyle = "rgb(rgb(245,67,70))";
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 10;
  }
}

audio.play();
renderFrame();
