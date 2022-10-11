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
            this.Model.timer.milliseconds += 1;
            if (this.Model.timer.milliseconds == 10) {
                this.Model.timer.milliseconds = 0;
                this.Model.timer.seconds += 1;
            }
            if (this.Model.timer.seconds == 60) {
                this.Model.timer.seconds = 0;
                this.Model.timer.minutes += 1;
            }
        }, 100)
    }

    stopTimer() {
        this.Model.isRunning = false;
        clearInterval(this.interval);
    }

    resetTimer() {
        this.stopTimer();
        this.Model.timer.minutes = 0;
        this.Model.timer.seconds = 0;
        this.Model.timer.milliseconds = 0;
    }
}