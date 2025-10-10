function startGame() {
    // Piilota aloitusruutu ja näytä peli
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    // Käynnistä taustaääni käyttäjän klikkauksen jälkeen (mobiili vaatii tämän)
    taustaAudio.volume = 1.0;
    taustaAudio.play().catch(err => {
        console.log("Taustaääntä ei voitu käynnistää automaattisesti:", err);
    });

    // Aloita ensimmäinen huone
    changeScene(
        'kitchen',
        'Kylpyhuone / Keittiö',
        false,
        "<p>Etsi ensimmäinen vihje Kylpyhuoneen 'kyyneleestä', jotta saat selville salakirjoituksen siirtoarvon!</p><p>Kun olette ratkaisseet Tason 1 lukon ja löytäneet Avaimen 1, valvoja klikkaa alla olevaa siirtymisnappia siirtyäksesi Olohuoneeseen.</p>"
    );

    // Käynnistä ajastin
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
