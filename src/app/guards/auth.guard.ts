import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  

    const currentUser = this.authenticationService.currentUserValue;
    const session =  sessionStorage.getItem('_tcy8')
  
    if (currentUser && session) {

     

      console.log(currentUser.role);
      console.log(route.data.roles);
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        console.log("not auth");
        return false;
      }

      // authorised so return true
      console.log(" auth");
      
      return true;
      
    }
    else {
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
  }



 
}
