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
    console.log("IN AuthguardGuard canActivate");
    console.log("localStorage.getItem('currentUser'): " + localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser')) {
    return true;
    }
    else{
      this.router.navigate(['/auth']);
      return false;
    }
  //   if (localStorage.getItem('currentUser')) {
  //     // logged in so return true
  //     return true;
  // }

  // // not logged in so redirect to login page
  // this.router.navigate(['/auth']);
  // return false;


    // const currentUser = this.authenticationService.currentUserValue;
    // if (currentUser) {
    //     // logged in so return true
    //     console.log("From auth Gaurd:  to confirm logged in user : " + currentUser);
        
    //     return true;
    // }
    // // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/auth'])
    // // , { queryParams: { returnUrl: state.url } });
    // return false;
    
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    console.log("IN AuthguardGuard canActivateChild");
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        // logged in so return true
        console.log("From auth Gaurd:  to confirm logged in user : " + currentUser);
        
        return true;
    }
    // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
}
