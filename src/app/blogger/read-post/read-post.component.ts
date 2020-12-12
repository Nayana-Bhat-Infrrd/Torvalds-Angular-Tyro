import { Component, OnInit } from '@angular/core';
import { read } from 'fs';
import { error } from 'protractor';
import { ReadpostService } from 'src/app/_shared/_services/readpost.service';
import { format, render, cancel, register } from 'timeago.js';

import { ToastrService } from 'ngx-toastr';
import { BookmarkService } from 'src/app/_shared/_services/bookmark.service';
import { ActivatedRoute } from '@angular/router';

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
  displayTitleMessage: string = "Post";
  isDisplayBookMark: boolean = false;
  // displayButton:string = "NEW POST";
  // publishButton:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private readpostService: ReadpostService,
    private bookmarkService: BookmarkService,
    public toastr: ToastrService,
  ) { this.showSpinner = true; }

  ngOnInit(): void {
    console.log("Snapshot url : " + this.route.snapshot.params.postId);
    this.showSpinner = true;
    this.readPost();

  }

  readPost() {
    this.readpostService.readPost(this.route.snapshot.params.postId)
      .subscribe(
        data => {
          this.showSpinner = false;
          console.log("Data from readpost : " + JSON.stringify(data)); this.post = data;
          this.post.timeAgoDate = format(this.post.date);
          this.postLiked = this.post.isLiked;
          this.postBookmarked = this.post.isBookmarked;
          console.log("isBookmarked : " + this.postBookmarked);
          this.likes = this.post.likes;
          console.log("Post : " + JSON.stringify(this.post));

          this.bookmarkService.getProfilePicture(this.post.authorId)
            .subscribe(
              profileData => {
                this.post.profileImageUrl = profileData.profilePictureUrl;
              },
              profileError => {
                console.log("Error from profile picture ; " + JSON.stringify(profileError));
              }
            )

        },
        error => {
          console.log("error from readpost : " + JSON.stringify(error));
        }
      )
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

    this.toastr.success('has been bookmarked', this.post.title, {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    })
  }

  removeBookmark() {
    console.log("To removeBookmarked");
    this.postBookmarked = false;
    this.bookmarkService.removeBookmark(this.post._id)
      .subscribe(
        data => {
          console.log("Response from remove bookmark : " + JSON.stringify(data));
        },
        error => {
          console.log("Error from remove bookmark : " + JSON.stringify(error));
        }

      )

    this.toastr.warning('has been removed from bookmarked', this.post.title, {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    })
  }

  addLike() {
    console.log("Liked the post");
    this.post.isLiked = true;
    this.postLiked = true;
    this.likes = this.likes + 1;
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
    this.toastr.success(this.post.title, 'You liked this post', {
      positionClass: 'toast-top-center',
      timeOut: 2000,
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
    this.toastr.success(this.post.title, 'You unliked this post', {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    })
  }

}
