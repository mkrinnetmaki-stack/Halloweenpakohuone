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
  sceneNext.style.transition = "none";
  sceneCurrent.style.transition = "none";
  sceneNext.style.transform = "translateX(100%)";
  sceneCurrent.style.transform = "translateX(0%)";

  requestAnimationFrame(() => {
    sceneCurrent.style.transition = "transform 5s ease";
    sceneNext.style.transition = "transform 5s ease";
    sceneCurrent.style.transform = "translateX(-100%)";
    sceneNext.style.transform = "translateX(0%)";
  });

  setTimeout(() => {
    sceneCurrent.src = newImage;
    sceneCurrent.style.transition = "";
    sceneNext.style.transition = "";
    sceneCurrent.style.transform = "translateX(0%)";
    sceneNext.style.transform = "translateX(100%)";
    taustaAudio.volume = 1.0;
  }, 5000);
}

function changeScene(sceneName, roomText, showLock = false, descriptionHTML) {
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

  const images = {
    intro: "kartano.png",
    kitchen: "ulkoovi.png",
    livingroom: "olohuone.png",
    kidsroom: "makuuhuone.png",
    finale: "eteinen.png"
  };
  playDoorTransition(images[sceneName] || "kartano.png");
}

function startGame() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';

  taustaAudio.volume = 1.0;
  taustaAudio.play().catch(err => console.log("Ääni ei lähtenyt:", err));

  changeScene(
    'kitchen',
    'Kylpyhuone / Keittiö',
    false,
    "<p>Etsi ensimmä
