import { ChronometerModel } from './models/chronometerModel';
import { Injectable } from '@angular/core';
import { ChronometerProvider } from './models/chronometerProvider';
import * as signalR from "@aspnet/signalr";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChronometerService {
  
  constructor(private httpClient: HttpClient) { }
  public providers: Map<number, ChronometerProvider> = new Map;
  private connection!: signalR.HubConnection;
  
  public register(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chronometersSignalR')
      .build();

    this.connection
      .start()
      .then(() => { console.log('< connection started successfully ! >') })
      .catch(err => console.log(err));
      this.createAddListener();
      this.getChronometers();
  
  }

  public addChronometer(): void {
    this.httpClient.post('https://localhost:5001/api/chronometer', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(() => {
      console.log('< post successful ! >')
    });
  }
  public getChronometers():void {
    this
      .httpClient.get<ChronometerModel[]>('https://localhost:5001/api/chronometer')
      .subscribe((models: ChronometerModel[]) => {
        models.forEach((currentModel) => {
          this.providers.set(currentModel.id, new ChronometerProvider(currentModel));
        });
        console.log('< get successful ! > ');
      });
    console.log();
  }


  private createAddListener(): void {
    this.connection.on('Add', (model) => {
      this.addChronometerData(model);
    });
  }
  private addChronometerData(model: ChronometerModel): void {
    let provider = new ChronometerProvider(model);
    this.providers.set(model.id, provider);
  }
  removeChronometer(id: number) {
    // let provider = this.allProviders[id];
    // provider.resetTimer();
    // provider.isRemoved = true;
    // delete this.allProviders[id];
  }
}