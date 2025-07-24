import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DevicesComponent } from './devices.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { DevicesListComponent } from './devices-list/devices-list.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    children: [
      {
        path: 'device-info/:Id',
        component: DeviceInfoComponent
      },

      {
        path:'devices-list',
        component:DevicesListComponent
      }
     
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DevicesRoutingModule {
}

