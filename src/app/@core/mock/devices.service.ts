import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { DevicesData } from '../../models/devices';
import { of as observableOf, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService  extends DevicesData {
 


  private currentDate: Date = new Date();
  private currentValue = Math.random() * 1000;
  private ONE_DAY = 24 * 3600 * 1000;

private even=true;
  private liveUpdateChartData = {
    bitcoin: {
      liveChart: [],
      delta: {
        up: true,
        value: 4,
      },
      dailyIncome: 45895,
    },
    tether: {
      liveChart: [],
      delta: {
        up: false,
        value: 9,
      },
      dailyIncome: 5862,
    },
    ethereum: {
      liveChart: [],
      delta: {
        up: false,
        value: 21,
      },
      dailyIncome: 584,
    },
  };


  constructor(private config: AppConfig,private httpClient: HttpClient) {

    super();
   }


GetManagedObjectByDeviceID(deviceID:number){
  
   
   let url =  `${this.config.apiCumulocityUrl}/inventory/managedObjects/'${deviceID}'`;
  
   url = url.replace(/'/g,'');
   return this.httpClient.get<any>(
     url
      )
      
      .pipe(map(device => {
        return device;

     
      }));

}



GetExternalIDByDeviceID(deviceID:number){
  
  
  let url =  `${this.config.apiCumulocityUrl}/identity/globalIds/'${deviceID}'/externalIds`;
 
  url = url.replace(/'/g,'');
  return this.httpClient.get<any>(
    url
     )
     
     .pipe(map(identity => {
       return identity;

    
     }));

}

  GetManagedObjects(pageSize:number,withTotalPages:boolean,fragmentType:string='') {
  //fragmentType=c8y_IsDevice
    
   let url =  `${this.config.apiCumulocityUrl}/inventory/managedObjects?pageSize='${pageSize}'&q=&withGroups=true&withTotalPages='${withTotalPages}'`;
  
   url = url.replace(/'/g,'');
   return this.httpClient.get<any>(
     url
      )
      
      .pipe(map(devices => {
        return devices;

     
      }));

   


  }

GetMeasurmentsV3(url:string){
  url = url.replace(/'/g,'');  
  
  return this.httpClient.get<any>(
  
       url
  
        )
        
        .pipe(map(measurments => {
          return measurments;
  
       
        }));
}

  GetMeasurments(deviceID:number,seriesType:string,aggregationType:string,dateFrom:string,dateTo:string,pageSize:number,revert:boolean,isAggregation:boolean=true,isSeries:boolean=true){
let url = '';
    if(isAggregation){
      url =  `${this.config.apiCumulocityUrl}/measurement/measurements/series?aggregationType='${aggregationType}'&dateFrom='${dateFrom}'&dateTo='${dateTo}'&pageSize='${pageSize}'&revert='${revert}'&series='${seriesType}'&source='${deviceID}'`

    }
  

url = url.replace(/'/g,'');  

return this.httpClient.get<any>(

     url

      )
      
      .pipe(map(measurments => {
        return measurments;

     
      }));

//    
  }


  GetMeasurmentsV2( deviceID: number, seriesType: string, aggregationType: string, dateFrom: string, dateTo: string, pageSize: number, revert: boolean):  Observable<any[]>  {
  
  
    let url =  `${this.config.apiCumulocityUrl}/measurement/measurements/series?aggregationType='${aggregationType}'&dateFrom='${dateFrom}'&dateTo='${dateTo}'&pageSize='${pageSize}'&revert='${revert}'&series='${seriesType}'&source='${deviceID}'`
   
   
   
    url = url.replace(/'/g,'');  
    let series=[];
    const dt = this.liveUpdateChartData['bitcoin'];

    return this.httpClient.get<any>(
      url
       )
       
       .pipe(map(data => {
        let res:any = data;
  
    
   
  Object.keys(res.values).forEach(function(key,index) {
  let dic = {};
  let date = new Date(key);

//res.values["2020-09-11T06:31:00.000Z"][0].max


  dic["value"] = [
    
    date.toLocaleString()
    
    , res.values[key][0].max];

  
  
  
  series.push(dic);
  
    
  });
  console.log("series");
  console.log(series);




 // const    newValue=series.length>0? series[series.length-1]:this.generateRandomLiveChartData();
 const    newValue=this.generateRandomLiveChartData();
  
  //7 seconds in milliseconds
     dt.liveChart.shift();
  // dt.liveChart.push(newValue);
 
         return  dt.liveChart;
  
      
       }));
 
         
          
  }


  
  


  GetManagedObjectWithLocFilterByDeviceID(deviceID:number){
  
    
    let url =  `${this.config.apiCumulocityUrl}/inventory/managedObjects/'${deviceID}'?pageSize=100&q=$filter%3D(((has(c8y_Position.lat))+and+(has(c8y_Position.lng)))+or+((has(com_nsn_startups_vendme_fragments_GPSCoordinates.lat))+and+(has(com_nsn_startups_vendme_fragments_GPSCoordinates.lng))))&withTotalPages=true`;
   
    url = url.replace(/'/g,'');
    return this.httpClient.get<any>(
      url
       )
       
       .pipe(map(managedObj => {
         return managedObj;
  
      
       }));
  
  }




  generateLiveMeasurmentData(httpOptions: any,deviceId:number,seriesType:string,aggregation:string,from:string,to:string,pageSize:number,revert:boolean){
  
    let series =[];

   this.GetMeasurments(deviceId,seriesType,aggregation,from,to,pageSize,revert)
    .subscribe(
      data => { 
     

  
      console.log("data");
      console.log(data);
    let res:any = data;
  
    
   
  Object.keys(res.values).forEach(function(key,index) {
  let dic = {};
  let date = new Date(key);
  
  dic["value"] = [date.toISOString(), res.values[key][0].max];
  
  
  
  //toISOString
  series.push(dic);
  
    
  });
  console.log("series");
  console.log(series);
  
  return series.length>0? series[series.length]:series;
  
      },
      error => {
  return series;
      });
      
  }


  getMeasurmentLiveUpdateCardData(deviceId:number,seriesType:string,aggregation:string,from:string,to:string,pageSize:number,revert:boolean):  Observable<any[]>  {
    
  

    //empty livedata first
    const dt = this.liveUpdateChartData['bitcoin'];
    //getting new value every time
   
  //  const newValue = this.generateLiveMeasurmentData(httpOptions,deviceId,seriesType,aggregation,from,to,pageSize,revert);
const    newValue=this.generateRandomLiveChartData();
 //7 seconds in milliseconds
    dt.liveChart.shift();
  dt.liveChart.push(newValue);

  return observableOf(dt.liveChart);
    




    
    }




    GetSupportedSeriesByDeviceID(deviceID:number){
  
      
      let url =  `${this.config.apiCumulocityUrl}/inventory/managedObjects/'${deviceID}'/supportedSeries`;
     
      url = url.replace(/'/g,'');
      return this.httpClient.get<any>(
        url
         )
         
         .pipe(map(supportedSeries => {
           return supportedSeries;
    
        
         }));
    
    }


    GetSupportedMeasurementsByDeviceID(deviceID:number){
  
     
      let url =  `${this.config.apiCumulocityUrl}/inventory/managedObjects/'${deviceID}'/supportedMeasurements`;
     
      url = url.replace(/'/g,'');
      return this.httpClient.get<any>(
        url
         )
         
         .pipe(map(supportedMeasurments => {
           return supportedMeasurments;
    
        
         }));
    
    }

  





  getMeasurmentCardData( deviceId: number, seriesType: string, aggregation: string, from: string, to: string, pageSize: number, revert: boolean): Observable<import("../data/earning").LiveUpdateChart> {
    const data = this.liveUpdateChartData['bitcoin'];

    data.liveChart = this.getDefaultLiveChartData(100);

    return observableOf(data);
  }




  getMeasurmentCardDataV2(deviceId: number, seriesType: string, aggregation: string, from: string, to: string, pageSize: number, revert: boolean): Observable<any[]> {
    
    
    const data = this.liveUpdateChartData['bitcoin'];

    let url =  `${this.config.apiCumulocityUrl}/measurement/measurements/series?aggregationType='${aggregation}'&dateFrom='${from}'&dateTo='${to}'&pageSize='${pageSize}'&revert='${revert}'&series='${seriesType}'&source='${deviceId}'`
   
   
   
    url = url.replace(/'/g,'');  
    let series=[];
    const dt = this.liveUpdateChartData['bitcoin'];

    return this.httpClient.get<any>(
      url
       )
       
       .pipe(map(data => {
        let res:any = data;
  
    
   
  Object.keys(res.values).forEach(function(key,index) {
  let dic = {};
  let date = new Date(key);



  dic["value"] = [
    
    key
    
    , res.values[key][0].max];

  
  
  
  series.push(dic);
  
    
  });
  




  
 
         return  series;
  
      
       }));
  }



 
  getDefaultLiveChartData(elementsNumber: number) {
    this.currentDate = new Date();
    this.currentValue = Math.random() * 1000;

    return Array.from(Array(elementsNumber))
      .map(item => this.generateRandomLiveChartData());
  }



  generateRandomLiveChartData() {
    this.currentDate = new Date(+this.currentDate + this.ONE_DAY);
    this.currentValue = this.currentValue + Math.random() * 20 - 11;

    if (this.currentValue < 0) {
      this.currentValue = Math.random() * 100;
    }

    return {
      value: [
         // [
        //   this.currentDate.getFullYear(),
        //   this.currentDate.getMonth(),
        //   this.currentDate.getDate(),
        // ].join('/')
        this.currentDate.toISOString()
        
        ,
        Math.round(this.currentValue),
      ],
    };
  }


}
