import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';
import { ReadpostService } from 'src/app/_shared/_services/readpost.service';
import { format, render, cancel, register } from 'timeago.js';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {
  showSpinner = false;
  public latestPosts: Array<any> = []
  constructor(
    private dashboardService: DashboardService,
    private readpostService : ReadpostService
  ) { }

  ngOnInit(): void {
    this.getFeed();
    if (this.dashboardService.subsFeed == undefined) {
      this.dashboardService.subsFeed = this.dashboardService.reloadFeed.subscribe(() => {
        this.getFeed();
      });
    }
  }

  getFeed() {
    this.showSpinner = true;
    console.log("In latest Posts");
    this.dashboardService.getFeed()
      .subscribe(
        data => {
          // var oneDay = 24 * 60 * 60 * 1000;
          this.showSpinner = false;
          console.log("Feed data : " + JSON.stringify(data));
          this.latestPosts = data;
          this.latestPosts.forEach(element => {
            element.date = new Date(element.date);
            // console.log("Format from timeAgo : " + format(element.date));
            element.timeAgoDate = format(element.date);

          })
        },
        error => {
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
  onReadPost(index){
    console.log("from onReadPost from latest.ts : " + JSON.stringify(this.latestPosts[index]));
    this.readpostService.setPostValue(this.latestPosts[index])
    // this.readpostService.onLoadingRead();
    // this.readpostService.readPost(this.latestPosts[index]._id);
    // .subscribe(
    //   data => {console.log("Data from read post : " + JSON.stringify(data));
    //     this.readpostService.setPostValue(data);
    //   },
    //   error => {console.log("Error from read post : " + error);
    //   }
    // )
  }

}
