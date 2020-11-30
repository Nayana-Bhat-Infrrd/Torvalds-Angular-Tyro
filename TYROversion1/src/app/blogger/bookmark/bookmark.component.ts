import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { BookmarkService } from 'src/app/_shared/_services/bookmark.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  public bookmarks;
  public totalBookamrks : number;

  constructor(
    private bookmarkService : BookmarkService
  ) { }

  ngOnInit(): void {
    this.getBookmarks()
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

  ondeleteBookmark(){
    console.log("On delete bookmark : ");
    
  }
}
