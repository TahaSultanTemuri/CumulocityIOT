import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import {User} from '../../../models/user'
@Component({
  selector: 'ngx-login-custom',
  templateUrl: './login-custom.component.html',
  styleUrls: ['./login-custom.component.scss'],
  providers: [AuthenticationService]

})
export class NgxLoginCustomComponent extends NbLoginComponent  {
  public form: FormGroup;

  private route: ActivatedRoute;
  public user : User;
    



    
  

  
    constructor( 
      private authenticationService: AuthenticationService, 
      service: NbAuthService, 
      @Inject(NB_AUTH_OPTIONS) options:{},
       cd: ChangeDetectorRef, router: Router) {
      super(service, options, cd, router);
      
   if(sessionStorage.getItem('_tcy8')&&localStorage.getItem('currentUser')){
    this.router.navigate(['/pages/devices/devices-list']);

   }
    }
  

    
  ngOnInit() {

this.user = new User();
  
  }



  login()
  {

console.log(this.user.tenantID);
let email = this.user.email;
let pass = this.user.password;
let tenant = this.user.tenantID;

//let credentials = `${this.user.tenantID}/${this.user.email}:${this.user.password}`;
//const base64Encode = btoa(credentials);
const base64Encode = btoa(`${this.user.email}:${this.user.password}`);
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
   'Authorization': 'Basic ' + base64Encode
  //test
  //'Authorization':'Basic '+ btoa(`${this.user.email}:${this.user.password}`)
  })
};

//Get tenant Info
      this.authenticationService.getTenantInfo(httpOptions)
          .subscribe(
              tenant => {

if(tenant){
//let t:any = tenant;
//   this.user.tenantID= t.name;



          
   
          this.authenticationService.getCurrentUserInfo(httpOptions)
          .subscribe(
              user => {
                
                  if(user){
                   
                    
                    localStorage.setItem('currentUser', JSON.stringify(user));
        
                    sessionStorage._tcy8 = base64Encode;
        
                            
        
        this.router.navigate(['/pages/devices/devices-list']);
        
        
                  }
              },
              error => {
              
            });
        



        
 


  
            
        


                    




          }
      },
      error => {
      
    });


  
}
               
      
         
  

}
