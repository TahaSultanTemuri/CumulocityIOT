import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from '../authCustom/auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSidebarModule
} from '@nebular/theme';
import { NgxLoginCustomComponent } from '../authCustom/component/login-custom/login-custom.component'; // <---
import { AuthenticationService } from '../services/authentication.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule
   
  ],

  providers: [
   
  AuthenticationService,
  
  ],
  declarations: [
    // ... here goes our new components
   // NgxLoginCustomComponent
  ],
})
export class NgxAuthModule {
}