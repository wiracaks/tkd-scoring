// =======================
// STATE
// =======================
let blueGamjeomcount = 0;
let redGamjeomcount = 0;
let blueScore = 0;
let redScore = 0;
let timeLeft = 120;

let timer = null;
let isRunning = false;
const startSound = document.getElementById("startSound");
const scoreSound = document.getElementById("scoreSound");
const gamjeomSound = document.getElementById("gamjeomSound");

// =======================
// UPDATE DISPLAY
// =======================
function updateDisplay() {
  document.getElementById("blueScore").textContent = blueScore;
  document.getElementById("redScore").textContent = redScore;
  document.getElementById("blueGamjeom").textContent = blueGamjeomcount;
  document.getElementById("redGamjeom").textContent = redGamjeomcount;

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  document.getElementById("time").textContent =
    String(minutes).padStart(2, '0') + ":" +
    String(seconds).padStart(2, '0');
}

function playStartSound() {
  startSound.currentTime = 0;
  startSound.play().catch(() => {});
}

function playScoreSound() {
  scoreSound.currentTime = 0;
  scoreSound.play().catch(() => {});
}

function playGamjeomSound() {
  if (!gamjeomSound) return;
  gamjeomSound.currentTime = 0;
  gamjeomSound.play().catch(() => {});
}

// =======================
// SCORE SYSTEM
// =======================
function addBlue(points) {
  blueScore += points;
  playScoreSound();
  updateDisplay();
}

function addRed(points) {
  redScore += points;
  playScoreSound();
  updateDisplay();
}

// =======================
// GAMJEOM SYSTEM
// =======================
function addBlueGamjeom() {
  blueGamjeomcount++;
  redScore += 1;
  playGamjeomSound(); // 🔊 TAMBAH INI

  if (blueGamjeomcount >= 5) {
    document.getElementById("winner").textContent = "RED WIN (Gamjeom Limit)!";
    pauseTimer();
  }

  updateDisplay();
}

function addRedGamjeom() {
  redGamjeomcount++;
  blueScore += 1;
  playGamjeomSound(); // 🔊 TAMBAH INI

  if (redGamjeomcount >= 5) {
    document.getElementById("winner").textContent = "BLUE WIN (Gamjeom Limit)!";
    pauseTimer();
  }

  updateDisplay();
}

// =======================
// TIMER SYSTEM
// =======================
// =======================
// TIMER SYSTEM
// =======================
function startTimer() {
  if (!isRunning) {

    if (timeLeft === 120) {
      playStartSound();
    }

    isRunning = true;

    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        playStartSound(); //
        endMatch();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}
// =======================
// END MATCH
// =======================
function endMatch() {
  clearInterval(timer);
  isRunning = false;

  if (blueScore > redScore) {
    document.getElementById("winner").textContent = "BLUE WIN!";
  } else if (redScore > blueScore) {
    document.getElementById("winner").textContent = "RED WIN!";
  } else {
    document.getElementById("winner").textContent = "DRAW!";
  }
}

// =======================
// RESET
// =======================
function resetMatch() {
  blueScore = 0;
  redScore = 0;
  blueGamjeomcount = 0;
  redGamjeomcount = 0;
  timeLeft = 120;

  document.getElementById("winner").textContent = "";

  pauseTimer();
  updateDisplay();
}

function unlockAudio() {
  startSound.play().then(() => {
    startSound.pause();
    startSound.currentTime = 0;
  });

  scoreSound.play().then(() => {
    scoreSound.pause();
    scoreSound.currentTime = 0;
  });

  document.body.removeEventListener("click", unlockAudio);
  document.body.removeEventListener("keydown", unlockAudio);
}

document.body.addEventListener("click", unlockAudio);
document.body.addEventListener("keydown", unlockAudio);

// =======================
// INIT
// =======================
updateDisplay();