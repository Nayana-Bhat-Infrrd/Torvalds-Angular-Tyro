import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { SidebarComponent } from 'src/app/_shared/sidebar/sidebar.component';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';
import { FollowService } from 'src/app/_shared/_services/follow.service';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-follow-people',
  templateUrl: './follow-people.component.html',
  styleUrls: ['./follow-people.component.css']
})
export class FollowPeopleComponent implements OnInit {
  showSpinner = false;
  listOfPeople: Array<any> = [];
  fewPeople : Array<any> = [];

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private followService: FollowService,
    private dashboardService: DashboardService,

  ) { }

  ngOnInit(): void {
    this.getFewPeople("3")
    this.getPeople();
  }

  getFewPeople(count){
    this.showSpinner = true;
    this.dashboardService.getFewPeople(count)
    .subscribe(
      data => {
        this.showSpinner = false;
        this.fewPeople = data;
        console.log("People data : " + JSON.stringify(this.fewPeople));

      },
      error => {
        console.log("Error : " + error);

      }
    );
  }
  getPeople(){
    // this.showSpinner = true;
    this.dashboardService.getPeople()
      .subscribe(
        data => {
          // this.showSpinner = false
          this.listOfPeople = data;
          console.log("People data : " + JSON.stringify(data));

        },
        error => {
          console.log("Error : " + error);

        }
      );
  }

  onFollowPerson(id) {
    console.log(("follow : " + id));
    console.log("_id : " + this.listOfPeople[id].id);

    this.dashboardService.onFollowPerson(this.listOfPeople[id].id)
      .subscribe(
        data => {
          console.log("Response from onFollowPerson " + JSON.stringify(data));
          alert(JSON.stringify(data))
          this.dashboardService.onFeedChange();
          // this.document.location.reload();
        },
        error => {
          console.log("error : " + error);

        }
      )
  }

  onMorePeople() {
    
    console.log("Call side bar");
    // this.router.navigate(['/blogger/newpost'])
    // this.followService.setPeople(this.listOfPeople)

    this.followService.setValue(this.listOfPeople, "PEOPLE")
    console.log("List of people : " + this.listOfPeople);

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
      this.dashboardService.onFeedChange();
      // this.document.location.reload();
    });

    overlayRef.attach(new ComponentPortal(SidebarComponent, this.viewContainerRef));
  }
}
