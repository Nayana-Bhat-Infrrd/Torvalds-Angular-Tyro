import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  displayMessage:string = "Post";
  displayBookMark:boolean = false;
  showSpinner = false;
  constructor(private bookmarkService : BookmarkService,public toastr : ToastrService){}
  ngOnInit(): void 
  {
    this.getBookmarks();
  }
  getBookmarks()
  { 
    this.showSpinner = true;
    this.bookmarkService.getBookmarks()
    .subscribe(
                data=>
                {
                  this.showSpinner = false;
                  this.bookmarks = data.Success;
                  this.totalBookamrks = this.bookmarks.length;
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
                    this.toastr.success('Post Submission',data.result.message,
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
