import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { DashboardService } from 'src/app/_shared/_services/dashboard.service';

@Component({
  selector: 'app-follow-people',
  templateUrl: './follow-people.component.html',
  styleUrls: ['./follow-people.component.css']
})
export class FollowPeopleComponent implements OnInit {
  listOfPeople: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getPeople()
      .subscribe(
        data => {
          this.listOfPeople = data;
          console.log("data data : " + data);

        },
        error => {
          console.log("Error : " + error);

        }
      );

    console.log("Data from ts : " + this.listOfPeople);


  }

  onFollowPerson(id){
    console.log(("follow : " + id));
    console.log("_id : " + this.listOfPeople[id].id);
    
    this.dashboardService.onFollowPerson(this.listOfPeople[id].id);
  }

  callSidebar(){
    console.log("Call side bar");
    this.router.navigate(['/blogger/newpost'])
  }
}
