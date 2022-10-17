import { ChronometerModel } from './models/chronometerModel';
import { Injectable } from '@angular/core';
import { ChronometerProvider } from './models/chronometerProvider';
import * as signalR from "@aspnet/signalr";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChronometerService {

  constructor(private httpClient : HttpClient) { }
  public providers : Map<number, ChronometerProvider> = new Map;
  private connection !: signalR.HubConnection;
  private route : string = 'https://localhost:5001/api/chronometer';
  

  public register() : void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chronometersSignalR')
      .build();

    this.connection
      .start()
      .then(() => { console.log('< connection started successfully ! >') })
      .catch(err => console.log(err));
      
    this.createAddListener();
    this.createUpdateListener();
    this.createDeleteListener();
    this.getChronometers();
  }


  public addChronometer() : void {
    this.httpClient.post(this.route, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(() => {
      console.log('< post successful ! >')
    });
  }
  public updateChronometer(model : ChronometerModel) : void {
    this.httpClient.put(this.route, model)
    .subscribe(() => {
      console.log('< put successful ! >');
    });
  }
  public resetChronometer(id : number) : void {
    this.httpClient.put(this.route, {
      Id : id,
      Timer : {
        milliseconds : 0,
        seconds : 0,
        minutes : 0
      },
      IsRunning : true
    })
    .subscribe(() => {
      console.log('< put successful ! >');
    });
  }
  public removeChronometer(id : number) : void {
    this.httpClient.delete(this.route, {
      body : id
    }).subscribe(() => {
      console.log('< delete successful ! >');
    });
  }
  private getChronometers() : void {
    this.httpClient.get<ChronometerModel[]>(this.route)
    .subscribe((models : ChronometerModel[]) => {

      models.forEach((currentModel) => {
        this.providers.set(currentModel.id, new ChronometerProvider(currentModel));
        if (this.providers.get(currentModel.id)?.Model.isRunning) {
          this.providers.get(currentModel.id)?.startTimer();
        }
      });

      console.log('< get successful ! > ');
    });
  }


  private createAddListener() : void {
    this.connection.on('Add', (model) => {
      this.addChronometerData(model);
    });
  }
  private createUpdateListener() : void {
    this.connection.on('Update', (model : ChronometerModel) => {
      if (model.timer.milliseconds == 0 && model.timer.seconds == 0 && model.timer.minutes == 0 && !model.isRunning) {
        this.providers.get(model.id)?.resetTimer();
      } else {
        this.providers.get(model.id)?.updateChronometer();
      }
    });
  }
  private createDeleteListener() : void {
    this.connection.on('Delete', (id : number) => {
      let provider = this.providers.get(id);
      provider?.resetTimer();
      provider?.changeIsRemoved();
      this.providers.delete(id);
    });
  }
  private addChronometerData(model : ChronometerModel) : void {
    let provider = new ChronometerProvider(model);
    this.providers.set(model.id, provider);
  }
}