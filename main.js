"use strict";

const btnBox = document.querySelector(".btnBox");
const playBtn = document.querySelector(".playBtn");
const stopBtn = document.querySelector(".stopBtn");
const bgm = new Audio("./sound/bg.mp3");
const gameOverSound = new Audio("./sound/alert.wav");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carroutSound = new Audio("./sound/carrot__pull");
const timer = document.querySelector(".timer");
const modal = document.querySelector(".modal");
const dropArea = document.querySelector(".dropArea");

const bug = document.querySelectorAll(".bug");
const carrot = document.querySelectorAll(".carrot");

let timerCount = 0;

let isWin;
let isLost;
let isPause;

// 게임 시작시 음악 재생, 타이머 시작, 타겟 생성
function StartGame() {
  if (timerCount !== 0) {
    return;
  }
  bgm.play();
  dropItems();
  isWin = false;
  isLost = false;
  isPause = false;
  let gameCounter = setInterval(function counterCallback() {
    timer.innerHTML = `0:${10 - timerCount}`;
    timerCount++;
    if (timerCount == 11) {
      gameOver();
      timerCount = 0;
      clearInterval(gameCounter);
    }
  }, 1000);
}

// 타겟 임의 위치로 이동
function dropItems() {
  const dropAreaCoordinate = dropArea.getBoundingClientRect();
  let dropAreaLeft = Math.ceil(dropAreaCoordinate.left);
  let dropAreaRight = Math.floor(dropAreaCoordinate.right);
  let dropAreaTop = Math.ceil(dropAreaCoordinate.top);
  let dropAreaBottom = Math.floor(dropAreaCoordinate.bottom);

  bug.forEach((e) => {
    let itemX =
      Math.random() * (dropAreaRight - dropAreaLeft) +
      dropAreaLeft -
      dropAreaCoordinate.x;
    let itemY =
      Math.random() * (dropAreaBottom - dropAreaTop) +
      dropAreaTop -
      dropAreaCoordinate.y;
    e.classList.remove("hide");
    e.style.transform = `translate(${itemX}px,${itemY}px)`;
  });

  carrot.forEach((e) => {
    let itemX =
      Math.random() * (dropAreaRight - dropAreaLeft) +
      dropAreaLeft -
      dropAreaCoordinate.x;
    let itemY =
      Math.random() * (dropAreaBottom - dropAreaTop) +
      dropAreaTop -
      dropAreaCoordinate.y;
    e.classList.remove("hide");
    e.style.transform = `translate(${itemX}px,${itemY}px)`;
  });

  //   return Math.random() * (right - left) + left;
  // 1. items의 x 좌표는 dropArea의 x 좌표 시작점 ~ 끝점
  // 2. items의 y 좌표는 dropArea의 y 좌표 시작점 ~ 끝점
}

function gameOver() {
  modal.classList.remove("hide");
  gameOverSound.play();
  bgm.pause();
  isLost = true;
  bug.forEach((e) => {
    e.classList.add("hide");
  });
  carrot.forEach((e) => {
    e.classList.add("hide");
  });
}

btnBox.addEventListener("click", (event) => {
  const tag = event.target.tagName;
  if (tag !== "I" && tag !== "BUTTON") {
    return;
  }

  tag == "I" && event.target.parentElement.classList.add("hide");
  tag == "BUTTON" && event.target.classList.add("hide");
  stopBtn.classList.remove("hide");

  StartGame();
});
