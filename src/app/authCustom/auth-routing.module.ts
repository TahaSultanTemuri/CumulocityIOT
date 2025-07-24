import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { NgxLoginCustomComponent } from '../authCustom/component/login-custom/login-custom.component'; // <---

export const routes: Routes = [

      {
      path: 'authCustom',
      loadChildren: '../authCustom/auth.module#NgxAuthModule',
    },

     {
        path: '',
        component: NbAuthComponent,  
      },

    {
        path: '',
        component: NbAuthComponent,
        children: [
          {
            path: 'login',
            component: NgxLoginCustomComponent, // <---
          },
        ],
      },
    // .. some other app routs
    // {
    //   path: 'authCustom',
    //   loadChildren: '../authCustom/auth.module#NgxAuthModule',
    // },
    // {
    //     path: '',
    //     component: NbAuthComponent,  
    //   },

    //   {
    //     path: 'login',
    //     component: NgxLoginCustomComponent,  
    //   },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}