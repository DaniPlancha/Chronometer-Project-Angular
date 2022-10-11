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
  public providers: Map<number, ChronometerProvider> = new Map<number, ChronometerProvider>;

  private connection!: signalR.HubConnection;
  
  startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chronometerSignalR')
      .build();

    this.connection
      .start()
      .then(() => { console.log('connection started') })
      .catch(err => console.log(err));
  }

  AddListener() {
    this.connection.on('Add', (message) => {
      // if (!this.allProviders.has(message.id))
      //   this.AddChronometerData();
      console.log("from post: " + message);
    });
  }

  public AddChronometer(): any {
    this.httpClient.post('https://localhost:5001/chronometer', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(() => {console.log('post successful!')});
    //return this.AddChronometerData();
  }

  private AddChronometerData(providerModel:ChronometerModel): ChronometerProvider {
    let providerProvider = new ChronometerProvider(providerModel);
    this.providers.set(providerModel.id, providerProvider);
    return providerProvider;
  }

  RemoveChronometer(id: number) {
    // let provider = this.allProviders[id];
    // provider.resetTimer();
    // provider.isRemoved = true;
    // delete this.allProviders[id];
  }
}