import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ReadPostComponent } from './read-post/read-post.component';
import { RouterModule } from '@angular/router';
import { BloggerRoutingModule } from './blogger-routing.module';
import { TrendingPostsComponent } from './dashboard/trending-posts/trending-posts.component';
import { FollowPeopleComponent } from './dashboard/follow-people/follow-people.component';
import { FollowTopicComponent } from './dashboard/follow-topic/follow-topic.component';
import { LatestPostsComponent } from './dashboard/latest-posts/latest-posts.component';
import { SharedModule } from '../_shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent, 
    ProfileComponent,
    BookmarkComponent,
    NewPostComponent,
    ReadPostComponent,
    TrendingPostsComponent,
    FollowPeopleComponent,
    FollowTopicComponent,
    LatestPostsComponent
  ],
  imports: [
    RouterModule,
    BloggerRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports:[
    DashboardComponent
  ]
  
})
export class BloggerModule { }
