import { Component, OnInit } from '@angular/core';
import { read } from 'fs';
import { ReadpostService } from 'src/app/_shared/_services/readpost.service';
import { format, render, cancel, register } from 'timeago.js';

@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css']
})
export class ReadPostComponent implements OnInit {

  public post;

  constructor(
    private readpostService : ReadpostService
  ) { }

  ngOnInit(): void {
    console.log("from readpost.ts : " + JSON.stringify(this.readpostService.currentPostValue));
    this.post = this.readpostService.currentPostValue;
    this.post.timeAgoDate = format(this.post.date);
    // console.log("Time ago :" + this.post.timeAgoDate);
    
  }

}
