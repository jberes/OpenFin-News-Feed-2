import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  globalTicker: string = '';
  globalFeed: any = null;

  private _dataArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  public get dataArray(): BehaviorSubject<any[]> {
    return this._dataArray;
  }

  public async initInterApp(): Promise<void> {
    console.log("Init with interop called");
    fin.desktop.InterApplicationBus.addSubscribeListener(function (uuid, topic) {
        console.log("The application " + uuid + " has subscribed to " + topic);
    });
  
    fin.desktop.InterApplicationBus.subscribe("*",
        "FDC3",
        (message, uuid) => {
        this._dataArray.next(message.context.data);
        });        
  };

}
