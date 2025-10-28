let countdownTimer;
const START_TIME_SECONDS = 120;
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
    "<p>Etsi ensimmäinen vihje Kylpyhuoneen 'kyyneleestä'...</p>"
  );

  countdownTimer = setInterval(function() {
    if (countingUp) {
      timeRemaining++;
      document.getElementById('timer-display').textContent =
        'Lisäaika: ' + formatTime(timeRemaining - START_TIME_SECONDS);
    } else {
      if (timeRemaining <= 0) {
        clearInterval(countdownTimer);
        showGameOver();
        return;
      }
      timeRemaining--;
      document.getElementById('timer-display').textContent =
        'Jäljellä: ' + formatTime(timeRemaining);
    }
  }, 1000);
}

// --- Pulmien logiikka ---

function manualNextLevel() {
  currentLevel++;
  if (currentLevel === 2) {
    changeScene(
      'livingroom',
      'Olohuone',
      true,
      "<p>Olette Olohuoneessa. Ratkaiskaa laskutehtävät ja fyysinen lukko saadaksenne digitaalisen salasanan.</p>"
    );
  }
}

function checkLock() {
  const input = document.getElementById('lock-input').value.toUpperCase().trim();
  const message = document.getElementById('lock-message');
  if (input === 'SECRET') {
    message.innerHTML = 'Oikein! Lukko aukesi! Avain 2 löytyi!';
    document.querySelector('#digital-lock button').style.display = 'none';
    document.getElementById('lock-input').style.display = 'none';
    document.getElementById('continue-to-level3').style.display = 'block';
  } else {
    message.textContent = 'Väärä salasana. Yritä uudelleen!';
    message.style.color = 'red';
  }
}

function continueToLevel3() {
  currentLevel = 3;
  document.getElementById('digital-lock').style.display = 'none';
  document.getElementById('continue-to-level3').style.display = 'none';
  changeScene(
    'kidsroom',
    'Lapsen Huone',
    false,
    "<p>Taso 3 avattu! Ratkaiskaa fyysinen pulma ja syöttäkää 3-numeroisen koodi Pimeyden Arkkuun.</p>"
  );
  document.getElementById('final-lock').style.display = 'block';
}

function checkFinalLock() {
  const input = document.getElementById('final-lock-input').value.trim();
  const message = document.getElementById('final-lock-message');
  const CORRECT_CODE = '531';
  if (input === CORRECT_CODE) {
    message.innerHTML = 'ARKUN LUKKO AUKESI! Klikkaa tästä nähdäksesi lopputuloksen!';
    message.style.color = '#00FF00';
    document.getElementById('final-lock-input').style.display = 'none';
    document.querySelector('#final-lock button').style.display = 'none';
    message.onclick = finishGame;
    message.style.cursor = 'pointer';
  } else {
    message.textContent = 'Väärä koodi. Yritä uudelleen!';
    message.style.color = 'red';
  }
}

function finishGame() {
  clearInterval(countdownTimer);
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('finale-screen').style.display = 'block';
  let finalSeconds;
  let finalTimeText;
  if (countingUp) {
    finalSeconds = timeRemaining;
    finalTimeText = `Lopputulos (lisäajalla): ${formatTime(finalSeconds)}!`;
  } else {
    finalSeconds = START_TIME_SECONDS - timeRemaining;
    finalTimeText = `Lopputulos: ${formatTime(finalSeconds)}!`;
  }
  document.getElementById('final-time').textContent = finalTimeText;
}

function showGameOver() {
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('game-over-screen').style.display = 'block';
}

function continueGame() {
  document.getElementById('game-over-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
  countingUp = true;
  timeRemaining = START_TIME_SECONDS;
}

