import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private config: AppConfig,private httpClient: HttpClient) { }


  GetEvents(deviceID:string,dateFrom:string,dateTo:string,pageSize:number,withSourceAssets:boolean,withSourceDevices:boolean) {
  

    //https://invixible.cumulocity.com/event/events?dateFrom=1970-01-01&dateTo=2020-09-11T15:09:21%2B05:00&pageSize=50&source=21520355&withSourceAssets=true&withSourceDevices=true
    
    let url = `${this.config.apiCumulocityUrl}/event/events?dateFrom='${dateFrom}'&dateTo='${dateTo}'&pageSize='${pageSize}'&source='${deviceID}'&withSourceAssets='${withSourceAssets}'&withSourceDevices='${withSourceDevices}'`
    url = url.replace(/'/g,'');    
 
   
    return this.httpClient.get<any>(
 
     url
 
      )
      
      .pipe(map(alarms => {
        return alarms;
 
     
      }));
 
         
         }

}
