import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      
      if (!(localStorage.getItem('welcomeCompleted')=='true')) {
       
        return this.router.parseUrl('/welcome');
      }
      if (sessionStorage.getItem('currentUser') ) {
       
        return true;
      }
      return this.router.parseUrl('/authentication');
  }
  
}
