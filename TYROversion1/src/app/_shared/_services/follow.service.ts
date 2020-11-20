import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private currentTopicSubject: BehaviorSubject<any>;
  public currentTopic: Observable<any>; 

  constructor() {
    this.currentTopicSubject = new BehaviorSubject<any>(null);
    this.currentTopic = this.currentTopicSubject.asObservable();
  }

  public get currentTopicValue(): Topic[] {
    return this.currentTopicSubject.value;
  }

  setTopics(listOfTopics){
    this.currentTopicSubject.next(listOfTopics);
    console.log("In follow service : " + listOfTopics);
    console.log("from currentTopicvalue : " + this.currentTopicValue);
    
  }
}

