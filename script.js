const background = document.getElementById("background");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const storyPanel = document.getElementById("story-panel");
const taustaAudio = document.getElementById("tausta-audio");
const oviAudio = document.getElementById("ovi-audio");

const scenes = [
  "ulkoovi.png",
  "makuuhuone.png",
  "olohuone.png",
  "eteinen.png",
  "kartano.png"
];

let currentScene = 0;

// Aloita taustaääni
taustaAudio.volume = 1.0;
taustaAudio.play();

// Siirtymäfunktio
function siirrySeuraavaanHuoneeseen() {
  if (currentScene >= scenes.length) return;

  taustaAudio.volume = 0.3;
  oviAudio.play();

  background.style.opacity = 0;

  setTimeout(() => {
    background.src = scenes[currentScene];
    background.style.opacity = 1;
    currentScene++;

    setTimeout(() => {
      taustaAudio.volume = 1.0;
    }, 5000);
  }, 5000);
}

// Aloituspainike
startButton.addEventListener("click", () => {
  storyPanel.style.display = "none";
  startButton.style.display = "none";
  nextButton.style.display = "block";
  siirrySeuraavaanHuoneeseen();
});

// Seuraava huone -painike
nextButton.addEventListener("click", () => {
  siirrySeuraavaanHuoneeseen();
});
