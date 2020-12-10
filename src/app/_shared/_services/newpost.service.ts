import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NewpostService {
  listOfTopics: Array<any>=[];
  constructor(private http: HttpClient,public toastr:ToastrService){}

  title:string;
  content:string;

  // addContent(title:string,content:string)
  // {
  //   this.title=title;
  //   this.content=content;
  // }


  addPost(title:string,content:string,filteredIds:Array<any>) {
    const postData = { title:title,description:content,topics:filteredIds }
    return this.http.post<any>(`${environment.apiUrl}/posts/add`, postData)
    .subscribe(data=>{
              this.toastr.success('Post Submission',data.message,{
                positionClass:'toast-top-center',
                timeOut:1500,
              })
    })
  }        
  getTopics(){
    return this.http.get<any>(`${environment.apiUrl}/topics`)
    .pipe(map(data=>{
        data.forEach((element)=>{
           this.listOfTopics.push({ 'id': element.id, 'name': element.name });
        });
        return this.listOfTopics;    
    }));
    
  }
}