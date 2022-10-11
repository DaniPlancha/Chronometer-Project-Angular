import { ChronometerModel } from './chronometerModel';
export class ChronometerProvider {

    constructor(
        public Model: ChronometerModel
    ) {}

    interval: any;
    isRemoved: boolean = false;

    StartStopChronometer() {
        if (!this.Model.isRunning) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }
    startTimer() {
        this.Model.isRunning = true;
        this.interval = setInterval(() => {
            this.Model.Timer.tens += 1;
            if (this.Model.Timer.tens == 10) {
                this.Model.Timer.tens = 0;
                this.Model.Timer.seconds += 1;
            }
            if (this.Model.Timer.seconds == 60) {
                this.Model.Timer.seconds = 0;
                this.Model.Timer.minutes += 1;
            }
        }, 100)
    }

    stopTimer() {
        this.Model.isRunning = false;
        clearInterval(this.interval);
    }

    resetTimer() {
        this.stopTimer();
        this.Model.Timer.minutes = 0;
        this.Model.Timer.seconds = 0;
        this.Model.Timer.tens = 0;
    }
}