import { ChronometerProvider } from './../models/chronometerProvider';
import { ChronometerService } from './../chronometer.service';
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.css']
})
export class ChronometerComponent implements OnInit {
  ngOnInit(): void { }
  constructor(private service: ChronometerService) { }
  
  @Input() chronometerProvider!: ChronometerProvider;

  StartStopChronometer() {
    this.chronometerProvider.StartStopChronometer();
  }

  ResetChronometer() {
    this.chronometerProvider.resetTimer();
  }

  RemoveChronometer() {
    this.service.removeChronometer(this.chronometerProvider.Model.id);
  }
}