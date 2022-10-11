import { ChronometerService } from './chronometer.service';
import { Component, OnInit } from '@angular/core';
import { ChronometerProvider } from './models/chronometerProvider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chronometer-Project';

  constructor(public chronometerService: ChronometerService) { }

  ngOnInit() {
    this.chronometerService.startConnection();
    this.chronometerService.AddListener();
  }

  AddChronometerUI() {
    let chronometerProvider: ChronometerProvider = this.chronometerService.AddChronometer();
  }
}