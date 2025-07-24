import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from '../../../@core/mock/devices.service';
import { HttpHeaders } from '@angular/common/http';
import { Measurments } from '../../../models/measurments';
import { Devices } from '../../../models/devices';
import { Identity } from '../../../models/identity';
import { NbDialogService, NbThemeService } from '@nebular/theme';

import { switchMap, takeWhile, delay, map } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlarmService } from '../../../@core/mock/alarm.service';
import { Alarm, Severity } from '../../../models';
import { AuditService } from '../../../@core/mock/audit.service';
import { interval, forkJoin, from, Subscription, Observable, range } from 'rxjs';
import { TemperatureHumidityData, Temperature } from '../../../@core/data/temperature-humidity';
import { EventService } from '../../../@core/mock/event.service';
import { Events } from '../../../models/events';
import { Series } from '../../../models/series';
import { AppConfig } from '../../../app.config';
import { IgxRadialGaugeComponent, IgxRadialGaugeRangeComponent, RadialGaugeBackingShape, RadialGaugeNeedleShape, RadialGaugePivotShape, RadialGaugeScaleOversweepShape } from 'igniteui-angular-gauges';
import { SweepDirection } from 'igniteui-angular-core';
import { DeviceControlService } from '../../../@core/mock/device-control.service';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';






interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}
@Component({
  selector: 'ngx-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss'],
  
})

export class DeviceInfoComponent implements OnInit,OnDestroy,AfterViewInit {






  Id: string;  
  private sub: any;
public criticalAlarm :any;
public minorAlarm:any;
public majorAlarm:any;
public warningAlarm:any;
public measurmentModel:any;



  
  public totalAlarms:number=0;
  public totalEvents:number=0;

  public totalBulkOperations:number=0;
  public totalMeasurments:number=0;
  protected managedObject:Devices;
 
  
  private alive = true;


  name = 'Angular 5 with ngx-gauge!';
  currentValue=0
  gaugeType = "arch";
  gaugeValue = 300;
  gaugeLabel = "Speed";
  gaugeAppendText = "r/s";
  //===========BUTTON CARD============//
  statusCards: string;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  // rollerShadesCard: CardSettings = {
  //   title: 'Roller Shades',
  //   iconClass: 'nb-roller-shades',
  //   type: 'success',
  // };
  // wirelessAudioCard: CardSettings = {
  //   title: 'Wireless Audio',
  //   iconClass: 'nb-audio',
  //   type: 'info',
  // };
  // coffeeMakerCard: CardSettings = {
  //   title: 'Coffee Maker',
  //   iconClass: 'nb-coffee-maker',
  //   type: 'warning',
  // }; 
  
  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    // this.rollerShadesCard,
    // this.wirelessAudioCard,
    // this.coffeeMakerCard,
  ];
    statusCardsByThemes: {
      default: CardSettings[];
      cosmic: CardSettings[];
      corporate: CardSettings[];
      dark: CardSettings[];
    } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.lightCard,
          type: 'warning',
        },
        // {
        //   ...this.rollerShadesCard,
        //   type: 'primary',
        // },
        // {
        //   ...this.wirelessAudioCard,
        //   type: 'danger',
        // },
        // {
        //   ...this.coffeeMakerCard,
        //   type: 'info',
        // },
      ],
      dark: this.commonStatusCardsSet,
    };

    //=================END=============//

    //===========LOCATION===========//
  
  lat=0;
  lng=0;

//===========END=========//

private from:string;
private to:string;
 today:any;

 measurmentintervalSubscription: Subscription;

 eventintervalSubscription: Subscription;

 alarmintervalSubscription: Subscription;


 

  constructor(private route: ActivatedRoute,public devicesService:DevicesService,
   public alarmService:AlarmService,
   public eventService:EventService,
   public auditRecord:AuditService,
   public deviceControl:DeviceControlService,
   private themeService: NbThemeService,
   private dialogService: NbDialogService,
   private temperatureHumidityService: TemperatureHumidityData,
   private config: AppConfig

    
           
             
              ) {

    
    



   }

   @ViewChild("configurationTxt", { static: true })

   @ViewChild("radialGauge", { static: true })
   public radialGauge: IgxRadialGaugeComponent;
  ngAfterViewInit(): void {
      // enabling animation duration (in milliseconds)
      if(this.radialGauge){
        this.radialGauge.transitionDuration = 500;
        this.AnimateToGauge3();
      }
     
  }
  
 

  public AnimateToGauge4(): void {

    this.radialGauge.height = "330px";
    this.radialGauge.width = "100%";
    this.radialGauge.minimumValue = 0;
    this.radialGauge.maximumValue = 80;
    this.radialGauge.value = 10;
    this.radialGauge.interval = 10;

    // Label Settings
    this.radialGauge.labelExtent = 0.6;
    this.radialGauge.labelInterval = 10;
    this.radialGauge.font = "10px Verdana,Arial";

    // Scale Settings
    this.radialGauge.scaleStartAngle = 150;
    this.radialGauge.scaleEndAngle = 30;
    this.radialGauge.scaleBrush = "#0b8fed";
    this.radialGauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Auto;
    this.radialGauge.scaleSweepDirection = SweepDirection.Clockwise;
    this.radialGauge.scaleEndExtent = 0.825;
    this.radialGauge.scaleStartExtent = 0.775;

    this.radialGauge.minorTickStartExtent = 0.7;
    this.radialGauge.minorTickEndExtent = 0.75;
    this.radialGauge.tickStartExtent = 0.675;
    this.radialGauge.tickEndExtent = 0.75;

    // Backing Settings
    this.radialGauge.backingShape = RadialGaugeBackingShape.Fitted;
    this.radialGauge.backingBrush = "#fcfcfc";
    this.radialGauge.backingOutline = "#d6d6d6";
    this.radialGauge.backingOversweep = 5;
    this.radialGauge.backingCornerRadius = 10;
    this.radialGauge.backingOuterExtent = 0.9;

    // Needle Settings
    this.radialGauge.needleShape = RadialGaugeNeedleShape.NeedleWithBulb;
    this.radialGauge.needlePivotShape = RadialGaugePivotShape.CircleOverlay;
    this.radialGauge.needleEndExtent = 0.5;
    this.radialGauge.needlePointFeatureExtent = 0.3;
    this.radialGauge.needlePivotWidthRatio = 0.2;
    this.radialGauge.needleBrush = "#9f9fa0";
    this.radialGauge.needleOutline = "#9f9fa0";
    this.radialGauge.needlePivotBrush = "#9f9fa0";
    this.radialGauge.needlePivotOutline = "#9f9fa0";

    // TickMark Settings
    this.radialGauge.tickBrush = "rgba(51, 51, 51, 1)";
    this.radialGauge.minorTickBrush = "rgba(73, 73, 73, 1)";
    this.radialGauge.minorTickCount = 6;

    this.radialGauge.ranges.clear();
}

public AnimateToGauge3(): void {

    this.radialGauge.height = "330px";
    this.radialGauge.width = "100%";

    this.radialGauge.minimumValue = 0;
    this.radialGauge.maximumValue = 50;
    this.radialGauge.value = 25;
    this.radialGauge.interval = 5;

    // setting appearance of labels
    this.radialGauge.labelInterval = 5;
    this.radialGauge.labelExtent = 0.71;
    this.radialGauge.font = "10px Verdana,Arial";

    // setting custom needle
    this.radialGauge.isNeedleDraggingEnabled = true;
    this.radialGauge.needleEndExtent = 0.5;
    this.radialGauge.needleShape = RadialGaugeNeedleShape.Triangle;
    this.radialGauge.needleEndWidthRatio = 0.03;
    this.radialGauge.needleStartWidthRatio = 0.05;
    this.radialGauge.needlePivotShape = RadialGaugePivotShape.CircleOverlay;
    this.radialGauge.needlePivotWidthRatio = 0.15;
    this.radialGauge.needleBaseFeatureWidthRatio = 0.15;
    this.radialGauge.needleBrush = "#79797a";
    this.radialGauge.needleOutline = "#79797a";
    this.radialGauge.needlePivotBrush = "#79797a";
    this.radialGauge.needlePivotOutline = "#79797a";

    // setting appearance of major/minor ticks
    this.radialGauge.minorTickCount = 4;
    this.radialGauge.minorTickEndExtent = 0.625;
    this.radialGauge.minorTickStartExtent = 0.6;
    this.radialGauge.minorTickStrokeThickness = 1;
    this.radialGauge.minorTickBrush = "#79797a";
    this.radialGauge.tickStartExtent = 0.6;
    this.radialGauge.tickEndExtent = 0.65;
    this.radialGauge.tickStrokeThickness = 2;
    this.radialGauge.tickBrush = "#79797a";

    // setting extent of gauge scale
    this.radialGauge.scaleStartAngle = 120;
    this.radialGauge.scaleEndAngle = 60;
    this.radialGauge.scaleBrush = "#d6d6d6";
    this.radialGauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Fitted;
    this.radialGauge.scaleSweepDirection = SweepDirection.Clockwise;
    this.radialGauge.scaleEndExtent = 0.57;
    this.radialGauge.scaleStartExtent = 0.5;

    // setting appearance of backing dial
    this.radialGauge.backingBrush = "#fcfcfc";
    this.radialGauge.backingOutline = "#d6d6d6";
    this.radialGauge.backingStrokeThickness = 5;
    this.radialGauge.backingShape = RadialGaugeBackingShape.Circular;

    // setting custom gauge ranges
    const range1 = new IgxRadialGaugeRangeComponent();
    range1.startValue = 5;
    range1.endValue = 15;
    const range2 = new IgxRadialGaugeRangeComponent();
    range2.startValue = 15;
    range2.endValue = 35;
    const range3 = new IgxRadialGaugeRangeComponent();
    range3.startValue = 35;
    range3.endValue = 45;
    this.radialGauge.rangeBrushes  = [ "#F86232", "#DC3F76", "#7446B9"];
    this.radialGauge.rangeOutlines = [ "#F86232", "#DC3F76", "#7446B9"];
    this.radialGauge.ranges.clear();
    this.radialGauge.ranges.add(range1);
    this.radialGauge.ranges.add(range2);
    this.radialGauge.ranges.add(range3);
    // setting extent of all gauge ranges
    for (let i = 0; i < this.radialGauge.ranges.count; i++) {
        const range = this.radialGauge.ranges.item(i);
        range.innerStartExtent = 0.5;
        range.innerEndExtent = 0.5;
        range.outerStartExtent = 0.57;
        range.outerEndExtent = 0.57;
    }
}

public AnimateToGauge2(): void {

    this.radialGauge.height = "330px";
    this.radialGauge.width = "100%";

    this.radialGauge.minimumValue = 100;
    this.radialGauge.maximumValue = 200;
    this.radialGauge.value = 125;

    // Scale Settings
    this.radialGauge.scaleStartAngle = 135;
    this.radialGauge.scaleEndAngle = 45;
    this.radialGauge.scaleBrush = "transparent";
    this.radialGauge.scaleSweepDirection = SweepDirection.Clockwise;

    // Backing Settings
    this.radialGauge.backingOutline = "white";
    this.radialGauge.backingBrush = "white";

    // Needle Settings
    this.radialGauge.needleEndExtent = 0.8;
    this.radialGauge.needleShape = RadialGaugeNeedleShape.Triangle;
    this.radialGauge.needlePivotShape = RadialGaugePivotShape.Circle;
    this.radialGauge.needlePivotWidthRatio = 0.1;
    this.radialGauge.needleBrush = "#79797a";
    this.radialGauge.needleOutline = "#79797a";

    // TickMark Settings
    this.radialGauge.tickBrush = "transparent";
    this.radialGauge.minorTickBrush = "transparent";

    // Label Settings
    this.radialGauge.labelInterval = 100;
    this.radialGauge.labelExtent = 1;
    this.radialGauge.font = "15px Verdana,Arial";

    // setting custom gauge ranges
    const range1 = new IgxRadialGaugeRangeComponent();
    range1.startValue = 100;
    range1.endValue = 150;
    const range2 = new IgxRadialGaugeRangeComponent();
    range2.startValue = 150;
    range2.endValue = 200;

    this.radialGauge.rangeBrushes  = [ "#32f845", "#bf32f8" ];
    this.radialGauge.rangeOutlines = [ "#32f845", "#bf32f8" ];
    this.radialGauge.ranges.clear();
    this.radialGauge.ranges.add(range1);
    this.radialGauge.ranges.add(range2);

    // setting extent of all gauge ranges
    for (let i = 0; i < this.radialGauge.ranges.count; i++) {
        const range = this.radialGauge.ranges.item(i);
        range.innerStartExtent = 0.3;
        range.innerEndExtent = 0.3;
        range.outerStartExtent = 0.9;
        range.outerEndExtent = 0.9;
    }
}

public AnimateToGauge1(): void {

    this.radialGauge.height = "330px";
    this.radialGauge.width = "100%";

    this.radialGauge.minimumValue = 0;
    this.radialGauge.maximumValue = 10;
    this.radialGauge.value = 7.5;

    // Scale Settings
    this.radialGauge.scaleStartAngle = 200;
    this.radialGauge.scaleEndAngle = -20;
    this.radialGauge.scaleBrush = "transparent";
    this.radialGauge.scaleSweepDirection = SweepDirection.Clockwise;

    // Backing Settings
    this.radialGauge.backingOutline = "white";
    this.radialGauge.backingBrush = "white";

    // Needle Settings
    this.radialGauge.needleEndExtent = 0.8;
    this.radialGauge.needleShape = RadialGaugeNeedleShape.Triangle;
    this.radialGauge.needlePivotShape = RadialGaugePivotShape.Circle;
    this.radialGauge.needlePivotWidthRatio = 0.1;
    this.radialGauge.needleBrush = "#79797a";
    this.radialGauge.needleOutline = "#79797a";

    // TickMark Settings
    this.radialGauge.tickBrush = "transparent";
    this.radialGauge.minorTickBrush = "transparent";

    // Label Settings
    this.radialGauge.labelInterval = 10;
    this.radialGauge.labelExtent = 1;
    this.radialGauge.font = "15px Verdana,Arial";

    // setting custom gauge ranges
    const range1 = new IgxRadialGaugeRangeComponent();
    range1.startValue = 0;
    range1.endValue = 5;
    const range2 = new IgxRadialGaugeRangeComponent();
    range2.startValue = 5;
    range2.endValue = 10;

    this.radialGauge.rangeBrushes  = [ "#a4bd29", "#F86232" ];
    this.radialGauge.rangeOutlines = [ "#a4bd29", "#F86232" ];
    this.radialGauge.ranges.clear();
    this.radialGauge.ranges.add(range1);
    this.radialGauge.ranges.add(range2);

    // setting extent of all gauge ranges
    for (let i = 0; i < this.radialGauge.ranges.count; i++) {
        const range = this.radialGauge.ranges.item(i);
        range.innerStartExtent = 0.3;
        range.innerEndExtent = 0.3;
        range.outerStartExtent = 0.9;
        range.outerEndExtent = 0.9;
    }
}

  ngOnInit() {

    

    this.managedObject = new Devices();
    this.managedObject.severity = new Severity();
    this.managedObject.identity = new Identity();
    this.managedObject.measurments = new Measurments();
    this.managedObject.series =  new Series();
    this.managedObject.events = new Events();


    this.themeService.getJsTheme()
    .pipe(takeWhile(() => this.alive))
    .subscribe(theme => {
      this.statusCards = this.statusCardsByThemes[theme.name];
    })


    
    this.sub = this.route.params.subscribe(params => {
      this.Id = params['Id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

// let date = new Date();
// let to = date.toISOString();
// this.to=to;
// date.setDate(date.getDate()-3);
// let from = date.toISOString();
// this.from=from;

this.today = new Date();
this.to=this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate()+'T'+this.today.getHours()+':'+this.today.getMinutes()+':'+this.today.getSeconds()+'%2B05:00';
 
   this.SetAlarms('1970-01-01',this.to,false,10,true,true);

   this.SetEvents('1970-01-01',this.to,50,true,true);

   this.SetDeviceControl('1970-01-01',this.to,100);
//this.auditRecord.GetAuditRecord(this.httpOptions,this.Id,false,true,100);
   

this.GetManagedObjectByDeviceId(this.Id);
this.GetSupportedMeasurmentsByDeviceID(this.Id);
this.GetSupportedSeriesByDeviceID(this.Id);



  this.GetIdentityByDeviceId(this.Id);
  this.GetManagedObjectWithLocFilterByDeviceID(this.Id);


 
  
  }

  GetMeasurmentsByDevice(deviceId,seriesType,aggregation,from,to,pageSize,revert){
   


    this.devicesService.GetMeasurments(deviceId,seriesType,aggregation,from,to,pageSize,revert)
  .subscribe(
    data => { 
   
    

    console.log("data");
    console.log(data);
  let res:any = data;

  this.managedObject.measurments=res;
  
  let series =[];


Object.keys(res.values).forEach(function(key,index) {
let dic = {};
let date = new Date(key);

dic["value"] = [date.toISOString(), res.values[key][0].max];



//toISOString
series.push(dic);

  
});
console.log("series");
console.log(series);



    },
    error => {

    });



  
  }





  


  GetManagedObjectByDeviceId(deviceId){
    this.devicesService.GetManagedObjectByDeviceID(deviceId)
  .subscribe(
    data => { 
  
      

  let res:any = data;

  res.lastUpdated = new Date(res.lastUpdated).toLocaleString();
  if(res.c8y_Availability!=null){
    res.c8y_Availability.lastMessage =  new Date(res.c8y_Availability.lastMessage).toLocaleString();
    
  }
  if(res.c8y_Hardware!=null){
  //  res.c8y_Hardware.creationTime = new Date(res.c8y_Hardware.creationTime).toLocaleString();

  }
  for (const [key, value] of Object.entries(res)) {
    if(!this.managedObject.hasOwnProperty(key)){
      this.managedObject[key] = value;

console.log(value);
    } 
  }

  
  //this.managedObject=res;
  
  
    },
    error => {
   
    });
  }


  GetIdentityByDeviceId(deviceId){
    
    this.devicesService.GetExternalIDByDeviceID(deviceId)
  .subscribe(
    data => { 
   
  //////debugger
  let res:any = data;

  this.managedObject.identity=res;
  // Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
  
  
    },
    error => {
   
    });
  }


  GetManagedObjectWithLocFilterByDeviceID(deviceId){
   
    this.devicesService.GetManagedObjectWithLocFilterByDeviceID(deviceId)
  .subscribe(
    data => { 
   
   
  let res:any = data;
if(res.c8y_Position!=null){
  this.lng=res.c8y_Position.lng;
  this.lat=res.c8y_Position.lat;

}
  //this.identity=res;
  
  
  
    },
    error => {
   
    });

  }







  GetSupportedSeriesByDeviceID(deviceId){
   
    this.devicesService.GetSupportedSeriesByDeviceID(deviceId)
  .subscribe(
    data => { 
   
  //debugger
  let res:any = data;
  var series='';
if(res.c8y_SupportedSeries!=null){
this.managedObject.c8y_SupportedSeries = res.c8y_SupportedSeries;

if(this.managedObject.c8y_SupportedSeries.length>0){

  for(let i=0;i<this.managedObject.c8y_SupportedSeries.length;i++){
    if(i==0){
series=this.managedObject.c8y_SupportedSeries[i];
    }
    else{
      series+='&series='+this.managedObject.c8y_SupportedSeries[i];
    }

  }
}


this.measurmentModel = {device:this.Id,seriesType:series,aggregation:'MINUTELY',from:'2020-09-15T10:00:00%2B05:00',to:this.to,pageSize:1440,revert:true};


this.startReceivingLiveMeasurment();




}
  
  
  
    },
    error => {
   
    });

  }

  
  GetSupportedMeasurmentsByDeviceID(deviceId){
   
    this.devicesService.GetSupportedMeasurementsByDeviceID(deviceId)
  .subscribe(
    data => { 
   
  
  let res:any = data;
if(res.c8y_SupportedMeasurements!=null){
this.managedObject.c8y_SupportedMeasurements = res.c8y_SupportedMeasurements;
this.totalMeasurments = this.managedObject.c8y_SupportedMeasurements.length;

//this.measurmentModel = {httpOptions:this.httpOptions,device:this.Id,seriesType:'c8y_FuelLevel.Level',aggregation:'MINUTELY',from:'2020-09-06T16:09:00%2B05:00',to:'2020-09-07T16:09:00%2B05:00',pageSize:1440,revert:true};


}
  //this.identity=res;
  
  
  
    },
    error => {
   
    });

  }




  
  SetAlarms(from,to,resolved,page,withSourceAsset,withSourceDevices){
//this.startReceivingLiveAlarm(from,resolved,page,withSourceAsset,withSourceDevices);

    let sev = this.managedObject.severity.getSeverities();
    this.totalAlarms=0;
    for(let i  =  0 ;i<sev.length;i++){
      
      this.alarmService.GetAlarmsBySeverity(this.Id,sev[i],from,to,resolved,page,withSourceAsset,withSourceDevices)
      .subscribe(
        data => { 
       
        
      let res:any = data;
    
      let len = res.alarms.length;
this.totalAlarms+=len;
//this.GetAlarmCount(sev[i]);

      if(res.alarms[0]!=null)
      {
        switch(res.alarms[0].severity){
          case 'CRITICAL':
      
       
          
          this.criticalAlarm=res.alarms;
            break;
            case 'MAJOR':
         
              this.majorAlarm=res.alarms;
      
              break;
              case 'MINOR':
       
             this.minorAlarm=res.alarms;
      
                break;
      
                case 'WARNING':
     
                  this.warningAlarm=res.alarms;
      
                  break;
        }
      }
      
      
      
        },
        error => {
       
        });
    }
    
      
    }


    GetAlarmCount(severity,isSev=false){
        //https://invixible.cumulocity.com/alarm/alarms/count?resolved=false&severity=CRITICAL&source=16746655
    

        
      //  this.totalAlarms=0;
        //debugger
    
let url :string;
if(isSev){
  url = `${this.config.apiCumulocityUrl}/alarm/alarms/count?resolved=false&severity='${severity}'&source='${this.Id}'`;

}
else{
  url = `${this.config.apiCumulocityUrl}/alarm/alarms/count?resolved=false&source='${this.Id}'`;

}

          this.alarmService.GetAlarmCount(url)
          .subscribe(
            data => { 
           
            
          let length:any = data;
        
        this.totalAlarms=length;
          
            },
            error => {
           
            });
        
    }


    SetEvents(from,to,page,withSourceAsset,withSourceDevices){

     // this.startReceivingLiveEvents(from,to,page,withSourceAsset,withSourceDevices)
      this.eventService.GetEvents(this.Id, from,to,page,withSourceAsset,withSourceDevices)
      .subscribe(
        data => { 
        
      let res:any = data;

      
    
if(res.events.length>0){

  this.totalEvents = res.events.length;
  this.managedObject.events = res;



}

   
        },
        error => {
       
        });
    }



    startReceivingLiveMeasurment() {


      
      
      var today = new Date();

      var to=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+'%2B05:00';
 
  var endPoint = `${this.config.apiCumulocityUrl}/measurement/measurements?dateFrom=1970-01-01&dateTo=${to}&pageSize=1&revert=true&source='${this.Id}'`;

      if (this.measurmentintervalSubscription) {
        this.measurmentintervalSubscription.unsubscribe();
      }
  
      this.measurmentintervalSubscription = interval(5000)
    
        .pipe(
        
          takeWhile(() => this.alive),
          switchMap(
            
            () => this.devicesService.GetMeasurmentsV3(endPoint)
            
            ),
        )
        .subscribe((measurments: any) => {
      
          this.managedObject.series = measurments;
          today = new Date();

          to=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+'%2B05:00';
     
         endPoint = `${this.config.apiCumulocityUrl}/measurement/measurements?dateFrom=1970-01-01&dateTo=${to}&pageSize=1&revert=true&source='${this.Id}'`;
    
          
        });
    }


  



    startReceivingLiveEvents(from,to,page,withSourceAsset,withSourceDevices) {
      
      var today = new Date();

      var too=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+'%2B05:00';
 
      if (this.eventintervalSubscription) {
        this.eventintervalSubscription.unsubscribe();
      }
  
      this.eventintervalSubscription = interval(5000)
        .pipe(
          takeWhile(() => this.alive),
          switchMap(() => this.eventService.GetEvents(this.Id,from,to,page,withSourceAsset,withSourceDevices)),
        )
        .subscribe((events: any) => {
          
          let res:any = events;

      
    
          if(res.events.length>0){
          
            this.totalEvents = res.events.length;
          
            this.managedObject.events = res;
          
          
          
          }

          today = new Date();

          to=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+'%2B05:00';
     
         
    
          
        });
    }



    


    startReceivingLiveAlarm(from,resolved,page,withSourceAsset,withSourceDevices){
      var today = new Date();

      var to=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+'%2B05:00';
 
      let sev = this.managedObject.severity.getSeverities();
      this.totalAlarms=0;
let sevIndex=0;


      if (this.alarmintervalSubscription) {
        this.alarmintervalSubscription.unsubscribe();
      }
  
      this.alarmintervalSubscription = interval(2000)
        .pipe(
          takeWhile(() => this.alive),
          switchMap(() => this.alarmService.GetAlarmsBySeverity(this.Id,sev[sevIndex],from,to,resolved,page,withSourceAsset,withSourceDevices)),
        )
        .subscribe((alarm: any) => {
          
          let res:any = alarm;
          
          let len = res.alarms.length;
    
          this.GetAlarmCount(sev[sevIndex],false);

          if(res.alarms[0]!=null)
          {
            switch(res.alarms[0].severity){
              case 'CRITICAL':
          
           
              
              this.criticalAlarm=res.alarms;
                break;
                case 'MAJOR':
             
                  this.majorAlarm=res.alarms;
          
                  break;
                  case 'MINOR':
           
                 this.minorAlarm=res.alarms;
          
                    break;
          
                    case 'WARNING':
         
                      this.warningAlarm=res.alarms;
          
                      break;
            }
          }
          
          today = new Date();
  
          to=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+'%2B05:00';
     
          if(sevIndex<sev.length){
            sevIndex++;
          }
          else{
            sevIndex=0;
          }
          
        });

      
    
    }




    SetDeviceControl(dateFrom,dateTo,pageSize){

     
      this.deviceControl.GetOperations(+this.Id,dateFrom,dateTo,pageSize)
      .subscribe(
        data => { 
        
      let res:any = data;

      
    
if(res.operations.length>0){

  this.totalBulkOperations = res.operations.length;

  this.managedObject.controls = res;



}

   
        },
        error => {
       
        });
    }
    loadNext(nxt){

    }
    ngOnDestroy() {
      this.alive = false;
    }


 firstUpper(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

GetMaxPin(item){
  
  let pins = this.GetSeriesByName(item);
  let max=0;

var result = Object.keys(pins).map((key) => [Number(key), pins[key]]);


for(var i = 0;i<result.length;i++){
if(i==0){
max = result[i][1].value;
}
else{
  if(result[i][1].value>max){
    max = result[i][1].value;
      }
}

  
   
   }

  console.log(max);

 

  return max;

}
GetSeriesByName(item){
 // this.SetGauge(item);
  let manageObj:any = this.managedObject;
  if(manageObj.series){
    if(manageObj.series.measurements){
      if(manageObj.series.measurements.length>0){
        let series= manageObj.series.measurements[0][item];
        return series;

      }
    }
  }
  ;
  return {};
}
doesContain(controls:string[],key){
return controls.includes(key);
}
GetPin(pin){
  
  return pin.value.value;
}
convertDate(input:string,format:string){
  let dt:Date;
  switch(format){
case 'iso':
   dt = new Date(input);
  return dt.toISOString();
  break;


  case 'local':
   dt = new Date(input);
  return dt.toLocaleString();
  break;
  }
}





PostConfigurations(value){

  if(!value){
    this.open('Configuration Update', 'Please Input Something');

    return;
  }
   
  this.deviceControl.PostConfigurations(
    {

      "config":value,
      "description": "Configuration update",
      "deviceId": this.Id,

    })
.subscribe(
  data => { 


this.open('Configuration Update', 'Configuration has been successfully updated!');

  },
  error => {
    this.open('Configuration Update','Error updating Configuration!');

  });

}


open(title,text) {
  this.dialogService.open(ShowcaseDialogComponent, {
    context: {
      title: title,
      text: text,

    },
  });
}

}
