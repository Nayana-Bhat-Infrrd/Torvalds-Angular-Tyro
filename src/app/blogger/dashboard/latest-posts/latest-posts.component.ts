import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

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
  //isNewUser:boolean=false;
  public latestPosts: Array<any> = []
  constructor(
    
    private route : ActivatedRoute,
    private dashboardService: DashboardService,
    private readpostService: ReadpostService,
    private router:Router
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
          console.log(this.latestPosts.length)
          // if(this.latestPosts.length===0)
          // {
          //   this.isNewUser=true;
          // }
          // else
          // {
          //   this.isNewUser=false;
          // }
          this.showSpinner = false;
          console.log("Feed data : " + JSON.stringify(data));
          this.latestPosts = data;
         
          this.latestPosts.forEach(element => {
            element.date = new Date(element.date);
            // console.log("Author id : " + element.author._id + "author name : " + element.author.name);
            this.dashboardService.getProfilePicture(element.author._id)
              .subscribe(
                data => {
                  // console.log("url : " + data + " author id : " + element.author._id);
                  element.author.profilePictureUrl = data.profilePictureUrl;
                },
                error => {
                  console.log("Error from profile pic : " + JSON.stringify(error));
                }
              )
            element.timeAgoDate = format(element.date);

          })
        },
        error => {
          console.log("Error from feed");

        }
      )
  }
  onReadPost(index) {
    console.log("from onReadPost from latest.ts : " + JSON.stringify(this.latestPosts[index]));
    this.router.navigate(['/blogger/readpost', this.latestPosts[index]._id ]);
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
