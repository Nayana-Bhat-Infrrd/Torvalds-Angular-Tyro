import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private currentTopicSubject: BehaviorSubject<Topic>;
  public currentTopic: Observable<Topic>; 

  constructor() {}
}

