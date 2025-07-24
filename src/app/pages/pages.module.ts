import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DevicesComponent } from './devices/devices.component';
import { DevicesModule } from './devices/devices.module';
import { TablesRoutingModule, routedComponents } from './tables/tables-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FsIconComponent } from './tables/tree-grid/tree-grid.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    DevicesModule,
    ECommerceModule,
    MiscellaneousModule,



    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
   

    ...routedComponents,
    FsIconComponent,

    
  ],
})
export class PagesModule {
}
