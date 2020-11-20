import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  user: User;
  listOfPeople: Array<any> = [];
  listOfTopics: Array<any> = [];

  constructor(
    private http: HttpClient,
  ) { }

  getPeople() {
    return this.http.get<any>('https://node-torvalds.herokuapp.com/people/')
      .pipe(map(data => {
        data.forEach(element => {
          this.listOfPeople.push({ 'id': element._id, 'name': element.name })
        });
        return this.listOfPeople;
      }))
    // .subscribe(
    //   data=>{
    //     console.log("data : " + JSON.stringify(data))
    //     data.forEach(element => {
    //       // console.log(element._id);
    //       // console.log((element.name));

    //       // this.user.id=element._id;
    //       // this.user.username=element.name;
    //       this.listOfPeople.push({'id':element._id,'name':element.name})


    //     });
    //     console.log("listOfPeople : " +this.listOfPeople);
    //     return this.listOfPeople
    //   },
    //   error=>{
    //     console.log("error : " + JSON.stringify(error))
    //   }
    // )
  }

  onFollowPerson(id) {
    console.log("from dashboardService : " + id);

    const postData = { name: id }
    return this.http.post<any>('https://node-torvalds.herokuapp.com/people/follow', postData)
      .subscribe(
        data => {
          console.log("in data");
          console.log("data : " + JSON.stringify(data));
          alert(JSON.stringify(data))
        },
        error => {
          console.log("error : " + error);

        }
      )
  }

  getTopics() {
    return this.http.get<any>('https://node-torvalds.herokuapp.com/topic')
      .pipe(map(data => {
        data.forEach(element => {
          this.listOfTopics.push({ 'id': element._id, 'name': element.name })
        });
        return this.listOfTopics;
      }));
  }
}
