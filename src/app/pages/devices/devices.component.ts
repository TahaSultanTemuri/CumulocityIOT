import { Component, OnInit } from '@angular/core';
import { Devices } from '../../models/devices';
import { HttpHeaders } from '@angular/common/http';
import { DevicesService } from '../../@core/mock/devices.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-devices',
  // templateUrl: './devices.component.html',
  // styleUrls: ['./devices.component.scss'],
  
  template: `
  <router-outlet></router-outlet>
`,
})
export class DevicesComponent
 //implements OnInit
  {
}
