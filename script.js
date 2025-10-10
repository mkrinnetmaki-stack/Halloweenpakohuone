const background = document.getElementById("background");
const startButton = document.getElementById("start-button");
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

  // Hiljennä taustaääni
  taustaAudio.volume = 0.3;

  // Soita oviääni
  oviAudio.play();

  // Liukuva siirtymä
  background.style.opacity = 0;

  setTimeout(() => {
    background.src = scenes[currentScene];
    background.style.opacity = 1;
    currentScene++;

    // Palauta taustaääni
    setTimeout(() => {
      taustaAudio.volume = 1.0;
    }, 5000); // ovi.wav kestää 5 sekuntia
  }, 5000);
}

// Aloituspainikkeen toiminta
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  siirrySeuraavaanHuoneeseen();

  // Siirry automaattisesti seuraaviin huoneisiin
  let delay = 6000;
  for (let i = 1; i < scenes.length; i++) {
    setTimeout(() => {
      siirrySeuraavaanHuoneeseen();
    }, delay * i);
  }
});
