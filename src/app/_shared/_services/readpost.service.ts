import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadpostService {
  constructor(
    private http : HttpClient
  ) {}


  readPost(id){
    console.log("In readpost method in readpostservice : " + id);
    let params = new HttpParams().set("postId",id);
    return this.http.get<any>(`${environment.apiUrl}/posts/view`,{params : params})
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
