import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FollowPeopleComponent } from './dashboard/follow-people/follow-people.component';
import { FollowTopicComponent } from './dashboard/follow-topic/follow-topic.component';
import { LatestPostsComponent } from './dashboard/latest-posts/latest-posts.component';
import { TrendingPostsComponent } from './dashboard/trending-posts/trending-posts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ProfileComponent } from './profile/profile.component';
import { ReadPostComponent } from './read-post/read-post.component';

const routes: Routes = [

    { 
      path: '', component: DashboardComponent,
      children:[
        { path:'followpeople' , component: FollowPeopleComponent},
        { path:'followtopic', component: FollowTopicComponent},
        { path:'latestposts', component: LatestPostsComponent},
        { path:'trendingposts', component: TrendingPostsComponent}
      ]
    },
    { 
      path: 'bookmark', component: BookmarkComponent 
    },
    { 
      path: 'newpost', component: NewPostComponent 
    },
    { 
      path: 'readpost', component: ReadPostComponent 
    },
    { 
      path: 'profile', component: ProfileComponent 
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloggerRoutingModule{

}