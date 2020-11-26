import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery'
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';
import { format, render, cancel, register } from 'timeago.js';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {
  
  public latestPosts : Array<any> = []
  constructor(
    private dashboardService : DashboardService,
  ) { }

  ngOnInit(): void {
    
    console.log("In latest Posts");
    this.dashboardService.getFeed()
    .subscribe(
      data => {
        // var oneDay = 24 * 60 * 60 * 1000;
        console.log("Feed data : " +JSON.stringify(data));
        this.latestPosts = data;
        this.latestPosts.forEach(element => {
          element.date = new Date(element.date);    
          // console.log("Format from timeAgo : " + format(element.date));
          element.timeAgoDate = format(element.date);
          
        })
      },
      error=> {
        console.log("Error from feed");
        
      }
    )
    // var p=$('#fos p');
    // var divh=$('#fos').height();
    // while ($(p).outerHeight()>divh) {
    //     $(p).text(function (index, text) {
    //         return text.replace(/\W*\s(\S)*$/, '.....');
    //     });
    // }
    
  }

 
}
