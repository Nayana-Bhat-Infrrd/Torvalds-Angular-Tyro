import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthenticationService } from 'src/app/_shared/_services/authentication.service';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';

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
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getNotifications()
    .subscribe(
      data => {
        this.notificationList = data;
        this.initialNumberOfNotifications = data.length;
        console.log("initial notification : " + JSON.stringify(this.notificationList) + "initialNumberOfNotifications : " + this.initialNumberOfNotifications);
      }
    )
    this.listenToNotification();

  }

  listenToNotification(){
    interval(10000).subscribe(x => {
      // x+1;
      this.dashboardService.getNotifications()
        .subscribe(
          data => {
            this.notificationList = data;
            console.log("notification : " + JSON.stringify(this.notificationList) + "in repeat : " + x);
          }
        )

    });
  }


  logout() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log("Logout in dashboard");
    this.authenticationService.logout();
    this.router.navigate([this.returnUrl + "auth/login"]);
  }
}
