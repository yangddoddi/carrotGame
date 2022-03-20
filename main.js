"use strict";

const gameContainer = document.querySelector(".gameContainer");
const timer = document.querySelector(".timer");
const carrotCounter = document.querySelector(".carrotCounter");
const modal = document.querySelector(".modal");
const dropArea = document.querySelector(".dropArea");
const resultMessage = document.querySelector(".resultMessage");

// btn
const btnBox = document.querySelector(".btnBox");
const playBtn = document.querySelector(".playBtn");
const stopBtn = document.querySelector(".stopBtn");
const restartBtn = document.querySelector(".restartBtn");

// sound
const bgm = new Audio("./sound/bg.mp3");
const gameOverSound = new Audio("./sound/alert.wav");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");

// target
const bug = document.querySelectorAll(".bug");
const carrot = document.querySelectorAll(".carrot");

// counter

let gameCounter;
let timerCount = 1;
let carrotCount = 0;

// 게임 승패여부
let isWin;
let isLost;
let isPause;

// 게임 시작시 작동
function StartGame() {
  if (timerCount !== 1) {
    return;
  }
  isWin = false;
  isLost = false;
  isPause = false;
  //   BGM 재생
  bgm.play();
  // 타겟 요소 무작위 생성(이동)
  dropItems();
  //   정지버튼 재생성
  stopBtn.parentElement.parentElement.classList.remove("hide");

  let gameCounter = setInterval(() => {
    timer.innerHTML = `0:${20 - timerCount}`;
    timerCount++;
    // 타이머가 다 지나면 게임 오버 함수 실행
    if (timerCount == 21) {
      isLost = true;
      gameOver();
      timerCount = 1;
      clearInterval(gameCounter);
    }
    if (isPause == true || isWin == true || isLost == true) {
      clearInterval(gameCounter);
      timerCount = 1;
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
}

// 게임 종료
function gameOver() {
  // 모달창 띄우기
  if (isPause) {
    resultMessage.innerText = "Retry ❔";
  }
  if (isLost) {
    resultMessage.innerText = "You Lost 😈";
  }
  if (isWin) {
    resultMessage.innerText = "You Win 😤";
  }

  timerCount = 0;
  carrotCount = 0;
  carrotCounter.innerText = 10;

  modal.classList.remove("hide");
  // 게임 종료 효과음
  gameOverSound.play();
  // 배경음악 정지
  bgm.pause();
  // 타겟 숨김처리
  bug.forEach((e) => {
    e.classList.add("hide");
  });
  carrot.forEach((e) => {
    e.classList.add("hide");
  });
}

// 버튼 클릭 이벤트 모음
gameContainer.addEventListener("click", (event) => {
  const Target = event.target;

  if (
    Target.tagName !== "BUTTON" &&
    Target.parentElement.tagName !== "BUTTON"
  ) {
    return;
  }

  if (Target == playBtn) {
    playBtn.parentElement.classList.add("hide");
    stopBtn.parentElement.classList.remove("hide");
    StartGame();
  }

  //  정지 버튼
  if (Target == stopBtn) {
    stopBtn.parentElement.parentElement.classList.add("hide");
    isPause = true;
    gameOver();
  }

  //   재시작 버튼
  if (Target.parentElement == restartBtn) {
    console.log("rererestart");
    StartGame();
    gameCounter;
    modal.classList.add("hide");
  }

  // 벌레 잡기
  if (Target.className == "bug") {
    console.log("bbuugg");
    bugSound.play();
    isLost = true;
    gameOver();
  }

  // 당근 누르기
  if (Target.className == "carrot") {
    console.log("carottttt");
    carrotSound.play();
    Target.classList.add("hide");
    carrotCount = carrotCount + 1;
    carrotCounter.innerText = `${10 - carrotCount}`;
    if (carrotCount == 10) {
      isWin = true;
      gameOver();
    }
  }
});
