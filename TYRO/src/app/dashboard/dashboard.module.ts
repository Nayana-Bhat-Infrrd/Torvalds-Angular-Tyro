import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestPostsComponent } from './latest-posts/latest-posts.component';
import { TrendingPostsComponent } from './trending-posts/trending-posts.component';
import { FollowPeopleComponent } from './follow-people/follow-people.component';
import { FollowTopicComponent } from './follow-topic/follow-topic.component';



@NgModule({
  declarations: [LatestPostsComponent, TrendingPostsComponent, FollowPeopleComponent, FollowTopicComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
