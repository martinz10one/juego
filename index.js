// ===== VARIABLES PRINCIPALES =====
const secretNumber = Math.floor(Math.random() * 100) + 1;
let timeLeft = 30;
let attempts = [];
let gameActive = true;

// ===== ELEMENTOS DEL DOM =====
const input = document.getElementById("guessInput");
const button = document.getElementById("guessBtn");
const message = document.getElementById("message");
const historySpan = document.getElementById("history");
const timeSpan = document.getElementById("time");
const container = document.getElementById("game");

// ===== CRONÓMETRO =====
const timer = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;
    timeSpan.textContent = timeLeft;

    if (timeLeft === 0) {
        endGame(false);
    }
}, 1000);

// ===== EVENTOS =====
button.addEventListener("click", handleGuess);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") handleGuess();
});

// ===== FUNCIÓN PRINCIPAL =====
function handleGuess() {
    if (!gameActive) return;

    const guess = Number(input.value);
    input.value = "";

    if (guess < 1 || guess > 100 || isNaN(guess)) {
        message.textContent = "❗ Ingresa un número válido (1-100)";
        return;
    }

    attempts.push(guess);
    historySpan.textContent = attempts.join(" - ");

    const distance = Math.abs(secretNumber - guess);

    if (distance === 0) {
        endGame(true);
    } else if (distance <= 5) {
        setState("caliente", "🔥 ¡MUY CALIENTE!");
    } else if (distance <= 15) {
        setState("tibio", "🟡 Tibio...");
    } else {
        setState("frio", "❄️ Frío...");
    }
}

// ===== CAMBIO DE ESTADO VISUAL =====
function setState(state, text) {
    container.className = `container ${state}`;
    message.textContent = text;
}


// ===== FIN DEL JUEGO =====
function endGame(win) {
    gameActive = false;
    clearInterval(timer);
    button.disabled = true;
    input.disabled = true;

    if (win) {
        container.className = "container victoria";
        message.textContent = "🏆 ¡GANASTE! Número correcto";
    } else {
        container.className = "container gameover";
        message.textContent = `☠️ ¡Tiempo Agotado! El número era ${secretNumber}`;
    }
}
//
