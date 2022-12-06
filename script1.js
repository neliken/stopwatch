let hours = `00`,
    minutes = `00`,
    seconds = `00`,
    chronometerDisplay = document.querySelector(`.timer`),
    chronometerCall;

function chronometer() {
    seconds++;

    if (seconds < 10) {
        seconds = `0` + seconds;
    }

    if (seconds > 59) {
        seconds = `00`;
        minutes++;

        if (minutes < 10) {
            minutes = `0` + minutes;
        }
    }

    if (minutes > 59) {
        minutes = `00`;
        hours++;
    
        if (hours < 10) {
            hours = `0` + hours;
        }
    }

    chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`;

}

play.addEventListener('click', () => {
    chronometerCall = setInterval(chronometer, 1000);
    play.setAttribute(`hidden`,``);
    lap.removeAttribute(`hidden`);
    reset.removeAttribute(`hidden`);
    pause.removeAttribute(`hidden`);
});

pause.addEventListener('click', () => {
    clearInterval(chronometerCall);
    play.removeAttribute(`hidden`);
    pause.setAttribute(`hidden`, ``);
});

reset.addEventListener('click', () => {
    clearInterval(chronometerCall);
    play.removeAttribute(`hidden`);
    reset.removeAttribute(`hidden`);
    lap.setAttribute(`hidden`, ``);
    pause.setAttribute(`hidden`, ``);

    chronometerDisplay.innerHTML = `00:00:00`;
    
    hours = minutes = seconds = `00`;

    laps.innerHTML = '';
});
  
lap.addEventListener('click', () => {
    let lapNow = `<div class="lap">${hours}:${minutes}:${seconds}</div>`;
    laps.innerHTML += lapNow;
});