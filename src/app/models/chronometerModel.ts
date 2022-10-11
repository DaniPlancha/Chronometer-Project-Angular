export class ChronometerModel {
    id:number;
    timer :{
        milliseconds:number,
        seconds:number,
        minutes:number
    } = { milliseconds: 0, seconds: 0, minutes: 0 }
    isRunning:Boolean = false;

    constructor(id:number) {
        this.id = id
    }
}