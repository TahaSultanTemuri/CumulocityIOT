import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { of as observableOf, Observable } from 'rxjs';
import { Alarm } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private config: AppConfig,private httpClient: HttpClient) { }
  GetAlarms(httpOptions:any) {
  
    
   
    return this.httpClient.get<any>(
      `${this.config.apiCumulocityUrl}/alarm/alarms`)

      .pipe(map(alarms => {
        return alarms;

     
      }));

   


  }



  GetAlarmsBySeverity(deviceID:string,severity:string,dateFrom:string,dateTo:string,resolved:boolean,pageSize:number,withSourceAssets:boolean,withSourceDevices:boolean) {
  
    
    
   let url = `${this.config.apiCumulocityUrl}/alarm/alarms?dateFrom='${dateFrom}'&dateTo='${dateTo}'&pageSize='${pageSize}'&resolved='${resolved}'&severity='${severity}'&source='${deviceID}'&withSourceAssets='${withSourceAssets}'&withSourceDevices='${withSourceDevices}'`
   url = url.replace(/'/g,'');    

  
   return this.httpClient.get<any>(

    url

     )
     
     .pipe(map(alarms => {
       return alarms;

    
     }));

        
        }



GetAlarmCount(url:string){



  //let url = `${this.config.apiCumulocityUrl}/alarm/alarms?dateFrom='${dateFrom}'&dateTo='${dateTo}'&pageSize='${pageSize}'&resolved='${resolved}'&severity='${severity}'&source='${deviceID}'&withSourceAssets='${withSourceAssets}'&withSourceDevices='${withSourceDevices}'`
  url = url.replace(/'/g,'');    

 
  return this.httpClient.get<any>(

   url

    )
    
    .pipe(map(count => {
      return count;

   
    }));
}
      
      

}
