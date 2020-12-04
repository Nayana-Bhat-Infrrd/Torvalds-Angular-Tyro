import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';
import { ReadpostService } from 'src/app/_shared/_services/readpost.service';

@Component({
  selector: 'app-trending-posts',
  templateUrl: './trending-posts.component.html',
  styleUrls: ['./trending-posts.component.css']
})
export class TrendingPostsComponent implements OnInit {
  public trendingPosts: Array<any> = [];
  showSpinner = false;

  constructor(
    private dashboardService: DashboardService,
    private readpostService: ReadpostService
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.dashboardService.getTrending()
      .subscribe(
        data => {
          // console.log("Trending data: " + data);
          this.showSpinner = false;
          this.trendingPosts = data;
          this.trendingPosts.forEach(element => {
            element.date = new Date(element.date);
          });

        },
        error => {
          console.log("Error from trending");
        }
      )

  }

  onReadPost(index){
    console.log("In onReadPost from comp.ts : " + JSON.stringify(this.trendingPosts[index]));
    this.readpostService.setPostValue(this.trendingPosts[index]);

  }
}
