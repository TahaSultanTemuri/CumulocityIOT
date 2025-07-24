import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class DeviceControlService {

  constructor(private config: AppConfig,private httpClient: HttpClient) { }

  //Request URL: https://invixible.cumulocity.com/devicecontrol/operations?dateFrom=1970-01-01&dateTo=2020-10-14T11:11:56%2B05:00&deviceId=19320515&pageSize=100&revert=true





  GetOperations(deviceID:number,dateFrom:string,dateTo:string,pageSize:number) {
  
    
    
    let url = `${this.config.apiCumulocityUrl}/devicecontrol/operations?dateFrom='${dateFrom}'&dateTo='${dateTo}'&deviceId='${deviceID}'&pageSize='${pageSize}'`
    url = url.replace(/'/g,'');    
 
   
    return this.httpClient.get<any>(
 
     url
 
      )
      
      .pipe(map(operation => {
        return operation;
 
     
      }));
 
         
         }





         GetBulkoperations(deviceID:number,seriesType:string,pageSize:number,withDeleted:boolean) {
  
    
    
          let url = `${this.config.apiCumulocityUrl}/devicecontrol/bulkoperations?deviceId='${deviceID}'&pageSize='${pageSize}'&withDeleted='${withDeleted}'`
          url = url.replace(/'/g,'');    
       
         
          return this.httpClient.get<any>(
       
           url
       
            )
            
            .pipe(map(bulkoperation => {
              return bulkoperation;
       
           
            }));
       
               
               }


       

               PostConfigurations(config){
                 //Request URL: https://invixible.cumulocity.com/devicecontrol/operations
                 let url = `${this.config.apiCumulocityUrl}/devicecontrol/operations'`
                 url = url.replace(/'/g,'');    
              
                
                 return this.httpClient.post<any>(url, config)
                 .pipe(map(response => {
                  
           
                   return response;
                 }));
              
               }


               //Request URL: https://invixible.cumulocity.com/devicecontrol/operations?currentPage=2&dateFrom=1970-01-01&dateTo=2020-10-14T11:11:56%2B05:00&deviceId=19320515&pageSize=100&revert=true

}
