import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ReadPostComponent } from './read-post/read-post.component';
import { RouterModule } from '@angular/router';
import { BloggerRoutingModule } from './blogger-routing.module';



@NgModule({
  declarations: [
    DashboardComponent, 
    ProfileComponent,
    BookmarkComponent,
    NewPostComponent,
    ReadPostComponent
  ],
  imports: [
    RouterModule,
    BloggerRoutingModule,
    CommonModule
  ],
  exports:[
    DashboardComponent
  ]
  
})
export class BloggerModule { }
