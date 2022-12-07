const stateButton = {
    paused: "paused",
    running: "running",
}
class FormatTime{
    formatTime(ms) {
        var hours   = Math.floor(ms / 3600000);
        var minutes = Math.floor((ms - (hours * 3600000)) / 60000);
        var seconds = Math.floor((ms - (hours * 3600000) - (minutes * 60000)) / 1000);
    
        if (hours < 10) {
            hours   = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    }
}

const time = new FormatTime();
class Stopwatch {
    constructor(id, delay=1000) { //Delay in ms
        this.state = stateButton.paused;
        this.delay = delay;
        this.laps = [];
        this.lapsNode = document.getElementById('laps');
        this.displayTimer = document.getElementById(id);
        this.value = 0;
    }
    
    update() {
        if (this.state==stateButton.running) {
            this.value += this.delay;
        }
        this.displayTimer.innerHTML = time.formatTime(this.value);
    }
    
    start() {
        if (this.state==stateButton.paused) {
            this.state=stateButton.running;
            if (!this.interval) {
                var t=this;
                this.interval = setInterval(function(){t.update();}, this.delay);
            }
        }
    }

    lap() {
        if (this.state==stateButton.running) {  
            this.laps += `<div class="lap">${time.formatTime(this.value)}</div>`;
            this.lapsNode.innerHTML = this.laps;
        }
    }
    
    stop() {
        if (this.state==stateButton.running) {
            this.state=stateButton.paused;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
      }
    }
    
    reset() {
        this.stop();
        this.value=0;
        this.update();
        this.laps = [];

        while (this.lapsNode.firstChild) {
            this.lapsNode.firstChild.remove();
        }
    }
  }

const stopwatch = new Stopwatch("stopwatch");
class StopwatchUIController {
    constructor(stopwatchService){
        this.stopwatchService = stopwatchService;
        this.setupUI();
    }

    setupUI() {
        this.startButton = document.getElementById('start');
        this.stopButton = document.getElementById('stop');
        this.lapButton = document.getElementById('lap');
        this.resetButton = document.getElementById('reset');
    }

    start() {
        this.stopwatchService.start();
        this.startButton.hidden = true;
        this.stopButton.hidden = false;
        this.lapButton.hidden = false;
    }

    stop() {
        this.stopwatchService.stop();
        this.startButton.hidden = false;
        this.stopButton.hidden = true;
    }

    lap() {
        this.stopwatchService.lap();
    }

    reset() {
        this.stopwatchService.reset();
        this.startButton.hidden = false;
        this.stopButton.hidden = true;
        this.lapButton.hidden = true;
    }
}

const stopwatchUIController = new StopwatchUIController(stopwatch);