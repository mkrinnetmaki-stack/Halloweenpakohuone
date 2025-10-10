let countdownTimer;
const START_TIME_SECONDS = 7200; 
let timeRemaining = START_TIME_SECONDS;
let countingUp = false; 
let currentLevel = 1; 

// --- Apufunktiot ---

function formatTime(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
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
}

function manualNextLevel() {
    // ÄÄNIVAIKUTUS POISTETTU TÄSTÄ
    currentLevel++;

    if (currentLevel === 2) {
        changeScene(
            'livingroom', 
            'Olohuone', 
            true, 
            "<p>Olette Olohuoneessa. Etsikää laskutehtävät ja fyysinen lukko saadaksenne digitaalisen salasanan.</p>"
        );
    } else {
        alert("Peli on jo ratkaistu tai taso on tuntematon. Älä paina tätä enää.");
    }
}

function checkFinalLock() {
    const input = document.getElementById('final-lock-input').value.trim();
    const message = document.getElementById('final-lock-message');
    const CORRECT_CODE = '531'; 

    if (input === CORRECT_CODE) {
        // ÄÄNIVAIKUTUS POISTETTU TÄSTÄ
        message.innerHTML = 'ARKUN LUKKO AUKESI! Onnittelut! Klikkaa tästä nähdäksesi lopputuloksen!';
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

// --- Päälogiikka ---

// YKSINKERTAISTETTU TAKAISIN ALKUPERÄISEEN KÄYNNISTYKSEEN
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    // Aloita Taso 1: Kylpyhuone/Keittiö teema
    changeScene(
        'kitchen', 
        'Kylpyhuone / Keittiö', 
        false, 
        "<p>Etsi ensimmäinen vihje Kylpyhuoneen 'kyyneleestä', jotta saat selville salakirjoituksen siirtoarvon!</p><p>***</p><p>Kun olette ratkaisseet Tason 1 lukon ja löytäneet Avaimen 1, valvoja klikkaa alla olevaa siirtymisnappia siirtyäksesi Olohuoneeseen.</p>"
    );
    
    countdownTimer = setInterval(function() {
        if (countingUp) {
            timeRemaining++;
            document.getElementById('timer-display').textContent = 'Lisäaika: ' + formatTime(timeRemaining - START_TIME_SECONDS);
        } else {
            if (timeRemaining <= 0) {
                clearInterval(countdownTimer);
                showGameOver();
                return;
            }
            timeRemaining--;
            document.getElementById('timer-display').textContent = 'Jäljellä: ' + formatTime(timeRemaining);
        }
    }, 1000);
}

// Taso 2 lukon tarkistus
function checkLock() {
    const input = document.getElementById('lock-input').value.toUpperCase().trim();
    const message = document.getElementById('lock-message');
    
    if (input === 'SECRET') {
        // ÄÄNIVAIKUTUS POISTETTU TÄSTÄ
        
        message.innerHTML = 'Oikein! Lukko aukesi! Avain 2 on kätketty ikkunan verhon taakse. Kun Avain 2 on löydetty, klikkaa **JATKA PELIÄ** siirtyäksesi Lapsen Huoneeseen!';
        
        document.querySelector('#digital-lock button').style.display = 'none';
        document.getElementById('lock-input').style.display = 'none';
        
        document.getElementById('continue-to-level3').style.display = 'block';

    } else {
        message.textContent = 'Väärä salasana. Yritä uudelleen!';
        message.style.color = 'red';
    }
}

// Taso 2 onnistumisen jälkeen: Siirry Taso 3:een
function continueToLevel3() {
    currentLevel = 3; 
    
    document.getElementById('digital-lock').style.display = 'none';
    document.getElementById('continue-to-level3').style.display = 'none';

    changeScene(
        'kidsroom', 
        'Lapsen Huone', 
        false, 
        "<p>Taso 3 avattu! Nyt Lapsen Huoneessa! Etsikää fyysinen 5 esineen pulma, jonka ratkaisusta saatte **3-numeroisen koodin** Pimeyden Arkkuun (selaimessa).</p>"
    );
    document.getElementById('final-lock').style.display = 'block';
}

function finishGame() {
    clearInterval(countdownTimer);
    // ÄÄNIVAIKUTUKSET POISTETTU TÄSTÄ
    
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('finale-screen').style.display = 'block';
    
    let finalSeconds;
    let finalTimeText;
    
    if (countingUp) {
        finalSeconds = timeRemaining;
        finalTimeText = `Lopputulos (sis. lisäajan): ${formatTime(finalSeconds)}!`;
    } else {
        finalSeconds = START_TIME_SECONDS - timeRemaining;
        finalTimeText = `Lopputulos: ${formatTime(finalSeconds)}!`;
    }
    
    document.getElementById('final-time').textContent = finalTimeText;
}

function showGameOver() {
    // ÄÄNIVAIKUTUS POISTETTU TÄSTÄ
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'block';
}

function continueGame() {
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    countingUp = true;
    timeRemaining = START_TIME_SECONDS; 
    // ÄÄNIVAIKUTUS POISTETTU TÄSTÄ
}

// --- Käynnistys ---
document.body.classList.add('scene-intro');