import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { SidebarComponent } from 'src/app/_shared/sidebar/sidebar.component';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';
import { FollowService } from 'src/app/_shared/_services/follow.service';

import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-follow-people',
  templateUrl: './follow-people.component.html',
  styleUrls: ['./follow-people.component.css']
})
export class FollowPeopleComponent implements OnInit {
  listOfPeople: Array<any> = [];
  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private followService: FollowService,
    private dashboardService: DashboardService,
    public toastr:ToastrService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.dashboardService.getPeople()
      .subscribe(
        data => {
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
        //  console.log("Response from onFollowPerson " + JSON.stringify(data));
         
          this.document.location.reload();
        },
        error => {
          console.log("error : " + error);

        }
      )
      this.toastr.success(this.listOfPeople[id].name,'You are following',{
        positionClass:'toast-top-center',
        timeOut:2000,
      })
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
      this.document.location.reload();
    });

    overlayRef.attach(new ComponentPortal(SidebarComponent, this.viewContainerRef));
  }
}
