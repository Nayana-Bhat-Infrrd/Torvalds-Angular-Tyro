import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { data } from 'jquery';
import { interval } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit, OnChanges {

  public notificationList;
  @Input() displayTitleMessage: string;
  @Input() isDisplayBookMark: boolean;
  @Input() buttonName: string;
  @Input() isDisabledButton: boolean;
  public profilePicture;
  constructor(private dashboardService:DashboardService) {}

  ngOnInit(): void {
    console.log("disableButton : " + this.isDisabledButton);
    // interval(2 * 60 * 1000)
    // .pipe(
    //     flatMap(() => this.dashboardService.getTopics()
    //     // map(()=>{console.log("logging for interval"))
    //     )
    // )
    // .subscribe(data => console.log(data));

    // interval(3000).subscribe(x => {
    //                               // x+1;
    //                               this.dashboardService.getTrending()
    //                               .subscribe(
    //                                 data => {
    //                                   this.notificationList = data ;
    //                                   console.log("topics : " + JSON.stringify(this.notificationList) + "in repeat : " + x);
    //                                 }
    //                               )
                                
    //                             });

    // this.dashboardService.getProfile().subscribe(data=>{
    //         console.log("Profile from title:"+data.profilePictureUrl);
    //         this.profilePicture = data.profilePictureUrl;
    //    },error=>{
    //             console.log("error");
    //    })
  }

  ngOnChanges(changes) {
    console.log("Changes : " + JSON.stringify(changes));

  }

  @Output() childEvent = new EventEmitter();
  on() {
    this.childEvent.emit();
  }
}
