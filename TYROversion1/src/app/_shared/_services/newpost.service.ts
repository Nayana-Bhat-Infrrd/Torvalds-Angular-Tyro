import { Injectable } from '@angular/core';
// import { NewPost } from '../models/newpost';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
//import { Topic } from '../models/topic';
import { map } from 'rxjs/operators';
//import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NewpostService {
  listOfTopics: Array<any>=[];
  // private currentTopicSubject: BehaviorSubject<any>;
  // public currentTopic: Observable<any>; 

  
 

  constructor(private http: HttpClient,
    public toastr:ToastrService) {   
    // this.currentTopicSubject = new BehaviorSubject<any>(null);
    // this.currentTopic = this.currentTopicSubject.asObservable(); 
  }
  
  
  addPost(title:string,content:string,filteredIds:Array<any>) {
//console.log("from dashboardService : " + id);

    const postData = { title:title,description:content,topics:filteredIds }
    return this.http.post<any>(`${environment.apiUrl}/posts/add`, postData)
      .subscribe(
        data => {
          console.log("in data");
          console.log("data : " + JSON.stringify(data));
        //  alert(JSON.stringify(data.result.message));
         this.toastr.success('Post Submission',data.result.message,{
          positionClass:'toast-top-center',
          timeOut:1500,
         })
        },
        error => {
          console.log("error : " + error);

        }
        
      )
      
}        
      

  
       
  
  getTopics() {
    return this.http.get<any>(`${environment.apiUrl}/topics`)
      .pipe(map(data => {
        data.result.forEach((element)  => {
           this.listOfTopics.push({ 'id': element.id, 'name': element.name });
        });
         return this.listOfTopics;
      }));
  }

  
}

