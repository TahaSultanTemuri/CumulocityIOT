import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../../@core/mock/devices.service';
import { Devices } from '../../../models/devices';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { interval, merge, of, partition, range } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ngx-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss'],
   providers: [DevicesService]
})
export class DevicesListComponent implements OnInit {

    protected devices:Devices;

  settings = {

    actions: false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Id: {
        title: 'ID',
        type: 'number',
      },
    
      name: {
        title: 'Name',
        type: 'html',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      model: {
        title: 'Model',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      group: {
        title: 'Group',
        type: 'string',
      },
      creationTime: {
        title: 'Created At',
        type: 'string',
      }
    
    },
  };

  source: LocalDataSource = new LocalDataSource();

  public data = [];
  public      httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + sessionStorage.getItem('_tcy8')
    })
  };
  constructor(public devicesService:DevicesService,public router: Router) { 
    this.devices= new Devices();
        this.GetAllDevcies();

      
      }

  ngOnInit() {


   
 
  }
  GetAllDevcies(){
   
    this.devicesService.GetManagedObjects(100,true)
  .subscribe(
    data => { 
   
   
  let res:any = data;
  this.devices=res;

  let dataTable=[];
for(let i = 0 ;i <res.managedObjects.length;i++){
let group='';

if(this.devices.managedObjects[i].additionParents.references.length>0){
group =  this.devices.managedObjects[i].additionParents.references[0].managedObject.name;

}
else if(this.devices.managedObjects[i].assetParents.references.length>0){
group = this.devices.managedObjects[i].assetParents.references[0].managedObject.name;
}

dataTable.push({
   Id: this.devices.managedObjects[i].id,
    name: `<a href='javascript:void(0);'>${this.devices.managedObjects[i].name}</a>`,
    status : this.devices.managedObjects[i].c8y_Connection!=null?this.devices.managedObjects[i].c8y_Connection.status:'',

  //name: this.devices.managedObjects[i].name,
  model: this.devices.managedObjects[i].c8y_Hardware!=null?this.devices.managedObjects[i].c8y_Hardware.model:'',
    type: this.devices.managedObjects[i].type,
    group: group,
creationTime: new Date(this.devices.managedObjects[i].creationTime).toLocaleString()
    
  });
//  dataTable[i].status= dataTable[i].status.toLower()=='disconnected'?'<nb-icon icon="star"></nb-icon>':'<nb-icon icon="wifi"></nb-icon>';

console.log(group);
}
console.log(dataTable);
this.data=dataTable;

this.source.load(this.data);
//this.GetMeasurmentsByDevice(22696197)
  
    },
    error => {
   
    });
  }




  

  onUserRowSelect(row){
   

    this.router.navigate(['/pages/devices/device-info/'+row.data.Id]);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
