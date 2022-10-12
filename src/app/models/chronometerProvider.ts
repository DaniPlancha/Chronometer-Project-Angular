import { ChronometerModel } from './chronometerModel';
export class ChronometerProvider {

    constructor(
        public Model: ChronometerModel
    ) {}

    private interval: any;
    public isRemoved: boolean = false;

    public updateChronometer() {
        if (!this.Model.isRunning) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }
    public startTimer() {
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
    private stopTimer() {
        this.Model.isRunning = false;
        clearInterval(this.interval);
    }
    public resetTimer() {
        this.stopTimer();
        this.Model.timer.minutes = 0;
        this.Model.timer.seconds = 0;
        this.Model.timer.milliseconds = 0;
    }
}