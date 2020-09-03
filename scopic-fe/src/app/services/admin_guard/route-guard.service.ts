import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot){
    let user = JSON.parse(sessionStorage.getItem('userData'));
    if(user!= null) {
      if(user["role"] == 'ADMIN'){
        return true;
      }
      else {
        this.router.navigate(['/home']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}