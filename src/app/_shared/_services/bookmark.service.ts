import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  
  constructor(
    private http : HttpClient
  ) {}

  getPosts(id){
    const postData = { "postId" : id}
    return this.http.post<any>(`${environment.apiUrl}/posts/view`,postData);
  }

  getBookmarks(){
    console.log("In bookmark service : ");
    return this.http.get<any>(`${environment.apiUrl}/posts/bookmarks`)
  }

  removeBookmark(id){
    const postData = { "articleId" : id}
    return this.http.post<any>(`${environment.apiUrl}/posts/removeBookmark`,postData);
  }

  getProfilePicture(id)  {
    let params = new HttpParams().set("id",id);
    return this.http.get<any>(`${environment.apiUrl}/profile/getProfilePicture`,{params:params});
  }

}
