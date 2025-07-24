import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private config: AppConfig,private httpClient: HttpClient) { }
  GetAuditRecord(deviceID:string,revert:boolean,withTotalPages:boolean,pageSize:number) {
 
    let url = 'https://invixible.cumulocity.com/audit/auditRecords?pageSize=100&revert=false&source=26272199&withTotalPages=true';
   //let url = `${this.config.apiCumulocityUrl}/audit/auditRecords?pageSize='${pageSize}'&revert='${revert}'&source='${deviceID}'&withTotalPages='${withTotalPages}'`
   url = url.replace(/'/g,'');    

  
   return this.httpClient.get<any>(

    url

     )
     
     .pipe(map(record => {
       debugger
       return record;

    
     }));

        
        }

  //https://invixible.cumulocity.com/audit/auditRecords?pageSize=100&revert=false&source=22792320&withTotalPages=true

}
