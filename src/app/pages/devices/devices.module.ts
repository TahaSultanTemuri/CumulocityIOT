import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbTreeGridModule,
  NbInputModule,
  NbRouteTabsetModule,
  NbAccordionModule,
  NbProgressBarModule,
  NbStepperModule,
  NbCheckboxModule,
  NbDatepickerModule
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { IgxRadialGaugeModule } from 'igniteui-angular-gauges';
import { IgxRadialGaugeComponent } from 'igniteui-angular-gauges';
import { ThemeModule } from '../../@theme/theme.module';
import { DevicesComponent } from './devices.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormsModule as fM} from '../forms/forms.module'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { AgmCoreModule } from '@agm/core';
import { MapsRoutingModule } from '../maps/maps-routing.module';
import { MapsModule } from '../maps/maps.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ECommerceModule } from '../e-commerce/e-commerce.module';

import { AuthGuard } from '../../guards';
import { AuthenticationService } from '../../services/authentication.service';
import { AppConfig } from '../../app.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../helpers/jwt.interceptor';
import { ModalOverlaysRoutingModule } from '../modal-overlays/modal-overlays-routing.module';
import { ModalOverlaysModule } from '../modal-overlays/modal-overlays.module';
import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  imports: [
   
  
    ThemeModule,
    DevicesRoutingModule,

    NbRadioModule,

    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    
    Ng2SmartTableModule,

    NbTabsetModule,
    NbRouteTabsetModule,

    NbAccordionModule,
    NbListModule,
    NgxGaugeModule,



    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhVCiymaAMcsFKLkUQ-pYJW4iK-FCTKqQ',
      libraries: ['places'],
    }),
   
    MapsRoutingModule,
    MapsModule,

    
    

    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    NbSelectModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    ECommerceModule,
    fM,




    
    
    
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbDatepickerModule,
    
    ModalOverlaysModule,




    IgxRadialGaugeModule,
    

  
  ],

  providers: [
   
    AuthGuard,
      

  AuthenticationService,
  AppConfig,

  
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  declarations: [
    
     DevicesComponent,
     
  DeviceInfoComponent,
    
  DevicesListComponent],

})
export class DevicesModule { }
