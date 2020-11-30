import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(
    private http : HttpClient
  ) { }

  getBookmarks(){
    console.log("In bookmark service : ");
    return this.http.get<any>('https://node-torvalds.herokuapp.com/posts/bookmarks')
    
  }
}
