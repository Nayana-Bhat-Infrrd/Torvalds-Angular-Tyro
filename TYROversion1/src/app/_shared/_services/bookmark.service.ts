import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { BehaviorSubject, Observable } from 'rxjs';
//import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  
  constructor(
    private http : HttpClient
  ) {
    
   }

  getPosts(id)
  {
    const postData = { "postId" : id}
    return this.http.post<any>(`${environment.apiUrl}/posts/view`,postData);
  }

  getBookmarks(){
    console.log("In bookmark service : ");
    return this.http.get<any>(`${environment.apiUrl}/posts/bookmarks`)
    
  }

  removeBookmark(id){
    //console.log("Service to unlike : " + id);
    const postData = { "articleId" : id}
    return this.http.post<any>(`${environment.apiUrl}/posts/removeBookmark`,postData);
  }
}
