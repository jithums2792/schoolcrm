import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('student') !== null && localStorage.getItem('student') !== undefined || localStorage.getItem('teacher') !== null && localStorage.getItem('teacher') !== undefined) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
      

  }
  
}
