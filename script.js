let countdownTimer;
const START_TIME_SECONDS = 7200;
let timeRemaining = START_TIME_SECONDS;
let countingUp = false;
let currentLevel = 1;

const taustaAudio = document.getElementById("tausta-audio");
const oviAudio = document.getElementById("ovi-audio");
const sceneCurrent = document.getElementById("scene-current");
const sceneNext = document.getElementById("scene-next");

function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function playDoorTransition(newImage) {
  taustaAudio.volume = 0.3;
  oviAudio.play();

  sceneNext.src = newImage;
  sceneNext.classList.add("slide-in");
  sceneCurrent.classList.add("slide-out");

  setTimeout(() => {
    sceneCurrent.src = newImage;
    sceneCurrent.classList.remove("slide-out");
    sceneNext.classList.remove("slide-in");
    sceneNext.src = "";
    taustaAudio.volume = 1.0;
  }, 5000);
}

function changeScene(sceneName, roomText, showLock = false, descriptionHTML) {
  document.body.className = '';
  document.body.classList.add(`scene-${sceneName}`);
  document.getElementById('room-status').textContent = `Huone: ${roomText}`;
  document.getElementById('room-description').innerHTML = descriptionHTML;

  document.getElementById('digital-lock').style.display = 'none';
  document.getElementById('final-lock').style.display = 'none';

  const manualButton = document.getElementById('manual-next-button');

  if (showLock) {
    document.getElementById('digital-lock').style.display = 'block';
    manualButton.style.display = 'none';
  } else if (sceneName === 'kidsroom') {
    document.getElementById('final-lock').style.display = 'block';
    manualButton.style.display = 'none';
  } else {
    manualButton.style.display = 'block';
  }

  // määritä kuvat
  const images = {
    intro: "kartano.png",
    kitchen: "makuuhuone.png",
    livingroom: "olohuone.png",
    kidsroom: "eteinen.png",
    finale: "kartano.png"
  };
  playDoorTransition(images[sceneName] || "kartano.png");
}

function startGame() {
  document.getElementById('start
