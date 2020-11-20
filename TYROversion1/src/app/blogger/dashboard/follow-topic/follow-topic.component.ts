import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';

@Component({
  selector: 'app-follow-topic',
  templateUrl: './follow-topic.component.html',
  styleUrls: ['./follow-topic.component.css']
})
export class FollowTopicComponent implements OnInit {
  moreTopics : boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getTopics()
    .subscribe(
      data=>{
        console.log("Topics : " + data);
      },
      error=>{
        console.log("error : " + error);
        
      }
    )
  }

  onMoreTopics(){
    this.moreTopics = true;
    console.log("in onMoreTopics : " + this.moreTopics);
    
  }

}
