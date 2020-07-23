let button0 = document.querySelector("#button0");
let ss = document.querySelector("#ss");
let mm = document.querySelector("#mm");
let time0 = document.querySelector("#time");
let options = document.querySelector("#options");
let setCount = document.querySelector("#setCount");
let maxMinutesSlider = document.querySelector("#maxMinutes");
let maxSecondsSlider = document.querySelector("#maxSeconds");
let maxMinutesDisplay = document.querySelector("#maxMinutesDisplay");
let maxSecondsDisplay = document.querySelector("#maxSecondsDisplay");

let optionsOpen = false;
let isStarted = false;
let isPaused = false;
let isOver = false;
let seconds = 0;
let minutes = 0;
let maxMinutes = 5;
let maxSeconds = 0;

//eventHandlers
button0.addEventListener("click", buttonClicked);
options.addEventListener("click", optionsClicked);
maxMinutesSlider.addEventListener("input", maxMinutesChanged);
maxSecondsSlider.addEventListener("input", maxSecondsChanged);
//functions

function buttonClicked() {
  if (isStarted == false) {
    time0.style.color = "#c0c0c0";
    button0.innerHTML = "Pause";
    isStarted = true;
    isPaused = false;
    let id = setInterval(() => {
      if (isPaused == true) clearInterval(id);
      else {
        seconds++;
        updateTime(id);
        if (minutes == maxMinutes && seconds == maxSeconds) timeEnded(id);
      }
    }, 1000);
  } else if (isOver == false) {
    time0.style.color = "orange";
    button0.innerHTML = "Start";
    isPaused = true;
    isStarted = false;
  } else {
    resetEverything();
  }
}
function updateTime(id) {
  if (seconds >= 59) {
    seconds = 0;
    ss.innerHTML = helper(seconds);
    minutes++;
    mm.innerHTML = helper(minutes);
  } else {
    ss.innerHTML = helper(seconds);
  }
}
function helper(time) {
  if (time < 10) return "0" + time;
  else return time;
}
function timeEnded(id) {
  clearTimeout(id);
  time0.style.color = "red";
  isOver = true;
  button0.innerHTML = "Reset";
}
function optionsClicked() {
  if (optionsOpen == false) {
    setCount.style.visibility = "visible";
    optionsOpen = true;
  } else {
    setCount.style.visibility = "hidden";
    optionsOpen = false;
  }
}
function maxMinutesChanged() {
  resetEverything();
  maxMinutes = maxMinutesSlider.value;
  maxMinutesDisplay.innerHTML = helper(maxMinutes) + ":";
}
function maxSecondsChanged() {
  resetEverything();
  maxSeconds = maxSecondsSlider.value;
  maxSecondsDisplay.innerHTML = helper(maxSeconds);
}
function resetEverything() {
  ss.innerHTML = "00";
  mm.innerHTML = "00";
  optionsOpen = false;
  isStarted = false;
  isPaused = false;
  isOver = false;
  seconds = 0;
  minutes = 0;
  time0.style.color = "#c0c0c0";
  button0.innerHTML = "Start";
}
