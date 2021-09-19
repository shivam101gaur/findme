import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if (!(sessionStorage.getItem('welcomeCompleted')=='true')) {
       
        return this.router.parseUrl('/welcome');
      }
    if (sessionStorage.getItem('currentUser')) {

      return this.router.parseUrl('/home');
    }
    return true;
  }

}
