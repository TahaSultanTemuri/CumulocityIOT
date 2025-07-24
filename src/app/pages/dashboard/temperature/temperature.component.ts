import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Temperature, TemperatureHumidityData } from '../../../@core/data/temperature-humidity';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy {

  private alive = true;

  temperatureData: Temperature;
  temperature: number;
  temperatureOff = false;
  temperatureMode = 'cool';

  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = 'heat';

  theme: any;
  themeSubscription: any;


  @Input() isHumidity:boolean=true;
  @Input() showRadioGroup:boolean=true;
  @Input() title :string='Tempreture';
  @Input() val :string;
  @Input() name:string='Celsius';

  constructor(private themeService: NbThemeService,
              private temperatureHumidityService: TemperatureHumidityData) {
                let t = this.val;
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.theme = config.variables.temperature;
    });

    forkJoin(
      this.temperatureHumidityService.getTemperatureData(),
      this.temperatureHumidityService.getHumidityData(),
    )
      .subscribe(([temperatureData, humidityData]: [Temperature, Temperature]) => {
        this.temperatureData = temperatureData;
        this.temperature = this.temperatureData.value;

        this.humidityData = humidityData;
        this.humidity = this.humidityData.value;
      });

 
//this.temperature=this.val;
      
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnChanges(changes: any) {
    

    for (let propName in changes) {
      let chng = changes[propName];
      let prop = propName;

      switch(propName){
        case 'isHumidity':
        this.isHumidity=chng.currentValue;
        break;


    

        case 'val':
          this.title=chng.currentValue.key;
          this.temperature=chng.currentValue.value.value;
          this.name=chng.currentValue.value.unit;
          break;

      }

    }
   
  }
 
}
