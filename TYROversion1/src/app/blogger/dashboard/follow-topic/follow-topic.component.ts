import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { Topic } from 'src/app/_shared/models/topic';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';
import { FollowService } from 'src/app/_shared/_services/follow.service';


import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SidebarComponent } from 'src/app/_shared/sidebar/sidebar.component';
import { ViewContainerRef } from '@angular/core';

  
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
// import {
//   Overlay,
//   // OverlayOrigin,
//   OverlayConfig,
//   OverlayRef
// } from "@angular/cdk/overlay";

@Component({
  selector: 'app-follow-topic',
  templateUrl: './follow-topic.component.html',
  styleUrls: ['./follow-topic.component.css']
})
export class FollowTopicComponent implements OnInit {
  istitle : boolean = true;
  moreTopics: boolean = false;
  listOfTopics: Array<Topic> = [];
  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private followService: FollowService,
    public toastr:ToastrService,
    @Inject(DOCUMENT) private document: Document
    
  ) { }

  ngOnInit(): void {
    this.dashboardService.getTopics()
      .subscribe(
        data => {
          // console.log("Topics from ngOnInit in .ts : " + JSON.stringify(data));
          this.listOfTopics = data;
        },
        error => {
          console.log("error : " + error);

        }
      )
  }


  onTopicFollow(id){
    console.log(("follow : " + id));
    console.log("_id : " + JSON.stringify(this.listOfTopics[id]));
    console.log("_id : " + this.listOfTopics[id].id);
    
    this.dashboardService.onFollowTopic(this.listOfTopics[id].id)
    .subscribe(
      data => { console.log("Response from onTopicFollow : "+JSON.stringify(data))
      this.listOfTopics[id].isFollowing = true;
     // alert("You are now following : " + this.listOfTopics[id].name)
      
      this.document.location.reload();
      },
      error => {console.log("Error from onTopicFollow : " + JSON.stringify(error));
      }
    )
    this.toastr.success(this.listOfTopics[id].name,'You are following',{
      positionClass:'toast-top-center',
      timeOut:2000,
    })
  }

  onTopicUnfollow(id){
    console.log(("follow : " + id));
    console.log("_id : " + JSON.stringify(this.listOfTopics[id]));
    console.log("_id : " + this.listOfTopics[id].id);
    
    this.dashboardService.onTopicUnfollow(this.listOfTopics[id].id)
    .subscribe(
      data => {console.log("Response from onUnfollowTopic : " + JSON.stringify(data));
      this.listOfTopics[id].isFollowing = false;
      //alert("You unfollowed : " + this.listOfTopics[id].name)
      this.document.location.reload();
      },
      error => {console.log("Error from onUnFollowTopic : " + JSON.stringify(error));
      }
    )
    this.toastr.warning(this.listOfTopics[id].name,'You Unfollowed',{
      positionClass:'toast-top-center',
      timeOut:2000,
    })
  }


  onMoreTopics() {
    this.istitle = false;
    this.moreTopics = true;
    // console.log("in onMoreTopics : " + this.moreTopics);
    // this.followService.setTopics(this.listOfTopics);
    this.followService.setValue(this.listOfTopics,"TOPICS");
    // const overlayRef = this.overlay.create();
    // const userProfilePortal = new ComponentPortal(SidebarComponent);
    // overlayRef.attach(userProfilePortal);
    
    let config = new OverlayConfig();
    config.scrollStrategy = this.overlay.scrollStrategies.block();
    config.positionStrategy = this.overlay
      .position()
      .global()
      .right();
      
    config.hasBackdrop = true;
    // config.backdropClass = "cdk-overlay-transparent-backdrop";
    let overlayRef = this.overlay.create(config);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
      this.document.location.reload();
    });

    overlayRef.attach(new ComponentPortal(SidebarComponent, this.viewContainerRef));
  }

}
