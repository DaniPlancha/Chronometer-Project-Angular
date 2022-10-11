export class ChronometerModel {
    id:number;
    Timer :{
        tens:number,
        seconds:number,
        minutes:number
    } = { tens: 0, seconds: 0, minutes: 0 }
    isRunning:Boolean = false;

    constructor(id:number) {
        this.id = id
    }
}