import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    return this.http.get<any>(`${environment.apiUrl}/people/`)
      .pipe(map(data => {
        data.forEach(element => {
          this.listOfPeople.push({ 'id': element.id, 'name': element.name ,'isFollowing': element.isFollowing })
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
    return this.http.post<any>(`${environment.apiUrl}/people/follow`, postData)
    
      
  }

  onUnfollowPerson(id){
    console.log("from dashboardService : " + id);
    const postData = { id : id}
    return this.http.post(`${environment.apiUrl}/people/unfollow`,postData)
     
  }

  getTopics() {
    return this.http.get<any>(`${environment.apiUrl}/topics`)
      .pipe(map(data => {
        data.forEach(element => {
          this.listOfTopics.push({ 'id': element.id, 'name': element.name ,'isFollowing': element.isFollowing})
        });
        return this.listOfTopics;
      }));
  }

  onFollowTopic(id){
    console.log("from dashboardService onFollowTopic: " + id);
    const postData = { id : id };
    return this.http.post<any>(`${environment.apiUrl}/topics/follow/`,postData)
   
  }

  onTopicUnfollow(id){
    console.log("from dashboardService onTopicUnfollow: " + id);
    const postData = { id : id };
    return this.http.post(`${environment.apiUrl}/topics/unfollow/`,postData)
    
  }

  getFeed(){
    console.log("In feed");
    return this.http.get<any>(`${environment.apiUrl}/feed/`)
    
  }

  getTrending(){
    console.log("In trending");
    return this.http.get<any>(`${environment.apiUrl}/posts/trending`);
    // .subscribe(
    //   data => {console.log("Trending data: " + data);
    //   },
    //   error => {console.log("Error from trending");
    //   }
    // )
    
  }
}
