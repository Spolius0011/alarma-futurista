// Reloj en tiempo real
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

// Alarma
let alarmTime = null;
let alarmTimeout = null;
const alarmSound = document.getElementById('alarmSound');

document.getElementById('setAlarm').addEventListener('click', function() {
    const alarmInput = document.getElementById('alarmTime').value;
    if (alarmInput) {
        alarmTime = new Date();
        const [hours, minutes] = alarmInput.split(':');
        alarmTime.setHours(hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);

        const alarmStatus = document.getElementById('alarmStatus');
        alarmStatus.textContent = `Alarma establecida para las ${alarmInput}`;

        // Ajustar la alarma para que se dispare en el futuro
        alarmTimeout = setTimeout(triggerAlarm, alarmTime - new Date());
    }
});

function triggerAlarm() {
    alarmSound.play(); // Reproduce el sonido de la alarma
    document.getElementById('alarmStatus').textContent = 'Alarma no establecida';
}

// Temporizador
let timerInterval = null;
const timerSound = document.getElementById('timerSound');

document.getElementById('startTimer').addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('timerMinutes').value);
    if (isNaN(minutes)) return;

    const display = document.getElementById('timerDisplay');
    let timeRemaining = minutes * 60;

    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            timerSound.play(); // Reproduce el sonido del temporizador
            display.textContent = '00:00';
        }
    }, 1000);
});

// Fecha actual
document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
