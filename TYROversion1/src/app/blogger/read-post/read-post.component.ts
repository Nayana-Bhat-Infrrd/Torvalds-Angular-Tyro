import { Component, OnInit } from '@angular/core';
import { read } from 'fs';
import { error } from 'protractor';
import { ReadpostService } from 'src/app/_shared/_services/readpost.service';
import { format, render, cancel, register } from 'timeago.js';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css']
})
export class ReadPostComponent implements OnInit {
  showSpinner = true;
  public post = null;
  public postLiked;
  public postBookmarked;
  public likes;
  displayMessage: string = "Post";
  displayBookMark: boolean = false;
  // displayButton:string = "NEW POST";
 // publishButton:boolean=false;
  constructor(
    private readpostService: ReadpostService,
    public toastr:ToastrService,
  ) {this.showSpinner = true; }

  ngOnInit(): void {
    // if (this.readpostService.currentPostValue !== null)
    this.showSpinner = true;
    this.readPost();
    // if(this.readpostService.subsRead == undefined){
    //   this.readpostService.subsRead = this.readpostService.loadRead.subscribe(() =>{
    //     this.readPost();
      // })
    // }
  }

  readPost() {
    this.showSpinner = true;
    console.log("from readpost.ts : " + JSON.stringify(this.readpostService.currentPostValue));
    this.readpostService.currentPostValue.subscribe(
      data => {
        this.showSpinner = false;
        console.log("from readpost.ts : " + JSON.stringify(data));
        this.post = data;
        this.post.timeAgoDate = format(this.post.date);
        this.postLiked = this.post.isLiked;
        this.postBookmarked = this.post.isBookmarked;
        this.likes = this.post.likes;
        console.log("Post : " + JSON.stringify(this.post));
        
      }
    );

  }

  addBookmark() {
    console.log("Bookmared");
    this.postBookmarked = true;
    this.readpostService.addBookmark(this.post._id)
      .subscribe(
        data => {
          console.log("Reponse from addBookmark : " + JSON.stringify(data));
          // alert("bookmark added")
        },
        error => {
          console.log("Error from addBookmark : " + JSON.stringify(error));

        }
      )

      this.toastr.success(this.post.title,'has been bookmarked',{
        positionClass:'toast-top-center',
        timeOut:2000,
      })
  }

  addLike() {
    console.log("Liked the post");
    this.post.isLiked = true;
    this.postLiked = true;
    this.likes = this.likes+1;
    this.readpostService.addLike(this.post._id)
      .subscribe(
        data => {
          console.log("Response from like : " + JSON.stringify(data));
          // alert("You Liked this post");
        },
        error => {
          console.log("Error in liking : " + error);
        }
      )
      this.toastr.success(this.post.title,'You liked this post',{
        positionClass:'toast-top-center',
        timeOut:2000,
      })
  }

  unLike() {
    console.log("In unlike post");
    this.post.isLiked = true;
    this.postLiked = false;
    this.likes = this.likes - 1;
    this.readpostService.unLike(this.post._id)
      .subscribe(
        data => {
          console.log("Response from unlike : " + JSON.stringify(data));
          // alert("you unliked this post");
        },
        error => {
          console.log("Error in unlike : " + error);
        }
      )
      this.toastr.success(this.post.title,'You unliked this post',{
        positionClass:'toast-top-center',
        timeOut:2000,
      })
  }

}
