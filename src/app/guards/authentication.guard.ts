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

    if (sessionStorage.getItem('currentUser')) {

      if (JSON.parse(sessionStorage.getItem('currentUser')).name == 'admin') {
        return this.router.parseUrl('/admin');
      }
      return this.router.parseUrl('/home');
    }
    return true;
  }

}
