import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { AppConfig } from '../app.config';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private config: AppConfig, private router: Router) {
  
    
  }

  public get currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    if (this.currentUserSubject.value != null) {

      console.log(this.currentUserSubject);
      return this.currentUserSubject.value;
    }
    return null;
  }

  login( username: string, password: string) {
 
 
    return this.http.post<any>(this.config.apiUrl+"/users/authenticate", { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }





  getTenantInfo(httpOption:any) {
 

   
 
    return this.http.get<any>(this.config.apiCumulocityUrl+"/tenant/currentTenant",httpOption)
      .pipe(map(tenant => {
      
        return tenant;
      }));
  }



  getCurrentUserInfo(httpOption:any) {
   
 
    return this.http.get<any>(this.config.apiCumulocityUrl+"/user/currentUser",httpOption)
      .pipe(map(user => {
       
        return user;
      }));
  }


  Oauth(httpOptions:any,tenantID:string)  {
    return this.http.post(this.config.apiCumulocityUrl + "/tenant/oauth?tenant_id="+tenantID,httpOptions);
    }

    logout() {
      // remove user from local storage to log user out
      console.log("remove");
     localStorage.removeItem('currentUser');
     sessionStorage.clear();

      if (this.currentUserSubject) {
        this.currentUserSubject.next(null);
      }
         
      this.router.navigate(['/auth/login']);
      return false;
    }


}
