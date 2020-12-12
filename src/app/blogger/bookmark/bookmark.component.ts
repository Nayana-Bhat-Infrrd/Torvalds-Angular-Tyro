import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookmarkService } from 'src/app/_shared/_services/bookmark.service';
import { ReadpostService } from 'src/app/_shared/_services/readpost.service';
import { format } from 'timeago.js';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  public post;
  public bookmarks;
  public totalBookamrks : number;
  displayTitleMessage:string = "Post";
  isDisplayBookMark:boolean = false;
  buttonName : string = "New Post";
  public profilePicture;
  showSpinner = false;
  constructor(
    private router : Router,
    private bookmarkService : BookmarkService,
    private readpostService : ReadpostService,
    public toastr : ToastrService){}
  ngOnInit(): void 
  {

    this.getBookmarks();
  }

  onReadPost(index){
    console.log("from onReadPost from bookmark.ts : " + JSON.stringify(this.bookmarks[index]));
    // this.readpostService.setPostValue(this.bookmarks[index]);
    this.router.navigate(['/blogger/readpost', this.bookmarks[index]._id ]);
  }
  getBookmarks()
  { 
    this.showSpinner = true;
    this.bookmarkService.getBookmarks()
    .subscribe(
                data=>
                {
                  this.showSpinner = false;
                  this.bookmarks = data;
                  console.log("Bookmarks data : " + JSON.stringify(data));
                  
                  this.totalBookamrks = this.bookmarks.length;
                  this.bookmarks.forEach(element => {
                    element.timeAgo = format(element.date);
                      this.bookmarkService.getProfilePicture(element.author._id).subscribe(
                        data=>
                        {  
                           
                           element.author.profilePictureUrl = data.profilePictureUrl;
                        },
                        error=>{
                              console.log("error");
                        }
                      )



                  });
                    
                  
                },
                error=> 
                {
                  console.log("error from getBookmarks : " + JSON.stringify(error));
                }
              )
  }






  ondeleteBookmark(id)
  {
      this.bookmarkService.removeBookmark(this.bookmarks[id]._id)
      .subscribe(
                  data=>
                  {
                    this.toastr.success('Bookmark successfully deleted',data.message,
                    {
                      positionClass:'toast-top-center',
                      timeOut:2000,
                    })
                    window.location.reload();
                  },
                  error=> 
                  {
                    console.log("Error on deleting : " + error);
                  }
                )
  }

  


}
