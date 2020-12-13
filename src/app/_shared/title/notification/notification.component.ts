import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';
import { format } from 'timeago.js';

declare var $:any;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isShowDropdown:boolean=true;
  initialNumberOfNotifications:any;
  notificationList:any;
  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getNotifications().subscribe(
      data => {
        
     
        this.notificationList = data;
        this.notificationList.forEach(element => {
            element.timeAgo = format(element.createdOn)
        });
       
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
            this.notificationList.forEach(element => {
              element.timeAgo = format(element.createdOn)
          });
            console.log("notification : " + JSON.stringify(this.notificationList) + "in repeat : " + x);
          }
        )
    });
  }
  
  showNotificationArrow()
  {
    $("#notificaitonArrow").css("display","flex")
    this.isShowDropdown=false;
  }
  hideNotificationArrow()
  {
    $("#notificaitonArrow").css("display","none")
    this.isShowDropdown=true;
  }

}