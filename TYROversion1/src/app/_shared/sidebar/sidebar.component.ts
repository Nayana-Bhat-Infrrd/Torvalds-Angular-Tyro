import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../_services/dashboard.service';
import { FollowService } from '../_services/follow.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  list: Array<any> = [];
  reqdType;

  constructor(
    private followService: FollowService,
    private dashboardService: DashboardService,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.list = this.followService.currentValue;
    console.log("from ngOnInit in sidebarcomp Current Value: " + JSON.stringify(this.list));
    this.reqdType = this.followService.reqdTypeValue;
    console.log("Type from side bar : " + this.reqdType);
  }

  toFollowTopic(id) {
    console.log("Clicked Follow button for id : " + id);
    this.dashboardService.onFollowTopic(this.list[id].id)
    .subscribe(
      data => { console.log("Response from sidebar onTopicFollow : "+JSON.stringify(data))
      this.list[id].isFollowing = true;
     // alert("You are now following : " + this.list[id].name)
      },
      error => {console.log("Error from sidebar onTopicFollow : " + JSON.stringify(error));
      }
    )
    this.toastr.success(this.list[id].name,'You have started following',{
      positionClass:'toast-top-center',
      timeOut:2000,
    })
  }

  toUnfollowTopic(id) {
    console.log(("unfollow topic: " + id));
    console.log("_id : " + JSON.stringify(this.list[id]));
    console.log("_id : " + this.list[id].id);
    
    this.dashboardService.onTopicUnfollow(this.list[id].id)
    .subscribe(
      data => {console.log("Response from sidebar onUnfollowTopic : " + JSON.stringify(data));
      this.list[id].isFollowing = false;
     // alert("You unfollowed : " + this.list[id].name)
      },
      error => {console.log("Error from sidebar onUnFollowTopic : " + JSON.stringify(error));
      }
    )
    this.toastr.warning(this.list[id].name,'You have Unfollowed',{
      positionClass:'toast-top-center',
      timeOut:2000,
    })
  }

  toFollowPeople(id){
    console.log(("follow person: " + id));
    console.log("_id : " + JSON.stringify(this.list[id]));
    console.log("_id : " + this.list[id].id);
    
    this.dashboardService.onFollowPerson(this.list[id].id)
    .subscribe(
      data => {
        console.log("Response from onFollowPerson " + JSON.stringify(data));
        this.list[id].isFollowing = true;
    //    alert("You are now following : " + this.list[id].name)
      },
      error => {
        console.log("error : " + error);

      }
    )
    this.toastr.success(this.list[id].name,'You have started following',{
      positionClass:'toast-top-center',
      timeOut:2000,
    })
  }


  toUnfollowPeople(id){
    console.log(("unfollow topic: " + id));
    console.log("_id : " + JSON.stringify(this.list[id]));
    console.log("_id : " + this.list[id].id);
    
    this.dashboardService.onUnfollowPerson(this.list[id].id)
    .subscribe(
      data => {console.log("Response from onunfollowPerson : " + JSON.stringify(data));
      this.list[id].isFollowing = false;
   //   alert("You unfollowed : " + this.list[id].name)
      },
      error => {console.log("Error from onunfollowPerson : " + JSON.stringify(error));
      }
    )
    this.toastr.warning(this.list[id].name,'You have Unfollowed',{
      positionClass:'toast-top-center',
      timeOut:2000,
    })
  }
}
