import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
console.log("intersepting");

        // add authorization header with jwt token if available
                    let authorizationData = 'Basic ' + sessionStorage.getItem('_tcy8');

                    const currentUser = this.authenticationService.currentUserValue;
                    const session =  sessionStorage.getItem('_tcy8')


    console.log("intersepting with " + currentUser);
        if (currentUser && session) {
            request = request.clone({
                setHeaders: { 
                    'Content-Type':  'application/json',
                    'Authorization': 'Basic ' + sessionStorage.getItem('_tcy8')


                },
             //   withCredentials: true
            });
        }
       

        return next.handle(request);
    }
}
