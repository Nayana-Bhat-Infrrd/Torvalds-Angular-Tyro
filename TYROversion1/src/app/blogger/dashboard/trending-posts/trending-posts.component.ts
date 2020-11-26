import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';

@Component({
  selector: 'app-trending-posts',
  templateUrl: './trending-posts.component.html',
  styleUrls: ['./trending-posts.component.css']
})
export class TrendingPostsComponent implements OnInit {
  public trendingPosts: Array<any> = []
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getTrending()
      .subscribe(
        data => {
          // console.log("Trending data: " + data);
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

}
