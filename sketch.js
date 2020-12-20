var audio = document.querySelector(".audio");
var currentTime = document.querySelector(".currentTime");
var totalTime = document.querySelector(".totalTime");
var bar = document.querySelector(".bar2");
var button = document.querySelector(".buttonPlay");

var isLoaded = false;
var state = false;

console.log(audio);

audio.onloadedmetadata = () => {
  getDuration();
  isLoaded = true;
};

setInterval(() => {
  changeWidth();
  if (isLoaded) {
    getCurrentTime();
  }
}, 1000);

audio.addEventListener("ended", function () {
  changeState();
});

function changeWidth() {
  var percent =
    (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 95;

  bar.style.width = percent + "%";
}

function getDuration() {
  var ss = 0,
    mm = 0;
  for (var i = 0; i < Math.floor(audio.duration); i++) {
    ss += 1;
    if (i > 0 && i % 60 === 0) {
      mm = mm + 1;
      ss = 0;
    }
  }
  totalTime.innerHTML = ss < 10 ? "" + mm + ":0" + ss : "" + mm + ":" + ss;
}

function getCurrentTime() {
  var ss = 0,
    mm = 0;
  for (var i = 0; i < Math.floor(audio.currentTime); i++) {
    ss += 1;
    if (i > 0 && i % 60 === 0) {
      mm = mm + 1;
      ss = 0;
    }
  }
  currentTime.innerHTML = ss < 10 ? "" + mm + ":0" + ss : "" + mm + ":" + ss;
}

function changeState() {
  state = !state;

  if (state) {
    audio.play();
    button.innerHTML = "&#9612;&#9612;";
  } else if (state === false) {
    audio.pause();
    button.innerHTML = "&#9658;";
  }
}
