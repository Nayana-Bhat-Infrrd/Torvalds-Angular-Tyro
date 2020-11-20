import { Component, OnInit } from '@angular/core';
import { Topic } from '../models/topic';
import { FollowService } from '../_services/follow.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  listOfTopics : Array<Topic> = [];
  constructor(
    private followService : FollowService
  ) { }

  ngOnInit(): void {
    this.listOfTopics = this.followService.currentTopicValue;
    console.log("from ngOnInit in sidebarcomp : " + this.listOfTopics);
    
  }

}
