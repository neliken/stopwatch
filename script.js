class Stopwatch {
    constructor(id, delay=100) { //Delay in ms
      this.state = "paused";
      this.delay = delay;
      this.laps = [];
      this.lapsNode = document.getElementById('laps');
      this.display = document.getElementById(id);
      this.value = 0;
    }
    
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
    
    update() {
        if (this.state=="running") {
            this.value += this.delay;
        }
        this.display.innerHTML = this.formatTime(this.value);
    }
    
    start() {
        if (this.state=="paused") {
            this.state="running";
            if (!this.interval) {
            var t=this;
            this.interval = setInterval(function(){t.update();}, this.delay);
            }
            
        }
    }

    lap() {
        if (this.state=="running") {  
            this.laps += `<div class="lap">${this.formatTime(this.value)}</div>`;
            this.lapsNode.innerHTML = this.laps;
        }
    }
    
    stop() {
        if (this.state=="running") {
            this.state="paused";
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

