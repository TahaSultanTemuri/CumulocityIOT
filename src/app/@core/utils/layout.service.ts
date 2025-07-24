import { Injectable, ɵConsole } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LayoutService {
constructor(private router: Router){
  
}
  protected layoutSize$ = new Subject();

  changeLayoutSize() {
    this.layoutSize$.next();
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSize$.pipe(
      share(),
      delay(1),
    );
  }

  logout(){

    
    localStorage.removeItem('currentUser');
    
    sessionStorage.removeItem('_tcy8')

    this.router.navigate(['/auth/login']);
  }
}
