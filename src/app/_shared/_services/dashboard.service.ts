import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // user: User;
  reloadFeed = new EventEmitter(); 
  subsFeed: Subscription;  

  listOfPeople: Array<any> = [];
  listOfTopics: Array<any> = [];

  listOfFewPeople: Array<any> = [];
  listOfFewTopics: Array<any> = [];

  constructor(
    private http: HttpClient,
  ) { }

  onFeedChange(){
    this.reloadFeed.emit();
  }

 

  getFewPeople(count){
    // this.listOfPeople.length = 0;
    // const returnType = Array<{ 'id':number, 'name': string ,'isFollowing': boolean}>();
    let params = new HttpParams().set("count",count);
    return this.http.get<any>(`${environment.apiUrl}/people`,{params : params})
    .pipe(map(data => {
      console.log("Few people : " + JSON.stringify(data));
      data.forEach(element => {
        
        
        this.listOfFewPeople.push({ 'id': element.id, 'name': element.name ,'isFollowing': element.isFollowing})
      });
      return this.listOfFewPeople;
    }));
  }

  getPeople() {
    // this.listOfPeople.length = 0;
    this.listOfPeople = [] ;
    return this.http.get<any>(`${environment.apiUrl}/people/`)
      .pipe(map(data => {
        data.forEach(element => {
          this.listOfPeople.push({ 'id': element.id, 'name': element.name ,'isFollowing': element.isFollowing })
        });
        return this.listOfPeople;
      }))
  }

  onFollowPerson(id) {
    console.log("from dashboardService : " + id);

    const postData = { name: id }
    return this.http.post<any>(`${environment.apiUrl}/people/follow`, postData)
    
      
  }


 getProfile()
 {
     return this.http.get<any>(`${environment.apiUrl}/profile`);
 }


  onUnfollowPerson(id){
    console.log("from dashboardService : " + id);
    const postData = { id : id}
    return this.http.post(`${environment.apiUrl}/people/unfollow`,postData)
     
  }
  getNotifications(){
  console.log("From notifications from dashboard service");
  return this.http.get<any>(`${environment.apiUrl}/notifications`);
}



  getFewTopics(count){
    let params = new HttpParams().set("count",count);
    return this.http.get<any>(`${environment.apiUrl}/topics`,{params : params})
    .pipe(map(data => {
      data.forEach(element => {
        this.listOfFewTopics.push({ 'id': element.id, 'name': element.name ,'isFollowing': element.isFollowing})
      });
      return this.listOfFewTopics;
    }));
  }


  getTopics() {
    return this.http.get<any>(`${environment.apiUrl}/topics`)
      .pipe(map(data => {
        this.listOfTopics = [] ;
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

  getProfilePicture(id){
    // console.log("In get profile picture");
    let params = new HttpParams().set("id",id);
    return this.http.get<any>(`${environment.apiUrl}/profile/getProfilePicture`,{params : params})
    // .subscribe(
    //   data => {
    //     // console.log("Response from get profile pic : " + JSON.stringify(data));
    //   return data.profilePictureUrl;
    //   },
    //   error => {
    //     // console.log("Error from get profile pic : " + JSON.stringify(error));
    //     return error
    //   }
    // )
  }
}
