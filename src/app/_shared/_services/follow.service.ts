import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from '../models/topic';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private currentSubject: BehaviorSubject<any>;
  public current: Observable<any>;
  private reqdType;
  // private currentTopicSubject: BehaviorSubject<any>;
  // public currentTopic: Observable<any>;
  // private currentPersonSubject: BehaviorSubject<any>;
  // public currentPerson: Observable<any>; 

  constructor() {
    this.currentSubject = new BehaviorSubject<any>(null);
    this.current = this.currentSubject.asObservable();
    // this.currentTopicSubject = new BehaviorSubject<any>(null);
    // this.currentTopic = this.currentTopicSubject.asObservable();
    // this.currentPersonSubject = new BehaviorSubject<any>(null);
    // this.currentPerson = this.currentPersonSubject.asObservable();
  }

  public get currentValue(){
    return this.currentSubject.value;
  }

  public get reqdTypeValue(){
    return this.reqdType;
  }

  setValue(list,reqdType){
    this.currentSubject.next(list);
    this.reqdType = reqdType;
    console.log("Required type : " + reqdType);
    console.log("In follow service : " + list);
    console.log("from currentSubject : " + this.currentSubject);
  }

  // public get currentTopicValue(): Topic[] {
  //   return this.currentTopicSubject.value;
  // }

  // setTopics(listOfPeople){
  //   this.currentTopicSubject.next(listOfPeople);
  //   console.log("In follow service : " + listOfPeople);
  //   console.log("from currentPersonSubject : " + this.currentTopicValue);
    
  // }

  // public get currentPeopleValue(): User[] {
  //   return this.currentPersonSubject.value;
  // }

  // setPeople(listOfPeople){
  //   this.currentPersonSubject.next(listOfPeople);
  //   console.log("In follow service : " + listOfPeople);
  //   console.log("from currentPersonSubject : " + this.currentPersonSubject);
    
  // }
}

