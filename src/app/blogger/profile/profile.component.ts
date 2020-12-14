import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/_shared/_services/authentication.service';



declare var $:any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public notificationList;
  public initialNumberOfNotifications;
  returnUrl: string;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log("Logout in dashboard");
    this.authenticationService.logout();
    this.router.navigate([this.returnUrl + "auth/login"]);
  }
  logout(){

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log("Logout in dashboard");
    this.authenticationService.logout();
    this.router.navigate([this.returnUrl + "auth/login"]);
  }
}
