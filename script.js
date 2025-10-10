const sceneCurrent = document.getElementById("scene-current");
const sceneNext = document.getElementById("scene-next");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const storyPanel = document.getElementById("story-panel");
const puzzlePanel = document.getElementById("puzzle-panel");
const puzzleTitle = document.getElementById("puzzle-title");
const puzzleText = document.getElementById("puzzle-text");
const taustaAudio = document.getElementById("tausta-audio");
const oviAudio = document.getElementById("ovi-audio");

const scenes = [
  { image: "ulkoovi.png", title: "Ulko-ovi", puzzle: "Ovi narisee... mutta sen takana odottaa ensimmäinen haaste." },
  { image: "makuuhuone.png", title: "Makuuhuoneen Pulma", puzzle: "Sängyn alta löytyy paperi: 'Satoja on yhtä monta kuin Haamu-herran silmiä...'" },
  { image: "olohuone.png", title: "Olohuoneen Pulma", puzzle: "Vanhan taulun takana on laskutehtävä: 12 × 3, 45 ÷ 5, 7 + 8, 100 − 86." },
  { image: "eteinen.png", title: "Eteisen Pulma", puzzle: "Pehmolelut odottavat hyllyllä. Järjestä ne vihjeiden mukaan ja etsi viimeinen avain!" },
  { image: "kartano.png", title: "Pimeyden Arkku", puzzle: "Kaikki avaimet on löydetty! Haamu-herran kiitos kaikille rohkeille pelastajille!" }
];

let currentScene = 0;

function siirrySeuraavaanHuoneeseen() {
  if (currentScene >= scenes.length) return;

  const scene = scenes[currentScene];
  puzzleTitle.textContent = scene.title;
  puzzleText.textContent = scene.puzzle;
  puzzlePanel.style.display = "block";

  taustaAudio.volume = 0.3;
  oviAudio.play();

  sceneNext.src = scene.image;
  sceneNext.classList.add("slide-in");
  sceneCurrent.classList.add("slide-out");

  setTimeout(() => {
    sceneCurrent.src = scene.image;
    sceneCurrent.classList.remove("slide-out");
    sceneNext.classList.remove("slide-in");
    sceneNext.src = "";
    taustaAudio.volume = 1.0;
    currentScene++;
  }, 5000);
}

startButton.addEventListener("click", () => {
  storyPanel.style.display = "none";
  puzzlePanel.style.display = "none";
  taustaAudio.play(); // Käynnistetään taustaääni käyttäjän toimesta
  siirrySeuraavaanHuoneeseen();
});

nextButton.addEventListener("click", () => {
  puzzlePanel.style.display = "none";
  siirrySeuraavaanHuoneeseen();
});
