import { NewpostService } from 'src/app/_shared/_services/newpost.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  
  displayTitleMessage: string = "New Post";
  isDisplayBookMark: boolean = false;
  buttonName: string = "Publish";
  isDisabledButton: boolean = false;
  ngOnInit(): void {   
  }



  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService) {


  }

  publishForm = this.fb.group
    (
      {
        Title: new FormControl('', [Validators.required, Validators.minLength(5)]),
        Content: new FormControl('', [Validators.required, Validators.minLength(10)]),
      }
    );
  
  onSubmit() {


    alert("Enter topic and description");

  }

  on() {
    console.log("validity : " + this.publishForm.valid);
    if (this.publishForm.invalid) {
      
      this.toastr.error('Cannot Publish', 'Topic and content is required', {
        positionClass: 'toast-top-center',
        timeOut: 2000,
      })
      return;
    }
    this.isDisabledButton = this.publishForm.valid;
    $("#overlay").css("display", "block");

   
  }



  off() {
    this.isDisabledButton = false;
    $("#overlay").css("display", "none");
  }

  change() {
    $("#title").css("color", "#333333");
    $("#title").css("font-weight", "bold");
    $("#title").css("font-size", "24px");
    $("#title").css("font-family", "Open-sans,sans-serif;");
      }

 

  

}

