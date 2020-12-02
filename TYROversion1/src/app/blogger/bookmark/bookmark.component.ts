import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { BookmarkService } from 'src/app/_shared/_services/bookmark.service';


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  public post;
  public bookmarks;
  public totalBookamrks : number;
  public removedBookmark : boolean=false;
  public postBookmarked;
  
  @Inject(DOCUMENT) private document: Document;
  constructor(
    private bookmarkService : BookmarkService,
    public toastr : ToastrService  
  ) {
  //  this.getBookmarks();
   }

  ngOnInit(): void {
    this.getBookmarks();

  }


  


  getBookmarks(){
    this.bookmarkService.getBookmarks()
    .subscribe(
      data => {
        console.log("Response from getBookmarks : " + JSON.stringify(data));
        this.bookmarks = data.Success;
        console.log("Number : " + this.bookmarks.length);
        this.totalBookamrks = this.bookmarks.length;
      },
      error => {
        console.log("error from getBookmarks : " + JSON.stringify(error));
        
      }
    )
  
  }

  ondeleteBookmark(id){

   
     
    console.log("On delete bookmark : ");
    this.bookmarkService.removeBookmark(this.bookmarks[id]._id).subscribe(
      data => {
        console.log("Response from removeBookmark : " + JSON.stringify(data));
        
      //  alert(JSON.stringify(data));
      this.toastr.success('Post Submission',data.result.message,{
        positionClass:'toast-top-center',
        timeOut:2000,
       })
      window.location.reload();
        
      },
      error => {
        console.log("Error in unlike : " + error);
      }

    )
      
  }
    
}
