import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadpostService {
  private currentPostSubject: BehaviorSubject<any>;
  public currentPost: Observable<any>;
  constructor() { 
    this.currentPostSubject = new BehaviorSubject<any>(null);
    this.currentPost = this.currentPostSubject.asObservable();
  }

  public get currentPostValue(){
    return this.currentPostSubject.value;
  }

  public setPostValue(post){
    this.currentPostSubject.next(post);
    console.log("Post from read service : " + post);
    
  }
}
