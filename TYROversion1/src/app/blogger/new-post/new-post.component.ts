import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  on()
    {
      $("#overlay").css("display","block");
    }
    off()
    {  
      $("#overlay").css("display","none");
    }

}
