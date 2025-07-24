import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { interval , Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { LiveUpdateChart, EarningData } from '../../../../@core/data/earning';
import { DevicesData } from '../../../../models/devices';
import { Measurments } from '../../../../models/measurments';
import { DevicesService } from '../../../../@core/mock/devices.service';

@Component({
  selector: 'ngx-earning-card-front',
  styleUrls: ['./earning-card-front.component.scss'],
  templateUrl: './earning-card-front.component.html',
  

})
export class EarningCardFrontComponent implements OnDestroy, OnInit {
  private alive = true;

  @Input() selectedCurrency: string = 'Bitcoin';

  @Input() model: any;
@Input() showSelect:boolean=true;

  intervalSubscription: Subscription;
  currencies: string[] = ['Bitcoin', 'Tether', 'Ethereum'];
  currentTheme: string;
  earningLiveUpdateCardData: LiveUpdateChart;
  measurmentsLiveUpdateCardData: Measurments;



  liveUpdateChartData: { value: [string, number] }[];

  constructor(private themeService: NbThemeService,
              private earningService: EarningData ,private deviceService:DevicesData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit() {


if(!this.model){
  this.getEarningCardData(this.selectedCurrency);


}
else{
  debugger;
  this.getDevicesCardData(this.model.device,this.model.seriesType,this.model.aggregation,this.model.from,this.model.to,this.model.pageSize,this.model.revert);

}
  }

  changeCurrency(currency) {
    if (this.selectedCurrency !== currency) {
      this.selectedCurrency = currency;

      this.getEarningCardData(this.selectedCurrency);
    }
  }

  private getEarningCardData(currency) {
    this.earningService.getEarningCardData(currency)
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningLiveUpdateCardData: LiveUpdateChart) => {
        this.earningLiveUpdateCardData = earningLiveUpdateCardData;
        this.liveUpdateChartData = earningLiveUpdateCardData.liveChart;

        this.startReceivingLiveData(currency);
      });
  }

  startReceivingLiveData(currency) {
  
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(200)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => this.earningService.getEarningLiveUpdateCardData(currency)),
      )
      .subscribe((liveUpdateChartData: any[]) => {
        this.liveUpdateChartData = [...liveUpdateChartData];
      });
  }









  private getDevicesCardData(deviceId:number,seriesType:string,aggregation:string,from:string,to:string,pageSize:number,revert:boolean) {
 
    this.deviceService.getMeasurmentCardData(deviceId,seriesType,aggregation,from,to,pageSize,revert)
      .pipe(takeWhile(() => this.alive))
      .subscribe((measurmentLiveUpdateCardData: LiveUpdateChart) => {
        this.earningLiveUpdateCardData = measurmentLiveUpdateCardData;


        this.deviceService.getMeasurmentCardDataV2(deviceId,seriesType,aggregation,from,to,pageSize,revert)
        .subscribe(
          data => { 
         
          
      
        let res:any = data;
      
      
        this.liveUpdateChartData = res;

        //  this.startReceivingMeasurmentLiveData(httpOptions,deviceId,seriesType,aggregation,from,to,pageSize,revert);
  
        this.startReceivingMeasurmentLiveDataV2(deviceId,seriesType,aggregation,from,to,pageSize,revert);
     
      
     
      
        
      });
     
      
      
      
          },
          error => {
      
          });
      



    
   
    
  }

  startReceivingMeasurmentLiveData(httpOptions: any,deviceId:number,seriesType:string,aggregation:string,from:string,to:string,pageSize:number,revert:boolean) {
  
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(200)
      .pipe(
        takeWhile(() => this.alive),
    //    switchMap(() => this.deviceService.getMeasurmentLiveUpdateCardDataV2(httpOptions,deviceId,seriesType,aggregation,from,to,pageSize,revert)),
        switchMap(() => this.deviceService.getMeasurmentLiveUpdateCardData(deviceId,seriesType,aggregation,from,to,pageSize,revert)),
      )
      .subscribe((liveUpdateChartData: any[]) => {

        this.liveUpdateChartData = [...liveUpdateChartData];
//console.log("measurment data");
     //   console.log(this.liveUpdateChartData);
      });
  }










  startReceivingMeasurmentLiveDataV2(deviceId:number,seriesType:string,aggregation:string,from:string,to:string,pageSize:number,revert:boolean) {
    
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(2000)
      .pipe(
        takeWhile(() => this.alive),
    //    switchMap(() => this.deviceService.getMeasurmentLiveUpdateCardDataV2(httpOptions,deviceId,seriesType,aggregation,from,to,pageSize,revert)),
        switchMap(() => this.deviceService.GetMeasurmentsV2(deviceId,seriesType,aggregation,from,to,pageSize,revert)),
      )
      .subscribe((liveUpdateChartData: any[]) => {

    
        this.liveUpdateChartData = [...liveUpdateChartData];
//console.log("measurment data");
     //   console.log(this.liveUpdateChartData);
      });
  }


  ngOnDestroy() {
    this.alive = false;
  }
}
