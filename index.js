
const refs = {
    startBtn: document.querySelector('button[data-action-start]'),
    stopBtn: document.querySelector('button[data-action-stop]'),
    clearBtn: document.querySelector('button[data-action-clear]'),
    clockface: document.querySelector('.js-clockface'),
}


class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }
    start() {
        if (this.isActive) {
            return;
        }
        const startTime = Date.now();
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const time = getTimeComponents(deltaTime);
            
            updateClockface(time);
        }, 1000);
    }
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    }
    clear() {
        refs.clockface.textContent = '00:00:00';
    }
}
const timer = new Timer({
    onTick: updateClockface
});


refs.startBtn.addEventListener('click', () => {
    timer.start();
    
});

refs.stopBtn.addEventListener('click', () => {
    timer.stop();
    
});
refs.clearBtn.addEventListener('click', () => {
    timer.clear();
    
});


function updateClockface({ hours, mins, secs }) {
    refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}


function pad(value) {
    return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
}