import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_shared/_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate ,CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService : AuthenticationService
    ){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   if (localStorage.getItem('currentUser')) {
    return true;
    }
    else{
      this.router.navigate(['/auth/login']);
      return false;
    }  
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('currentUser')) {
    return true;
    }
    else{
      this.router.navigate(['/auth']);
      return false;
    }  
  }
  
}
