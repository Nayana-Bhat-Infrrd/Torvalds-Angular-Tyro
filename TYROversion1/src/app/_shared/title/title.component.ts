import { Component, Input, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators,FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() displayMessage: string;
  @Input() displayBookMark: boolean;
 
  
  
  constructor(private fb:FormBuilder) { 
    
  }

 
  ngOnInit(): void {console.log("displayBookMark : " + this.displayBookMark);
    
  }

}
