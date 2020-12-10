import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { data } from 'jquery';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit, OnChanges {
  @Input() displayTitleMessage: string;
  @Input() isDisplayBookMark: boolean;
  @Input() buttonName: string;
  @Input() isDisabledButton: boolean;
  public profilePicture;
  constructor(private dashboardService:DashboardService) {}

  ngOnInit(): void {
    console.log("disableButton : " + this.isDisabledButton);
    this.dashboardService.getProfile().subscribe(data=>{
            console.log("Profile from title:"+data.profilePictureUrl);
            this.profilePicture = data.profilePictureUrl;
       },error=>{
                console.log("error");
       })
  }

  ngOnChanges(changes) {
    console.log("Changes : " + JSON.stringify(changes));

  }

  @Output() childEvent = new EventEmitter();
  on() {
    this.childEvent.emit();
  }
}
