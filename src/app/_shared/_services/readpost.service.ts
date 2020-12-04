import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { error } from 'protractor';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadpostService {
     
  // loadRead = new EventEmitter(); 
  // subsRead: Subscription;

  private currentPostSubject: BehaviorSubject<any>;
  public currentPost: Observable<any>;
  constructor(
    private http : HttpClient
  ) { 
    this.currentPostSubject = new BehaviorSubject<any>(null);
    this.currentPost = this.currentPostSubject.asObservable();
  }
  // onLoadingRead(){
  //   this.loadRead.emit();
  // }
  
  public get currentPostValue(){
    const postData = {"postId" : this.currentPostSubject.value._id}
    return this.http.post<any>(`${environment.apiUrl}/posts/view`,postData);
  }

  public setPostValue(post){
    this.currentPostSubject.next(post);
    console.log("Post from read service : " + JSON.stringify(post));
    
  }

  readPost(id){
    const postData = { "postId" : id }
    this.http.post<any>(`${environment.apiUrl}/posts/view`,postData)
      .subscribe(
        data => {
          this.setPostValue(data)
        },
        error => {console.log("error from read post : " + error);
        }
      )
    
  }


  addBookmark(id){
    console.log("In service bookmark : " + id);
    const postData = { "articleId" :id};
    return this.http.post<any>(`${environment.apiUrl}/posts/addBookmark`,postData)
  }

  addLike(id){
    console.log(("In service for like : " + id));
    const postData = {"postId" : id };
    return this.http.post<any>(`${environment.apiUrl}/posts/like`,postData);
  }

  unLike(id){
    console.log("Inservice to unlike : " + id);
    const postData = { "postId" : id}
    return this.http.post<any>(`${environment.apiUrl}/posts/unlike`,postData);
  }
}
