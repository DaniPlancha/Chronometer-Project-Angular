import { ChronometerProvider } from './../models/chronometerProvider';
import { ChronometerService } from './../chronometer.service';
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.css']
})
export class ChronometerComponent {
  
  constructor(private service: ChronometerService) { }
  @Input() chronometerProvider!: ChronometerProvider;

  updateChronometer() {
    this.service.updateChronometer(this.chronometerProvider.Model);
  }
  resetChronometer() {
    this.service.resetChronometer(this.chronometerProvider.Model.id);
  }
  removeChronometer() {
    this.service.removeChronometer(this.chronometerProvider.Model.id);
  }
}