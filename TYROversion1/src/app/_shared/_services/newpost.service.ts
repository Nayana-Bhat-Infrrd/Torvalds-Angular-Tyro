import { Injectable } from '@angular/core';
// import { NewPost } from '../models/newpost';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { Topic } from '../models/topic';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewpostService {
  listOfTopics: Array<any>=[];
  private currentTopicSubject: BehaviorSubject<any>;
  public currentTopic: Observable<any>; 

  
 

  constructor(private http: HttpClient) {   
    this.currentTopicSubject = new BehaviorSubject<any>(null);
    this.currentTopic = this.currentTopicSubject.asObservable(); 
  }
  
  
  addPost(title:string,content:string,filteredIds:Array<any>) {
//console.log("from dashboardService : " + id);

    const postData = { title:title,description:content,topics:filteredIds }
    return this.http.post<any>(`${environment.apiUrl}/posts/add`, postData)
      .subscribe(
        data => {
          console.log("in data");
          console.log("data : " + JSON.stringify(data));
         // alert(JSON.stringify(data))
        },
        error => {
          console.log("error : " + error);

        }
      )
  }
  getTopics() {
    return this.http.get<any>(`${environment.apiUrl}/topics`)
      .pipe(map(data => {
        data.forEach((element)  => {
           this.listOfTopics.push({ 'id': element.id, 'name': element.name });
        });
         return this.listOfTopics;
      }));
  }

  
}

