"use strict";

const gameContainer = document.querySelector(".gameContainer");
const timer = document.querySelector(".timer");
const carrotCounter = document.querySelector(".carrotCounter");
const modal = document.querySelector(".modal");
const dropArea = document.querySelector(".dropArea");
const resultMessage = document.querySelector(".resultMessage");

const btnBox = document.querySelector(".btnBox");
const playBtn = document.querySelector(".playBtn");
const stopBtn = document.querySelector(".stopBtn");
const restartBtn = document.querySelector(".restartBtn");

const bgm = new Audio("./sound/bg.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let targetCount = 15;
let playTime = 15;
let gameTimer;
let started = true;
let score = 0;

{
  /* <button><img class="carrot hide" src="/img/carrot.png" alt="carrot"></button> */
}

btnBox.addEventListener("click", startGameBtn);
dropArea.addEventListener("click", clickCarrotAndCarrot);
modal.addEventListener("click", retry);

function startGameBtn() {
  if (started) {
    startGame();
    showStopBtn();
    started = false;
  } else {
    toggleVisible(btnBox, "hidden");
    timerCounterVisible("hidden");
    playSounds(alertSound);
    closeGame();
  }
}

function startGame() {
  score = 0;
  updateCarrotCounter();
  init();
  playSounds(bgm);
  timerCounterVisible("visible");
  startTimer(playTime);
}

function closeGame() {
  pauseSounds(bgm);
  stopTimer();
  toggleModalDisplay("block");
}

function startTimer(time) {
  updateTimerText(time);
  gameTimer = setInterval(() => {
    updateTimerText(time);
    if (time <= 0) {
      stopTimer();
    } else if (started == true) {
      stopTimer();
    }
    updateTimerText(--time);
  }, 1000);
}

function stopTimer() {
  clearInterval(gameTimer);
}

function updateTimerText(time) {
  let minute = Math.floor(time / 60);
  let second = time % 60;
  timer.textContent = `${minute} : ${second}`;
}

function updateCarrotCounter() {
  carrotCounter.innerText = `${targetCount - score}`;
}

function showStopBtn() {
  const icon = document.querySelector(".fa-solid");

  icon.classList.remove("fa-play");
  icon.classList.add("fa-stop");
}

function timerCounterVisible(visible) {
  timer.style.visibility = visible;
  carrotCounter.style.visibility = visible;
}

function init() {
  dropArea.innerHTML = " ";
  addItem("carrot", targetCount, "./img/carrot.png");
  addItem("bug", targetCount, "./img/bug.png");
}

function addItem(name, count, imgSrc) {
  const dropAreaWidth = dropArea.getBoundingClientRect().width - 80;
  const dropAreaHeight = dropArea.getBoundingClientRect().height - 80;

  for (let i = 0; i < count; i++) {
    const obj = document.createElement("img");
    obj.className = name;
    obj.src = imgSrc;

    const x = placeRandom(0, dropAreaWidth);
    const y = placeRandom(0, dropAreaHeight);
    obj.style.top = `${y}px`;
    obj.style.left = `${x}px`;

    dropArea.append(obj);
  }
}

function toggleVisible(name, visible) {
  name.style.visibility = visible;
}

function toggleModalDisplay(display) {
  modal.style.display = display;
}

function showResultModal(result) {
  resultMessage.innerText = `${result}`;
}

function clickCarrotAndCarrot() {
  const Target = event.target;

  if (Target.tagName !== "IMG") {
    return;
  }
  if (Target.className == "carrot") {
    upScore();
  } else {
    playSounds(bugSound);
    showResultModal("You Lost!");
    closeGame();
  }

  function upScore() {
    Target.classList.add("hide");
    ++score;
    playSounds(carrotSound);
    updateCarrotCounter();

    if (targetCount == score) {
      showResultModal("You Win!");
      playSounds(winSound);
      closeGame();
    }
  }
}

function retry() {
  started == false;
  showResultModal("Retry?");
  toggleModalDisplay("none");
  toggleVisible(btnBox, "visible");
  stopTimer();
  startGame();
}

function playSounds(sound) {
  sound.cuurentTime = 0;
  sound.play();
}

function pauseSounds(sound) {
  sound.pause();
}

function placeRandom(min, max) {
  return Math.random() * (max - min) + min;
}
